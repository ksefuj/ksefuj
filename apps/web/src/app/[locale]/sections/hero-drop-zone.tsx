"use client";

import * as amplitude from "@amplitude/unified";
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
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <XmlDropZone
        variant="compact"
        title={opening ? t("opening") : t("title")}
        disabled={opening}
        hint={t("hint")}
        note={t("privacy")}
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
      <p className="text-center">
        <Link
          href="/validator"
          onClick={() => amplitude.track("hero_open_validator_clicked", { locale })}
          className="text-sm font-medium text-violet-600 hover:text-violet-700 underline underline-offset-4 transition-colors"
        >
          {t("openValidator")}
        </Link>
      </p>
    </div>
  );
}
