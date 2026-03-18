"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";
import type { ValidationResult } from "@ksefuj/validator";
import { translateValidationIssue } from "./validation-utils";

interface ValidatorProps {
  locale?: string;
}

type FileValidationResult = {
  fileName: string;
  result: ValidationResult | null;
  error: AppError | null;
  status: "pending" | "validating" | "completed" | "error";
};

type AppError = {
  type: "initialization_failed" | "processing_error";
  message: string;
};

type ValidationSummary = {
  totalFiles: number;
  validFiles: number;
  errorFiles: number;
  warningFiles: number;
  totalErrors: number;
  totalWarnings: number;
  hasXsdErrors: boolean;
  hasSemanticErrors: boolean;
};

const STORAGE_KEY = "ksefuj-recent-validations";
const MAX_RECENT = 10;
const ITEMS_PER_PAGE = 20;

export function Validator({ locale }: ValidatorProps) {
  const t = useTranslations("validator");
  const [files, setFiles] = useState<FileValidationResult[]>([]);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [validating, setValidating] = useState(false);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent validations from localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // const _recent = JSON.parse(stored);
        // Don't auto-load, just make them available in history
      } catch (e) {
        console.error("Failed to load recent validations", e);
      }
    }
  }, []);

  // Save validation results to localStorage
  const saveToStorage = useCallback((results: FileValidationResult[]) => {
    if (typeof window === "undefined" || results.length === 0) {
      return;
    }

    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const recent = existing ? JSON.parse(existing) : [];

      const entry = {
        timestamp: new Date().toISOString(),
        fileCount: results.length,
        summary: {
          valid: results.filter(
            (r) => r.result?.valid && !r.result.issues.some((i) => i.code.severity === "warning"),
          ).length,
          errors: results.filter((r) => !r.result?.valid || r.status === "error").length,
          warnings: results.filter(
            (r) => r.result?.valid && r.result.issues.some((i) => i.code.severity === "warning"),
          ).length,
        },
        files: results.map((f) => ({
          name: f.fileName,
          valid: f.result?.valid || false,
          issueCount: f.result?.issues.length || 0,
        })),
      };

      recent.unshift(entry);
      const trimmed = recent.slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, []);

  const calculateSummary = useCallback((results: FileValidationResult[]): ValidationSummary => {
    return {
      totalFiles: results.length,
      validFiles: results.filter(
        (r) => r.result?.valid && !r.result.issues.some((i) => i.code.severity === "error"),
      ).length,
      errorFiles: results.filter((r) => !r.result?.valid || r.status === "error").length,
      warningFiles: results.filter(
        (r) => r.result?.valid && r.result.issues.some((i) => i.code.severity === "warning"),
      ).length,
      totalErrors: results.reduce(
        (sum, r) => sum + (r.result?.issues.filter((i) => i.code.severity === "error").length || 0),
        0,
      ),
      totalWarnings: results.reduce(
        (sum, r) =>
          sum + (r.result?.issues.filter((i) => i.code.severity === "warning").length || 0),
        0,
      ),
      hasXsdErrors: results.some((r) =>
        r.result?.issues.some((i) => i.code.domain === "xsd" && i.code.severity === "error"),
      ),
      hasSemanticErrors: results.some((r) =>
        r.result?.issues.some((i) => i.code.domain === "semantic" && i.code.severity === "error"),
      ),
    };
  }, []);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const fileArray = Array.from(fileList).filter((f) => f.name.endsWith(".xml"));
      if (fileArray.length === 0) {
        return;
      }

      setValidating(true);
      const newFiles: FileValidationResult[] = fileArray.map((f) => ({
        fileName: f.name,
        result: null,
        error: null,
        status: "pending" as const,
      }));
      setFiles(newFiles);

      // Process files one by one
      const results: FileValidationResult[] = [];
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const fileResult: FileValidationResult = { ...newFiles[i], status: "validating" };

        setFiles([...results, fileResult, ...newFiles.slice(i + 1)]);

        try {
          const xml = await file.text();
          const { validate } = await import("@ksefuj/validator");
          const validationResult = await validate(xml, {
            collectAssertions: true,
          });

          fileResult.result = validationResult;
          fileResult.status = "completed";
        } catch (err) {
          fileResult.error = {
            type: "processing_error",
            message: err instanceof Error ? err.message : "Validation failed",
          };
          fileResult.status = "error";
        }

        results.push(fileResult);
        setFiles([...results, ...newFiles.slice(i + 1)]);
      }

      setValidating(false);
      saveToStorage(results);

      // Track validation event
      const summary = calculateSummary(results);
      track("batch_validation", {
        file_count: fileArray.length,
        valid_count: summary.validFiles,
        error_count: summary.errorFiles,
        warning_count: summary.warningFiles,
        locale: locale || "unknown",
      });
    },
    [locale, saveToStorage, calculateSummary],
  );

  const summary = useMemo(() => calculateSummary(files), [files, calculateSummary]);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      setDragCounter(0);
      if (!validating && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles, validating],
  );

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragEnter = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!validating) {
        setDragging(true);
        const items = e.dataTransfer.items;
        let xmlCount = 0;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type === "text/xml" || items[i].type === "") {
            xmlCount++;
          }
        }
        setDragCounter(xmlCount > 0 ? xmlCount : 1);
      }
    },
    [validating],
  );

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragging(false);
      setDragCounter(0);
    }
  }, []);

  const onClickUpload = useCallback(() => {
    if (!validating) {
      inputRef.current?.click();
    }
  }, [validating]);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!validating && e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles, validating],
  );

  const reset = useCallback(() => {
    setFiles([]);
    setCurrentPage(1);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const toggleFileExpanded = useCallback((fileName: string) => {
    setExpandedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(fileName)) {
        next.delete(fileName);
      } else {
        next.add(fileName);
      }
      return next;
    });
  }, []);

  const getFileIcon = (file: FileValidationResult) => {
    if (file.status === "error" || (file.result && !file.result.valid)) {
      return (
        <svg
          className="w-5 h-5 text-rose-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    if (file.result?.issues.some((i) => i.code.severity === "warning")) {
      return (
        <svg
          className="w-5 h-5 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5 text-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  const getFileStatusClass = (file: FileValidationResult) => {
    if (file.status === "error" || (file.result && !file.result.valid)) {
      return "border-rose-200 bg-rose-50";
    }
    if (file.result?.issues.some((i) => i.code.severity === "warning")) {
      return "border-amber-200 bg-amber-50";
    }
    if (file.result?.valid) {
      return "border-emerald-200 bg-emerald-50";
    }
    return "border-slate-200 bg-white";
  };

  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
  const paginatedFiles = files.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto px-4">
      {/* Drop Zone or Results */}
      <div className="w-full">
        {files.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center w-full">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onClick={onClickUpload}
              className={`
                relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 w-full
                backdrop-blur-sm bg-white/40 shadow-sm
                ${validating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-white/60 hover:shadow-md"}
                ${dragging ? "border-violet-400 bg-violet-50/70 scale-[1.02] shadow-md" : "border-slate-300"}
              `}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xml"
                multiple
                onChange={onFileChange}
                className="hidden"
              />
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-black text-slate-800">
                    {t("dropzone.callToAction")}
                  </span>
                  <span className="text-3xl text-violet-400">→</span>
                </div>
                <p className="text-xl font-medium text-slate-600">
                  {dragging && dragCounter > 0
                    ? t("dropzone.dropFiles", { count: dragCounter })
                    : t("dropzone.dragHere")}
                </p>
                <p className="text-sm text-slate-400">{t("dropzone.acceptedFiles")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 overflow-hidden w-full min-h-[400px]">
            {/* Header with Summary */}
            <div
              className={(() => {
                if (summary.errorFiles > 0) {
                  return "px-8 py-6 border-b-2 bg-rose-50 border-rose-200";
                }
                if (summary.warningFiles > 0) {
                  return "px-8 py-6 border-b-2 bg-amber-50 border-amber-200";
                }
                return "px-8 py-6 border-b-2 bg-emerald-50 border-emerald-200";
              })()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {(() => {
                    if (summary.errorFiles > 0) {
                      return (
                        <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center shadow-sm">
                          <svg
                            className="w-8 h-8 text-rose-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      );
                    }
                    if (summary.warningFiles > 0) {
                      return (
                        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center shadow-sm">
                          <svg
                            className="w-8 h-8 text-amber-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                      );
                    }
                    return (
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-sm">
                        <svg
                          className="w-8 h-8 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    );
                  })()}

                  <div className="flex flex-col justify-center h-16">
                    <h2 className="text-3xl font-bold text-slate-800">
                      {(() => {
                        if (summary.errorFiles > 0) {
                          return t("summary.hasErrors", {
                            errorCount: summary.errorFiles,
                            totalCount: summary.totalFiles,
                          });
                        }
                        if (summary.warningFiles > 0) {
                          return t("summary.hasWarnings", {
                            warningCount: summary.warningFiles,
                            totalCount: summary.totalFiles,
                          });
                        }
                        return t("summary.allValid");
                      })()}
                    </h2>
                    <div className="flex gap-4 mt-2 text-base">
                      {summary.validFiles > 0 && (
                        <span className="text-emerald-600 font-medium">
                          {t("summary.valid", { count: summary.validFiles })}
                        </span>
                      )}
                      {summary.errorFiles > 0 && (
                        <span className="text-rose-600 font-medium">
                          {t("summary.errors", { count: summary.errorFiles })}
                        </span>
                      )}
                      {summary.warningFiles > 0 && (
                        <span className="text-amber-600 font-medium">
                          {t("summary.warnings", { count: summary.warningFiles })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="px-6 py-2.5 bg-white/70 hover:bg-white text-slate-700 rounded-xl font-medium shadow-sm hover:shadow-md transition-all border border-slate-200"
                >
                  {t("actions.newValidation")}
                </button>
              </div>

              {/* Summary badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {summary.hasXsdErrors ? (
                  <span className="px-3 py-1 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full border border-rose-200">
                    {t("badges.xsdError")}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                    {t("badges.xsdValid")}
                  </span>
                )}
                {summary.hasSemanticErrors ? (
                  <span className="px-3 py-1 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full border border-rose-200">
                    {t("badges.semanticError")}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                    {t("badges.semanticValid")}
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-semibold bg-violet-100 text-violet-700 rounded-full border border-violet-200">
                  {t("badges.filesValidated", { count: summary.totalFiles })}
                </span>
              </div>
            </div>

            {/* File list */}
            <div className="p-6">
              {paginatedFiles.length > 0 ? (
                paginatedFiles.map((file, index) => {
                  const isExpanded = expandedFiles.has(file.fileName);
                  return (
                    <div
                      key={file.fileName + index}
                      className={`mb-2 p-3 rounded-lg border transition-all ${getFileStatusClass(file)}`}
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleFileExpanded(file.fileName)}
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-700">{file.fileName}</p>
                            {file.result && file.result.issues.length > 0 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-white/60">
                                {(() => {
                                  const errorCount = file.result.issues.filter(
                                    (i) => i.code.severity === "error",
                                  ).length;
                                  const warningCount = file.result.issues.filter(
                                    (i) => i.code.severity === "warning",
                                  ).length;

                                  if (errorCount > 0 && warningCount > 0) {
                                    return (
                                      <>
                                        <span className="text-rose-600 font-semibold">
                                          {errorCount}
                                        </span>
                                        <span className="text-slate-400 mx-1">·</span>
                                        <span className="text-amber-600 font-semibold">
                                          {warningCount}
                                        </span>
                                      </>
                                    );
                                  }
                                  if (errorCount > 0) {
                                    return (
                                      <span className="text-rose-600 font-semibold">
                                        {errorCount} error{errorCount > 1 ? "s" : ""}
                                      </span>
                                    );
                                  }
                                  if (warningCount > 0) {
                                    return (
                                      <span className="text-amber-600 font-semibold">
                                        {warningCount} warning{warningCount > 1 ? "s" : ""}
                                      </span>
                                    );
                                  }
                                  return null;
                                })()}
                              </span>
                            )}
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && file.result && (
                        <div className="mt-4 pl-8 space-y-3">
                          {/* XSD Validation Section */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              {t("validation.officialXsd")}
                            </h4>
                            {file.result.issues.filter((i) => i.code.domain === "xsd").length ===
                            0 ? (
                              <div className="text-sm text-emerald-600 pl-6 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {t("validation.xsdValid")}
                              </div>
                            ) : (
                              <div className="space-y-1 pl-6">
                                {file.result.issues
                                  .filter((i) => i.code.domain === "xsd")
                                  .map((issue, i) => (
                                    <div key={i} className="text-sm">
                                      <span
                                        className={
                                          issue.code.severity === "error"
                                            ? "text-rose-600"
                                            : "text-amber-600"
                                        }
                                      >
                                        {issue.code.severity === "error" ? "✗" : "⚠"}
                                      </span>
                                      <span className="text-slate-600 ml-2">
                                        {translateValidationIssue(issue, t)}
                                      </span>
                                      {issue.context.location.xpath && (
                                        <div className="text-xs text-slate-400 font-mono ml-6 mt-1">
                                          {issue.context.location.xpath}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          {/* Semantic Rules Section */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              </svg>
                              {t("validation.semanticRules")}
                            </h4>
                            {file.result.issues.filter((i) => i.code.domain === "semantic")
                              .length === 0 ? (
                              <div className="text-sm text-emerald-600 pl-6 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {t("validation.semanticValid")}
                              </div>
                            ) : (
                              <div className="space-y-1 pl-6">
                                {file.result.issues
                                  .filter((i) => i.code.domain === "semantic")
                                  .map((issue, i) => (
                                    <div key={i} className="text-sm">
                                      <span
                                        className={
                                          issue.code.severity === "error"
                                            ? "text-rose-600"
                                            : "text-amber-600"
                                        }
                                      >
                                        {issue.code.severity === "error" ? "✗" : "⚠"}
                                      </span>
                                      <span className="text-slate-600 ml-2">
                                        {translateValidationIssue(issue, t)}
                                      </span>
                                      {issue.context.location.xpath && (
                                        <div className="text-xs text-slate-400 font-mono ml-6 mt-1">
                                          {issue.context.location.xpath}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-slate-400">No files to display</div>
              )}

              {/* Pagination at bottom */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg font-medium text-sm transition-all ${
                            page === currentPage
                              ? "bg-violet-500 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
