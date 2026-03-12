"use client";

import { useCallback, useState, useRef } from "react";
import { validate, type ValidationResult } from "@ksefuj/validator";

export function Validator() {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const xml = e.target?.result as string;
      const res = validate(xml);
      setResult(res);
    };
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  const onClickUpload = useCallback(() => inputRef.current?.click(), []);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const reset = useCallback(() => {
    setResult(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
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
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${
            dragging
              ? "border-emerald-500 bg-emerald-500/5"
              : "border-stone-700 hover:border-stone-500 hover:bg-stone-900/50"
          }
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
          <p className="text-lg text-stone-300">
            {dragging ? "Upuść plik XML" : "Przeciągnij plik XML lub kliknij"}
          </p>
          <p className="text-sm text-stone-600">
            Akceptowane: .xml (faktura KSeF FA3)
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-2xl ${result.valid ? "text-emerald-400" : "text-red-400"}`}
              >
                {result.valid ? "✅" : "❌"}
              </span>
              <div>
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-stone-500">
                  {result.valid ? "Faktura prawidłowa" : "Znaleziono błędy"}
                  {result.warnings.length > 0 &&
                    ` · ${result.warnings.length} ostrzeżeń`}
                </p>
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
                  {err.path && (
                    <p className="text-red-500/60 text-xs mt-1 font-mono">
                      {err.path}
                    </p>
                  )}
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
                    <p className="text-amber-500/60 text-xs mt-1 font-mono">
                      {warn.path}
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
