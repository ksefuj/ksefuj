/** Saves a blob through a temporary download link. The blob URL is revoked right after. */
export function saveBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoking synchronously can cancel the download in some browsers
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
