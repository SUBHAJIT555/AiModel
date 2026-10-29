"use client";

import { useState } from "react";
import { MAX_PURCHASE_RUPEES, MIN_PURCHASE_RUPEES, pricingPlans } from "@/data/pricing";
import { formatInr } from "@/lib/inr";
import { formatPlanPrice } from "@/components/pricing/formatPlanPrice";
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
  const [rupees, setRupees] = useState(500);

  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Plans</p>
          <h2 className="mt-2 text-[22px] font-medium tracking-[-0.03em]">Three ways to pay for the route.</h2>
        </div>
        <Button href="/credits" variant="secondary">
          Buy credits
        </Button>
      </div>
      <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted">
        Route and Command are a single fee. Volume and credits both run from ₹10 to ₹9,899.
      </p>

      <ul className="mt-8 grid items-center gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.24fr)_minmax(0,0.88fr)] lg:gap-2">
        {pricingPlans.map((plan) => {
          const variable = Boolean(plan.variable);
          const href = variable ? `/checkout?plan=${plan.id}&amount=${rupees}` : `/checkout?plan=${plan.id}`;
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
                {variable ? formatInr(rupees) : formatPlanPrice(plan)}
              </p>
              <p className="mt-2 h-4 font-mono text-[12px] tracking-[0.04em] text-muted uppercase">
                {variable ? `${formatInr(MIN_PURCHASE_RUPEES)} – ${formatInr(MAX_PURCHASE_RUPEES)}` : "One-time fee"}
              </p>
              <div className="mt-5 flex h-[88px] flex-col justify-center">
                {variable ? (
                  <>
                    <WakeSlider
                      {...sliderProps}
                      value={rupees}
                      min={MIN_PURCHASE_RUPEES}
                      max={MAX_PURCHASE_RUPEES}
                      step={1}
                      ariaLabel="Volume amount in rupees"
                      formatValue={formatInr}
                      onChange={setRupees}
                    />
                    <p className="mt-2 text-[14px] font-medium tracking-[-0.02em]">
                      {formatInr(MIN_PURCHASE_RUPEES)} to {formatInr(MAX_PURCHASE_RUPEES)}
                    </p>
                  </>
                ) : (
                  <p className="text-[13px] leading-6 text-muted">
                    {plan.id === "command"
                      ? "The higher fee. Pin a region and keep an audit."
                      : "The smaller fee. One endpoint and a route you can set."}
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
