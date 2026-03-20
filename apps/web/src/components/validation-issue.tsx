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
function parseEnumerationError(message: string) {
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
function simplifyErrorMessage(
  message: string,
  t: (key: string, params?: Record<string, string | number | Date>) => string,
): string {
  // Handle multiple XSD errors in one message by splitting them
  const errorSentences = message.split(/\.(?=\s*[A-Z_])/).filter((s) => s.trim());

  if (errorSentences.length > 1) {
    // Process each error separately and combine them
    const processedErrors = errorSentences.map((sentence) =>
      simplifyErrorMessage(`${sentence.trim()}.`, t),
    );
    return processedErrors.join(" ");
  }

  // Extract enumeration errors first
  const invalidValues = [
    ...message.matchAll(/The value '([^']+)' is not an element of the set/g),
  ].map((match) => match[1]);

  // Handle "No matching global declaration" errors
  const globalDeclarationMatch = message.match(
    /([A-Za-z_]+):\s*No matching global declaration available for the validation root/,
  );
  if (globalDeclarationMatch) {
    const [, fieldName] = globalDeclarationMatch;
    return t("errors.invalidRootElement", {
      field: `\`${fieldName}\``,
    });
  }

  // Handle date validation errors
  const dateErrorMatch = message.match(
    /([A-Za-z_]+):\s*'([^']+)'\s*is not a valid value of the (?:local )?atomic type(?:\s*'\{[^}]+\}([^']+)')?/,
  );
  if (dateErrorMatch) {
    const [, fieldName, invalidValue, atomicType] = dateErrorMatch;

    // Check if it's a date field
    if (atomicType === "TDataT" || fieldName.includes("Data") || fieldName.includes("Date")) {
      return t("errors.invalidDate", {
        field: `\`${fieldName}\``,
        value: `\`${invalidValue}\``,
      });
    }

    // Generic invalid value error
    return t("errors.invalidValue", {
      field: `\`${fieldName}\``,
      value: `\`${invalidValue}\``,
    });
  }

  // Remove namespace prefixes from element names
  const withoutNamespace = message.replace(/Element '\{[^}]+\}([^']+)'/g, "$1");

  // Extract the field name for enumeration errors
  const fieldMatch = withoutNamespace.match(/^([^:]+):/);
  const fieldName = fieldMatch ? fieldMatch[1] : t("errors.field");

  // Create a clean summary message with localization and proper formatting
  if (invalidValues.length === 1) {
    return t("errors.invalidValue", {
      field: `\`${fieldName}\``,
      value: `\`${invalidValues[0]}\``,
    });
  } else if (invalidValues.length > 1) {
    const valuesList = invalidValues.map((v) => `\`${v}\``).join(", ");
    return t("errors.invalidValues", {
      field: `\`${fieldName}\``,
      values: valuesList,
    });
  }

  // Handle other common XSD error patterns
  let simplified = message;

  // Clean up enumeration errors
  simplified = simplified.replace(
    /\[facet 'enumeration'\] The value '([^']+)' is not an element of the set \{[^}]+\}\.?/g,
    (_, value) => t("errors.invalidEnumValue", { value: `\`${value}\`` }),
  );

  // Clean up atomic type errors
  simplified = simplified.replace(
    /'([^']+)'\s*is not a valid value of the (?:local )?atomic type(?:\s*'\{[^}]+\}([^']+)')?\.?/g,
    (match, value, type) => {
      if (type === "TDataT" || match.includes("Data")) {
        return t("errors.invalidDateValue", { value: `\`${value}\`` });
      }
      return t("errors.invalidEnumValue", { value: `\`${value}\`` });
    },
  );

  // Clean up remaining namespace references
  simplified = simplified.replace(/\{[^}]+\}/g, "");

  // Clean up element references
  simplified = simplified
    .replace(
      /Element '([^']+)':\s*/g,
      (_, field) => `${t("errors.fieldPrefix", { field: `\`${field}\`` })}: `,
    )
    .replace(/\s+/g, " ")
    .trim();

  return simplified || message;
}

export function ValidationIssueComponent({ issue }: ValidationIssueProps) {
  const t = useTranslations("validator");
  const [expanded, setExpanded] = useState(false);

  // Parse enumeration error if applicable
  const enumerationError = parseEnumerationError(issue.message);

  // Function to translate expected values
  const translateExpectedValue = (value: string): string => {
    // Match "Max X decimal places" pattern
    const decimalPlacesMatch = value.match(/^Max (\d+) decimal places?$/);
    if (decimalPlacesMatch) {
      const count = parseInt(decimalPlacesMatch[1], 10);
      return t("expectedValues.maxDecimalPlaces", { count });
    }

    // Return original value if no translation pattern matches
    return value;
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
        return "STRUKTURA XML";
      case "xsd":
        return "SCHEMA XSD";
      case "semantic":
        return "REGUŁY BIZNESOWE";
      case "infrastructure":
        return "SYSTEM";
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
                        ? `(${enumerationError.allowedValues.length} opcji)`
                        : `spośród ${enumerationError.allowedValues.length}`}
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
                        <span className="text-slate-500 text-xs">oczekiwane:</span>
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
                    Lokalizacja w pliku
                  </h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    {issue.context.location.xpath && (
                      <div>
                        <span className="font-medium">XPath:</span>{" "}
                        <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                          {issue.context.location.xpath}
                        </code>
                      </div>
                    )}
                    {issue.context.location.lineNumber && (
                      <div>
                        <span className="font-medium">Linia:</span>{" "}
                        {issue.context.location.lineNumber}
                        {issue.context.location.columnNumber &&
                          `, kolumna ${issue.context.location.columnNumber}`}
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
                    Szczegóły wartości
                  </h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    {/* Show enumeration values if available */}
                    {enumerationError ? (
                      <>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">Wartość:</span>
                          <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                            {enumerationError.actualValue}
                          </code>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Dozwolone opcje:</span>
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
                              <span className="font-medium text-blue-700">💡 Wskazówka:</span>{" "}
                              <span className="text-blue-600">
                                Użyj kodu kraju "PL" zamiast "POL" dla Polski.
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Standard value context */
                      <>
                        {issue.context.actualValue && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">Wartość:</span>
                            <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                              {String(issue.context.actualValue)}
                            </code>
                          </div>
                        )}
                        {issue.context.expectedValues &&
                          issue.context.expectedValues.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium">Oczekiwane:</span>
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
