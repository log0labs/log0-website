import AsciiHero from "@/components/ascii-hero";
import { BtnV2, Label } from "./ui";
import { TracesPanel } from "./mocks";
import { links } from "@/lib/links";
import { ACCENT, ACCENT_DIM } from "./theme";

export default function HeroV2() {
  return (
    <section className="border-b border-black/10">
      <div className="relative grid lg:grid-cols-2">
        {/* left: copy */}
        <div className="px-6 py-20 sm:px-10 lg:py-28">
          <Label>Open source</Label>
          <h1 className="mt-10 text-5xl font-medium leading-[1.05] tracking-tight text-[#1b1815] sm:text-6xl">
            From 10,000 logs
            <br />
            to one incident.
          </h1>
          <p className="mt-6 max-w-md text-2xl leading-snug text-[#9a9089]">
            log0 fingerprints, clusters, and summarizes your errors, then routes
            ownership straight to Slack. Incident clarity for microservice teams.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <BtnV2 href={links.github} target="_blank" rel="noopener noreferrer">
              Get started
            </BtnV2>
            <BtnV2 href="/docs" variant="secondary">
              Read the docs
            </BtnV2>
          </div>
        </div>

        {/* right: our ASCII (orange, light theme) */}
        <div className="pointer-events-none relative min-h-[320px] lg:min-h-full">
          <div className="absolute inset-0">
            <AsciiHero
              variant="flowfield"
              cell={9}
              radius={110}
              color={ACCENT}
              dim={ACCENT_DIM}
            />
          </div>
        </div>
      </div>

      {/* full-width dashboard panel bleeding to the fold */}
      <div className="px-6 sm:px-10">
        <div className="-mb-px translate-y-px">
          <TracesPanel />
        </div>
      </div>
    </section>
  );
}
