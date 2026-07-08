"use client";

import { useEffect, useState, type ReactNode } from "react";

type TocItem = { title: ReactNode; url: string; depth: number };

/*
  Sticky table of contents with scroll-spy. Consumes fumadocs' page.data.toc.
  Highlights the heading nearest the top of the viewport as you scroll.
*/
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = items
      .map((i) => i.url.replace(/^#/, ""))
      .filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      // trigger when a heading is in the top ~30% of the viewport
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items?.length) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#9a9089]">
        On this page
      </p>
      <ul className="border-l border-black/10">
        {items.map((item) => {
          const id = item.url.replace(/^#/, "");
          const isActive = active === id;
          return (
            <li
              key={item.url}
              style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}
            >
              <a
                href={item.url}
                className={`-ml-px block border-l-2 py-1 pl-3 leading-snug transition-colors ${
                  isActive
                    ? "border-[var(--accent)] font-medium text-[var(--accent)]"
                    : "border-transparent text-[#1b1815]/55 hover:text-[#1b1815]"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
