import { Field, FieldTable, Info, MdxTable, Tip, Warning, XmlExample } from "./mdx-components";
import { ExternalLink } from "./external-link";
import { Source } from "./source";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, any> = {
  a: ExternalLink,
  table: MdxTable,
  Source,
  Warning,
  Info,
  Tip,
  XmlExample,
  FieldTable,
  Field,
};
