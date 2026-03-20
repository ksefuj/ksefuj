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
      return t("errors.invalidValue", { value: `\`${value}\`` });
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
        return "Struktura XML";
      case "xsd":
        return "Schema XSD";
      case "semantic":
        return "Reguły biznesowe";
      case "infrastructure":
        return "System";
      default:
        return domain;
    }
  };

  const hasDetailedContext = Boolean(
    issue.context.location.xpath ||
    issue.context.location.element ||
    issue.context.actualValue ||
    (issue.context.expectedValues && issue.context.expectedValues.length > 0) ||
    (issue.fixSuggestions && issue.fixSuggestions.length > 0) ||
    enumerationError,
  );

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-200",
        config.bgColor,
        config.borderColor,
        hasDetailedContext && "hover:shadow-sm",
      )}
    >
      <div className="flex items-start gap-3">
        {/* Severity Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>{config.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={config.badgeVariant}>{getDomainLabel(issue.code.domain)}</Badge>
              {issue.context.location.element && (
                <Badge variant="neutral">
                  <span className="font-mono text-xs">{issue.context.location.element}</span>
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
                  className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")}
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
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            <MarkdownText>{displayMessage}</MarkdownText>
          </p>

          {/* Quick Context Summary */}
          {(issue.context.actualValue ||
            (issue.context.expectedValues && issue.context.expectedValues.length > 0) ||
            enumerationError) &&
            !expanded && (
              <div className="text-xs text-slate-500 space-y-1">
                {/* Show enumeration error context if available */}
                {enumerationError && (
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">Aktualna wartość:</span>{" "}
                      <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">
                        {enumerationError.actualValue}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Dozwolone wartości:</span>{" "}
                      {enumerationError.isLargeSet ? (
                        <span className="text-slate-400">
                          {enumerationError.allowedValues.length} opcji (kliknij aby zobaczyć
                          wszystkie)
                        </span>
                      ) : (
                        <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">
                          {enumerationError.allowedValues.slice(0, 5).join(", ")}
                          {enumerationError.allowedValues.length > 5 && " ..."}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Standard context if no enumeration error */}
                {!enumerationError && (
                  <>
                    {issue.context.actualValue && (
                      <div>
                        <span className="font-medium">Aktualna wartość:</span>{" "}
                        <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">
                          {String(issue.context.actualValue)}
                        </span>
                      </div>
                    )}
                    {issue.context.expectedValues && issue.context.expectedValues.length > 0 && (
                      <div>
                        <span className="font-medium">Oczekiwane:</span>{" "}
                        <span className="font-mono bg-white/60 px-1.5 py-0.5 rounded">
                          {issue.context.expectedValues.slice(0, 3).join(", ")}
                          {issue.context.expectedValues.length > 3 && " ..."}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

          {/* Expanded Details */}
          {expanded && hasDetailedContext && (
            <div className="mt-3 pt-3 border-t border-white/30 space-y-3">
              {/* Location Details */}
              {(issue.context.location.xpath || issue.context.location.lineNumber) && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Lokalizacja
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
                    Wartości
                  </h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    {/* Show enumeration values if available */}
                    {enumerationError ? (
                      <>
                        <div>
                          <span className="font-medium">Aktualna:</span>{" "}
                          <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                            {enumerationError.actualValue}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">
                            Dozwolone wartości ({enumerationError.allowedValues.length}):
                          </span>
                          <div className="mt-1 max-h-32 overflow-y-auto">
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
                          <div>
                            <span className="font-medium">Aktualna:</span>{" "}
                            <code className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs">
                              {String(issue.context.actualValue)}
                            </code>
                          </div>
                        )}
                        {issue.context.expectedValues &&
                          issue.context.expectedValues.length > 0 && (
                            <div>
                              <span className="font-medium">Oczekiwane:</span>{" "}
                              <div className="mt-1 flex flex-wrap gap-1">
                                {issue.context.expectedValues.map((value, i) => (
                                  <code
                                    key={i}
                                    className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-xs"
                                  >
                                    {value}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Fix Suggestions */}
              {issue.fixSuggestions?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Sugestie naprawy
                  </h4>
                  <div className="space-y-2">
                    {issue.fixSuggestions.slice(0, 3).map((suggestion, i) => (
                      <div key={i} className="bg-white/60 rounded-lg p-2 text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="neutral" className="text-xs">
                            {suggestion.type}
                          </Badge>
                          {suggestion.confidence > 0.8 && (
                            <Badge variant="success" className="text-xs">
                              Wysoka pewność
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600">{suggestion.description}</p>
                        {suggestion.content && (
                          <code className="block mt-1 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                            {suggestion.content}
                          </code>
                        )}
                      </div>
                    ))}
                    {issue.fixSuggestions.length > 3 && (
                      <p className="text-xs text-slate-500">
                        ... i {issue.fixSuggestions.length - 3} więcej
                      </p>
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
