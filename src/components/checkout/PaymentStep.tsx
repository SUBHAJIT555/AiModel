"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderReceipt } from "@/components/checkout/OrderReceipt";
import { getModel } from "@/data/models";
import { getPlan } from "@/data/pricing";
import { quotedAmount } from "@/components/pricing/formatPlanPrice";
import { formatMillions } from "@/lib/inr";
import { Button } from "@/components/ui/Button";
import { readCheckout, saveCheckout } from "@/lib/demo-checkout";

const methods = ["Card", "PayPal", "Google Pay", "Apple Pay"];

export function PaymentStep() {
  const params = useSearchParams();
  const router = useRouter();
  const billing = params.get("billing") === "annual" ? "annual" : "monthly";
  const plan = getPlan(params.get("plan"));
  const tokens = Number(params.get("tokens")) || 0;
  const unit = params.get("unit");
  const modelSlug = params.get("model");
  const model = getModel(modelSlug ?? "");
  const amount = quotedAmount(plan, billing, tokens, modelSlug);
  const country = params.get("country") || "India";
  const volume =
    tokens > 0 && (plan.variable || model)
      ? params.get("unit") === "million" || (!params.get("unit") && plan.variable)
        ? `${formatMillions(tokens)} tokens`
        : `${tokens} ${params.get("unit") ?? "units"}`
      : null;
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

  const back = new URLSearchParams({ plan: plan.id, billing });
  if (tokens) back.set("tokens", String(tokens));
  if (unit) back.set("unit", unit);
  if (modelSlug) back.set("model", modelSlug);
  if (params.get("country")) back.set("country", params.get("country") ?? "");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
      <div className="rounded-[22px] border border-border bg-surface p-6 md:p-8">
        <h2 className="text-[18px] font-medium tracking-[-0.02em]">Payment method</h2>
        <div className="mt-6 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Payment method">
          {methods.map((item) => {
            const selected = method === item;
            return (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`h-12 rounded-[14px] px-4 text-left text-[14px] ${
                  selected
                    ? "bg-foreground text-surface shadow-[0_2px_6px_rgb(17_19_24/0.18)]"
                    : "border border-border text-foreground"
                }`}
                onClick={() => setMethod(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-[14px] leading-6 text-muted">
          {method} is a visual option. No card number is collected and no payment provider is contacted.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" disabled={pending} onClick={pay}>
            {pending ? "Processing…" : "Pay now"}
          </Button>
          <Button href={`/checkout?${back.toString()}`} variant="secondary">
            Back
          </Button>
          <Button href="/payment/cancel" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
      <OrderReceipt
        planName={plan.name}
        billing={billing}
        variable={Boolean(plan.variable)}
        subtotal={amount}
        country={country}
        volume={volume}
        method={method}
        model={
          model
            ? { displayName: model.displayName, provider: model.provider, providerSlug: model.providerSlug }
            : null
        }
      />
    </div>
  );
}
