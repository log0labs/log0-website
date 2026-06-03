import AsciiHero from "@/components/ascii-hero";
import { Label } from "./ui";
import { SignalsPanel, SpanTreePanel } from "./mocks";
import { ACCENT, ACCENT_DIM } from "./theme";

export default function SolutionV2() {
  return (
    <section className="border-b border-black/10">
      {/* headline + ascii */}
      <div className="grid lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-10">
          <Label>Solution</Label>
          <h2 className="mt-8 text-4xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-5xl">
            log0 collapses thousands of duplicate errors into one{" "}
            <span className="text-[var(--v2-accent)]">actionable incident</span>.
          </h2>
        </div>
        <div className="pointer-events-none relative min-h-[260px] lg:min-h-full">
          <div className="absolute inset-0">
            <AsciiHero
              variant="phasespace"
              cell={9}
              radius={110}
              interactive={false}
              color={ACCENT}
              dim={ACCENT_DIM}
            />
          </div>
        </div>
      </div>

      {/* dark split: two product columns */}
      <div className="grid gap-px bg-black/10 lg:grid-cols-2">
        <div className="flex flex-col bg-[#161310] px-6 py-12 sm:px-10">
          <h3 className="text-lg text-white/55">Fingerprint &amp; cluster</h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white">
            Deterministic SHA-256 fingerprinting normalizes every log and
            collapses identical errors. A 5-minute clustering window fires an
            incident the moment your threshold is crossed - in real time, per
            tenant.
          </p>
          <div className="mt-auto pt-10">
            <SignalsPanel />
          </div>
        </div>
        <div className="flex flex-col bg-[#161310] px-6 py-12 sm:px-10">
          <h3 className="text-lg text-white/55">Every span, captured</h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white">
            OpenTelemetry-ready: a traceId rides on every normalized log. Jump
            from an incident straight to the span that broke - no stitching logs
            across services by hand.
          </p>
          <div className="mt-auto pt-10">
            <SpanTreePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
