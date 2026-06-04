import type { Metadata } from "next";
import type { CSSProperties } from "react";
import GrainBackground from "@/components/GrainBackground";
import { ACCENT, ACCENT_HOVER } from "@/components/landing/theme";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Features from "@/components/landing/Features";
import Blog from "@/components/landing/Blog";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "log0 - intelligent incident response",
  description:
    "Detect what breaks, correlate what matters, resolve before users notice.",
};

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#f4f1ea] font-sans text-[#1b1815]"
      style={
        {
          "--accent": ACCENT,
          "--accent-hover": ACCENT_HOVER,
        } as CSSProperties
      }
    >
      <GrainBackground />
      {/* centered frame with faint vertical grid rails */}
      <div className="mx-auto max-w-[1320px] border-x border-black/10">
        <Nav />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <Features />
          {/* <Blog /> */}
        </main>
      </div>
      {/* full-bleed orange CTA + footer */}
      <Footer />
    </div>
  );
}
