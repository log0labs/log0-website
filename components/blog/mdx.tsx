import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

/*
  MDX components for standalone blog posts. Unlike the docs pages, blog posts
  render on the cream landing theme WITHOUT the fumadocs UI layout/CSS, so we
  pass `pre`/`code`/`img` through as native elements and style them via the
  `.blog-prose` block in globals.css. Shiki still colors tokens via inline
  styles baked in at compile time, so code blocks keep their highlighting.
*/
export function getBlogMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ children, ...props }) => {
      const lang = (props as Record<string, unknown>)["data-language"] as
        | string
        | undefined;
      const showLang =
        lang && !["text", "plaintext", "plain", "ansi", ""].includes(lang);
      return (
        <div className="blog-codeblock">
          {showLang && <span className="blog-codeblock-lang">{lang}</span>}
          <pre {...props}>{children}</pre>
        </div>
      );
    },
    code: (props) => <code {...props} />,
    // charts are first-party SVGs in /public/blog/charts - render plain so the
    // feTurbulence grain filter works and we skip next/image SVG config. The
    // remarkImage plugin rewrites the markdown src to a static-import object,
    // so unwrap `.src` back to a string URL.
    img: ({ src, ...rest }) => {
      const url =
        typeof src === "object" && src !== null && "src" in src
          ? (src as { src: string }).src
          : (src as string);
      // eslint-disable-next-line @next/next/no-img-element
      return <img loading="lazy" alt="" {...rest} src={url} />;
    },
    ...components,
  };
}
