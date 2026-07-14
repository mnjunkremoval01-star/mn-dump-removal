/** Strips control characters and collapses runs of whitespace for single-line fields. */
export function sanitizeSingleLine(value: string): string {
  return value
    .replace(/[\r\n\t\x00-\x1f\x7f]/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Strips control characters (except newlines) for multi-line fields like free-text descriptions. */
export function sanitizeMultiLine(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\x00-\x09\x0b\x0c\x0e-\x1f\x7f]/g, "")
    .trim();
}
