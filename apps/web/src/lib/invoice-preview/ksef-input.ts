/**
 * State machine behind the optional KSeF number field of the invoice preview. Pure: the number
 * check (`isValidKsefNumber` from @ksefuj/pdf, loaded lazily) is injected, so no PDF code is
 * needed to unit test it.
 *
 * - `empty`: nothing typed
 * - `typing`: not (yet) a valid number, and the user has not left the field, so no error is shown
 * - `invalid`: not a valid number after blur or submit
 * - `valid`: a well-formed number with a correct checksum
 * - `mismatch`: well-formed, but the renderer found it belongs to another seller NIP
 */
export type KsefInputStatus = "empty" | "typing" | "invalid" | "valid" | "mismatch";

export interface KsefMismatch {
  /** The normalised number the mismatch was reported for. */
  number: string;
  ksefNip: string;
  sellerNip: string | null;
}

export interface KsefInputState {
  raw: string;
  touched: boolean;
  mismatch: KsefMismatch | null;
}

export type KsefInputAction =
  | { type: "change"; raw: string }
  | { type: "blur" }
  | { type: "submit" }
  | { type: "mismatch"; mismatch: KsefMismatch }
  | { type: "reset" };

export const initialKsefInputState: KsefInputState = { raw: "", touched: false, mismatch: null };

/** Trims, drops inner whitespace (copy-paste artefacts) and upper-cases (hex digits are upper case). */
export function normalizeKsefNumber(raw: string): string {
  return raw.replace(/\s+/g, "").toUpperCase();
}

/** The NIP-like identifier at the start of a KSeF number (everything before the first dash). */
export function ksefNumberNip(normalized: string): string {
  const dash = normalized.indexOf("-");
  return dash === -1 ? normalized : normalized.slice(0, dash);
}

export function ksefInputReducer(state: KsefInputState, action: KsefInputAction): KsefInputState {
  switch (action.type) {
    case "change":
      return { raw: action.raw, touched: state.touched, mismatch: null };
    case "blur":
    case "submit":
      return state.touched ? state : { ...state, touched: true };
    case "mismatch":
      return { ...state, mismatch: action.mismatch };
    case "reset":
      return initialKsefInputState;
  }
}

export function ksefInputStatus(
  state: KsefInputState,
  isValid: (value: string) => boolean,
): KsefInputStatus {
  const normalized = normalizeKsefNumber(state.raw);
  if (normalized === "") {
    return "empty";
  }
  if (isValid(normalized)) {
    return state.mismatch?.number === normalized ? "mismatch" : "valid";
  }
  return state.touched ? "invalid" : "typing";
}

/**
 * The number to render the PDF with: only a valid one that was not rejected for the seller NIP.
 * `undefined` renders the plain visualisation (watermark, no QR code).
 */
export function effectiveKsefNumber(
  state: KsefInputState,
  isValid: (value: string) => boolean,
): string | undefined {
  return ksefInputStatus(state, isValid) === "valid" ? normalizeKsefNumber(state.raw) : undefined;
}
