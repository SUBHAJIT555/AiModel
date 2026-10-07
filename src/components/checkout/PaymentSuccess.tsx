"use client";

import { useSearchParams } from "next/navigation";
import { getPlan } from "@/data/pricing";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function PaymentSuccess() {
  const params = useSearchParams();
  const plan = getPlan(params.get("plan"));
  const order = params.get("order") ?? "ORD-AI-28491";

  return (
    <div className="max-w-xl border border-border bg-surface p-6">
      <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Payment successful</p>
      <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Plan activated</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        {plan.name} is marked active for this demo session. No charge was sent to a payment provider.
      </p>
      <p className="mt-5 font-mono text-[13px]">Order {order}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/" size="sm">
          Go to dashboard
        </Button>
        <Button href="/models" size="sm" variant="secondary">
          View models
        </Button>
        <Button href={siteConfig.docsUrl} size="sm" variant="ghost">
          View documentation
        </Button>
      </div>
    </div>
  );
}
