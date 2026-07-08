import {
  remarkMdxMermaid,
  remarkFeedbackBlock,
  RemarkFeedbackBlockOptions,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

const feedbackOptions: RemarkFeedbackBlockOptions = {
  // other options:
};

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

/*
  Blog collection. Each post is one MDX file under content/blog with the
  frontmatter below. The body renders on-site at /blog/[slug]; `links` powers
  the "read on your favorite platform" row (only present platforms show).
  Canonical published on Hashnode + mirrored to Medium / LinkedIn / Commune.
*/
export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      // slug is the route segment; keep it equal to the Hashnode slug for parity
      slug: z.string(),
      date: z.string().date(),
      order: z.number().default(999),
      keywords: z.array(z.string()).default([]),
      // covers live in /public/blog/covers; dark art reads on the light page bg
      coverDark: z.string(),
      coverLight: z.string().optional(),
      // SEO overrides - fall back to title/description when absent
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      // rel=canonical target: "self" (log0.in) or an absolute external URL
      canonical: z.string().default("self"),
      // external mirrors - only the keys present get a button
      links: z
        .object({
          hashnode: z.string().url().optional(),
          medium: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          commune: z.string().url().optional(),
        })
        .default({}),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkMdxMermaid, remarkFeedbackBlock, feedbackOptions]],
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        {
          // expose the fence language so the blog `pre` can show a badge
          name: "blog:add-language",
          pre(node) {
            node.properties["data-language"] = this.options.lang;
          },
        },
      ],
    },
  },
});
