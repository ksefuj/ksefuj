"use client";

import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFileHandoff } from "@/contexts/file-handoff-context";
import { cn } from "@/lib/utils";

interface HeroDropZoneProps {
  locale: string;
}

export function HeroDropZone({ locale }: HeroDropZoneProps) {
  const t = useTranslations("validator");
  const tLanding = useTranslations("landing.hero");
  const router = useRouter();
  const { setFiles } = useFileHandoff();
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const p = locale === "pl" ? "" : `/${locale}`;

  const handleFilesAndRedirect = useCallback(
    (fileList: File[]) => {
      const xmlFiles = fileList.filter((f) => f.name.endsWith(".xml"));
      if (xmlFiles.length === 0) {
        return;
      }
      setFiles(xmlFiles);
      router.push(`${p}/validator`);
    },
    [setFiles, router, p],
  );

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    setDragCounter((prev) => prev + 1);
    setDragging(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setDragging(false);
      }
      return newCounter;
    });
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    setDragCounter(0);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAndRedirect(Array.from(e.dataTransfer.files));
    }
  };

  const onClickUpload = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAndRedirect(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onClick={onClickUpload}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer",
          "bg-white hover:bg-white/90 hover:shadow-lg",
          "min-h-[300px] flex items-center justify-center",
          dragging && "border-violet-400 bg-violet-50/50 scale-[1.01] shadow-lg",
          !dragging && "border-slate-200 hover:border-violet-300",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xml"
          multiple
          onChange={onFileChange}
          className="hidden"
        />

        <div className="text-center space-y-4 p-12">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-violet-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-violet-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {t("dropzone.callToAction")}
            </h3>
            <p className="text-slate-600">
              {dragging && dragCounter > 0
                ? t("dropzone.dropFiles", { count: dragCounter })
                : t("dropzone.dragHere")}
            </p>
          </div>

          <p className="text-sm text-slate-400">{t("dropzone.acceptedFiles")}</p>
        </div>
      </div>

      <div className="text-center">
        <a
          href={`${p}/validator`}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
        >
          {tLanding("cta")}
        </a>
      </div>
    </div>
  );
}
