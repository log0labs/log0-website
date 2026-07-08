import { Btn, Mark } from "./ui";
import { LogoMark } from "./LogoMark";
import { links } from "@/lib/links";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "GitHub", href: links.github, external: true },
  { label: "Docs", href: links.docs },
  { label: "Blog", href: links.blog },
  { label: "Console", href: links.console },
  // commented out for now - restore when these pages exist
  // { label: "About Us", href: "#" },
  // { label: "Privacy Policy", href: "#" },
  // { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <section className="bg-[var(--accent)] text-white">
      <div className="flex flex-col items-center px-6 py-32 text-center sm:px-10">
        <h2 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
          Turn log chaos into incident clarity
        </h2>
        <Btn
          href={links.console}
          variant="light"
          className="mt-10 h-14 gap-2 px-8 text-base"
        >
          <LogoMark className="size-5" />
          Get started
        </Btn>
      </div>

      <div className="flex flex-col gap-6 border-t border-white/20 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Mark dark />
          <span className="text-sm text-white/80">© 2026 log0, Inc.</span>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sm text-white/90 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
