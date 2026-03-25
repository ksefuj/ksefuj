import rehypeShiki from "@shikijs/rehype";
import { compileMDX as compileMDXBase } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { rehypeAddHeadingIds } from "./rehype-heading-ids";
import { mdxComponents } from "@/components/mdx";

type CompileMDXOptions = {
  source: string;
};

/**
 * Compile MDX source with Shiki syntax highlighting and heading ID injection.
 * All content pages should use this instead of calling compileMDX directly.
 */
export async function compileMDXContent({ source }: CompileMDXOptions) {
  return compileMDXBase({
    source,
    components: mdxComponents,
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
