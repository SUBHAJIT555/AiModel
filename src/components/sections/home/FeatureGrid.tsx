import { ArrowLeftRight, BarChart3, Braces, CircleDollarSign, Code2, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  {
    title: "Usage",
    body: "Requests, tokens, latency, and spend, listed by model.",
    icon: BarChart3,
  },
  {
    title: "Fallback",
    body: "The next model on your list takes the call when the first one fails.",
    icon: RefreshCw,
  },
  {
    title: "Side by side",
    body: "Context length, what the model accepts, and the rupee rate.",
    icon: ArrowLeftRight,
  },
  {
    title: "Same JSON back",
    body: "The response fields do not change when the provider does.",
    icon: Braces,
  },
  {
    title: "A few languages",
    body: "JavaScript, Python, PHP, and Go. Underneath, it is the same HTTP call.",
    icon: Code2,
  },
  {
    title: "The price first",
    body: "Each model page shows a rupee rate before you pick a route.",
    icon: CircleDollarSign,
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-surface">
      <div className="home-frame border-t border-border">
        <Reveal>
          <h2 className="max-w-xl px-6 py-8 text-[clamp(1.875rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.03em] md:px-10 md:py-10">
            Worth a look before you choose
          </h2>
        </Reveal>
        <div className="grid border-t border-border bg-surface-subtle md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group border-b border-border p-8 transition-colors duration-[160ms] last:border-b-0 hover:bg-[color-mix(in_srgb,var(--foreground)_4%,var(--surface-subtle))] md:[&:not(:nth-child(3n))]:border-r md:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <Icon className="size-4 text-muted transition-colors duration-[160ms] group-hover:text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-[16px] font-medium tracking-[-0.02em]">{feature.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
