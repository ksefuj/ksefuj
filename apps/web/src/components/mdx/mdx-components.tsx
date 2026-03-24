import React from "react";
import { CopyButton } from "./copy-button";

/** Inline source citation with an external link icon */
interface SourceProps {
  href: string;
  label: string;
}

export function Source({ href, label }: SourceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors border-b border-violet-200 hover:border-violet-400 pb-px"
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      {label}
    </a>
  );
}

/** Warning admonition box */
export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 my-4">
      <svg
        className="w-5 h-5 shrink-0 mt-0.5 text-rose-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/** Info admonition box */
export function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800 my-4">
      <svg
        className="w-5 h-5 shrink-0 mt-0.5 text-violet-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/** Tip admonition box */
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 my-4">
      <svg
        className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
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
  if (typeof node === "string") {return node;}
  if (typeof node === "number") {return String(node);}
  if (Array.isArray(node)) {return node.map(extractTextContent).join("");}
  if (React.isValidElement(node)) {
    return extractTextContent((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

/** Auto-generated field reference table */
interface Field {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface FieldTableProps {
  fields: Field[];
}

export function FieldTable({ fields }: FieldTableProps) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Pole</th>
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Typ</th>
            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Opis</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, i) => (
            <tr
              key={field.name}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
            >
              <td className="px-4 py-2.5 font-mono text-xs text-violet-700 whitespace-nowrap">
                {field.name}
                {field.required && (
                  <span className="ml-1 text-rose-500" title="wymagane">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500 whitespace-nowrap">
                {field.type}
              </td>
              <td className="px-4 py-2.5 text-slate-600">{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
