/**
 * In-memory hand-off of dropped files between pages (homepage hero -> /validator).
 *
 * Invoice XML is sensitive, so the files live only in this module-level variable for the
 * duration of a client-side navigation: no storage, no URL, no network. A full page load
 * resets the module, which is the intended behaviour for direct visits.
 */
let pending: File[] | null = null;

/** Stash files for the next page. An empty list clears any earlier hand-off. */
export function setPendingFiles(files: File[]): void {
  pending = files.length > 0 ? files : null;
}

/** Take the stashed files, if any. The store is emptied, so files are consumed at most once. */
export function consumePendingFiles(): File[] | null {
  const files = pending;
  pending = null;
  return files;
}
