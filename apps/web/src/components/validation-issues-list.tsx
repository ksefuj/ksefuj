import type { ValidationIssue } from "@ksefuj/validator";
import { ValidationIssue as ValidationIssueComponent } from "./validation-issue";

interface ValidationIssuesListProps {
  issues: readonly ValidationIssue[];
  maxDisplayed?: number;
}

export function ValidationIssuesList({ issues, maxDisplayed = 10 }: ValidationIssuesListProps) {
  // Sort issues by severity (errors first, then warnings, then info)
  const sortedIssues = [...issues].sort((a, b) => {
    const severityOrder = { error: 0, warning: 1, info: 2 };
    return severityOrder[a.code.severity] - severityOrder[b.code.severity];
  });

  const hasMore = issues.length > maxDisplayed;
  const issuesToShow = sortedIssues.slice(0, maxDisplayed);

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
    <div>
      {/* Simple list of all issues */}
      <div className="space-y-1.5">
        {issuesToShow.map((issue, index) => (
          <ValidationIssueComponent key={index} issue={issue} />
        ))}
      </div>

      {/* Show More Notice */}
      {hasMore && (
        <div className="text-center py-3 mt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Pokazano {issuesToShow.length} z {issues.length} problemów.{" "}
            <span className="font-medium">{issues.length - issuesToShow.length} pozostało.</span>
          </p>
        </div>
      )}
    </div>
  );
}
