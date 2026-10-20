import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omitted for the current page. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Accessible name of the `<nav>` landmark. */
  label: string;
}

/** Visible breadcrumb trail. The last item is the current page; long titles are truncated. */
export function Breadcrumbs({ items, label }: BreadcrumbsProps) {
  return (
    <nav aria-label={label} className="mb-8">
      <ol className="flex min-w-0 items-center gap-x-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={`${index}-${item.label}`}
              className={last ? "flex min-w-0 items-center" : "flex shrink-0 items-center"}
            >
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-slate-900 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  title={last ? item.label : undefined}
                  className="block max-w-[14rem] truncate text-slate-700 sm:max-w-sm md:max-w-md"
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="ml-2 text-slate-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
