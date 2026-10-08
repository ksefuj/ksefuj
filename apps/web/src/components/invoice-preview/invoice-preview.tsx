"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { useTranslations } from "next-intl";
import type * as PdfTypes from "@ksefuj/pdf";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import { extractInvoiceMeta } from "@/lib/invoice-preview/invoice-meta";
import { INLINE_PREVIEW_QUERY, supportsInlinePreview } from "@/lib/invoice-preview/inline-preview";
import {
  effectiveKsefNumber,
  initialKsefInputState,
  ksefInputReducer,
  ksefInputStatus,
  type KsefMismatch,
  ksefNumberNip,
} from "@/lib/invoice-preview/ksef-input";
import { analyticsInvoiceType } from "@/lib/invoice-preview/analytics";
import { pdfFileNameFromInvoiceNumber } from "@/lib/invoice-preview/pdf-filename";
import { saveBlob } from "@/lib/invoice-preview/save-blob";

// The PDF engine is ~630 kB gzipped. It is only ever loaded through this dynamic import, on a user
// action, so none of it lands in a route's first-load JavaScript.
type PdfModule = typeof PdfTypes;
type RenderResult = PdfTypes.RenderResult;
const loadPdf = (): Promise<PdfModule> => import("@ksefuj/pdf");

export type InvoicePreviewSource = "validator" | "podglad";

interface InvoicePreviewProps {
  /** Shown in aria labels only. Never sent anywhere. */
  fileName: string;
  /** Returns the exact original bytes of the file (KOD I hashes them, never re-serialise). */
  getBytes: () => Promise<Uint8Array>;
  locale: string;
  source: InvoicePreviewSource;
  /** Validation issues in the file; a note is shown when above zero. */
  issueCount?: number;
  /** Open the preview panel right away (the /podglad page). */
  autoOpen?: boolean;
  size?: "sm" | "md";
}

type Phase = "idle" | "rendering" | "ready";
type ErrorKind = "notXml" | "notFa3" | "renderFailed";

interface Rendered {
  url: string;
  hasQr: boolean;
}

interface Produced {
  result: RenderResult;
  fileName: string;
}

type Outcome =
  | ({ ok: true } & Produced)
  | { ok: false; error?: ErrorKind; mismatch?: KsefMismatch; missingData?: boolean };

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2";

function subscribeToInlineQuery(onChange: () => void): () => void {
  const query = window.matchMedia(INLINE_PREVIEW_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useInlinePreviewSupport(): boolean {
  return useSyncExternalStore(
    subscribeToInlineQuery,
    () => supportsInlinePreview(window.matchMedia.bind(window)),
    () => false,
  );
}

/**
 * "Podgląd" and "Pobierz PDF" for one FA(3) invoice, shared by the validator results and the
 * /podglad page. The PDF is rendered in the browser on demand; nothing is uploaded.
 */
export function InvoicePreview({
  fileName,
  getBytes,
  locale,
  source,
  issueCount = 0,
  autoOpen = false,
  size = "sm",
}: InvoicePreviewProps) {
  const t = useTranslations("invoicePreview");
  const ids = useId();
  const panelId = `${ids}-panel`;
  const inputId = `${ids}-ksef`;
  const hintId = `${ids}-ksef-hint`;
  const errorId = `${ids}-ksef-error`;
  const tooltipId = `${ids}-watermark`;

  const inlineSupported = useInlinePreviewSupport();
  const [open, setOpen] = useState(autoOpen);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rendered, setRendered] = useState<Rendered | null>(null);
  const [error, setError] = useState<ErrorKind | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [pdf, setPdf] = useState<PdfModule | null>(null);
  const [ksef, dispatchKsef] = useReducer(ksefInputReducer, initialKsefInputState);

  const panelRef = useRef<HTMLElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  // Latest props for the stable callbacks below
  const latest = useRef({ getBytes, locale, source });
  // Bumped on every render request and on close/unmount; stale results are dropped
  const seqRef = useRef(0);
  // Number the visible preview was requested with (null: nothing requested yet)
  const requestedRef = useRef<string | undefined | null>(null);
  const urlRef = useRef<string | null>(null);
  // Last rendered PDF, so a download right after the preview needs no second render
  const lastRef = useRef<{ result: RenderResult; fileName: string; ksefNumber?: string } | null>(
    null,
  );
  const openedTrackedRef = useRef(false);
  // Focus moves into the panel only when the user opened it, not for autoOpen on page load
  const userOpenedRef = useRef(false);

  useEffect(() => {
    latest.current = { getBytes, locale, source };
  });

  // Until the module is loaded a typed number is neither valid nor invalid: it stays "typing"
  // and is evaluated as soon as the module arrives (loaded on panel open and on input focus).
  const isValid = pdf ? pdf.isValidKsefNumber : () => false;
  const typedEarly = pdf === null && ksef.raw.trim() !== "";
  const status = typedEarly ? "typing" : ksefInputStatus(ksef, isValid);
  const effectiveNumber = typedEarly ? undefined : effectiveKsefNumber(ksef, isValid);

  const invalidate = useCallback(() => {
    seqRef.current++;
  }, []);

  const setUrl = useCallback((next: string | null) => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
    }
    urlRef.current = next;
  }, []);

  const produce = useCallback(async (ksefNumber?: string): Promise<Outcome> => {
    let mod: PdfModule | null = null;
    let bytes: Uint8Array | null = null;
    try {
      [bytes, mod] = await Promise.all([latest.current.getBytes(), loadPdf()]);
      setPdf(mod);
      const result = await mod.renderInvoicePdf(bytes, ksefNumber ? { ksefNumber } : undefined);
      return {
        ok: true,
        result,
        fileName: pdfFileNameFromInvoiceNumber(extractInvoiceMeta(bytes).invoiceNumber),
      };
    } catch (e) {
      if (mod && e instanceof mod.KsefNumberMismatchError && ksefNumber && bytes) {
        return {
          ok: false,
          mismatch: {
            number: ksefNumber,
            ksefNip: ksefNumberNip(ksefNumber),
            sellerNip: extractInvoiceMeta(bytes).sellerNip,
          },
        };
      }
      if (mod && e instanceof mod.UnsupportedInvoiceError) {
        if (e.reason === "missing-data" && ksefNumber) {
          return { ok: false, missingData: true };
        }
        return { ok: false, error: e.reason === "not-xml" ? "notXml" : "notFa3" };
      }
      return { ok: false, error: "renderFailed" };
    }
  }, []);

  const track = useCallback((event: string, invoiceType: string, hasKsefNumber: boolean) => {
    amplitude.track(event, {
      locale: latest.current.locale,
      // Only allowlisted values: the raw RodzajFaktury comes from the file
      invoiceType: analyticsInvoiceType(invoiceType),
      source: latest.current.source,
      hasKsefNumber,
    });
  }, []);

  const runPreview = useCallback(
    async (ksefNumber: string | undefined) => {
      const seq = ++seqRef.current;
      requestedRef.current = ksefNumber;
      setPhase("rendering");
      setError(null);
      const outcome = await produce(ksefNumber);
      if (seq !== seqRef.current) {
        return;
      }
      if (outcome.ok) {
        setUrl(URL.createObjectURL(outcome.result.blob));
        lastRef.current = { ...outcome, ksefNumber };
        setRendered({ url: urlRef.current as string, hasQr: outcome.result.hasQr });
        setPhase("ready");
        if (ksefNumber && outcome.result.ksefNumberIgnored) {
          // Client validation should make this impossible; show the format error if it happens
          dispatchKsef({ type: "ignored", number: ksefNumber });
        }
        if (!openedTrackedRef.current) {
          openedTrackedRef.current = true;
          track("invoice_preview_opened", outcome.result.invoiceType, Boolean(ksefNumber));
        }
      } else if (outcome.mismatch) {
        // The effective number becomes undefined, which re-renders the plain visualisation
        dispatchKsef({ type: "mismatch", mismatch: outcome.mismatch });
      } else if (outcome.missingData && ksefNumber) {
        // Same: re-renders without the number, the message explains why there is no QR code
        dispatchKsef({ type: "missingData", number: ksefNumber });
      } else {
        setUrl(null);
        lastRef.current = null;
        setRendered(null);
        setPhase("idle");
        setError(outcome.error ?? "renderFailed");
      }
    },
    [produce, setUrl, track],
  );

  // Render when the panel opens and again when a valid number is entered or cleared
  useEffect(() => {
    if (!open) {
      return;
    }
    if (requestedRef.current !== null && requestedRef.current === effectiveNumber) {
      return;
    }
    void runPreview(effectiveNumber);
  }, [open, effectiveNumber, runPreview]);

  // Move focus into the panel when it opens
  useEffect(() => {
    if (open && userOpenedRef.current) {
      panelRef.current?.focus();
    }
  }, [open]);

  // Load the module early so a number typed right away can be validated
  useEffect(() => {
    if (open) {
      void loadPdf().then(setPdf);
    }
  }, [open]);

  // Invalidate in-flight renders and release the blob URL on unmount
  useEffect(() => {
    return () => {
      invalidate();
      // A remount (React strict mode) must start a fresh render
      requestedRef.current = null;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, [invalidate]);

  const close = () => {
    invalidate();
    setUrl(null);
    lastRef.current = null;
    requestedRef.current = null;
    openedTrackedRef.current = false;
    setRendered(null);
    setPhase("idle");
    setError(null);
    userOpenedRef.current = false;
    setOpen(false);
    previewButtonRef.current?.focus();
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const reusable = lastRef.current;
      let produced: Produced | null = null;
      if (reusable && reusable.ksefNumber === effectiveNumber) {
        produced = reusable;
      } else {
        const outcome = await produce(effectiveNumber);
        if (outcome.ok) {
          produced = outcome;
        } else if (outcome.mismatch) {
          // Show the message next to the field
          dispatchKsef({ type: "mismatch", mismatch: outcome.mismatch });
          userOpenedRef.current = true;
          setOpen(true);
          return;
        } else if (outcome.missingData && effectiveNumber) {
          dispatchKsef({ type: "missingData", number: effectiveNumber });
          userOpenedRef.current = true;
          setOpen(true);
          return;
        } else {
          setError(outcome.error ?? "renderFailed");
          return;
        }
      }
      saveBlob(produced.result.blob, produced.fileName);
      track("invoice_pdf_downloaded", produced.result.invoiceType, produced.result.hasQr);
    } finally {
      setDownloading(false);
    }
  };

  const onPanelKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatchKsef({ type: "submit" });
  };

  let ksefError: string | null = null;
  if (status === "invalid") {
    ksefError = t("ksefNumber.errors.format");
  } else if (status === "mismatch" && ksef.mismatch) {
    ksefError = t("ksefNumber.errors.nipMismatch", {
      ksefNip: ksef.mismatch.ksefNip,
      sellerNip: ksef.mismatch.sellerNip ?? "—",
    });
  } else if (status === "missingData") {
    ksefError = t("ksefNumber.errors.missingData");
  }

  const buttonSize = size === "sm" ? "!px-4 !py-2 text-sm" : "";
  const previewLabel = t("actions.previewAria", { fileName });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          ref={previewButtonRef}
          type="button"
          className={cn("btn-secondary", buttonSize)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={previewLabel}
          onClick={() => {
            if (open) {
              close();
            } else {
              userOpenedRef.current = true;
              setOpen(true);
            }
          }}
        >
          {t("actions.preview")}
        </button>
        <button
          type="button"
          className={cn("btn-primary disabled:opacity-60 disabled:cursor-wait", buttonSize)}
          aria-label={t("actions.downloadAria", { fileName })}
          disabled={downloading}
          onClick={() => void handleDownload()}
        >
          {downloading ? t("actions.preparing") : t("actions.download")}
        </button>
      </div>

      {issueCount > 0 && (
        <p className="text-sm text-amber-700">{t("withErrorsNote", { count: issueCount })}</p>
      )}

      {error && (
        <p role="alert" className="text-sm text-rose-700">
          {t(`errors.${error}`)}
        </p>
      )}

      {open && (
        <section
          id={panelId}
          ref={panelRef}
          tabIndex={-1}
          aria-label={previewLabel}
          onKeyDown={onPanelKeyDown}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30 md:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-h-[1.75rem]">
              {rendered && !rendered.hasQr && (
                <span className="group relative inline-flex">
                  <button
                    type="button"
                    aria-describedby={tooltipId}
                    className="cursor-help rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30"
                  >
                    <Badge variant="neutral">{t("watermarkBadge")}</Badge>
                  </button>
                  <span
                    id={tooltipId}
                    role="tooltip"
                    className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-72 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-relaxed text-slate-600 shadow-md group-focus-within:block group-hover:block"
                  >
                    {t("watermarkTooltip")}
                  </span>
                </span>
              )}
            </div>
            <button type="button" className="btn-ghost text-sm" onClick={close}>
              {t("actions.close")}
            </button>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-2">
            <label htmlFor={inputId} className="block text-sm font-semibold text-slate-900">
              {t("ksefNumber.label")}
            </label>
            <p id={hintId} className="text-sm text-slate-500">
              {t("ksefNumber.hint")}
            </p>
            <input
              id={inputId}
              type="text"
              value={ksef.raw}
              placeholder={t("ksefNumber.placeholder")}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={ksefError !== null}
              aria-describedby={ksefError ? `${hintId} ${errorId}` : hintId}
              onChange={(e) => dispatchKsef({ type: "change", raw: e.target.value })}
              onFocus={() => void loadPdf().then(setPdf)}
              onBlur={() => dispatchKsef({ type: "blur" })}
              className={cn(
                inputClass,
                ksefError
                  ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                  : "border-slate-200 focus:border-violet-400 focus:ring-violet-100",
              )}
            />
            {ksefError && (
              <p id={errorId} role="alert" className="text-sm text-rose-700">
                {ksefError}
              </p>
            )}
          </form>

          <div role="status" aria-live="polite">
            {phase === "rendering" && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div
                  aria-hidden
                  className="h-5 w-5 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"
                />
                {t("actions.preparing")}
              </div>
            )}
          </div>

          {rendered &&
            (inlineSupported ? (
              <iframe
                src={rendered.url}
                title={previewLabel}
                className={cn(
                  "h-[70vh] w-full rounded-xl border border-slate-200 bg-slate-50 transition-opacity",
                  phase === "rendering" && "opacity-50",
                )}
              />
            ) : (
              <p className="text-sm text-slate-600">{t("mobileHint")}</p>
            ))}

          <div className="space-y-1 text-sm text-slate-500">
            <p>{t("disclaimer")}</p>
            {t.has("pdfLanguageNote") && <p>{t("pdfLanguageNote")}</p>}
          </div>
        </section>
      )}
    </div>
  );
}
