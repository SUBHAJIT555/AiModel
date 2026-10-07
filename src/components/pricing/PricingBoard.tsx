"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingPlans } from "@/data/pricing";
import { formatPlanPrice } from "@/components/pricing/formatPlanPrice";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function PricingBoard() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

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
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => {
          const href =
            plan.monthlyBase == null
              ? "/contact"
              : `/checkout?plan=${plan.id}&billing=${billing}`;
          return (
            <li key={plan.id} className="flex flex-col border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-medium">{plan.name}</h2>
                {plan.popular ? <Badge tone="primary">Common</Badge> : null}
              </div>
              <p className="mt-4 font-mono text-[15px]">{formatPlanPrice(plan, billing)}</p>
              <p className="mt-2 text-[13px] text-muted">
                {plan.monthlyBase == null ? "Custom" : plan.monthlyBase === 0 ? "Pay as you go" : "+ model usage"}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button className="mt-6" href={href} size="sm" variant={plan.popular ? "primary" : "secondary"}>
                {plan.cta}
              </Button>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-[12px] text-muted">
        Plan prices are placeholders. <Link href="/contact">Contact</Link> does not start a contract.
      </p>
    </div>
  );
}
