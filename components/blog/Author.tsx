import Image from "next/image";

/*
  Author identity for blog posts. Compact <AuthorByline /> sits in the post
  header; fuller <AuthorCard /> closes the post. next/image serves an optimized
  avatar from the source in /public/blog/author.jpg.
*/
export const AUTHOR = {
  name: "Ashmit JaiSarita Gupta",
  role: "Full-stack Software Engineer - (Builder of log0)",
  bio: "Full-stack Software Engineer and the builder of log0. I write about backend systems, distributed systems, and the physics-flavored corners of engineering.",
  avatar: "/blog/author.jpg",
  url: "https://ashmitjsg.vercel.app/",
  socials: [
    { label: "Portfolio", href: "https://ashmitjsg.vercel.app/" },
    { label: "GitHub", href: "https://github.com/ashmitjsg" },
    { label: "X", href: "https://twitter.com/ashmitjsg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashmitjsg/" },
    { label: "Hashnode", href: "https://engineeringwithashmit.hashnode.dev/" },
  ],
};

export function AuthorByline() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={AUTHOR.url}
        target="_blank"
        rel="noopener noreferrer author"
        className="shrink-0"
        aria-label={`${AUTHOR.name} - portfolio`}
      >
        <Image
          src={AUTHOR.avatar}
          alt={AUTHOR.name}
          width={44}
          height={44}
          className="size-11 rounded-full border border-black/10 object-cover"
        />
      </a>
      <div className="leading-tight">
        <a
          href={AUTHOR.url}
          target="_blank"
          rel="noopener noreferrer author"
          className="text-sm font-medium text-[#1b1815] transition-colors hover:text-[var(--accent)]"
        >
          {AUTHOR.name}
        </a>
        <p className="text-xs text-[#1b1815]/55">{AUTHOR.role}</p>
      </div>
    </div>
  );
}

export function AuthorCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white/40 p-5 sm:flex-row sm:gap-5">
      <a
        href={AUTHOR.url}
        target="_blank"
        rel="noopener noreferrer author"
        className="shrink-0"
        aria-label={`${AUTHOR.name} - portfolio`}
      >
        <Image
          src={AUTHOR.avatar}
          alt={AUTHOR.name}
          width={64}
          height={64}
          className="size-16 rounded-full border border-black/10 object-cover"
        />
      </a>
      <div>
        <div className="flex items-center gap-2">
          <a
            href={AUTHOR.url}
            target="_blank"
            rel="noopener noreferrer author"
            className="text-base font-medium text-[#1b1815] transition-colors hover:text-[var(--accent)]"
          >
            {AUTHOR.name}
          </a>
          <span className="rounded bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-[var(--accent)]">
            Author
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[#1b1815]/65">
          {AUTHOR.bio}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#9a9089]">
          {AUTHOR.socials.map((s, i) => (
            <span key={s.label} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>&middot;</span>}
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)]"
              >
                {s.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
