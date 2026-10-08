const FA3_NAMESPACE = "http://crd.gov.pl/wzor/2025/06/25/13775/";

export interface InvoiceMeta {
  /** P_2: the invoice number as issued. */
  invoiceNumber: string | null;
  /** Podmiot1/DaneIdentyfikacyjne/NIP: the seller's NIP. */
  sellerNip: string | null;
}

function childByName(parent: Element | undefined, name: string): Element | undefined {
  if (!parent) {
    return undefined;
  }
  return Array.from(parent.children).find(
    (child) => child.localName === name && child.namespaceURI === FA3_NAMESPACE,
  );
}

/**
 * Reads the invoice number and the seller NIP out of FA(3) XML with the browser's DOMParser. Both
 * are display-only (file name, mismatch message); never throws, a missing value is `null`.
 */
export function extractInvoiceMeta(bytes: Uint8Array): InvoiceMeta {
  try {
    const text = new TextDecoder("utf-8").decode(bytes);
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const root = doc.documentElement;
    const fa = childByName(root, "Fa");
    const seller = childByName(root, "Podmiot1");
    const sellerIdentity = childByName(seller, "DaneIdentyfikacyjne");
    return {
      invoiceNumber: childByName(fa, "P_2")?.textContent?.trim() || null,
      sellerNip: childByName(sellerIdentity, "NIP")?.textContent?.trim() || null,
    };
  } catch {
    return { invoiceNumber: null, sellerNip: null };
  }
}
