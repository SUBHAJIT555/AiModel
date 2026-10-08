"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingPlans } from "@/data/pricing";
import { formatInr, formatMillions } from "@/lib/inr";
import { formatPlanPrice, usageAmount } from "@/components/pricing/formatPlanPrice";
import WakeSlider from "@/components/pricing/WakeSlider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const sliderProps = {
  bars: 42,
  height: 22,
  restHeight: 22,
  gap: 4,
  fillColor: "#2563eb",
  trackColor: "#e5e7eb",
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
    <div>
      <div className="inline-flex rounded-[10px] border border-border bg-surface p-1">
        {(["monthly", "annual"] as const).map((cycle) => (
          <button
            key={cycle}
            type="button"
            className={`h-8 rounded-[8px] px-3 text-[13px] capitalize ${
              billing === cycle ? "bg-foreground text-background" : "text-muted"
            }`}
            onClick={() => setBilling(cycle)}
          >
            {cycle}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid items-start gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => {
          const variable = Boolean(plan.variable);
          const total = variable ? usageAmount(plan, tokens) : 0;
          const href = variable
            ? `/checkout?plan=${plan.id}&billing=monthly&tokens=${tokens}&unit=million`
            : plan.monthlyBase == null
              ? "/contact"
              : `/checkout?plan=${plan.id}&billing=${billing}`;
          return (
            <li key={plan.id} className="flex flex-col rounded-[16px] border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium tracking-[-0.02em]">{plan.name}</h2>
                {plan.popular ? <Badge tone="primary">Common</Badge> : null}
              </div>
              <p className="mt-4 text-[28px] leading-none font-medium tracking-[-0.04em]">
                {variable ? formatInr(total) : formatPlanPrice(plan, billing)}
              </p>
              <p className="mt-2 text-[13px] text-muted">
                {variable
                  ? `${formatInr(plan.ratePerMillion ?? 0)} / 1M tokens`
                  : plan.monthlyBase == null
                    ? "Quoted"
                    : plan.monthlyBase === 0
                      ? "No platform fee"
                      : "Fixed fee"}
              </p>
              {variable ? (
                <div className="mt-5">
                  <WakeSlider
                    {...sliderProps}
                    value={tokens}
                    min={1}
                    max={100}
                    step={1}
                    ariaLabel="Token volume in millions"
                    formatValue={formatMillions}
                    onChange={setTokens}
                  />
                  <p className="mt-3 text-[13px] text-muted">{formatMillions(tokens)} tokens</p>
                </div>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-muted">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button className="mt-6" href={href} variant={plan.popular ? "primary" : "secondary"}>
                {plan.cta}
              </Button>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[12px] text-muted">
        Amounts are in INR for this demo. <Link href="/contact">Contact</Link> does not start a contract.
      </p>
    </div>
  );
}
