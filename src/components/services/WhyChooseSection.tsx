import { Activity, Braces, RefreshCw, Shield, Split, Waypoints } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const reasons = [
  {
    title: "One request format",
    body: "Send text, vision, audio, and video through the same interface.",
    icon: Waypoints,
  },
  {
    title: "Policy routing",
    body: "Choose a model by cost, latency, capability, or availability.",
    icon: Split,
  },
  {
    title: "Provider fallback",
    body: "Move a request to the next healthy model when one fails.",
    icon: RefreshCw,
  },
  {
    title: "Usage analytics",
    body: "See latency, success rate, and spend for every routed request.",
    icon: Activity,
  },
  {
    title: "Workspace controls",
    body: "Limit models, regions, and usage from one policy layer.",
    icon: Shield,
  },
  {
    title: "Structured output",
    body: "Keep one response shape when the provider behind the route changes.",
    icon: Braces,
  },
];

export function WhyChooseSection() {
  return (
    <section id="why-aimodel" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border">
        <Reveal>
          <h2 className="max-w-xl px-6 py-8 text-[clamp(1.875rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.03em] md:px-10 md:py-10">
            What your app no longer has to do.
          </h2>
        </Reveal>
        <div className="grid border-t border-border bg-surface-subtle md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                className="group border-b border-border p-8 transition-colors duration-[160ms] last:border-b-0 hover:bg-[color-mix(in_srgb,var(--foreground)_4%,var(--surface-subtle))] md:[&:not(:nth-child(3n))]:border-r md:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <Icon className="size-4 text-muted transition-colors duration-[160ms] group-hover:text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-[16px] font-medium tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">{reason.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
