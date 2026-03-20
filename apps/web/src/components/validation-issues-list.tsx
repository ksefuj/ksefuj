import type { ValidationIssue } from "@ksefuj/validator";
import { ValidationIssue as ValidationIssueComponent } from "./validation-issue";
import { Badge } from "./badge";

interface ValidationIssuesListProps {
  issues: readonly ValidationIssue[];
  maxDisplayed?: number;
}

export function ValidationIssuesList({ issues, maxDisplayed = 10 }: ValidationIssuesListProps) {
  // Group issues by severity and domain
  const groupedIssues = issues.reduce(
    (acc, issue) => {
      const severity = issue.code.severity;
      const domain = issue.code.domain;

      if (!acc[severity]) {
        acc[severity] = {};
      }
      if (!acc[severity][domain]) {
        acc[severity][domain] = [];
      }

      acc[severity][domain].push(issue);
      return acc;
    },
    {} as Record<string, Record<string, ValidationIssue[]>>,
  );

  const severityOrder: Array<keyof typeof groupedIssues> = ["error", "warning", "info"];
  const domainOrder = ["parse", "xsd", "semantic", "infrastructure"];

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

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "error":
        return "Błędy";
      case "warning":
        return "Ostrzeżenia";
      case "info":
        return "Informacje";
      default:
        return severity;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return (
          <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  let displayedCount = 0;
  const hasMore = issues.length > maxDisplayed;

  if (issues.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
          <svg
            className="w-8 h-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Wszystko w porządku!</h3>
        <p className="text-sm text-slate-500">Nie znaleziono żadnych problemów z walidacją.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {severityOrder.map((severity) => {
        if (!groupedIssues[severity]) {
          return null;
        }

        const severityIssues = Object.values(groupedIssues[severity]).flat();

        return (
          <div key={severity} className="space-y-3">
            {/* Severity Header */}
            <div className="flex items-center gap-3">
              {getSeverityIcon(severity)}
              <h3 className="text-lg font-semibold text-slate-900 font-display">
                {getSeverityLabel(severity)}
              </h3>
              <Badge
                variant={(() => {
                  if (severity === "error") {
                    return "error";
                  }
                  if (severity === "warning") {
                    return "warning";
                  }
                  return "info";
                })()}
              >
                {severityIssues.length}
              </Badge>
            </div>

            {/* Domain Groups */}
            <div className="space-y-4">
              {domainOrder.map((domain) => {
                if (!groupedIssues[severity]?.[domain] || displayedCount >= maxDisplayed) {
                  return null;
                }

                const domainIssues = groupedIssues[severity][domain];
                const issuesToShow = domainIssues.slice(
                  0,
                  Math.max(0, maxDisplayed - displayedCount),
                );
                displayedCount += issuesToShow.length;

                return (
                  <div key={domain}>
                    {/* Domain Subheader (only if more than one domain has issues) */}
                    {Object.keys(groupedIssues[severity]).length > 1 && (
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-medium text-slate-600">
                          {getDomainLabel(domain)}
                        </h4>
                        <Badge variant="neutral">{domainIssues.length}</Badge>
                      </div>
                    )}

                    {/* Issues */}
                    <div className="space-y-2">
                      {issuesToShow.map((issue, index) => (
                        <ValidationIssueComponent key={index} issue={issue} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Show More Notice */}
      {hasMore && (
        <div className="text-center py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Pokazano {displayedCount} z {issues.length} problemów.{" "}
            <span className="font-medium">{issues.length - displayedCount} pozostało.</span>
          </p>
        </div>
      )}
    </div>
  );
}
