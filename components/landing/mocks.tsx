import React from "react";

/*
  Placeholder dashboard mock panels for the landing page. These mirror the
  structure of Bento's product UI panels (built as HTML, not images) but use
  log0-flavored placeholder content - swap freely later.
*/

const tag = (text: string, tone: "gray" | "green" | "orange" | "purple") => {
  const tones = {
    gray: "bg-black/5 text-black/60",
    green: "bg-emerald-500/15 text-emerald-700",
    orange: "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]",
    purple: "bg-violet-500/15 text-violet-700",
  };
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {text}
    </span>
  );
};

/* ----------------------------- HERO: traces ----------------------------- */
export function TracesPanel() {
  const rows = [
    ["tr_8a31f…", "ingest.parse.logLine", "kafka-consumer", "6653", "0.71s", "abandoned", 64],
    ["tr_67c2b…", "cluster.fingerprint", "clustering-svc", "1119", "4.04s", "active", 91],
    ["tr_19d0a…", "ai.summary.generate", "summary-svc", "842", "2.10s", "active", 88],
    ["tr_4f7e2…", "notify.dispatch.slack", "notification", "318", "0.42s", "retried", 73],
  ];
  return (
    <div className="overflow-hidden rounded-t-2xl bg-[#161310] text-white/90">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:gap-4 sm:px-5">
        <span className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-xs text-white/70">
          incidents-prod ▾
        </span>
        <div className="flex items-center gap-4 text-sm sm:gap-5">
          {["Logs", "Traces", "Sessions", "Spans", "Nudges"].map((t, i) => (
            <span
              key={t}
              className={`${i > 2 ? "hidden sm:inline" : ""} ${i === 1 ? "border-b-2 border-[var(--accent)] pb-1 text-white" : "text-white/45"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-xs text-white/60 sm:px-5">
        <span className="rounded border border-white/10 px-2 py-1">By count ▾</span>
        <span className="rounded border border-white/10 px-2 py-1">7 Apr – Now</span>
        <span className="ml-2 text-white/80">216,440 total traces</span>
        <span className="text-[var(--accent)]">■ 8,304 error</span>
        <span className="hidden text-violet-400 sm:inline">■ 12,214 nudged</span>
        <span className="ml-auto hidden rounded border border-white/10 px-2 py-1 sm:inline">Hourly ▾</span>
      </div>
      <div className="flex h-28 items-end gap-[3px] px-4 sm:px-5">
        {Array.from({ length: 64 }).map((_, i) => {
          const h = 20 + ((i * 37) % 70);
          // thin out the bars on small screens so they keep a real width
          // instead of squeezing into 1px lines: ~14 on mobile, ~24 on sm.
          const vis = i < 14 ? "" : i < 24 ? "hidden sm:block" : "hidden lg:block";
          return (
            <div key={i} className={`flex-1 ${vis}`} style={{ height: `${h}%` }}>
              <div className="h-full w-full rounded-sm bg-white/20" />
            </div>
          );
        })}
      </div>
      <div className="mt-3 divide-y divide-white/5 text-xs">
        {rows.map((r) => (
          <div key={r[0]} className="flex items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-5">
            <span className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span className="hidden w-24 shrink-0 text-white/60 sm:block">{r[0]}</span>
            <span className="min-w-0 flex-1 truncate text-white/85">{r[1]}</span>
            <span className="hidden w-32 shrink-0 text-white/50 lg:block">{r[2]}</span>
            <span className="hidden w-12 shrink-0 text-white/50 sm:block">{r[3]}</span>
            <span className="hidden w-12 shrink-0 text-white/50 sm:block">{r[4]}</span>
            <span className="shrink-0">{tag(r[5] as string, "gray")}</span>
            <span className="w-12 shrink-0 text-right text-emerald-400 sm:w-14">{r[6]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- PROBLEM: log flood ------------------------- */
export function ChatMock() {
  // one bug, fired thousands of times: a stack of identical error log lines
  const dupes = [0, 1, 2, 3, 4];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* concentric ripples - the same error echoing out */}
      {[0.95, 0.7, 0.45].map((s, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
          style={{ width: `${s * 60}%`, height: `${s * 60}%`, opacity: 0.05 + i * 0.04 }}
        />
      ))}

      {/* floating pain tags */}
      <div className="absolute left-0 top-[12%] z-20 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium shadow-sm">
        🔔 Alert fatigue
      </div>
      <div className="absolute left-1 top-[64%] z-20 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium shadow-sm">
        ⤬ Scattered context
      </div>

      {/* stacked duplicate error log lines */}
      <div className="absolute right-0 top-[16%] w-[72%]">
        <div className="relative h-24">
          {dupes.map((d) => (
            <div
              key={d}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-sm"
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                transform: `translate(${d * 6}px, ${d * 7}px)`,
                zIndex: 10 - d,
                opacity: 1 - d * 0.17,
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-semibold text-[var(--accent)]">ERROR</span>
                <span className="text-black/45">payment-service</span>
              </div>
              <div className="mt-1 truncate font-mono text-[11px] text-black/70">
                NullPointerException · OrderMapper.map()
              </div>
            </div>
          ))}
        </div>

        {/* duplicate counter */}
        <div className="mt-10 inline-flex items-center gap-1 rounded-md bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2 py-1 font-mono text-xs font-semibold text-[var(--accent)]">
          × 10,247 occurrences
        </div>

        {/* nobody owns it */}
        <div className="mt-3 flex items-center gap-2 rounded-full border border-dashed border-black/20 bg-white/70 px-3 py-2 text-xs text-black/50 shadow-sm">
          <span className="grid size-5 place-items-center rounded-full bg-black/10 text-[10px]">
            ?
          </span>
          Unassigned · no owner
        </div>
      </div>
    </div>
  );
}

/* --------------------- SOLUTION: clustering / threshold ----------------- */
export function SignalsPanel() {
  // occurrences of one fingerprint accumulating in a 5-min tumbling window.
  // bars that cross the threshold turn orange -> an incident fires.
  const threshold = 55; // % height = the configured count threshold
  const bars = [12, 18, 15, 24, 30, 22, 38, 44, 36, 52, 60, 58, 72, 80, 68, 64];
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-white/85">
      <div className="flex items-center gap-4 border-b border-white/10 pb-3 text-sm overflow-hidden">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-[var(--accent)]">✶</span> Clustering
        </span>
        {["By fingerprint", "Window", "Errors"].map((t, i) => (
          <span key={t} className={i === 0 ? "border-b-2 border-[var(--accent)] pb-2 text-white" : "text-white/45"}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 py-3 text-xs text-white/60">
        <span className="rounded border border-white/10 px-2 py-1 font-mono">fp a3f9c1…</span>
        <span className="rounded border border-white/10 px-2 py-1">5-min window ▾</span>
        <span className="ml-auto font-mono text-[var(--accent)]">× 10,247</span>
      </div>
      <div className="relative flex h-24 items-end gap-1">
        {/* threshold line */}
        <div
          className="absolute inset-x-0 z-10 border-t border-dashed border-white/30"
          style={{ bottom: `${threshold}%` }}
        >
          <span className="absolute -top-4 right-0 text-[10px] text-white/45">
            threshold ≥ 10
          </span>
        </div>
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${h >= threshold ? "bg-[var(--accent)]" : "bg-white/15"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 text-right text-[11px] text-[var(--accent)]">
        ▲ incident fired
      </div>
    </div>
  );
}

export function SpanTreePanel() {
  // a request trace flowing through the log0 pipeline; the slow span is flagged.
  const spans = [
    ["ingestion.receive", 0, 6, "12ms", false],
    ["normalize.fingerprint", 6, 5, "4ms", false],
    ["cluster.window.check", 11, 7, "8ms", false],
    ["incident.upsert", 18, 9, "22ms", false],
    ["ai.summary.generate", 28, 58, "2.1s", true],
    ["notify.slack.post", 87, 10, "180ms", false],
  ] as const;
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/10 pb-2 text-xs">
        <span className="min-w-0 truncate font-mono text-white/70">trace tr_8a31f · payment-service</span>
        <span className="shrink-0 text-white/40">6 spans · 2.33s</span>
      </div>
      <div className="space-y-3">
        {spans.map(([name, off, w, dur, err]) => (
          <div key={name as string} className="flex items-center gap-2 text-xs sm:gap-3">
            <span className={`w-28 shrink-0 truncate font-mono sm:w-36 ${err ? "text-red-400" : "text-white/70"}`}>
              {err && "● "}
              {name}
            </span>
            <div className="relative h-2 flex-1 rounded bg-white/10">
              <div
                className={`absolute top-0 h-2 rounded ${err ? "bg-red-500" : "bg-[var(--accent)]"}`}
                style={{ left: `${off}%`, width: `${w}%` }}
              />
            </div>
            <span className={`w-12 shrink-0 text-right ${err ? "text-red-400" : "text-white/50"}`}>{dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- FEATURES mocks ----------------------------- */
// 01 - Fingerprinting: normalized templates collapsed into fingerprints.
export function SkillsPanel() {
  const rows = [
    ["Connection timeout after <number>ms", "fp a3f9c1 · payment-service", "HIGH", "orange", "×10,247"],
    ["NullPointerException · OrderMapper.map()", "fp 7b2e08 · payment-service", "HIGH", "orange", "×3,114"],
    ["Rate limit exceeded for <uuid>", "fp c91d4a · auth-service", "MED", "gray", "×842"],
    ["Kafka consumer lag <number>", "fp 5fa330 · clustering-svc", "MED", "gray", "×219"],
    ["Deserialization failed: <field>", "fp e0b7c2 · normalization", "LOW", "gray", "×64"],
  ] as const;
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-4 border-b border-black/10 pb-3 text-sm">
        {["Fingerprints", "Templates", "Errors"].map((t, i) => (
          <span key={t} className={i === 0 ? "font-medium text-[#1b1815]" : "text-black/40"}>
            {t} <span className="text-black/30">{[6, 6, 8][i]}</span>
          </span>
        ))}
      </div>
      <div className="my-3 rounded-md border border-black/10 px-3 py-1.5 text-xs text-black/40">
        🔍 filter fingerprints…
      </div>
      <div className="divide-y divide-black/5">
        {rows.map(([title, sub, sev, tone, count]) => (
          <div key={sub} className="flex items-center gap-2 py-2.5 sm:gap-3">
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[11px] text-[#1b1815] sm:text-[12px]">{title}</div>
              <div className="truncate font-mono text-[11px] text-black/40">{sub}</div>
            </div>
            <span className="shrink-0">{tag(sev, tone as "gray")}</span>
            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-black/55 sm:w-16">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 02 - Incident lifecycle: state machine + audit trail.
export function BookPanel() {
  const states = [
    ["NEW", 2, "gray"],
    ["ASSIGNED", 1, "orange"],
    ["ACKNOWLEDGED", 2, "purple"],
    ["RESOLVED", 1, "green"],
  ] as const;
  const cards = [
    {
      status: "ACKNOWLEDGED",
      tone: "purple",
      title: "NullPointerException · OrderMapper",
      trail: ["ashmit assigned · 2m ago", "ashmit acknowledged · 1m ago"],
    },
    {
      status: "RESOLVED",
      tone: "green",
      title: "Connection timeout · payment-service",
      trail: ["priya resolved · 14m ago"],
    },
  ] as const;
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-4 border-b border-black/10 pb-3 text-sm">
        <span className="font-medium text-[#1b1815]">Open <span className="text-black/30">6</span></span>
        <span className="text-black/40">Resolved <span className="text-black/30">3</span></span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[130px_1fr]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:block sm:space-y-1.5">
          <div className="w-full font-mono text-[11px] text-black/35 sm:w-auto">LIFECYCLE</div>
          {states.map(([name, n, tone], i) => (
            <div key={name} className="flex items-center gap-1.5">
              {tag(name, tone as "gray")}
              <span className="font-mono text-[10px] text-black/40">{n}</span>
              {i < states.length - 1 && <span className="text-black/25">↓</span>}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-lg border border-black/10 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                {tag(c.status, c.tone as "gray")}
                <span className="truncate text-[12px] text-[#1b1815]">{c.title}</span>
              </div>
              <div className="space-y-1 border-l border-black/10 pl-2.5">
                {c.trail.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 font-mono text-[10px] text-black/45">
                    <span className="size-1 rounded-full bg-[var(--accent)]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 03 - AI summaries: what's failing / likely cause / next steps.
export function EvalPanel() {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-black/10 pb-3">
        <span className="text-[var(--accent)]">✶</span>
        <span className="text-[13px] font-medium text-[#1b1815]">AI summary</span>
        <span className="font-mono text-[11px] text-black/40">incident #4821 · HIGH</span>
      </div>
      <div className="mt-3 space-y-3 text-[12px] leading-relaxed">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">What&apos;s failing</div>
          <p className="text-[#1b1815]">
            payment-service throws NullPointerException in OrderMapper.map() on a
            null customerId - 10,247 times in 5 min.
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">Likely cause</div>
          <p className="text-[#1b1815]">
            checkout-service v2.15.0 began emitting orders without customerId
            right before the spike.
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">Suggested next steps</div>
          <p className="text-[#1b1815]">
            Roll back checkout v2.15.0, add a null-guard in OrderMapper, validate
            customerId at ingestion.
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-black/10 pt-2 font-mono text-[10px] text-black/35">
        generated async · AI assists, humans decide
      </div>
    </div>
  );
}

// 04 - Slack-native ownership: interactive incident message.
export function VersionPanel() {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-2 border-b border-black/10 pb-2 text-xs text-black/45">
        <span className="font-medium text-[#1b1815]"># incidents</span>
      </div>
      <div className="mt-3 flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[var(--accent)] text-sm text-white">l0</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[#1b1815]">log0</span>
            <span className="rounded bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-1 py-0.5 text-[10px] font-medium text-[var(--accent)]">APP</span>
            <span className="text-[11px] text-black/35">now</span>
          </div>
          <div className="mt-1 rounded-lg border border-black/10 border-l-2 border-l-[var(--accent)] bg-black/[0.02] p-3">
            <div className="text-[12px] font-medium text-[#1b1815]">
              🚨 HIGH · payment-service
            </div>
            <div className="mt-1 text-[12px] text-black/60">
              NullPointerException · OrderMapper.map() - 10,247 occurrences in 5m.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--accent)] px-2.5 py-1 text-[11px] font-medium text-white">
                Assign engineer ▾
              </span>
              <span className="rounded-md border border-black/15 px-2.5 py-1 text-[11px] text-[#1b1815]">View logs</span>
              <span className="rounded-md border border-black/15 px-2.5 py-1 text-[11px] text-[#1b1815]">Acknowledge</span>
              <span className="rounded-md border border-black/15 px-2.5 py-1 text-[11px] text-[#1b1815]">Resolve</span>
            </div>
          </div>
          <div className="mt-2 font-mono text-[10px] text-black/45">
            ✓ assigned to @ashmit · acknowledged
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- BLOG cards ------------------------------ */
export function BlogCard({ gradient, title }: { gradient: string; title: string }) {
  return (
    <a href="#" className="group block">
      <div
        className="aspect-[16/9] w-full rounded-xl"
        style={{ background: gradient }}
      />
      <h3 className="mt-4 text-xl font-medium text-[#1b1815] group-hover:text-[var(--accent)]">
        {title}
      </h3>
    </a>
  );
}
