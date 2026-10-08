import { Globe, IndianRupee, Layers, Library, ReceiptText, Route } from "lucide-react";

const reasons = [
  {
    title: "Rupees on the plan",
    body: "Route, Volume, and Command are listed in INR, with Volume on a token rate.",
    icon: IndianRupee,
  },
  {
    title: "One brand on the bill",
    body: "The receipt shows Aimodel, then the model you chose.",
    icon: ReceiptText,
  },
  {
    title: "Tax follows the country",
    body: "India adds CGST and SGST. Other countries are labeled as an export of services.",
    icon: Globe,
  },
  {
    title: "A catalog you can open",
    body: "Browse models, providers, and modalities before you start a checkout.",
    icon: Library,
  },
  {
    title: "Volume in the middle",
    body: "The custom plan follows ₹80 for each million tokens, up to one billion.",
    icon: Layers,
  },
  {
    title: "A route you can walk",
    body: "The checkout is a demonstration. You can follow it through before any integration.",
    icon: Route,
  },
];

export function AboutWhy() {
  return (
    <section id="why-us" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border px-6 py-16 md:px-10 md:py-20">
        
        <h2 className="mt-5 max-w-[14em] text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.035em]">
          Why teams stay on one route
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
          One catalog, a bill in rupees, and a request that stays the same when the provider changes.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title}>
                <Icon className="size-5 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 text-[16px] font-medium tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">{reason.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
