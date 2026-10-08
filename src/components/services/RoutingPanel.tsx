"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/transitions";
import { ProviderMark } from "@/components/models/ProviderMark";

const policies = ["Balanced", "Lowest cost", "Lowest latency", "Capability"] as const;

type Policy = (typeof policies)[number];

const candidates = [
  { name: "Claude Sonnet 4", slug: "anthropic", cost: "₹22.00", latency: "380ms", availability: "99.2%", capability: "High" },
  { name: "GPT-4.1 mini", slug: "openai", cost: "₹7.40", latency: "190ms", availability: "99.9%", capability: "Medium" },
  { name: "Gemini 2.5 Flash", slug: "google", cost: "₹4.10", latency: "240ms", availability: "99.4%", capability: "Medium" },
];

const pick: Record<Policy, number> = {
  Balanced: 1,
  "Lowest cost": 2,
  "Lowest latency": 1,
  Capability: 0,
};

export function RoutingPanel({ scope = "" }: { scope?: string } = {}) {
  const reduce = useReducedMotion();
  const [policy, setPolicy] = useState<Policy>("Balanced");
  const [paused, setPaused] = useState(false);
  const selected = pick[policy];
  const slide = reduce ? { duration: 0 } : { duration: 0.38, ease: easeOut };

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => {
      setPolicy((current) => policies[(policies.indexOf(current) + 1) % policies.length]);
    }, 2600);
    return () => window.clearTimeout(id);
  }, [reduce, paused, policy]);

  return (
    <div
      className="w-full max-w-[520px] rounded-[22px] border border-border bg-surface p-4 shadow-[0_1px_1px_rgb(17_19_24/0.04),0_18px_40px_-24px_rgb(17_19_24/0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Policy</p>
      <div className="mt-3 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-[#f1f3f6] p-1" role="group" aria-label="Routing policy">
        {policies.map((item) => {
          const active = item === policy;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              className="relative h-8 rounded-full px-3 text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setPolicy(item)}
            >
              {active ? (
                <motion.span
                  layoutId={scope ? `${scope}-route-policy` : "route-policy"}
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-foreground shadow-[0_2px_6px_rgb(17_19_24/0.22)]"
                  transition={slide}
                />
              ) : null}
              <span className={`relative ${active ? "text-surface" : "text-muted"}`}>{item}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only">Selected route: {candidates[selected]?.name}</p>
      <ul className="relative mt-4">
        <span
          aria-hidden
          className="pointer-events-none absolute top-5 bottom-5 left-[11px] w-[8px] bg-[length:8px_7px] bg-center bg-repeat-y [background-image:radial-gradient(circle,#9aa1ab_1.15px,transparent_1.35px)]"
        />
        {candidates.map((candidate, index) => {
          const active = index === selected;
          const hideOnPhone = index === 2 && selected !== 2;
          const hideAlternate = index === 1 && selected === 2;
          return (
            <li
              key={candidate.name}
              className={`relative py-1.5 pl-8 ${hideOnPhone ? "max-sm:hidden" : ""} ${hideAlternate ? "max-sm:hidden" : ""}`}
            >
              {active ? (
                <motion.span
                  layoutId={scope ? `${scope}-route-packet` : "route-packet"}
                  aria-hidden
                  className="absolute top-1/2 left-[10px] z-10 size-2.5 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-surface"
                  transition={slide}
                />
              ) : (
                <span aria-hidden className="absolute top-1/2 left-[10px] z-10 size-2.5 -translate-y-1/2 rounded-full border border-foreground/55 bg-surface" />
              )}
              <div className="relative px-3 py-3">
                {active ? (
                  <motion.span
                    layoutId={scope ? `${scope}-route-card` : "route-card"}
                    aria-hidden
                    className="absolute inset-0 rounded-[14px] bg-surface shadow-[0_1px_1px_rgb(17_19_24/0.04),0_10px_22px_-14px_rgb(17_19_24/0.45)]"
                    transition={slide}
                  />
                ) : (
                  <span aria-hidden className="absolute inset-0 rounded-[14px] bg-[#f6f7f9]" />
                )}
                <div className={`relative ${active ? "" : "opacity-70"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex min-w-0 items-center gap-2 text-[14px] font-medium tracking-[-0.02em]">
                      <span className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-white">
                        <ProviderMark slug={candidate.slug} name={candidate.name} />
                      </span>
                      <span className="truncate">{candidate.name}</span>
                    </p>
                    <p className="font-mono text-[12px] text-muted">{candidate.latency}</p>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] sm:grid-cols-3">
                    <div>
                      <dt className="text-muted">Cost</dt>
                      <dd className="font-mono">{candidate.cost}</dd>
                    </div>
                    <div className="hidden sm:block">
                      <dt className="text-muted">Availability</dt>
                      <dd className="font-mono">{candidate.availability}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Capability</dt>
                      <dd className="font-mono">{candidate.capability}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
