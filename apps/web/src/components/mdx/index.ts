import {
  Field,
  FieldTable,
  Info,
  Question,
  Source,
  Tip,
  Warning,
  XmlExample,
} from "./mdx-components";
import { ExternalLink } from "./external-link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, any> = {
  a: ExternalLink,
  Source,
  Warning,
  Info,
  Tip,
  Question,
  XmlExample,
  FieldTable,
  Field,
};
