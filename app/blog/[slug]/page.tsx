import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GrainBackground from "@/components/GrainBackground";
import { ACCENT, ACCENT_HOVER } from "@/components/landing/theme";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import PlatformLinks from "@/components/blog/PlatformLinks";
import { AuthorByline, AuthorCard } from "@/components/blog/Author";
import Toc from "@/components/blog/Toc";
import MobileToc from "@/components/blog/MobileToc";
import { getBlogMDXComponents } from "@/components/blog/mdx";
import { blogSource } from "@/lib/blog/source";
import { links } from "@/lib/links";

export function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[page.slugs.length - 1] ?? "",
  }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const d = page.data;
  const title = d.seoTitle ?? d.title;
  const description = d.seoDescription ?? d.description;
  const pageUrl = `${links.siteUrl}${page.url}`;
  const canonicalUrl = d.canonical === "self" ? pageUrl : d.canonical;
  const cover = `${links.siteUrl}${d.coverDark}`;

  return {
    title,
    description,
    keywords: d.keywords,
    authors: [
      { name: "Ashmit JaiSarita Gupta", url: "https://ashmitjsg.vercel.app/" },
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title,
      description,
      url: pageUrl,
      publishedTime: d.date,
      images: [{ url: cover, width: 1600, height: 840, alt: d.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  const d = page.data;
  const MDX = d.body;

  return (
    <div
      className="min-h-screen overflow-x-clip bg-[#f4f1ea] font-sans text-[#1b1815]"
      style={
        {
          "--accent": ACCENT,
          "--accent-hover": ACCENT_HOVER,
        } as CSSProperties
      }
    >
      <GrainBackground />
      <div className="mx-auto max-w-[1320px] border-x border-black/10">
        <Nav />
        <main className="px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 lg:grid-cols-[13rem_minmax(0,44rem)] lg:justify-center">
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
                <Toc items={page.data.toc} />
              </div>
            </aside>
            <article className="w-full min-w-0 max-w-3xl">
            <Link
              href="/blog"
              className="font-mono text-xs text-[#9a9089] transition-colors hover:text-[var(--accent)]"
            >
              &larr; All posts
            </Link>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#9a9089]">
              <span>Post {String(d.order).padStart(2, "0")}</span>
              <span aria-hidden>&middot;</span>
              <span>{formatDate(d.date)}</span>
            </div>

            <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-4xl">
              {d.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#1b1815]/60">
              {d.description}
            </p>

            <div className="mt-6">
              <AuthorByline />
            </div>

            <div className="mt-6">
              <PlatformLinks links={d.links} />
            </div>

            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-[#161310]">
              <Image
                src={d.coverDark}
                alt={d.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <div className="mt-12">
              <MobileToc items={page.data.toc} />
            </div>

            <div className="blog-prose">
              <MDX components={getBlogMDXComponents()} />
            </div>

            <div className="mt-16 border-t border-black/10 pt-8">
              <AuthorCard />
              <div className="mt-8">
                <PlatformLinks links={d.links} />
              </div>
              <Link
                href="/blog"
                className="mt-6 inline-block font-mono text-sm text-[#9a9089] transition-colors hover:text-[var(--accent)]"
              >
                &larr; Back to all posts
              </Link>
            </div>
          </article>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
