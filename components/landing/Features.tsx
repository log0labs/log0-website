import { SkillsPanel, BookPanel, EvalPanel, VersionPanel } from "./mocks";

const ITEMS = [
  {
    n: "01",
    title: "Fingerprinting",
    desc: "A deterministic SHA-256 fingerprint normalizes every log - IPs, UUIDs, and numbers stripped to placeholders. Same bug, different values, one incident.",
    panel: <SkillsPanel />,
  },
  {
    n: "02",
    title: "Incident lifecycle",
    desc: "Every incident moves through a strict state machine - NEW, ASSIGNED, ACKNOWLEDGED, RESOLVED - with a full audit trail of who changed what, when.",
    panel: <BookPanel />,
  },
  {
    n: "03",
    title: "AI summaries",
    desc: "Each incident lands with an AI summary: what's failing, the likely cause, and suggested next steps - generated async, so detection never waits. AI assists, humans decide.",
    panel: <EvalPanel />,
  },
  {
    n: "04",
    title: "Slack-native ownership",
    desc: "Assign an engineer, acknowledge, and resolve without leaving Slack. Interactive Block Kit messages turn an alert into clear accountability in one click.",
    panel: <VersionPanel />,
  },
];

export default function Features() {
  return (
    <section className="border-b border-black/10 px-6 py-24 sm:px-10">
      <h2 className="text-4xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-5xl">
        From raw log to owned incident,
        <br />
        in under 30 seconds.
      </h2>

      <div className="mt-16 grid gap-x-12 gap-y-16 lg:grid-cols-2">
        {ITEMS.map((it) => (
          <div key={it.n} className="min-w-0">
            <div className="font-mono text-xl font-semibold text-[var(--accent)]">
              {it.n}
            </div>
            <h3 className="mt-3 text-2xl font-medium text-[#1b1815]">
              {it.title}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#9a9089]">
              {it.desc}
            </p>
            <div className="mt-6">{it.panel}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
