import type { TFontDictionary } from "pdfmake/interfaces";

/**
 * Roboto Regular + Medium (bold). The italic slots point at the same files, so italic text (which
 * the vendored generator does not use) can never fail on a missing font.
 */
export const ROBOTO_FONTS: TFontDictionary = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Regular.ttf",
    bolditalics: "Roboto-Medium.ttf",
  },
};

/** Fetches the font data (a separate chunk, ~410 kB raw) and returns the virtual file system. */
export async function loadRobotoVfs(): Promise<Record<string, string>> {
  const { robotoVfs } = await import("./roboto-vfs");
  return robotoVfs;
}
