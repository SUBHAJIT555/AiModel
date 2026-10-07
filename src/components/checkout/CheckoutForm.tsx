"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getModel } from "@/data/models";
import { getPlan } from "@/data/pricing";
import { formatPlanPrice, planAmount } from "@/components/pricing/formatPlanPrice";
import { Button } from "@/components/ui/Button";
import { saveCheckout } from "@/lib/demo-checkout";

const fieldClass =
  "mt-1 h-10 w-full rounded-[10px] border border-border bg-surface px-3 text-[14px] outline-none focus:border-border-strong";

export function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const billing = params.get("billing") === "annual" ? "annual" : "monthly";
  const plan = getPlan(params.get("plan"));
  const model = getModel(params.get("model") ?? "");
  const amount = planAmount(plan, billing);
  const [error, setError] = useState("");

  function submit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const name = String(formData.get("name") ?? "");
    if (!name || !email.includes("@")) {
      setError("Add a name and email to continue this demo.");
      return;
    }
    saveCheckout({
      plan: plan.id,
      billing,
      model: model?.slug,
      name,
      company: String(formData.get("company") ?? ""),
      email,
      country: String(formData.get("country") ?? "United States"),
    });
    const query = new URLSearchParams({ plan: plan.id, billing });
    if (model) query.set("model", model.slug);
    router.push(`/checkout/payment?${query.toString()}`);
  }

  return (
    <form action={submit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="border border-border bg-surface p-5">
        <h2 className="text-sm font-medium">Customer details</h2>
        <label className="mt-4 block text-[13px] text-muted">
          Name
          <input className={fieldClass} name="name" autoComplete="name" />
        </label>
        <label className="mt-4 block text-[13px] text-muted">
          Company
          <input className={fieldClass} name="company" autoComplete="organization" />
        </label>
        <label className="mt-4 block text-[13px] text-muted">
          Email
          <input className={fieldClass} name="email" type="email" autoComplete="email" />
        </label>
        <label className="mt-4 block text-[13px] text-muted">
          Country
          <select className={fieldClass} name="country" defaultValue="United States">
            {["United States", "United Kingdom", "Germany", "India", "Singapore"].map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
        {error ? <p className="mt-3 text-[13px] text-danger">{error}</p> : null}
        <Button className="mt-6" type="submit" size="sm">
          Continue to payment
        </Button>
      </div>
      <aside className="h-fit border border-border bg-surface p-5">
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Order summary</p>
        <h2 className="mt-3 text-lg font-medium">{plan.name}</h2>
        <p className="mt-1 text-[13px] text-muted capitalize">{billing}</p>
        {model ? <p className="mt-3 text-[13px]">Model · {model.displayName}</p> : null}
        <dl className="mt-5 space-y-2 border-t border-border pt-4 text-[13px]">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPlanPrice(plan, billing)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Tax</dt>
            <dd>$0.00</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt>Total</dt>
            <dd>{amount === 0 ? "$0.00" : `$${amount}`}</dd>
          </div>
        </dl>
      </aside>
    </form>
  );
}
