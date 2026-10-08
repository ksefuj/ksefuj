// TNumerKSeF from packages/validator/src/schemas/schemat.xsd. XSD patterns are implicitly anchored;
// \d is written as [0-9] because XSD \d also matches non-ASCII digits and KSeF numbers never contain
// them. The structure is NIP (or M + 9 digits, or 3 letters + 7 digits) - date - 12 hex - 2 hex.
const KSEF_NUMBER_PATTERN =
  /^(?:[1-9](?:(?:[0-9][1-9])|(?:[1-9][0-9]))[0-9]{7}|M[0-9]{9}|[A-Z]{3}[0-9]{7})-(?:20[2-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})(?:0[1-9]|1[0-2])(?:0[1-9]|[1-2][0-9]|3[0-1])-[0-9A-F]{6}-?[0-9A-F]{6}-[0-9A-F]{2}$/;

/**
 * CRC-8 as specified in CIRFMF/ksef-api faktury/numer-ksef.md ("Algorytm CRC-8"): polynomial 0x07,
 * initial value 0x00, no reflection, no final XOR, computed over the characters of the data part.
 */
function crc8(data: string): number {
  let crc = 0x00;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) & 0xff;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x80 ? ((crc << 1) ^ 0x07) & 0xff : (crc << 1) & 0xff;
    }
  }
  return crc;
}

/**
 * True when the value matches the TNumerKSeF pattern of the FA(3) schema and its checksum is
 * correct. Per CIRFMF/ksef-api faktury/numer-ksef.md the number is 35 characters; the last two
 * (hex CRC-8) cover the first 32 characters, i.e. "NIP-RRRRMMDD-FFFFFFFFFFFF" including hyphens.
 * The XSD also allows a hyphen inside the 12-character technical part (36 characters); it is
 * dropped before the checksum is computed.
 */
export function isValidKsefNumber(value: string): boolean {
  if (!KSEF_NUMBER_PATTERN.test(value)) {
    return false;
  }
  // Prefix (10) + "-" + date (8) + "-" = 20 characters, then 6 hex, optional "-", 6 hex.
  const data = value.slice(0, -3).replace(/^(.{20}[0-9A-F]{6})-/, "$1");
  const checksum = value.slice(-2);
  return data.length === 32 && crc8(data).toString(16).toUpperCase().padStart(2, "0") === checksum;
}

/** The identifier prefix of a (valid) KSeF number, i.e. everything before the first dash. */
export function ksefNumberPrefix(value: string): string {
  return value.slice(0, value.indexOf("-"));
}
