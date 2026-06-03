import React from "react";
import AsciiHero from "@/components/ascii-hero";
import { LogoMark } from "./LogoMark";

/*
  Shared primitives for the /v2 landing clone (Bento-style, light theme).
  Color tokens live here so every section stays consistent.
*/

export const V2 = {
  bg: "#f4f1ea", // warm cream page background
  panel: "#161310", // near-black warm dashboard panels
  text: "#1b1815", // near-black warm text
  muted: "#9a9089", // muted gray subtext
  orange: "#ff4a00", // primary accent
  rail: "rgba(0,0,0,0.08)", // hairline grid rails / borders
} as const;

/** Orange uppercase mono label + fading dotted bar (used above sections). */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4a00]">
        {children}
      </span>
      <span
        aria-hidden
        className="-ml-6 block h-6 w-52 max-w-[45%] [mask-image:linear-gradient(to_right,black,black_35%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black,black_35%,transparent)]"
      >
        <AsciiHero
          variant="trappedion"
          cell={6}
          speed={0.8}
          interactive={false}
          color="#ff4a00"
          dim="rgba(255,74,0,0.3)"
        />
      </span>
    </div>
  );
}

type BtnProps = {
  variant?: "primary" | "secondary" | "light";
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Pill button matching Bento's CTA style. */
export function BtnV2({
  variant = "primary",
  className = "",
  children,
  ...props
}: BtnProps) {
  const styles = {
    primary: "bg-[#ff4a00] text-white hover:bg-[#e64400]",
    secondary:
      "bg-transparent text-[#1b1815] border border-black/15 hover:bg-black/5",
    light: "bg-white text-[#1b1815] hover:bg-white/90",
  }[variant];
  return (
    <a
      className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition-colors ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

/** GitHub glyph (inherits color via currentColor). */
export function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

/** Pixel-style logo mark + wordmark (re-used in nav + footer). */
export function MarkV2({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-5 w-6" color={dark ? "#fff" : V2.orange} />
      <span
        className="font-mono text-lg font-medium tracking-tight lowercase"
        style={{ color: dark ? "#fff" : V2.text }}
      >
        log0
      </span>
    </span>
  );
}
