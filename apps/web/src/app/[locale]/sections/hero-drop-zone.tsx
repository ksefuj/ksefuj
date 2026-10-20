"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { XmlDropZone } from "@/components/xml-drop-zone";
import { setPendingFiles } from "@/lib/file-handoff";
import { Link, useRouter } from "@/i18n/routing";

/**
 * Compact drop zone for the homepage hero. Dropped files are kept in memory only and validated
 * on /validator right after the client-side navigation.
 */
export function HeroDropZone() {
  const t = useTranslations("heroDropZone");
  const locale = useLocale();
  const router = useRouter();
  // Locks the drop zone after a successful drop so a second drop cannot replace the first
  const [opening, setOpening] = useState(false);

  return (
    <div className="w-full">
      <XmlDropZone
        variant="strip"
        title={opening ? t("opening") : t("title")}
        disabled={opening}
        hint={t("hint")}
        note={null}
        onSelection={({ xmlCount, skipped }) =>
          amplitude.track("hero_files_dropped", {
            locale,
            fileCount: xmlCount + skipped,
            nonXmlCount: skipped,
          })
        }
        onFiles={(files, { skipped }) => {
          setOpening(true);
          setPendingFiles(files, skipped);
          router.push("/validator");
        }}
      />
      <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
        <span className="text-slate-500">{t("privacy")}</span>
        <Link
          href="/validator"
          onClick={() => amplitude.track("hero_open_validator_clicked", { locale })}
          className="font-medium text-violet-700 underline underline-offset-4 hover:text-violet-800"
        >
          {t("openValidator")}
        </Link>
      </p>
    </div>
  );
}
