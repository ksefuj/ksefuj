import Image from "next/image";
import { getTranslations } from "next-intl/server";
import manifest from "@/data/screenshots.json";

interface ScreenshotEntry {
  src: string;
  width: number;
  height: number;
  capturedAt: string;
  appVersion: string;
  env: string;
}

const screenshots: Record<string, ScreenshotEntry> = manifest;

interface ScreenshotProps {
  /** Manifest key, e.g. "ksef-ap/faktury-lista" */
  name: string;
  alt: string;
  caption?: string;
  /** Bound by compileMDXContent; defaults to Polish */
  locale?: string;
}

function formatCapturedAt(date: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions =
    locale === "en"
      ? { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
      : { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" };
  return new Date(date).toLocaleDateString(locale === "en" ? "en-GB" : locale, options);
}

/** App screenshot from the manifest, with a localized provenance line. Click opens full size. */
export async function Screenshot({ name, alt, caption, locale = "pl" }: ScreenshotProps) {
  const entry = screenshots[name];
  if (!entry) {
    throw new Error(
      `<Screenshot>: unknown screenshot "${name}". Add it to src/data/screenshots.json ` +
        `(known: ${Object.keys(screenshots).join(", ")}).`,
    );
  }
  if (entry.env !== "test" && entry.env !== "prod") {
    throw new Error(`<Screenshot>: screenshot "${name}" has unsupported env "${entry.env}".`);
  }

  const t = await getTranslations({ locale, namespace: "content.mdx" });
  const provenance = t(`screenshotSource.${entry.env}`, {
    date: formatCapturedAt(entry.capturedAt, locale),
  });

  return (
    <figure className="my-6">
      <a
        href={entry.src}
        target="_blank"
        rel="noopener"
        className="block overflow-hidden rounded-xl border border-slate-200 shadow-sm"
      >
        <Image
          src={entry.src}
          width={entry.width}
          height={entry.height}
          alt={alt}
          sizes="(min-width: 896px) 832px, 100vw"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-2 text-sm text-slate-500">
        {caption && <>{caption} </>}
        <span className="text-slate-400">{provenance}</span>
      </figcaption>
    </figure>
  );
}
