import { useState } from "react";
import type { ValidationIssue } from "@ksefuj/validator";
import { useTranslations } from "next-intl";
import { Badge } from "./badge";
import { MarkdownText } from "@/lib/markdown";
import { translateValidationIssue } from "@/app/[locale]/validation-utils";
import { cn } from "@/lib/utils";

interface ValidationIssueProps {
  issue: ValidationIssue;
}

// Utility function to extract and format enumeration errors
export function parseEnumerationError(message: string) {
  // Match XSD enumeration error pattern - look for the LAST occurrence to get the complete set
  const enumerationMatches = [
    ...message.matchAll(/The value '([^']+)' is not an element of the set \{([^}]+)\}/g),
  ];

  if (enumerationMatches.length === 0) {
    return null;
  }

  // Take the last match which should have the complete set
  const lastMatch = enumerationMatches[enumerationMatches.length - 1];
  const [, actualValue, allowedValuesStr] = lastMatch;

  const allowedValues = allowedValuesStr
    .split(", ")
    .map((v) => v.replace(/'/g, ""))
    .filter((v) => v.length > 0);

  return {
    actualValue,
    allowedValues,
    isLargeSet: allowedValues.length > 10,
  };
}

// Utility function to clean and simplify error messages
export function simplifyErrorMessage(
  message: string,
  t: (key: string, params?: Record<string, string | number | Date>) => string,
): string {
  // First, clean up namespace references globally (including the full namespace URL)
  const cleaned = message
    .replace(/\{http:\/\/crd\.gov\.pl\/wzor\/[^}]+\}/g, "") // Remove full namespace
    .replace(/\{[^}]+\}/g, ""); // Remove any other namespaces

  // Handle multiple XSD errors in one message by splitting them
  const errorSentences = cleaned.split(/\.(?=\s*[A-Z_'"[])/).filter((s) => s.trim());

  if (errorSentences.length > 1) {
    // Process each error separately and combine them
    const processedErrors = errorSentences.map((sentence) =>
      simplifyErrorMessage(`${sentence.trim()}.`, t),
    );
    return processedErrors.filter(Boolean).join(". ");
  }

  // Extract the element name more reliably
  const elementMatch = cleaned.match(/Element '([^']+)'/);
  const elementName = elementMatch ? elementMatch[1] : null;

  // Handle "No matching global declaration" errors
  if (cleaned.includes("No matching global declaration")) {
    return t("errors.invalidRootElement", {
      field: elementName ? `\`${elementName}\`` : "XML",
    });
  }

  // Handle "This element is not expected" errors
  if (cleaned.includes("This element is not expected")) {
    return t("errors.unexpectedElement", {
      element: elementName ? `\`${elementName}\`` : t("errors.thisElement"),
    });
  }

  // Handle "Expected is" errors (missing required elements)
  const expectedMatch = cleaned.match(/Expected is (?:one of )?\(([^)]+)\)/i);
  if (expectedMatch) {
    const expectedElements = expectedMatch[1]
      .split(",")
      .map((e) => {
        // Remove namespace and quotes from each element
        return e
          .trim()
          .replace(/\{[^}]+\}/g, "") // Remove namespace
          .replace(/'/g, "") // Remove quotes
          .trim();
      })
      .filter(Boolean)
      .map((e) => `\`${e}\``);

    if (expectedElements.length === 1) {
      return t("errors.expectedElement", { element: expectedElements[0] });
    } else {
      return t("errors.expectedOneOf", { elements: expectedElements.join(", ") });
    }
  }

  // Handle facet errors (pattern, enumeration, length, etc.)
  const facetMatch = cleaned.match(/\[facet '([^']+)'\]/);
  if (facetMatch) {
    const facetType = facetMatch[1];

    // Handle enumeration errors
    if (facetType === "enumeration") {
      const valueMatch = cleaned.match(/The value '([^']+)'/);
      if (valueMatch && elementName) {
        return t("errors.invalidEnumValue", {
          field: `\`${elementName}\``,
          value: `\`${valueMatch[1]}\``,
        });
      }
    }

    // Handle pattern errors
    if (facetType === "pattern") {
      const valueMatch = cleaned.match(/The value '([^']+)'/);
      if (valueMatch && elementName) {
        return t("errors.invalidPattern", {
          field: `\`${elementName}\``,
          value: `\`${valueMatch[1]}\``,
        });
      }
    }

    // Handle length constraints
    if (facetType === "minLength" || facetType === "maxLength") {
      const lengthMatch = cleaned.match(/has a length of '(\d+)'.* allowed .* '(\d+)'/);
      if (lengthMatch && elementName) {
        const [, actual, limit] = lengthMatch;
        return t(`errors.${facetType}`, {
          field: `\`${elementName}\``,
          actual,
          limit,
        });
      }
    }

    // Handle decimal precision
    if (facetType === "fractionDigits") {
      const digitsMatch = cleaned.match(/has more fractional digits than are allowed \('(\d+)'\)/);
      if (digitsMatch && elementName) {
        return t("errors.tooManyDecimals", {
          field: `\`${elementName}\``,
          max: digitsMatch[1],
        });
      }
    }
  }

  // Handle atomic type validation errors
  const atomicMatch = cleaned.match(/Element '([^']+)'.*'([^']+)'.*is not a valid value/);
  if (atomicMatch) {
    const [, field, value] = atomicMatch;

    // Check if it's a date field
    if (cleaned.includes("TDataT") || field.includes("Data") || field.includes("Date")) {
      return t("errors.invalidDate", {
        field: `\`${field}\``,
        value: `\`${value}\``,
      });
    }

    return t("errors.invalidValue", {
      field: `\`${field}\``,
      value: `\`${value}\``,
    });
  }

  // Handle other common XSD error patterns - removed as they're now handled above

  // If we couldn't parse the message, return a generic error with the element name if available
  if (elementName) {
    return t("errors.validationError", { field: `\`${elementName}\`` });
  }

  // Last resort - clean up and return the original message, ensuring no namespace remnants
  return cleaned
    .replace(/Element '([^']+)':\s*/g, "$1: ")
    .replace(/\{http:\/\/[^}]+\}/g, "") // One more namespace cleanup just in case
    .replace(/\s+/g, " ")
    .trim();
}

export function ValidationIssueComponent({ issue }: ValidationIssueProps) {
  const t = useTranslations("validator");
  const [expanded, setExpanded] = useState(false);

  // Parse enumeration error if applicable
  const enumerationError = parseEnumerationError(issue.message);

  // Function to translate expected values
  const translateExpectedValue = (value: string): string => {
    // First, clean up any namespace references
    const cleanedValue = value
      .replace(/\{http:\/\/crd\.gov\.pl\/wzor\/[^}]+\}/g, "") // Remove KSeF namespace
      .replace(/\{[^}]+\}/g, "") // Remove any other namespaces
      .trim();

    // Match "Max X decimal places" pattern
    const decimalPlacesMatch = cleanedValue.match(/^Max (\d+) decimal places?$/);
    if (decimalPlacesMatch) {
      const count = parseInt(decimalPlacesMatch[1], 10);
      return t("expectedValues.maxDecimalPlaces", { count });
    }

    // Return cleaned value if no translation pattern matches
    return cleanedValue;
  };

  // Use appropriate translation method based on error domain
  const displayMessage =
    issue.code.domain === "xsd"
      ? simplifyErrorMessage(issue.message, t) // For XSD/enumeration errors
      : translateValidationIssue(issue, t); // For semantic/parse/infrastructure errors

  const severityConfig = {
    error: {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      iconColor: "text-rose-600",
      badgeVariant: "error" as const,
    },
    warning: {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      badgeVariant: "warning" as const,
    },
    info: {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      badgeVariant: "info" as const,
    },
  };

  const config = severityConfig[issue.code.severity];

  const getDomainLabel = (domain: string) => {
    switch (domain) {
      case "parse":
        return t("domain.parse");
      case "xsd":
        return t("domain.xsd");
      case "semantic":
        return t("domain.semantic");
      case "infrastructure":
        return t("domain.infrastructure");
      default:
        return domain.toUpperCase();
    }
  };

  const hasDetailedContext = Boolean(
    issue.context.location.xpath ||
    issue.context.location.lineNumber ||
    issue.context.actualValue ||
    (issue.context.expectedValues && issue.context.expectedValues.length > 0) ||
    enumerationError,
  );

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all duration-200",
        config.bgColor,
        config.borderColor,
        hasDetailedContext && "hover:shadow-sm",
      )}
    >
      <div className="flex items-start gap-2">
        {/* Severity Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>{config.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with domain badge and optional element */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="neutral"
                className={cn(
                  "text-xs px-2 py-0.5 font-medium",
                  // Add subtle color variations using custom classes that work with any background
                  issue.code.domain === "xsd" && "bg-blue-100 text-blue-700 border-blue-200",
                  issue.code.domain === "semantic" &&
                    "bg-indigo-100 text-indigo-700 border-indigo-200",
                  issue.code.domain === "infrastructure" &&
                    "bg-purple-100 text-purple-700 border-purple-200",
                )}
              >
                {getDomainLabel(issue.code.domain)}
              </Badge>
              {issue.context.location.element && (
                <Badge variant="neutral" className="text-xs px-2 py-0.5">
                  <span className="font-mono">{issue.context.location.element}</span>
                </Badge>
              )}
            </div>

            {hasDetailedContext && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  "flex-shrink-0 p-1 rounded-md transition-colors",
                  "text-slate-400 hover:text-slate-600 hover:bg-white/50",
                )}
              >
                <svg
                  className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")}
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
              </button>
            )}
          </div>

          {/* Main Message */}
          <p className="text-sm text-slate-700 leading-snug">
            <MarkdownText>{displayMessage}</MarkdownText>
          </p>

          {/* Quick Context Summary - more compact */}
          {(issue.context.actualValue ||
            (issue.context.expectedValues && issue.context.expectedValues.length > 0) ||
            enumerationError) &&
            !expanded && (
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                {/* Show enumeration error context if available */}
                {enumerationError && (
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="bg-white/60 px-1 py-0.5 rounded text-xs">
                      {enumerationError.actualValue}
                    </code>
                    <span className="text-slate-400">
                      {enumerationError.isLargeSet
                        ? `(${enumerationError.allowedValues.length} ${t("details.options")})`
                        : `${t("details.among")} ${enumerationError.allowedValues.length}`}
                    </span>
                  </div>
                )}

                {/* Standard context if no enumeration error */}
                {!enumerationError && (
                  <div className="flex flex-wrap items-center gap-2">
                    {issue.context.actualValue && (
                      <code className="bg-white/60 px-1 py-0.5 rounded text-xs">
                        {String(issue.context.actualValue)}
                      </code>
                    )}
                    {issue.context.expectedValues && issue.context.expectedValues.length > 0 && (
                      <>
                        {issue.context.actualValue && <span className="text-slate-400">→</span>}
                        <span className="text-slate-500 text-xs">{t("details.expected")}</span>
                        <code className="bg-white/60 px-1 py-0.5 rounded text-xs">
                          {issue.context.expectedValues
                            .slice(0, 2)
                            .map(translateExpectedValue)
                            .join(", ")}
                          {issue.context.expectedValues.length > 2 && " ..."}
                        </code>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

          {/* Expanded Details */}
          {expanded && hasDetailedContext && (
            <div className="mt-2 pt-2 border-t border-white/30 space-y-2">
              {/* Location Details */}
              {(issue.context.location.xpath || issue.context.location.lineNumber) && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    {t("details.location")}
                  </h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    {issue.context.location.xpath && (
                      <div>
                        <span className="font-medium">{t("details.xpath")}</span>{" "}
                        <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                          {issue.context.location.xpath}
                        </code>
                      </div>
                    )}
                    {issue.context.location.lineNumber && (
                      <div>
                        <span className="font-medium">{t("details.line")}</span>{" "}
                        {issue.context.location.lineNumber}
                        {issue.context.location.columnNumber &&
                          `${t("details.column")} ${issue.context.location.columnNumber}`}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Value Context */}
              {(issue.context.actualValue ||
                (issue.context.expectedValues && issue.context.expectedValues.length > 0) ||
                enumerationError) && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    {t("details.valueDetails")}
                  </h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    {/* Show enumeration values if available */}
                    {enumerationError ? (
                      <>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{t("details.actualValue")}</span>
                          <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                            {enumerationError.actualValue}
                          </code>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{t("details.allowedOptions")}</span>
                            <span className="text-slate-500">
                              ({enumerationError.allowedValues.length})
                            </span>
                          </div>
                          <div className="max-h-32 overflow-y-auto">
                            <div className="flex flex-wrap gap-1">
                              {enumerationError.allowedValues.map((value, i) => (
                                <code
                                  key={i}
                                  className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs"
                                >
                                  {value}
                                </code>
                              ))}
                            </div>
                          </div>
                          {enumerationError.actualValue === "POL" && (
                            <div className="mt-2 p-2 bg-blue-50/80 rounded text-xs">
                              <span className="font-medium text-blue-700">
                                💡 {t("details.hint")}
                              </span>{" "}
                              <span className="text-blue-600">{t("details.useCountryCode")}</span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Standard value context */
                      <>
                        {issue.context.actualValue && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{t("details.actualValue")}</span>
                            <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                              {String(issue.context.actualValue)}
                            </code>
                          </div>
                        )}
                        {issue.context.expectedValues &&
                          issue.context.expectedValues.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium">{t("details.expectedValues")}</span>
                              {issue.context.expectedValues.map((value, i) => (
                                <code
                                  key={i}
                                  className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs"
                                >
                                  {translateExpectedValue(value)}
                                </code>
                              ))}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export with original name for compatibility
export { ValidationIssueComponent as ValidationIssue };
