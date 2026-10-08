"use client";

import { type ChangeEvent, type DragEvent, type KeyboardEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { partitionXmlFiles } from "@/lib/xml-files";
import { cn } from "@/lib/utils";

interface XmlDropZoneProps {
  /** Called with the XML files only; `skipped` counts the non-XML files that were ignored. */
  onFiles: (files: File[], info: { skipped: number }) => void;
  /** Called on every drop or pick, also when no XML file was among them (for counts only). */
  onSelection?: (info: { xmlCount: number; skipped: number }) => void;
  variant?: "default" | "compact";
  disabled?: boolean;
  /** Overrides the headline. */
  title?: string;
  /** Overrides the line under the headline (shown while not dragging). */
  hint?: string;
  /** Overrides the small caption at the bottom; `null` hides it. */
  note?: string | null;
  /** Overrides the line shown while a file is dragged over the area. */
  dropLabel?: string;
  /** Accept several files (default) or only the first XML file. */
  multiple?: boolean;
  className?: string;
}

/**
 * Drag-and-drop / file-picker area for XML invoices. Files are only read in the browser: this
 * component never uploads anything, it just hands the selected `File` objects to `onFiles`.
 */
export function XmlDropZone({
  onFiles,
  onSelection,
  variant = "default",
  disabled = false,
  title,
  hint,
  note,
  dropLabel,
  multiple = true,
  className,
}: XmlDropZoneProps) {
  const t = useTranslations("validator.dropzone");
  const compact = variant === "compact";
  const [dragging, setDragging] = useState(false);
  const [dragItemCount, setDragItemCount] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // dragenter/dragleave also fire for child elements, so count the nesting depth in a ref
  const dragDepthRef = useRef(0);

  const handleSelection = (fileList: ArrayLike<File>) => {
    const { xml, rejected } = partitionXmlFiles(Array.from(fileList));
    setSkipped(rejected.length);
    onSelection?.({ xmlCount: xml.length, skipped: rejected.length });
    if (xml.length > 0) {
      onFiles(multiple ? xml : xml.slice(0, 1), { skipped: rejected.length });
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = disabled ? "none" : "copy";
  };

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    dragDepthRef.current += 1;
    setDragItemCount(e.dataTransfer.items?.length ?? 0);
    setSkipped(0);
    setDragging(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) {
      setDragging(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    dragDepthRef.current = 0;
    setDragging(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleSelection(e.dataTransfer.files);
    }
  };

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openPicker();
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    // Reset so picking the same file again still fires a change event
    e.target.value = "";
    if (picked.length > 0) {
      handleSelection(picked);
    }
  };

  const caption = note === undefined ? t("acceptedFiles") : note;

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onClick={openPicker}
        onKeyDown={onKeyDown}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer",
          "bg-white hover:bg-white/90 hover:shadow-lg",
          "flex items-center justify-center",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30",
          compact ? "min-h-[160px] md:min-h-[200px]" : "min-h-[300px]",
          dragging && "border-violet-400 bg-violet-50/50 scale-[1.01] shadow-lg",
          !dragging && "border-slate-200 hover:border-violet-300",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xml"
          multiple={multiple}
          tabIndex={-1}
          aria-hidden
          onChange={onFileChange}
          onClick={(e) => e.stopPropagation()}
          className="hidden"
        />

        <div className={cn("text-center", compact ? "space-y-3 p-6" : "space-y-4 p-12")}>
          <div className="flex justify-center">
            <div
              className={cn(
                "rounded-2xl bg-violet-50 flex items-center justify-center",
                compact ? "w-14 h-14" : "w-20 h-20",
              )}
            >
              <svg
                className={cn("text-violet-500", compact ? "w-7 h-7" : "w-10 h-10")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
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
            <p
              className={cn(
                "font-bold text-slate-900 font-display",
                compact ? "text-xl" : "text-2xl",
              )}
            >
              {title ?? t("callToAction")}
            </p>
            <p className="text-slate-600">
              {dragging && dragItemCount > 0
                ? (dropLabel ?? t("dropFiles", { count: dragItemCount }))
                : (hint ?? t("dragHere"))}
            </p>
          </div>

          {caption && <p className="text-sm text-slate-400">{caption}</p>}
        </div>
      </div>

      <p role="status" className={cn("mt-3 text-sm text-amber-700", skipped === 0 && "sr-only")}>
        {skipped > 0 ? t("skipped", { count: skipped }) : ""}
      </p>
    </div>
  );
}
