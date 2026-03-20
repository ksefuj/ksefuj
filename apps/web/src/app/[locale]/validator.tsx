"use client";

import { type ChangeEvent, type DragEvent, useCallback, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";
import type { ValidationResult } from "@ksefuj/validator";
import { translateValidationIssue } from "./validation-utils";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";

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
};

const ITEMS_PER_PAGE = 10;

export function Validator({ locale }: ValidatorProps) {
  const t = useTranslations("validator");
  const [files, setFiles] = useState<FileValidationResult[]>([]);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [validating, setValidating] = useState(false);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate summary
  const summary: ValidationSummary = useMemo(() => {
    const validFiles = files.filter(
      (f) =>
        f.status === "completed" &&
        f.result?.valid &&
        !f.result.issues.some((i) => i.code.severity === "error"),
    );
    const errorFiles = files.filter(
      (f) =>
        f.status === "error" ||
        (f.status === "completed" &&
          (!f.result?.valid || f.result.issues.some((i) => i.code.severity === "error"))),
    );
    const warningFiles = files.filter(
      (f) =>
        f.status === "completed" &&
        f.result?.valid &&
        f.result.issues.some((i) => i.code.severity === "warning"),
    );

    const allIssues = files.flatMap((f) => f.result?.issues || []);
    const errorIssues = allIssues.filter((i) => i.code.severity === "error");
    const warningIssues = allIssues.filter((i) => i.code.severity === "warning");

    return {
      totalFiles: files.length,
      validFiles: validFiles.length,
      errorFiles: errorFiles.length,
      warningFiles: warningFiles.length,
      totalErrors: errorIssues.length,
      totalWarnings: warningIssues.length,
    };
  }, [files]);

  // Pagination
  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return files.slice(start, start + ITEMS_PER_PAGE);
  }, [files, currentPage]);

  // File handling
  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const xmlFiles = Array.from(fileList).filter((file) => file.name.endsWith(".xml"));

      if (xmlFiles.length === 0) {
        return;
      }

      // Track validation started
      track("validation_started", {
        fileCount: xmlFiles.length,
        locale,
      });

      // Initialize file results
      const newFiles: FileValidationResult[] = xmlFiles.map((file) => ({
        fileName: file.name,
        result: null,
        error: null,
        status: "pending" as const,
      }));

      setFiles(newFiles);
      setValidating(true);
      setCurrentPage(1);
      setExpandedFile(null);

      // Process files
      try {
        // Dynamic import to avoid SSR issues
        const { validate } = await import("@ksefuj/validator/validate");

        const results = await Promise.all(
          xmlFiles.map(async (file, index) => {
            try {
              const content = await file.text();
              const result = await validate(content, {
                maxIssues: 100,
              });

              return {
                ...newFiles[index],
                result,
                status: "completed" as const,
              };
            } catch (error) {
              console.error(`Validation error for ${file.name}:`, error);
              return {
                ...newFiles[index],
                error: {
                  type: "processing_error" as const,
                  message: error instanceof Error ? error.message : "Unknown error",
                },
                status: "error" as const,
              };
            }
          }),
        );

        setFiles(results);

        // Track validation completed
        const errorCount = results.filter((r) => !r.result?.valid || r.status === "error").length;
        track("validation_completed", {
          fileCount: xmlFiles.length,
          errorCount,
          locale,
        });
      } catch (error) {
        console.error("Failed to initialize validator:", error);
        setFiles(
          newFiles.map((f) => ({
            ...f,
            error: {
              type: "initialization_failed",
              message: "Failed to initialize validator",
            },
            status: "error",
          })),
        );
      } finally {
        setValidating(false);
      }
    },
    [locale],
  );

  // Drag and drop handlers
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
      handleFiles(e.dataTransfer.files);
    }
  };

  const onClickUpload = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setValidating(false);
    setExpandedFile(null);
    setCurrentPage(1);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const toggleFileExpanded = (fileName: string) => {
    setExpandedFile(expandedFile === fileName ? null : fileName);
  };

  const getFileStatus = (file: FileValidationResult) => {
    if (file.status === "error") {
      return "error";
    }
    if (file.status === "validating") {
      return "validating";
    }
    const hasErrors = file.result?.issues.some((i) => i.code.severity === "error");
    const hasWarnings = file.result?.issues.some((i) => i.code.severity === "warning");
    if (hasErrors) {
      return "error";
    }
    if (hasWarnings) {
      return "warning";
    }
    return "success";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "error":
        return (
          <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "validating":
        return (
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {files.length === 0 ? (
        /* Dropzone */
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
            validating && "opacity-50 cursor-not-allowed",
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
            {/* Icon */}
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

            {/* Call to action */}
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

            {/* Accepted files */}
            <p className="text-sm text-slate-400">{t("dropzone.acceptedFiles")}</p>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="space-y-6">
          {/* Summary Card */}
          <div
            className={cn(
              "rounded-2xl border p-6 transition-all",
              summary.errorFiles > 0 && "bg-rose-50 border-rose-200",
              summary.errorFiles === 0 &&
                summary.warningFiles > 0 &&
                "bg-amber-50 border-amber-200",
              summary.errorFiles === 0 &&
                summary.warningFiles === 0 &&
                "bg-emerald-50 border-emerald-200",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    summary.errorFiles > 0 && "bg-rose-100",
                    summary.errorFiles === 0 && summary.warningFiles > 0 && "bg-amber-100",
                    summary.errorFiles === 0 && summary.warningFiles === 0 && "bg-emerald-100",
                  )}
                >
                  {(() => {
                    if (summary.errorFiles > 0) {
                      return (
                        <svg
                          className="w-6 h-6 text-rose-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      );
                    }
                    if (summary.warningFiles > 0) {
                      return (
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
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
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    );
                  })()}
                </div>

                {/* Summary Text */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
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

                  <div className="flex gap-3 mt-1">
                    {summary.validFiles > 0 && (
                      <Badge variant="success">
                        {t("summary.valid", { count: summary.validFiles })}
                      </Badge>
                    )}
                    {summary.errorFiles > 0 && (
                      <Badge variant="error">
                        {t("summary.errors", { count: summary.errorFiles })}
                      </Badge>
                    )}
                    {summary.warningFiles > 0 && (
                      <Badge variant="warning">
                        {t("summary.warnings", { count: summary.warningFiles })}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button onClick={handleReset} className="btn-ghost">
                {t("actions.newValidation")}
              </button>
            </div>
          </div>

          {/* Minimal File List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {paginatedFiles.map((file) => {
                const status = getFileStatus(file);
                const isExpanded = expandedFile === file.fileName;
                const issueCount = file.result?.issues.length || 0;

                return (
                  <div key={file.fileName} className="transition-all">
                    <button
                      onClick={() => issueCount > 0 && toggleFileExpanded(file.fileName)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors",
                        issueCount > 0 && "cursor-pointer",
                        issueCount === 0 && "cursor-default",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Status Icon */}
                        {getStatusIcon(status)}

                        {/* File Name */}
                        <span className="text-sm font-medium text-slate-900 truncate">
                          {file.fileName}
                        </span>

                        {/* Issue Count */}
                        {issueCount > 0 && (
                          <span className="text-xs text-slate-500">
                            ({t("fileList.issueCount", { count: issueCount })})
                          </span>
                        )}
                      </div>

                      {/* Expand Icon */}
                      {issueCount > 0 && (
                        <svg
                          className={cn(
                            "w-4 h-4 text-slate-400 transition-transform flex-shrink-0",
                            isExpanded && "rotate-180",
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Expanded Issues */}
                    {isExpanded && file.result?.issues && (
                      <div className="px-4 pb-3 bg-slate-50 border-t border-slate-100">
                        <div className="space-y-1 mt-3">
                          {file.result.issues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-2 py-1">
                              {issue.code.severity === "error" ? (
                                <svg
                                  className="w-3.5 h-3.5 mt-0.5 text-rose-500 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                              <p className="text-xs text-slate-700">
                                {translateValidationIssue(issue, t)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {t("pagination.showing", {
                    start: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                    end: Math.min(currentPage * ITEMS_PER_PAGE, files.length),
                    total: files.length,
                  })}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                      currentPage === 1
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-white hover:shadow-sm",
                    )}
                  >
                    {t("pagination.previous")}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                        currentPage === page
                          ? "bg-violet-600 text-white"
                          : "text-slate-700 hover:bg-white hover:shadow-sm",
                      )}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                      currentPage === totalPages
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-white hover:shadow-sm",
                    )}
                  >
                    {t("pagination.next")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
