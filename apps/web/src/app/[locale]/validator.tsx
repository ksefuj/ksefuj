"use client";

import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";

// Type imports only - no runtime imports
import type { ValidationResult } from "@ksefuj/validator";

interface ValidatorProps {
  locale?: string;
}

export function Validator({ locale }: ValidatorProps) {
  const t = useTranslations("validator");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [validating, setValidating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      setValidating(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const xml = e.target?.result as string;
        try {
          // Dynamic import to avoid SSR issues
          const { validate } = await import("@ksefuj/validator");
          const res = await validate(xml, {
            collectAssertions: true,
          });
          setResult(res);

          // Track validation event with anonymized stats
          track("invoice_validated", {
            valid: res.valid,
            error_count: res.issues.filter((i) => i.code.severity === "error").length,
            warning_count: res.issues.filter((i) => i.code.severity === "warning").length,
            has_xsd_errors: res.issues.some((i) => i.code.domain === "xsd"),
            has_semantic_errors: res.issues.some((i) => i.code.domain === "semantic"),
            locale: locale || "unknown",
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : t("errors.processingError");
          const errorResult: ValidationResult = {
            valid: false,
            issues: [
              {
                code: {
                  domain: "parse" as const,
                  category: "syntax",
                  code: "PARSE_ERROR",
                  severity: "error" as const,
                },
                context: {
                  location: {},
                },
                message: errorMessage,
                fixSuggestions: [],
              },
            ],
            assertions: [],
            metadata: {
              validationTimeMs: 0,
              rulesExecuted: 0,
              elementsValidated: 0,
              schemaVersion: "FA(3) 2025-06-25",
              validatorVersion: "2.0.0",
            },
          };
          setResult(errorResult);

          // Track validation failure
          track("invoice_validation_failed", {
            error_type: "processing_error",
            locale: locale || "unknown",
          });
        } finally {
          setValidating(false);
        }
      };
      reader.readAsText(file);
    },
    [t, locale],
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (validating) {
        return;
      }
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile, validating],
  );

  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (!validating) {
        setDragging(true);
      }
    },
    [validating],
  );

  const onDragLeave = useCallback(() => setDragging(false), []);

  const onClickUpload = useCallback(() => {
    if (!validating) {
      inputRef.current?.click();
    }
  }, [validating]);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (validating) {
        return;
      }
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile, validating],
  );

  const getBorderClass = (dragging: boolean, validating: boolean) => {
    if (dragging && !validating) {
      return "border-emerald-500 bg-emerald-500/5";
    }
    if (validating) {
      return "border-stone-700";
    }
    return "border-stone-700 hover:border-stone-500 hover:bg-stone-900/50";
  };

  const getMainText = useCallback(
    (validating: boolean, dragging: boolean) => {
      if (validating) {
        return t("dropzone.validating");
      }
      if (dragging) {
        return t("dropzone.dropFile");
      }
      return t("dropzone.dragHere");
    },
    [t],
  );

  const reset = useCallback(() => {
    setResult(null);
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClickUpload}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
          ${validating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${getBorderClass(dragging, validating)}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xml"
          onChange={onFileChange}
          className="hidden"
        />
        <div className="space-y-2">
          <p className="text-lg text-stone-300">{getMainText(validating, dragging)}</p>
          <p className="text-sm text-stone-600">
            {validating ? t("dropzone.validatingDetails") : t("dropzone.acceptedFiles")}
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-2xl ${result.valid ? "text-emerald-400" : "text-red-400"}`}>
                {result.valid ? "✅" : "❌"}
              </span>
              <div>
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-stone-500">
                  {result.valid ? t("results.valid") : t("results.invalid")}
                  {result.issues.filter((i) => i.code.severity === "warning").length > 0 &&
                    ` · ${result.issues.filter((i) => i.code.severity === "warning").length} ${t("results.warnings")}`}
                </p>
                {/* Validation badges */}
                <div className="flex gap-2 mt-2">
                  {(() => {
                    const hasXsdErrors = result.issues.some(
                      (i) => i.code.domain === "xsd" && i.code.severity === "error",
                    );
                    const hasSemanticErrors = result.issues.some(
                      (i) => i.code.domain === "semantic" && i.code.severity === "error",
                    );
                    const hasXsdWarnings = result.issues.some(
                      (i) => i.code.domain === "xsd" && i.code.severity === "warning",
                    );
                    const hasSemanticWarnings = result.issues.some(
                      (i) => i.code.domain === "semantic" && i.code.severity === "warning",
                    );

                    let xsdBadgeClass = "";
                    if (hasXsdErrors) {
                      xsdBadgeClass = "bg-red-500/20 text-red-300 border border-red-500/30";
                    } else if (hasXsdWarnings) {
                      xsdBadgeClass = "bg-amber-500/20 text-amber-300 border border-amber-500/30";
                    } else {
                      xsdBadgeClass =
                        "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
                    }

                    let xsdBadgeLabel = "";
                    if (hasXsdErrors) {
                      xsdBadgeLabel = t("badges.xsdError");
                    } else if (hasXsdWarnings) {
                      xsdBadgeLabel = t("badges.xsdWarning");
                    } else {
                      xsdBadgeLabel = t("badges.xsdValid");
                    }

                    let semanticBadgeClass = "";
                    if (hasSemanticErrors) {
                      semanticBadgeClass = "bg-red-500/20 text-red-300 border border-red-500/30";
                    } else if (hasSemanticWarnings) {
                      semanticBadgeClass =
                        "bg-amber-500/20 text-amber-300 border border-amber-500/30";
                    } else {
                      semanticBadgeClass =
                        "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
                    }

                    let semanticBadgeLabel = "";
                    if (hasSemanticErrors) {
                      semanticBadgeLabel = t("badges.semanticError");
                    } else if (hasSemanticWarnings) {
                      semanticBadgeLabel = t("badges.semanticWarning");
                    } else {
                      semanticBadgeLabel = t("badges.semanticValid");
                    }

                    return (
                      <>
                        {/* XSD Schema Badge */}
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${xsdBadgeClass}`}
                        >
                          📋 {xsdBadgeLabel}
                        </span>

                        {/* Semantic Rules Badge */}
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${semanticBadgeClass}`}
                        >
                          🧠 {semanticBadgeLabel}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
            >
              {t("results.clear")}
            </button>
          </div>

          {/* Errors */}
          {result.issues.filter((i) => i.code.severity === "error").length > 0 && (
            <div className="space-y-2">
              {result.issues
                .filter((i) => i.code.severity === "error")
                .map((issue, i) => (
                  <div
                    key={i}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                  >
                    <p className="text-red-300 text-sm">{issue.message}</p>
                    {issue.context.location.xpath && (
                      <p className="text-red-500/60 text-xs mt-1 font-mono">
                        {issue.context.location.xpath}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Warnings */}
          {result.issues.filter((i) => i.code.severity === "warning").length > 0 && (
            <div className="space-y-2">
              {result.issues
                .filter((i) => i.code.severity === "warning")
                .map((issue, i) => (
                  <div
                    key={i}
                    className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3"
                  >
                    <p className="text-amber-300 text-sm">{issue.message}</p>
                    {issue.context.location.xpath && (
                      <p className="text-amber-500/60 text-xs mt-1 font-mono">
                        {issue.context.location.xpath}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
