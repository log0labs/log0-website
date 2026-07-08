"use client";

import { useState, type ReactNode } from "react";

type TocItem = { title: ReactNode; url: string; depth: number };

/*
  Collapsible "On this page" for mobile/tablet, shown where the sticky sidebar
  TOC is hidden (below lg). Tapping a heading closes the panel and jumps to it.
*/
export default function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (!items?.length) return null;

  return (
    <div className="mb-10 overflow-hidden rounded-xl border border-black/12 bg-white/40 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#9a9089]"
      >
        On this page
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="border-t border-black/10 px-4 py-2">
          {items.map((item) => (
            <li
              key={item.url}
              style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}
            >
              <a
                href={item.url}
                onClick={() => setOpen(false)}
                className="block py-1.5 text-sm leading-snug text-[#1b1815]/70 transition-colors hover:text-[var(--accent)]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
