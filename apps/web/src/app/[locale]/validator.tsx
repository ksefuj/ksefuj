"use client";

import { type ChangeEvent, type DragEvent, useCallback, useMemo, useRef, useState } from "react";
import * as amplitude from "@amplitude/unified";
import { useTranslations } from "next-intl";
import type { ValidationResult } from "@ksefuj/validator";
import { Badge } from "@/components/badge";
import { ValidationIssuesList } from "@/components/validation-issues-list";
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
const CONCURRENCY_LIMIT = 4;

export function Validator({ locale }: ValidatorProps) {
  const t = useTranslations("validator");
  const [files, setFiles] = useState<FileValidationResult[]>([]);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [validating, setValidating] = useState(false);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const processedCountRef = useRef(0);

  // Calculate summary (optimized to avoid heavy computation during validation)
  const summary: ValidationSummary = useMemo(() => {
    // During validation, only provide basic info to avoid O(N²) recalculation
    if (validating) {
      return {
        totalFiles: files.length,
        validFiles: 0,
        errorFiles: 0,
        warningFiles: 0,
        totalErrors: 0,
        totalWarnings: 0,
      };
    }

    // Full calculation only when validation is complete
    const completedFiles = files.filter((f) => f.status === "completed");
    const validFiles = completedFiles.filter(
      (f) => f.result?.valid && !f.result.issues.some((i) => i.code.severity === "error"),
    );
    const errorFiles = files.filter(
      (f) =>
        f.status === "error" ||
        (f.status === "completed" &&
          (!f.result?.valid || f.result.issues.some((i) => i.code.severity === "error"))),
    );
    const warningFiles = completedFiles.filter(
      (f) => f.result?.valid && f.result.issues.some((i) => i.code.severity === "warning"),
    );

    const allIssues = completedFiles.flatMap((f) => f.result?.issues || []);
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
  }, [files, validating]);

  // Track processed count incrementally to avoid filtering on every update
  const processedCount = processedCountRef.current;

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
      amplitude.track("validation_started", {
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
      processedCountRef.current = 0;

      // Process files
      try {
        // Dynamic import to avoid SSR issues
        const { validate } = await import("@ksefuj/validator/validate");

        const results: FileValidationResult[] = Array(xmlFiles.length).fill(undefined);
        let nextIndex = 0;

        const worker = async (): Promise<void> => {
          while (nextIndex < xmlFiles.length) {
            const index = nextIndex++;
            const file = xmlFiles[index];

            // Mark this file as validating
            setFiles((current) =>
              current.map((f, i) => (i === index ? { ...f, status: "validating" as const } : f)),
            );

            let fileResult: FileValidationResult;
            try {
              const content = await file.text();
              const result = await validate(content, { maxIssues: 100 });
              fileResult = { ...newFiles[index], result, status: "completed" as const };
            } catch (error) {
              console.error(`Validation error for ${file.name}:`, error);
              fileResult = {
                ...newFiles[index],
                error: {
                  type: "processing_error" as const,
                  message:
                    error instanceof Error ? error.message : t("fileList.errors.unknownError"),
                },
                status: "error" as const,
              };
            }

            results[index] = fileResult;
            // Update this file's result immediately so the UI reflects progress
            processedCountRef.current++;
            setFiles((current) => current.map((f, i) => (i === index ? fileResult : f)));
          }
        };

        // Run up to CONCURRENCY_LIMIT workers in parallel
        await Promise.all(
          Array.from({ length: Math.min(CONCURRENCY_LIMIT, xmlFiles.length) }, () => worker()),
        );

        // Track validation complete
        const allIssueCodes = [
          ...new Set(results.flatMap((r) => r.result?.issues.map((i) => i.code.code) ?? [])),
        ];
        const issueCount = results.reduce((sum, r) => sum + (r.result?.issues.length ?? 0), 0);
        const warningCount = results.reduce(
          (sum, r) =>
            sum + (r.result?.issues.filter((i) => i.code.severity === "warning").length ?? 0),
          0,
        );
        const errorCount = results.filter((r) => !r.result?.valid || r.status === "error").length;
        amplitude.track("validation_complete", {
          issue_codes: allIssueCodes,
          file_count: xmlFiles.length,
          issue_count: issueCount,
          locale,
        });

        // Increment global validation counter (fire-and-forget)
        fetch("/api/count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileCount: xmlFiles.length, errorCount, warningCount }),
        }).catch(() => {});
      } catch (error) {
        console.error("Failed to initialize validator:", error);
        setFiles(
          newFiles.map((f) => ({
            ...f,
            error: {
              type: "initialization_failed",
              message: t("fileList.errors.failedToInitializeValidator"),
            },
            status: "error",
          })),
        );
      } finally {
        setValidating(false);
      }
    },
    [locale, t],
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
    processedCountRef.current = 0;
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const toggleFileExpanded = (fileName: string) => {
    setExpandedFile(expandedFile === fileName ? null : fileName);
  };

  const getFileStatus = (file: FileValidationResult) => {
    if (file.status === "pending" || file.status === "validating") {
      return "validating";
    }
    if (file.status === "error") {
      return "error";
    }
    if (file.status === "completed") {
      const hasErrors = file.result?.issues.some((i) => i.code.severity === "error");
      const hasWarnings = file.result?.issues.some((i) => i.code.severity === "warning");
      if (hasErrors) {
        return "error";
      }
      if (hasWarnings) {
        return "warning";
      }
      return "success";
    }
    return "validating";
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
              validating && "bg-blue-50 border-blue-200",
              !validating && summary.errorFiles > 0 && "bg-rose-50 border-rose-200",
              !validating &&
                summary.errorFiles === 0 &&
                summary.warningFiles > 0 &&
                "bg-amber-50 border-amber-200",
              !validating &&
                summary.errorFiles === 0 &&
                summary.warningFiles === 0 &&
                files.length > 0 &&
                "bg-emerald-50 border-emerald-200",
              !validating && files.length === 0 && "bg-white border-slate-200",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    validating && "bg-blue-100",
                    !validating && summary.errorFiles > 0 && "bg-rose-100",
                    !validating &&
                      summary.errorFiles === 0 &&
                      summary.warningFiles > 0 &&
                      "bg-amber-100",
                    !validating &&
                      summary.errorFiles === 0 &&
                      summary.warningFiles === 0 &&
                      files.length > 0 &&
                      "bg-emerald-100",
                    !validating && files.length === 0 && "bg-slate-100",
                  )}
                >
                  {(() => {
                    if (validating) {
                      return (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                      );
                    }
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
                    if (files.length > 0) {
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
                    }
                    return null;
                  })()}
                </div>

                {/* Summary Text */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    {(() => {
                      if (validating) {
                        if (processedCount > 0) {
                          return t("summary.validatingProgress", {
                            completed: processedCount,
                            total: summary.totalFiles,
                          });
                        }
                        return t("summary.validating", { count: summary.totalFiles });
                      }
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
                      if (files.length > 0) {
                        return t("summary.allValid");
                      }
                      return t("summary.noFiles");
                    })()}
                  </h2>

                  <div className="flex gap-3 mt-1">
                    {!validating && summary.validFiles > 0 && (
                      <Badge variant="success">
                        {t("summary.valid", { count: summary.validFiles })}
                      </Badge>
                    )}
                    {!validating && summary.errorFiles > 0 && (
                      <Badge variant="error">
                        {t("summary.errors", { count: summary.errorFiles })}
                      </Badge>
                    )}
                    {!validating && summary.warningFiles > 0 && (
                      <Badge variant="warning">
                        {t("summary.warnings", { count: summary.warningFiles })}
                      </Badge>
                    )}
                    {validating && <Badge variant="info">{t("summary.processing")}</Badge>}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button onClick={handleReset} className="btn-ghost" disabled={validating}>
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
                const isExpandable = issueCount > 0 || file.status === "error";

                return (
                  <div key={file.fileName} className="transition-all">
                    <button
                      onClick={() => isExpandable && toggleFileExpanded(file.fileName)}
                      aria-expanded={isExpandable ? isExpanded : undefined}
                      className={cn(
                        "w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors",
                        isExpandable && "cursor-pointer",
                        !isExpandable && "cursor-default",
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
                      {isExpandable && (
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
                      <div className="px-4 pb-4 bg-slate-50/50 border-t border-slate-100">
                        <div className="mt-4">
                          <ValidationIssuesList issues={file.result.issues} maxDisplayed={20} />
                        </div>
                      </div>
                    )}

                    {/* Expanded Error Message */}
                    {isExpanded && file.status === "error" && file.error && (
                      <div className="px-4 pb-4 bg-rose-50/50 border-t border-rose-100">
                        <div className="mt-3 flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-rose-700 mb-0.5">
                              {t("fileList.processingError")}
                            </p>
                            <p className="text-xs text-rose-600 font-mono break-all">
                              {(() => {
                                if (file.error.message === "Unknown error") {
                                  return t("fileList.errors.unknownError");
                                }
                                if (file.error.message === "Failed to initialize validator") {
                                  return t("fileList.errors.failedToInitializeValidator");
                                }
                                return file.error.message;
                              })()}
                            </p>
                          </div>
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
