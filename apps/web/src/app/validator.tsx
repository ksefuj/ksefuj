"use client";

import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from "react";
import { track } from "@vercel/analytics";

// Type imports only - no runtime imports
import type { ValidationResult } from "@ksefuj/validator";

export function Validator() {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [validating, setValidating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setValidating(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const xml = e.target?.result as string;
      try {
        // Dynamic import to avoid SSR issues
        const { validate } = await import("@ksefuj/validator");
        const res = await validate(xml);
        setResult(res);

        // Track validation event with anonymized stats
        track("invoice_validated", {
          valid: res.valid,
          error_count: res.errors.length,
          warning_count: res.warnings.length,
          has_xsd_errors: res.errors.some((e) => e.source === "xsd"),
          has_semantic_errors: res.errors.some((e) => e.source === "semantic"),
        });
      } catch {
        const errorResult: ValidationResult = {
          valid: false,
          errors: [
            {
              level: "error" as const,
              source: "xsd" as const,
              message: "Błąd podczas walidacji pliku",
            },
          ],
          warnings: [],
        };
        setResult(errorResult);

        // Track validation failure
        track("invoice_validation_failed", {
          error_type: "processing_error",
        });
      } finally {
        setValidating(false);
      }
    };
    reader.readAsText(file);
  }, []);

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

  const getMainText = (validating: boolean, dragging: boolean) => {
    if (validating) {
      return "Walidacja...";
    }
    if (dragging) {
      return "Upuść plik XML";
    }
    return "Przeciągnij plik XML lub kliknij";
  };

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
            {validating
              ? "Sprawdzanie XSD i reguł semantycznych..."
              : "Akceptowane: .xml (faktura KSeF FA3)"}
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
                  {result.valid ? "Faktura prawidłowa" : "Znaleziono błędy"}
                  {result.warnings.length > 0 && ` · ${result.warnings.length} ostrzeżeń`}
                </p>
                {/* Validation badges */}
                <div className="flex gap-2 mt-2">
                  {(() => {
                    const hasXsdErrors = result.errors.some((e) => e.source === "xsd");
                    const hasSemanticErrors = result.errors.some((e) => e.source === "semantic");
                    const hasXsdWarnings = result.warnings.some((w) => w.source === "xsd");
                    const hasSemanticWarnings = result.warnings.some(
                      (w) => w.source === "semantic",
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
                      xsdBadgeLabel = "Błąd XSD";
                    } else if (hasXsdWarnings) {
                      xsdBadgeLabel = "Ostrzeżenie XSD";
                    } else {
                      xsdBadgeLabel = "XSD ✓";
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
                      semanticBadgeLabel = "Błąd biznesowy";
                    } else if (hasSemanticWarnings) {
                      semanticBadgeLabel = "Ostrzeżenie biznesowe";
                    } else {
                      semanticBadgeLabel = "Reguły ✓";
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
              Wyczyść
            </button>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="space-y-2">
              {result.errors.map((err, i) => (
                <div
                  key={i}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                >
                  <p className="text-red-300 text-sm">{err.message}</p>
                  {err.path && <p className="text-red-500/60 text-xs mt-1 font-mono">{err.path}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="space-y-2">
              {result.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3"
                >
                  <p className="text-amber-300 text-sm">{warn.message}</p>
                  {warn.path && (
                    <p className="text-amber-500/60 text-xs mt-1 font-mono">{warn.path}</p>
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
