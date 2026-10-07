/**
 * In-memory hand-off of dropped files between pages (homepage hero -> /validator).
 *
 * Invoice XML is sensitive, so the files live only in this module-level variable for the
 * duration of a client-side navigation: no storage, no URL, no network. A full page load
 * resets the module, which is the intended behaviour for direct visits. Entries expire after
 * a few seconds, so an abandoned navigation never auto-validates files on a later visit.
 */
export type PendingFiles = { files: File[]; skipped: number };

/** How long a hand-off stays valid. A client-side navigation takes well under this. */
const MAX_AGE_MS = 10_000;

let pending: (PendingFiles & { at: number }) | null = null;

/** Stash files (and the count of ignored non-XML files) for the next page. */
export function setPendingFiles(files: File[], skipped = 0, now = Date.now()): void {
  pending = files.length > 0 ? { files, skipped, at: now } : null;
}

/** Take the stashed hand-off if it is still fresh. The store is always emptied (consume-once). */
export function consumePendingFiles(now = Date.now()): PendingFiles | null {
  const entry = pending;
  pending = null;
  if (!entry || now - entry.at > MAX_AGE_MS) {
    return null;
  }
  return { files: entry.files, skipped: entry.skipped };
}
