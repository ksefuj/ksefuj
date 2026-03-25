import {
  Field,
  FieldTable,
  Info,
  MdxTable,
  Source,
  Tip,
  Warning,
  XmlExample,
} from "./mdx-components";
import { ExternalLink } from "./external-link";

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
