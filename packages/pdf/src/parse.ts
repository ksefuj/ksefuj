import { xml2js } from "xml-js";
import { UnsupportedInvoiceError } from "./errors";
import { stripPrefix } from "../vendor/ksef-pdf-generator/src/shared/XML-parser";
import type { Faktura } from "../vendor/ksef-pdf-generator/src/lib-public/types/fa3.types";

export const FA3_NAMESPACE = "http://crd.gov.pl/wzor/2025/06/25/13775/";

type RawNode = {
  _attributes?: Record<string, string>;
  [key: string]: unknown;
};

/** Decodes the bytes like upstream: UTF-16 by BOM or "<" pattern, otherwise UTF-8 (BOM dropped). */
function decode(bytes: Uint8Array): string {
  const b = bytes;
  if ((b[0] === 0xff && b[1] === 0xfe) || (b[0] === 0x3c && b[1] === 0x00)) {
    return new TextDecoder("utf-16le").decode(b);
  }
  if ((b[0] === 0xfe && b[1] === 0xff) || (b[0] === 0x00 && b[1] === 0x3c)) {
    return new TextDecoder("utf-16be").decode(b);
  }
  return new TextDecoder("utf-8").decode(b);
}

function localName(name: string): string {
  return name.includes(":") ? name.slice(name.indexOf(":") + 1) : name;
}

/** Parses the XML and checks that the root element is an FA(3) `Faktura`. */
export function parseInvoice(bytes: Uint8Array): Faktura {
  const text = decode(bytes);

  let raw: Record<string, unknown>;
  try {
    raw = xml2js(text, { compact: true }) as Record<string, unknown>;
  } catch {
    throw new UnsupportedInvoiceError("not-xml");
  }

  const rootKeys = Object.keys(raw).filter((key) => !key.startsWith("_"));
  if (rootKeys.length !== 1) {
    throw new UnsupportedInvoiceError("not-xml");
  }
  const rootKey = rootKeys[0];
  const prefix = rootKey.includes(":") ? rootKey.slice(0, rootKey.indexOf(":")) : "";
  const attributes = (raw[rootKey] as RawNode | undefined)?._attributes ?? {};
  const namespace = attributes[prefix ? `xmlns:${prefix}` : "xmlns"];

  if (localName(rootKey) !== "Faktura" || namespace !== FA3_NAMESPACE) {
    throw new UnsupportedInvoiceError("not-fa3");
  }

  // Same options as the vendored parseXML (which needs a browser File/FileReader).
  const parsed = xml2js(text, {
    compact: true,
    cdataKey: "_text",
    trim: true,
    elementNameFn: stripPrefix,
    attributeNameFn: stripPrefix,
  }) as { Faktura: Faktura };

  return parsed.Faktura;
}

export function sellerNip(invoice: Faktura): string | undefined {
  return invoice.Podmiot1?.DaneIdentyfikacyjne?.NIP?._text?.trim() || undefined;
}

export function issueDate(invoice: Faktura): string | undefined {
  return invoice.Fa?.P_1?._text?.trim() || undefined;
}
