import { Label } from "./ui";
import { BlogCard } from "./mocks";
import { ACCENT } from "./theme";

const POSTS = [
  {
    gradient: "linear-gradient(135deg,#d9c34a,#3fae5a 55%,#2f7d8c)",
    title: "Why fingerprinting belongs in normalization, not clustering.",
  },
  {
    gradient: `linear-gradient(135deg,#ff7a3c,${ACCENT} 45%,#7c4dff)`,
    title: "Multi-tenant from day one: partitioning Kafka by tenant.",
  },
];

export default function Blog() {
  return (
    <section className="border-b border-black/10 px-6 py-24 sm:px-10">
      <Label>From our blog</Label>
      <h2 className="mt-12 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-[#1b1815] sm:text-5xl">
        Field notes on log intelligence and incident management at scale.
      </h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {POSTS.map((p) => (
          <BlogCard key={p.title} gradient={p.gradient} title={p.title} />
        ))}
      </div>
    </section>
  );
}
