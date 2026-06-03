import { Label } from "./ui";
import { ChatMock } from "./mocks";

export default function ProblemV2() {
  return (
    <section className="border-b border-black/10 px-6 py-24 sm:px-10">
      <Label>The Problem</Label>
      <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-2xl leading-snug text-[#1b1815]">
          <p>Running microservices is easier than ever. Catching what breaks isn&apos;t.</p>
          <p>
            A single bug fires the same error 10,000 times before anyone
            notices - and your dashboards drown in duplicates.
          </p>
          <p>
            When an alert finally lands, nobody owns it. Logs sit in one tool,
            traces in another, the fix in a third - and the context is scattered
            across all of them.
          </p>
          <p>
            So every on-call starts from zero. Your mean time to detect climbs,
            and your mean time to resolve climbs with it.
          </p>
        </div>
        <ChatMock />
      </div>
    </section>
  );
}
