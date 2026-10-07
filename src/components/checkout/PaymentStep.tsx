"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlan } from "@/data/pricing";
import { formatPlanPrice, planAmount } from "@/components/pricing/formatPlanPrice";
import { Button } from "@/components/ui/Button";
import { readCheckout, saveCheckout } from "@/lib/demo-checkout";

const methods = ["Card", "PayPal", "Google Pay", "Apple Pay"];

export function PaymentStep() {
  const params = useSearchParams();
  const router = useRouter();
  const billing = params.get("billing") === "annual" ? "annual" : "monthly";
  const plan = getPlan(params.get("plan"));
  const [method, setMethod] = useState(methods[0]);
  const [pending, setPending] = useState(false);

  async function pay() {
    if (pending) return;
    setPending(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    const current = readCheckout();
    const order = `ORD-AI-${Math.floor(10000 + Math.random() * 90000)}`;
    saveCheckout({
      plan: plan.id,
      billing,
      model: params.get("model") ?? current?.model,
      name: current?.name ?? "Demo user",
      company: current?.company ?? "",
      email: current?.email ?? "",
      country: current?.country ?? "",
      order,
    });
    router.push(`/payment/success?order=${order}&plan=${plan.id}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Payment method</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {methods.map((item) => (
            <button
              key={item}
              type="button"
              className={`h-11 rounded-[10px] border px-3 text-left text-[14px] ${
                method === item ? "border-foreground" : "border-border"
              }`}
              onClick={() => setMethod(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-6 text-muted">
          {method} is a visual option. No card number is collected and no payment provider is contacted.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" size="sm" disabled={pending} onClick={pay}>
          {pending ? "Processing…" : "Pay now"}
        </Button>
          <Button href="/payment/cancel" size="sm" variant="secondary">
            Cancel
          </Button>
          <Button href="/payment/failed" size="sm" variant="ghost">
            Preview failed state
          </Button>
        </div>
      </div>
      <aside className="h-fit border border-border bg-surface p-5">
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Due today</p>
        <p className="mt-3 text-lg font-medium">{formatPlanPrice(plan, billing)}</p>
        <p className="mt-2 text-[13px] text-muted">
          {plan.name} · {billing} · {method}
        </p>
        <p className="mt-4 font-mono text-[13px]">Total ${planAmount(plan, billing).toFixed(2)}</p>
      </aside>
    </div>
  );
}
