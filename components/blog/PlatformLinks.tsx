import type { ReactNode } from "react";

/*
  "Read on your favorite platform" row. Renders one button per external mirror
  present in the post's `links` frontmatter, in a fixed order. If no links are
  present, the component renders nothing (caller can also guard).
*/

export type PlatformLinksData = {
  hashnode?: string;
  medium?: string;
  linkedin?: string;
  commune?: string;
};

type Platform = {
  key: keyof PlatformLinksData;
  label: string;
  icon: ReactNode;
};

const HashnodeIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
    <path d="M1.79 8.03a5.77 5.77 0 0 0 0 7.94l6.24 6.24a5.77 5.77 0 0 0 7.94 0l6.24-6.24a5.77 5.77 0 0 0 0-7.94L15.97 1.79a5.77 5.77 0 0 0-7.94 0L1.79 8.03Zm12.51 6.27a3.26 3.26 0 1 1-4.6-4.6 3.26 3.26 0 0 1 4.6 4.6Z" />
  </svg>
);

const MediumIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42S20.96 8.46 20.96 12ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const CommuneIcon = (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/blog/commune.webp"
    alt=""
    className="size-4 rounded-[3px] object-contain"
    aria-hidden
  />
);

const PLATFORMS: Platform[] = [
  { key: "hashnode", label: "Hashnode", icon: HashnodeIcon },
  { key: "medium", label: "Medium", icon: MediumIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
  { key: "commune", label: "Commune", icon: CommuneIcon },
];

export default function PlatformLinks({ links }: { links: PlatformLinksData }) {
  const available = PLATFORMS.filter((p) => links[p.key]);
  if (available.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#9a9089]">
        Read on
      </span>
      <div className="flex flex-wrap gap-2">
        {available.map((p) => (
          <a
            key={p.key}
            href={links[p.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-[#1b1815] transition-colors hover:border-[var(--accent)]/40 hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] hover:text-[var(--accent)]"
          >
            {p.icon}
            {p.label}
          </a>
        ))}
      </div>
    </div>
  );
}
