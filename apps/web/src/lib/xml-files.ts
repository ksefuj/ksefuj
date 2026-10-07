/** Case-insensitive check for the `.xml` extension (invoices are often exported as `.XML`). */
export function isXmlFile(file: { name: string }): boolean {
  return file.name.toLowerCase().endsWith(".xml");
}

/** Split a dropped or picked file list into XML files to validate and the rest to report. */
export function partitionXmlFiles<T extends { name: string }>(
  files: Iterable<T>,
): { xml: T[]; rejected: T[] } {
  const xml: T[] = [];
  const rejected: T[] = [];
  for (const file of files) {
    (isXmlFile(file) ? xml : rejected).push(file);
  }
  return { xml, rejected };
}
