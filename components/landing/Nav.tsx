"use client";

import { useState } from "react";
import { Btn, DocsIcon, Mark } from "./ui";
import { links } from "@/lib/links";

const NAV: string[] = [
  // commented out for now - restore when these pages exist
  // "Product",
  // "About Us",
  // "Blog",
  // "FAQs",
  // "Contact",
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f1ea]/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 sm:px-10">
        <a href="/" aria-label="log0 home">
          <Mark />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((label) => (
            <a
              key={label}
              href="#"
              className="text-[15px] text-[#1b1815]/80 transition-colors hover:text-[#1b1815]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={links.docs}
            aria-label="Read the docs"
            className="flex size-9 items-center justify-center rounded-md text-[#1b1815]/70 transition-colors hover:bg-black/5 hover:text-[#1b1815]"
          >
            <DocsIcon className="size-5" />
          </a>
          <Btn
            href={links.console}
            className="hidden! h-10 px-5 text-sm lg:inline-flex!"
          >
            Get Started
          </Btn>
          <button
            className="flex size-9 items-center justify-center rounded-md text-[#1b1815] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.75 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.75 -rotate-45" : "top-2.5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="border-t border-black/10 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  onClick={() => setOpen(false)}
                  className="text-[15px] text-[#1b1815]/80"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Btn href={links.console} className="mt-4 w-full">
            Get Started
          </Btn>
        </div>
      )}
    </header>
  );
}
