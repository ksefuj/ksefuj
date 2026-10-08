/**
 * Inline `<iframe>` PDF preview needs a real PDF viewer in the browser: desktop browsers have one,
 * phones and tablets (coarse pointers, narrow screens) mostly do not. There the preview shows a
 * hint to download the PDF instead. Matches the Tailwind `md` breakpoint.
 */
export const INLINE_PREVIEW_QUERY = "(min-width: 768px) and (pointer: fine)";

type MatchMediaFn = (query: string) => { matches: boolean };

/** True when the device can show the PDF inline. Without `matchMedia` (SSR) it is false. */
export function supportsInlinePreview(matchMedia: MatchMediaFn | undefined): boolean {
  if (!matchMedia) {
    return false;
  }
  return matchMedia(INLINE_PREVIEW_QUERY).matches;
}
