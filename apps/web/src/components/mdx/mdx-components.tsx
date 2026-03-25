import React from "react";
import { CopyButton } from "./copy-button";

const admonitionConfig = {
  warning: {
    colors: "border-rose-200 bg-rose-50 text-rose-800",
    iconColor: "text-rose-500",
    iconPath:
      "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  info: {
    colors: "border-violet-200 bg-violet-50 text-violet-800",
    iconColor: "text-violet-500",
    iconPath:
      "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  },
  tip: {
    colors: "border-emerald-200 bg-emerald-50 text-emerald-800",
    iconColor: "text-emerald-500",
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
} as const;

function Admonition({
  variant,
  children,
}: {
  variant: keyof typeof admonitionConfig;
  children: React.ReactNode;
}) {
  const { colors, iconColor, iconPath } = admonitionConfig[variant];
  return (
    <div className={`flex gap-3 rounded-xl border ${colors} px-4 py-3 text-sm my-4`}>
      <svg
        className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <div className="admonition-body leading-relaxed">{children}</div>
    </div>
  );
}

/** Responsive table wrapper — prevents overflow on narrow screens */
export function MdxTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return <Admonition variant="warning">{children}</Admonition>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <Admonition variant="info">{children}</Admonition>;
}

export function Tip({ children }: { children: React.ReactNode }) {
  return <Admonition variant="tip">{children}</Admonition>;
}

/** XML code block with an optional copy button */
interface XmlExampleProps {
  children: React.ReactNode;
  copyable?: boolean;
}

export function XmlExample({ children, copyable = false }: XmlExampleProps) {
  return (
    <div className="relative group my-4">
      {copyable && <CopyButton text={extractTextContent(children)} />}
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 text-sm">
        {children}
      </div>
    </div>
  );
}

/** Extract plain text from React children (for copy-to-clipboard) */
function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  if (React.isValidElement(node)) {
    return extractTextContent((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

/** FAQ accordion item — question as `q` prop, answer as children */
interface QuestionProps {
  q: string;
  children: React.ReactNode;
}

export function Question({ q, children }: QuestionProps) {
  return (
    <details className="group not-prose border border-slate-100 rounded-xl mb-2">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-slate-900 font-medium hover:bg-slate-50 transition-colors rounded-xl group-open:rounded-b-none">
        <span>{q}</span>
        <svg
          className="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-5 pb-5 pt-2 text-sm text-slate-600 leading-relaxed">{children}</div>
    </details>
  );
}

/** A single row inside a <FieldTable> */
interface FieldProps {
  name: string;
  type: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ name, type, required, children }: FieldProps) {
  return (
    <tr>
      <td className="px-4 py-2.5 font-mono text-xs text-violet-700 whitespace-nowrap">
        {name}
        {required && (
          <span className="ml-1 text-rose-500" title="required">
            *
          </span>
        )}
      </td>
      <td className="px-4 py-2.5 font-mono text-xs text-slate-500 whitespace-nowrap">{type}</td>
      <td className="px-4 py-2.5 text-slate-600">{children}</td>
    </tr>
  );
}

/** Field reference table — use <Field> rows as children */
export function FieldTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Field</th>
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Type</th>
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Description</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
