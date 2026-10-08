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
    <div className="max-w-xl rounded-[22px] border border-border bg-surface p-6 md:p-8">
      <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Order {order}</p>
      <h2 className="mt-4 text-[22px] font-medium tracking-[-0.03em]">{plan.name} is active for this session.</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/">Go to dashboard</Button>
        <Button href="/models" variant="secondary">
          View models
        </Button>
        <Button href={siteConfig.docsUrl} variant="ghost">
          View documentation
        </Button>
      </div>
    </div>
  );
}
