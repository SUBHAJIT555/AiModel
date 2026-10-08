"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { pricingPlans } from "@/data/pricing";
import { formatInr, formatMillions } from "@/lib/inr";
import { easeOut } from "@/components/motion/transitions";
import { formatPlanPrice, usageAmount } from "@/components/pricing/formatPlanPrice";
import WakeSlider from "@/components/pricing/WakeSlider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const sliderProps = {
  bars: 36,
  height: 18,
  restHeight: 18,
  gap: 3,
  fillColor: "#6c5cff",
  trackColor: "#e2e5ea",
  sensitivity: 1,
  reach: 6,
  skew: 0.6,
  glide: 0.3,
  smoothing: 100,
} as const;

export function PricingBoard() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [tokens, setTokens] = useState(20);

  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Plans</p>
          <h2 className="mt-2 text-[22px] font-medium tracking-[-0.03em]">Three ways to pay for the route.</h2>
        </div>
        <div className="inline-flex self-start rounded-full bg-[#f1f3f6] p-1" role="group" aria-label="Billing period">
          {(["monthly", "annual"] as const).map((cycle) => {
            const selected = billing === cycle;
            return (
              <button
                key={cycle}
                type="button"
                aria-pressed={selected}
                className="relative h-8 rounded-full px-3.5 text-[13px] capitalize"
                onClick={() => setBilling(cycle)}
              >
                {selected ? (
                  <motion.span
                    layoutId="billing-cycle"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-foreground shadow-[0_2px_6px_rgb(17_19_24/0.18)]"
                    transition={{ duration: 0.28, ease: easeOut }}
                  />
                ) : null}
                <span className={`relative ${selected ? "text-surface" : "text-muted"}`}>{cycle}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted">
        A year on Route or Command is ten months of the monthly fee. Volume does not switch. It stays on the token rate.
      </p>

      <ul className="mt-8 grid items-center gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.24fr)_minmax(0,0.88fr)] lg:gap-2">
        {pricingPlans.map((plan) => {
          const variable = Boolean(plan.variable);
          const total = variable ? usageAmount(plan, tokens) : 0;
          const href = variable
            ? `/checkout?plan=${plan.id}&billing=monthly&tokens=${tokens}&unit=million`
            : `/checkout?plan=${plan.id}&billing=${billing}`;
          return (
            <li
              key={plan.id}
              className={`flex flex-col border bg-surface ${
                plan.featured
                  ? "rounded-[24px] border-foreground/15 p-7 shadow-[0_1px_1px_rgb(17_19_24/0.04),0_22px_44px_-28px_rgb(17_19_24/0.45)] lg:px-8 lg:py-10"
                  : "rounded-[20px] border-border p-5"
              }`}
            >
              <div className="flex h-7 items-center justify-between gap-3">
                <h3 className="text-[18px] font-medium tracking-[-0.02em]">{plan.name}</h3>
                {plan.featured ? <Badge tone="primary">Custom</Badge> : <span aria-hidden className="h-5" />}
              </div>
              <p className="mt-5 text-[32px] leading-none font-medium tracking-[-0.04em]">
                {variable ? formatInr(total) : formatPlanPrice(plan, billing)}
              </p>
              <p className="mt-2 h-4 font-mono text-[12px] tracking-[0.04em] text-muted uppercase">
                {variable ? `${formatInr(plan.ratePerMillion ?? 0)} / 1M tokens` : billing === "annual" ? "Billed yearly" : "Billed monthly"}
              </p>
              <div className="mt-5 flex h-[88px] flex-col justify-center">
                {variable ? (
                  <>
                    <WakeSlider
                      {...sliderProps}
                      value={tokens}
                      min={1}
                      max={1000}
                      step={1}
                      ariaLabel="Token volume in millions"
                      formatValue={formatMillions}
                      onChange={setTokens}
                    />
                    <p className="mt-2 text-[14px] font-medium tracking-[-0.02em]">{formatMillions(tokens)} tokens</p>
                  </>
                ) : (
                  <p className="text-[13px] leading-6 text-muted">
                    {plan.id === "command"
                      ? "The higher fee. A year is ten months of the monthly price."
                      : "The smaller fee. A year is ten months of the monthly price."}
                  </p>
                )}
              </div>
              <p className="mt-2 min-h-[4.5rem] text-[14px] leading-6 text-muted">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button className="w-full" href={href} variant={plan.featured ? "primary" : "secondary"}>
                  {plan.cta}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
