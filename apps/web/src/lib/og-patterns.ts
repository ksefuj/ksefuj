/**
 * Procedural topography (contour-line map) used as the full-bleed OG card background.
 * Pure and deterministic: the same key always yields the identical SVG, so all locale versions of
 * one article share one card. A seeded fBm gradient-noise field is sampled on a fine grid,
 * iso-contours are extracted with marching squares, joined into polylines and smoothed with
 * quadratic midpoint splines.
 */

const STROKE = "#c4b5fd";
const STROKE_OPACITY = 0.35;
const STROKE_WIDTH = 1.5;

const CELL = 4;
/** Closed loops whose bounding box is smaller than this (px) are dropped (specks). */
const MIN_LOOP_SIZE = 24;
/** Keep every Nth grid point of a contour before smoothing. */
const DECIMATE = 2;

/** FNV-1a 32-bit hash. */
export function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = [number, number];

/** Seeded 2D gradient (Perlin) noise. */
function makeNoise(rand: () => number): (x: number, y: number) => number {
  const perm = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  const p = (i: number) => perm[i & 255];
  const angles = Array.from({ length: 256 }, () => rand() * Math.PI * 2);
  const grad = (ix: number, iy: number, dx: number, dy: number) => {
    const a = angles[p(p(ix) + iy)];
    return Math.cos(a) * dx + Math.sin(a) * dy;
  };
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  return (x, y) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = x - x0;
    const fy = y - y0;
    const u = fade(fx);
    const v = fade(fy);
    const n00 = grad(x0, y0, fx, fy);
    const n10 = grad(x0 + 1, y0, fx - 1, fy);
    const n01 = grad(x0, y0 + 1, fx, fy - 1);
    const n11 = grad(x0 + 1, y0 + 1, fx - 1, fy - 1);
    return (n00 + u * (n10 - n00)) * (1 - v) + (n01 + u * (n11 - n01)) * v;
  };
}

/** Rotation (rad) and stretch applied to the sample space for elongated, directional bands. */
const FLOW_ANGLE = (30 * Math.PI) / 180;
const STRETCH_X = 1.5;
/** 0 = raw noise heights, 1 = fully histogram-equalised. */
const EQUALISE = 1;
/** Target contour spacing (px) at the median slope; sets the level count. */
const TARGET_SPACING = 16;
/** Contours never come closer than this (px) at the 99.9th percentile slope. */
const HARD_MIN_SPACING = 9.5;
/** The steepest slope may be at most this multiple of the median, so min spacing >= target / this. */
const MAX_SLOPE_RATIO = 1.6;
const MAX_RELAX_ROUNDS = 80;
const RELAX_BLUR_RADIUS = 4;

export interface FieldStats {
  levels: number;
  /** Contour spacing (px) at the median slope. */
  medianSpacing: number;
  /** Contour spacing (px) at the steepest cell (the 99.9th percentile slope). */
  minSpacing: number;
}

interface Field {
  values: Float64Array;
  levels: number;
  stats: FieldStats;
}

function slope(v: Float64Array, nx: number, ny: number, i: number, j: number): number {
  const c = v[j * nx + i];
  return Math.hypot(
    (v[j * nx + Math.min(i + 1, nx - 1)] - c) / CELL,
    (v[Math.min(j + 1, ny - 1) * nx + i] - c) / CELL,
  );
}

function slopePercentiles(
  v: Float64Array,
  nx: number,
  ny: number,
): { median: number; high: number } {
  const gs: number[] = [];
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      gs.push(slope(v, nx, ny, i, j));
    }
  }
  gs.sort((a, b) => a - b);
  return { median: gs[Math.floor(gs.length * 0.5)], high: gs[Math.floor(gs.length * 0.999)] };
}

function normalise(v: Float64Array): void {
  let min = Infinity;
  let max = -Infinity;
  for (const x of v) {
    min = Math.min(min, x);
    max = Math.max(max, x);
  }
  for (let k = 0; k < v.length; k++) {
    v[k] = (v[k] - min) / (max - min);
  }
}

/** Separable box blur with edge clamping. */
function boxBlur(src: Float64Array, nx: number, ny: number, radius: number): Float64Array {
  const tmp = new Float64Array(src.length);
  const out = new Float64Array(src.length);
  const size = 2 * radius + 1;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      let sum = 0;
      for (let d = -radius; d <= radius; d++) {
        sum += src[j * nx + Math.min(nx - 1, Math.max(0, i + d))];
      }
      tmp[j * nx + i] = sum / size;
    }
  }
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      let sum = 0;
      for (let d = -radius; d <= radius; d++) {
        sum += tmp[Math.min(ny - 1, Math.max(0, j + d)) * nx + i];
      }
      out[j * nx + i] = sum / size;
    }
  }
  return out;
}

/**
 * Slope limiting: cells steeper than the cap are blended towards a blurred copy of the field,
 * repeated until even the steepest slope is at most MAX_SLOPE_RATIO times the median. Contours
 * therefore cannot bunch into tight bands, while the organic shape of the field stays intact.
 */
function relaxCliffs(values: Float64Array, nx: number, ny: number): void {
  let cur = values;
  for (let round = 0; round < MAX_RELAX_ROUNDS; round++) {
    normalise(cur);
    const { median, high } = slopePercentiles(cur, nx, ny);
    if (high <= median * MAX_SLOPE_RATIO) {
      break;
    }
    const cap = median * (MAX_SLOPE_RATIO - 0.4);
    const blurred = boxBlur(boxBlur(cur, nx, ny, RELAX_BLUR_RADIUS), nx, ny, RELAX_BLUR_RADIUS);
    const next = Float64Array.from(cur);
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        // Look at the slope in a small neighbourhood so the blend region has soft edges.
        const g = Math.max(
          slope(cur, nx, ny, i, j),
          slope(cur, nx, ny, Math.max(0, i - 1), j),
          slope(cur, nx, ny, i, Math.max(0, j - 1)),
        );
        const w = Math.min(1, Math.max(0, (g - cap) / (0.5 * cap)));
        if (w > 0) {
          next[j * nx + i] += w * (blurred[j * nx + i] - cur[j * nx + i]);
        }
      }
    }
    cur = next;
  }
  values.set(cur);
  normalise(values);
}

/** Seeded, domain-warped, anisotropic 2-octave noise field normalised to its real 0..1 range. */
function buildField(key: string, nx: number, ny: number): Field {
  const rand = mulberry32(fnv1a(key));
  const noise = makeNoise(rand);
  const warpNoise = makeNoise(rand);
  const offsetX = rand() * 1000;
  const offsetY = rand() * 1000;
  const baseFreq = 1 / 380;
  const warpFreq = 1 / 420;
  const warpAmp = 45;
  const cos = Math.cos(FLOW_ANGLE);
  const sin = Math.sin(FLOW_ANGLE);

  const values = new Float64Array(nx * ny);
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const px = i * CELL;
      const py = j * CELL;
      const wx = px + warpAmp * warpNoise(px * warpFreq + 31.7, py * warpFreq + 12.3);
      const wy = py + warpAmp * warpNoise(px * warpFreq + 77.1, py * warpFreq + 54.9);
      // Rotate, then compress x so features stretch along the flow direction.
      const rx = (wx * cos + wy * sin) / STRETCH_X;
      const ry = -wx * sin + wy * cos;
      const v =
        noise(rx * baseFreq + offsetX, ry * baseFreq + offsetY) +
        0.45 * noise(rx * baseFreq * 2.3 + offsetY, ry * baseFreq * 2.3 + offsetX) +
        0.2 * noise(rx * baseFreq * 5 + offsetX, ry * baseFreq * 5 + offsetY);
      values[j * nx + i] = v;
      min = Math.min(min, v);
      max = Math.max(max, v);
    }
  }
  for (let k = 0; k < values.length; k++) {
    values[k] = (values[k] - min) / (max - min);
  }
  // Blend towards the rank (histogram-equalised) value so flat areas do not leave big voids and
  // steep ones do not crowd: equal height steps then enclose roughly equal areas.
  const order = Array.from(values.keys()).sort((a, b) => values[a] - values[b]);
  const equalised = new Float64Array(values.length);
  order.forEach((idx, rank) => {
    equalised[idx] = rank / (order.length - 1);
  });
  for (let k = 0; k < values.length; k++) {
    values[k] = (1 - EQUALISE) * values[k] + EQUALISE * equalised[k];
  }
  relaxCliffs(values, nx, ny);

  // Level step follows from the target spacing at the median slope, independent of the panel
  // size. Spacing elsewhere = step / local slope, bounded below by MAX_SLOPE_RATIO.
  const { median, high } = slopePercentiles(values, nx, ny);
  // HARD_MIN_SPACING is a guarantee: if relaxation could not tame a cliff, use fewer levels.
  const levels = Math.max(
    6,
    Math.floor(1 / Math.max(TARGET_SPACING * median, HARD_MIN_SPACING * high)),
  );
  const step = 1 / levels;
  return {
    values,
    levels,
    stats: { levels, medianSpacing: step / median, minSpacing: step / high },
  };
}

/** Marching squares for one level; returns polylines (closed ones repeat their first point). */
function contourLines(field: Float64Array, nx: number, ny: number, level: number): Point[][] {
  const pointOf = new Map<number, Point>();
  const adjacency = new Map<number, number[]>();

  // Edge ids: horizontal edge from (i,j) to (i+1,j) -> 2*(j*nx+i); vertical (i,j)-(i,j+1) -> +1.
  const hEdge = (i: number, j: number) => 2 * (j * nx + i);
  const vEdge = (i: number, j: number) => 2 * (j * nx + i) + 1;

  const at = (i: number, j: number) => field[j * nx + i];
  const crossing = (id: number, i: number, j: number, horizontal: boolean) => {
    if (!pointOf.has(id)) {
      const a = at(i, j);
      const b = horizontal ? at(i + 1, j) : at(i, j + 1);
      const t = (level - a) / (b - a);
      pointOf.set(id, horizontal ? [(i + t) * CELL, j * CELL] : [i * CELL, (j + t) * CELL]);
    }
    return id;
  };
  const link = (a: number, b: number) => {
    adjacency.set(a, [...(adjacency.get(a) ?? []), b]);
    adjacency.set(b, [...(adjacency.get(b) ?? []), a]);
  };

  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const tl = at(i, j);
      const tr = at(i + 1, j);
      const br = at(i + 1, j + 1);
      const bl = at(i, j + 1);
      const code =
        (tl >= level ? 8 : 0) |
        (tr >= level ? 4 : 0) |
        (br >= level ? 2 : 0) |
        (bl >= level ? 1 : 0);
      if (code === 0 || code === 15) {
        continue;
      }

      const top = () => crossing(hEdge(i, j), i, j, true);
      const bottom = () => crossing(hEdge(i, j + 1), i, j + 1, true);
      const left = () => crossing(vEdge(i, j), i, j, false);
      const right = () => crossing(vEdge(i + 1, j), i + 1, j, false);

      switch (code) {
        case 1:
        case 14:
          link(left(), bottom());
          break;
        case 2:
        case 13:
          link(bottom(), right());
          break;
        case 3:
        case 12:
          link(left(), right());
          break;
        case 4:
        case 11:
          link(top(), right());
          break;
        case 6:
        case 9:
          link(top(), bottom());
          break;
        case 7:
        case 8:
          link(left(), top());
          break;
        case 5:
        case 10: {
          const centerHigh = (tl + tr + br + bl) / 4 >= level;
          if ((code === 5) === centerHigh) {
            link(left(), top());
            link(bottom(), right());
          } else {
            link(left(), bottom());
            link(top(), right());
          }
          break;
        }
      }
    }
  }

  const visited = new Set<number>();
  const lines: Point[][] = [];
  const walk = (start: number) => {
    const ids = [start];
    visited.add(start);
    let prev = -1;
    let cur = start;
    for (;;) {
      const next = (adjacency.get(cur) ?? []).find((n) => n !== prev && !visited.has(n));
      if (next === undefined) {
        break;
      }
      visited.add(next);
      ids.push(next);
      prev = cur;
      cur = next;
    }
    const closed = (adjacency.get(cur) ?? []).includes(start) && ids.length > 2;
    const pts = ids.map((id) => pointOf.get(id) as Point);
    if (closed) {
      pts.push(pts[0]);
    }
    // Skip specks: tiny closed loops around isolated peaks look like stray dots.
    const xs = pts.map((pt) => pt[0]);
    const ys = pts.map((pt) => pt[1]);
    const extent = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    if (closed ? extent >= MIN_LOOP_SIZE : pts.length >= 4) {
      lines.push(pts);
    }
  };
  // Open lines first (start at degree-1 nodes), then remaining closed loops.
  for (const [id, n] of adjacency) {
    if (n.length === 1 && !visited.has(id)) {
      walk(id);
    }
  }
  for (const id of adjacency.keys()) {
    if (!visited.has(id)) {
      walk(id);
    }
  }
  return lines;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Compact number: 1 decimal, no leading zero, no trailing ".0". */
function num(n: number): string {
  const str = r1(n).toString();
  return str.replace(/^(-?)0\./, "$1.");
}

/**
 * Converts a polyline to a smooth path of quadratic midpoint splines (each vertex is a control
 * point, curve ends at segment midpoints). Relative commands keep the output small.
 */
function smoothPath(points: Point[]): string {
  const closed =
    points.length > 3 &&
    points[0][0] === points[points.length - 1][0] &&
    points[0][1] === points[points.length - 1][1];
  let pts = points.filter((_, idx) => idx % DECIMATE === 0 || idx === points.length - 1);
  if (closed) {
    pts = pts.slice(0, -1);
  }
  if (pts.length < 3) {
    return "";
  }

  const n = pts.length;
  const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  // Track the rounded absolute pen position so relative deltas never accumulate rounding drift.
  let penX = r1(closed ? mid(pts[n - 1], pts[0])[0] : pts[0][0]);
  let penY = r1(closed ? mid(pts[n - 1], pts[0])[1] : pts[0][1]);
  let d = `M${num(penX)} ${num(penY)}`;

  const curve = (ctrl: Point, end: Point) => {
    const cx = r1(ctrl[0]);
    const cy = r1(ctrl[1]);
    const ex = r1(end[0]);
    const ey = r1(end[1]);
    const parts = [cx - penX, cy - penY, ex - penX, ey - penY].map(num);
    d += `q${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`.replace(/ -/g, "-");
    penX = ex;
    penY = ey;
  };

  if (closed) {
    for (let i = 0; i < n; i++) {
      curve(pts[i], mid(pts[i], pts[(i + 1) % n]));
    }
    return `${d}z`;
  }
  for (let i = 1; i < n - 1; i++) {
    curve(pts[i], mid(pts[i], pts[i + 1]));
  }
  d += `L${num(pts[n - 1][0])} ${num(pts[n - 1][1])}`;
  return d;
}

/** Contour spacing statistics of the field behind a key, for tests and tuning. */
export function topographyStats(key: string, width: number, height: number): FieldStats {
  return buildField(key, Math.ceil(width / CELL) + 1, Math.ceil(height / CELL) + 1).stats;
}

/** Complete SVG document with violet contour lines on a transparent background. */
export function topographySvg(key: string, width: number, height: number): string {
  const nx = Math.ceil(width / CELL) + 1;
  const ny = Math.ceil(height / CELL) + 1;
  const { values: field, levels } = buildField(key, nx, ny);

  let paths = "";
  for (let l = 1; l <= levels; l++) {
    const level = (l - 0.5) / levels;
    paths += contourLines(field, nx, ny, level).map(smoothPath).join("");
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<path d="${paths}" fill="none" stroke="${STROKE}" stroke-opacity="${STROKE_OPACITY}" stroke-width="${STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`
  );
}

/** `data:` URL of the topography SVG, for use as an `<img src>` in Satori. */
export function topographyDataUrl(key: string, width: number, height: number): string {
  return `data:image/svg+xml;base64,${Buffer.from(topographySvg(key, width, height)).toString("base64")}`;
}
