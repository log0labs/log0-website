import type { ReactNode } from "react";
import { Btn, Label } from "./ui";
import { links } from "@/lib/links";

const OPEN_SOURCE = [
  "Self-hosted Docker stack - services, Redpanda, PostgreSQL, ClickHouse",
  "AGPL-3.0 community edition (source available on GitHub)",
  "Ingest, fingerprint, cluster, and open incidents from duplicate errors",
  "Multi-tenant workspaces with JWT login, API keys, and RBAC",
  "Web console: dashboard, incidents, and ClickHouse log explorer",
  "AI incident summaries and Slack alerts - you supply LLM and Slack credentials",
] as const;

const ENTERPRISE = [
  "Commercial license without AGPL obligations on your deployment",
  "On-prem or managed deployment under a single-tenant agreement",
  "Dedicated engineering for install, integration, and upgrades",
  "Custom SLAs, security review, and procurement-friendly billing",
  "Tailored limits, retention, and entitlements for your environment",
  "Priority support and feature requests",
] as const;

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[15px] leading-snug text-[#1b1815]"
        >
          <span
            className="mt-0.5 shrink-0 font-mono text-sm text-[var(--accent)]"
            aria-hidden
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TierCard({
  name,
  price,
  description,
  items,
  children,
}: {
  name: string;
  price: string;
  description: string;
  items: readonly string[];
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col border border-black/10 bg-[#faf8f4] px-6 py-10 sm:px-8">
      <h3 className="text-xl font-medium tracking-tight text-[#1b1815]">
        {name}
      </h3>
      <p className="mt-2 font-mono text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
        {price}
      </p>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9a9089]">
        {description}
      </p>
      <CheckList items={items} />
      <div className="mt-10 flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export default function Pricing() {
  const platformRepo = `${links.github}/${links.platformGithubRepo}`;

  return (
    <section className="border-b border-black/10 px-6 py-24 sm:px-10">
      <Label>Pricing</Label>
      <h2 className="mt-8 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-5xl">
        Self-host for free, or run log0 under a commercial agreement.
      </h2>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#9a9089]">
        Enterprise pricing is agreed with our team.
      </p>

      <div className="mt-16 grid gap-px bg-black/10 lg:grid-cols-2">
        <TierCard
          name="Open Source"
          price="Free forever"
          description="Everything required to run the community edition on your own infrastructure."
          items={OPEN_SOURCE}
        >
          <Btn href="/docs/local-development">Self-host guide</Btn>
          <Btn href={platformRepo} variant="secondary">
            GitHub
          </Btn>
        </TierCard>

        <TierCard
          name="Enterprise"
          price="Custom annually"
          description="Commercial license, optional managed hosting, and hands-on deployment support."
          items={ENTERPRISE}
        >
          <Btn href={`mailto:${links.enterpriseEmail}`}>Contact sales</Btn>
        </TierCard>
      </div>
    </section>
  );
}
