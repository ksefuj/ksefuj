"use client";

import React from "react";
import { track } from "@vercel/analytics";

interface ContributeFooterProps {
  locale: string;
  /** Section name — e.g. "blog", "docs", "guides" */
  section: string;
  /** Slug of the current content item */
  slug: string;
  /**
   * Locale of the actual content file — may differ from `locale` when fallback
   * content is shown. Used to build the correct GitHub edit URL.
   * Defaults to `locale` if not provided.
   */
  contentLocale?: string;
}

const REPO = "https://github.com/ksefuj/ksefuj";

const copy: Record<
  string,
  {
    heading: string;
    body: string;
    editLabel: string;
    issueLabel: string;
    translationNote?: string;
  }
> = {
  pl: {
    heading: "Ten artykuł jest open source",
    body: "ksefuj to projekt społecznościowy na licencji Apache 2.0. Jeśli zauważysz błąd, nieścisłość lub chcesz zaproponować zmiany — możesz edytować ten artykuł bezpośrednio na GitHubie. Każdy wkład jest mile widziany.",
    editLabel: "Edytuj na GitHubie",
    issueLabel: "Zgłoś problem",
  },
  en: {
    heading: "This article is open source",
    body: "ksefuj is a community project released under Apache 2.0. If you spot an error, an inaccuracy, or want to suggest improvements — you can edit this article directly on GitHub. All contributions are welcome.",
    editLabel: "Edit on GitHub",
    issueLabel: "Open an issue",
    translationNote:
      "Translation improvements are especially welcome for English and Ukrainian content.",
  },
  uk: {
    heading: "Ця стаття — відкритий код",
    body: "ksefuj — це спільний проєкт із ліцензією Apache 2.0. Якщо ви помітили помилку або хочете запропонувати покращення — ви можете відредагувати цю статтю прямо на GitHub. Особливо вітаємо покращення перекладу.",
    editLabel: "Редагувати на GitHub",
    issueLabel: "Повідомити про проблему",
    translationNote:
      "Покращення перекладу цієї статті особливо вітаються — допоможіть зробити KSeF доступнішим для україномовних користувачів.",
  },
};

export function ContributeFooter({ locale, section, slug, contentLocale }: ContributeFooterProps) {
  const strings = copy[locale] ?? copy.pl;
  const fileLocale = contentLocale ?? locale;

  // Direct link to GitHub's editor for the specific MDX file
  const editUrl = `${REPO}/edit/main/apps/web/content/${fileLocale}/${section}/${slug}.mdx`;
  const issueUrl = `${REPO}/issues/new?labels=content&title=Feedback%3A+${encodeURIComponent(slug)}`;

  return (
    <aside
      aria-label={strings.heading}
      className="mt-12 rounded-2xl border border-violet-200 bg-violet-50/60 p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        {/* GitHub mark */}
        <div className="shrink-0 mt-0.5">
          <GitHubIcon className="w-7 h-7 text-violet-600" />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <h2 className="text-base font-semibold text-slate-900">{strings.heading}</h2>

          <p className="text-sm text-slate-600 leading-relaxed">{strings.body}</p>

          {strings.translationNote && (
            <p className="text-sm text-violet-700 font-medium">{strings.translationNote}</p>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("content_edit_on_github", { locale, section, slug })}
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
            >
              <PencilIcon className="w-3.5 h-3.5" />
              {strings.editLabel}
            </a>
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("content_issue_opened", { locale, section, slug })}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-violet-300 text-slate-700 rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
            >
              <ChatBubbleIcon className="w-3.5 h-3.5" />
              {strings.issueLabel}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── Inline SVG icons (no extra icon-library dep) ──────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GitHub"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.004 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.234 1.911 1.234 3.222 0 4.61-2.807 5.625-5.48 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  );
}
