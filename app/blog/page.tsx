import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import GrainBackground from "@/components/GrainBackground";
import { ACCENT, ACCENT_HOVER, ACCENT_DIM } from "@/components/landing/theme";
import { Label } from "@/components/landing/ui";
import AsciiBg from "@/components/landing/AsciiBg";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { getSortedPosts, type BlogPage } from "@/lib/blog/source";
import { links } from "@/lib/links";

const BLOG_TITLE = "The log0 build log";
const BLOG_DESCRIPTION =
  "Field notes on log intelligence and incident management at scale - architecture decisions, load-test findings, and hard-won lessons building a multi-tenant incident platform solo.";
const BLOG_OG_IMAGE = `${links.siteUrl}/images/og-dark.png`;

export const metadata: Metadata = {
  title: "Blog - log0",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: `${links.siteUrl}/blog` },
  openGraph: {
    type: "website",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${links.siteUrl}/blog`,
    images: [{ url: BLOG_OG_IMAGE, width: 1600, height: 840, alt: BLOG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [BLOG_OG_IMAGE],
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostCard({ post }: { post: BlogPage }) {
  const { title, description, date, coverDark, order } = post.data;
  return (
    <Link href={post.url} className="group block">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 bg-[#161310]">
        <Image
          src={coverDark}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#9a9089]">
        <span>Post {String(order).padStart(2, "0")}</span>
        <span aria-hidden>&middot;</span>
        <span>{formatDate(date)}</span>
      </div>
      <h2 className="mt-2 text-xl font-medium leading-snug tracking-tight text-[#1b1815] group-hover:text-[var(--accent)]">
        {title}
      </h2>
      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#1b1815]/60">
        {description}
      </p>
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getSortedPosts();

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
        <main className="px-6 py-20 sm:px-10 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
            <div>
              <Label>The log0 build log</Label>
              <h1 className="mt-10 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-5xl">
                Field notes on log intelligence and incident management at scale.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#1b1815]/60">
                Architecture decisions, load-test findings, and hard-won lessons
                from shipping a multi-tenant incident platform solo, on one
                laptop. Each post drills into one box on the diagram.
              </p>
            </div>

            {/* generative ASCII field (charfield) - streaming vectors echo the
                log pipeline; edge-masked so it melts into the cream bg */}
            <div
              aria-hidden
              className="relative hidden aspect-square w-full self-center overflow-hidden lg:block [mask-image:radial-gradient(circle_at_center,black_35%,transparent_78%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_35%,transparent_78%)]"
            >
              <AsciiBg
                name="waves"
                cell={9}
                speed={0.9}
                color={ACCENT}
                dim={ACCENT_DIM}
              />
            </div>
          </div>

          {posts.length === 0 ? (
            <p className="mt-16 text-[#1b1815]/60">No posts yet. Check back soon.</p>
          ) : (
            <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.url} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
