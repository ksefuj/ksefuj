/**
 * Rehype plugin that adds `id` attributes to h2/h3 headings
 * so the TOC anchor links work correctly.
 *
 * Uses generic unist node types to avoid a hard dependency on @types/hast.
 */
import { slugifyHeading } from "./content";

interface UnistNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: UnistNode[];
}

function getTextContent(node: UnistNode): string {
  if (node.type === "text") {
    return node.value ?? "";
  }
  if (Array.isArray(node.children)) {
    return node.children.map(getTextContent).join("");
  }
  return "";
}

function visitElements(node: UnistNode, callback: (node: UnistNode) => void): void {
  if (node.type === "element") {
    callback(node);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visitElements(child, callback);
    }
  }
}

export function rehypeAddHeadingIds() {
  return (tree: UnistNode) => {
    const seen = new Map<string, number>();

    visitElements(tree, (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") {
        return;
      }

      const text = getTextContent(node);
      if (!text) {
        return;
      }

      const base = slugifyHeading(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;

      node.properties = { ...node.properties, id };
    });
  };
}
