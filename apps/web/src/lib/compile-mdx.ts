import { type ComponentProps, createElement } from "react";
import rehypeShiki from "@shikijs/rehype";
import { compileMDX as compileMDXBase } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { rehypeAddHeadingIds } from "./rehype-heading-ids";
import { mdxComponents } from "@/components/mdx";
import { Screenshot } from "@/components/mdx/screenshot";

type CompileMDXOptions = {
  source: string;
  /** Language of the rendered content; used by locale-aware MDX components. Defaults to "pl". */
  locale?: string;
};

/**
 * Compile MDX source with Shiki syntax highlighting and heading ID injection.
 * All content pages should use this instead of calling compileMDX directly.
 */
export async function compileMDXContent({ source, locale = "pl" }: CompileMDXOptions) {
  return compileMDXBase({
    source,
    components: {
      ...mdxComponents,
      Screenshot: (props: Omit<ComponentProps<typeof Screenshot>, "locale">) =>
        createElement(Screenshot, { ...props, locale }),
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeAddHeadingIds,
          [
            rehypeShiki,
            {
              theme: "github-dark-dimmed",
              langs: ["xml", "typescript", "javascript", "bash", "json", "yaml"],
            },
          ],
        ],
      },
    },
  });
}
