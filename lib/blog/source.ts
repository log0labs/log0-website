import { blog } from "collections/server";
import { loader } from "fumadocs-core/source";

/*
  Blog content source. URL slug comes from the MDX filename, so name each file
  by its slug (e.g. content/blog/green-does-not-mean-working.mdx -> /blog/
  green-does-not-mean-working). The `order` frontmatter field drives the order
  posts appear in the index, independent of filename.
*/
export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});

export type BlogPage = ReturnType<typeof blogSource.getPages>[number];

/** All posts, newest series-position first is handled by callers; this sorts by `order`. */
export function getSortedPosts(): BlogPage[] {
  return [...blogSource.getPages()].sort(
    (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999)
  );
}
