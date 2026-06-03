import type { CSSProperties } from "react";
import GrainBackground from "@/components/GrainBackground";
import { ACCENT, ACCENT_HOVER } from "@/components/v2/theme";
import NavV2 from "@/components/v2/NavV2";
import HeroV2 from "@/components/v2/HeroV2";
import ProblemV2 from "@/components/v2/ProblemV2";
import SolutionV2 from "@/components/v2/SolutionV2";
import FeaturesV2 from "@/components/v2/FeaturesV2";
import BlogV2 from "@/components/v2/BlogV2";
import FooterV2 from "@/components/v2/FooterV2";

export default function V2Page() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#f4f1ea] text-[#1b1815]"
      style={
        {
          "--v2-accent": ACCENT,
          "--v2-accent-hover": ACCENT_HOVER,
        } as CSSProperties
      }
    >
      <GrainBackground />
      {/* centered frame with faint vertical grid rails */}
      <div className="mx-auto max-w-[1320px] border-x border-black/10">
        <NavV2 />
        <main>
          <HeroV2 />
          <ProblemV2 />
          <SolutionV2 />
          <FeaturesV2 />
          {/* <BlogV2 /> */}
        </main>
      </div>
      {/* full-bleed orange CTA + footer */}
      <FooterV2 />
    </div>
  );
}
