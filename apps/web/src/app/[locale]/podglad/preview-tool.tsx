"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { XmlDropZone } from "@/components/xml-drop-zone";
import { InvoicePreview } from "@/components/invoice-preview/invoice-preview";

interface PreviewToolProps {
  locale: string;
}

interface OpenedFile {
  /** Changes with every pick so the preview remounts for a new file, even the same one. */
  key: number;
  name: string;
  bytes: Uint8Array;
}

/**
 * Single-file picker plus the shared preview component. The file is read into memory in the
 * browser; its exact bytes are what gets rendered and hashed, nothing is uploaded.
 */
export function PreviewTool({ locale }: PreviewToolProps) {
  const t = useTranslations("previewPage.dropzone");
  const [file, setFile] = useState<OpenedFile | null>(null);
  const [opening, setOpening] = useState(false);
  const counter = useRef(0);

  const handleFiles = async (files: File[]) => {
    const picked = files[0];
    if (!picked) {
      return;
    }
    setOpening(true);
    try {
      const bytes = new Uint8Array(await picked.arrayBuffer());
      setFile({ key: ++counter.current, name: picked.name, bytes });
    } finally {
      setOpening(false);
    }
  };

  return (
    <div className="space-y-6">
      <XmlDropZone
        onFiles={(files) => void handleFiles(files)}
        multiple={false}
        variant={file ? "compact" : "default"}
        disabled={opening}
        title={t("title")}
        hint={opening ? t("opening") : t("hint")}
        dropLabel={t("dropHere")}
        note={t("acceptedFiles")}
      />
      {file && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
          <p className="break-all text-sm font-medium text-slate-900">{file.name}</p>
          <InvoicePreview
            key={file.key}
            fileName={file.name}
            getBytes={async () => file.bytes}
            locale={locale}
            source="podglad"
            size="md"
            autoOpen
          />
        </div>
      )}
    </div>
  );
}
