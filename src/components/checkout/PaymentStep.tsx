"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderReceipt } from "@/components/checkout/OrderReceipt";
import { getModel } from "@/data/models";
import { getPlan } from "@/data/pricing";
import { quotedAmount } from "@/components/pricing/formatPlanPrice";
import { formatMillions } from "@/lib/inr";
import { gstBreakup } from "@/lib/gst";
import { Button } from "@/components/ui/Button";
import { readCheckout, saveCheckout } from "@/lib/demo-checkout";
import { indianMobile, preferredUpiMode, splitCustomerName, startMpurseCheckout, PENDING_ORDER_KEY } from "@/lib/checkout/mpurse";

const methods = [
  { id: "upi", label: "UPI", available: true, note: "On a phone, your UPI app opens. On a computer, you scan a QR code on the next page." },
  { id: "card", label: "Card", available: false, note: "Cards are not available." },
  { id: "netbanking", label: "Net banking", available: false, note: "Net banking is not available." },
] as const;

export function PaymentStep() {
  const params = useSearchParams();
  const billing = params.get("billing") === "annual" ? "annual" : "monthly";
  const plan = getPlan(params.get("plan"));
  const tokens = Number(params.get("tokens")) || 0;
  const unit = params.get("unit");
  const modelSlug = params.get("model");
  const model = getModel(modelSlug ?? "");
  const amount = quotedAmount(plan, billing, tokens, modelSlug);
  const country = params.get("country") || "India";
  const payable = gstBreakup(amount, country).total;
  const volume =
    tokens > 0 && (plan.variable || model)
      ? params.get("unit") === "million" || (!params.get("unit") && plan.variable)
        ? `${formatMillions(tokens)} tokens`
        : `${tokens} ${params.get("unit") ?? "units"}`
      : null;
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("upi");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const selected = methods.find((item) => item.id === method) ?? methods[0];

  async function pay() {
    if (pending || method !== "upi") return;
    const current = readCheckout();
    const phone = indianMobile(current?.phone ?? "");
    const city = current?.city?.trim() ?? "";
    const address = current?.address?.trim() ?? "";
    if (!current?.email || !phone || !address || !city) {
      setError("Go back and add your address, city, email, and a 10-digit Indian mobile number.");
      return;
    }
    if (payable < 1) {
      setError("This order has no amount to charge.");
      return;
    }
    setError("");
    setPending(true);
    const { firstName, lastName } = splitCustomerName(current.name);
    const itemName = model ? `${plan.name} · ${model.displayName}` : plan.name;
    try {
      const result = await startMpurseCheckout({
        action: "create_session",
        payment_method: "upi",
        upi_mode: preferredUpiMode(),
        billing_first_name: firstName,
        billing_last_name: lastName,
        billing_email: current.email.trim(),
        billing_phone: phone,
        billing_address: address,
        billing_town: city,
        billing_state: "",
        billing_postcode: current.zip ?? "",
        notes: current.company ? `Company: ${current.company}` : "",
        cart_items: [
          {
            name: `${itemName} (${billing === "annual" ? "Yearly" : "Monthly"})`,
            quantity: 1,
            price: payable,
          },
        ],
      });
      saveCheckout({ ...current, order: result.order_id, tokens: tokens > 0 ? tokens : current.tokens });
      sessionStorage.setItem(PENDING_ORDER_KEY, result.order_id!);
      window.location.assign(`/checkout/pay?order_id=${encodeURIComponent(result.order_id!)}`);
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : "Unable to start UPI payment.");
      setPending(false);
    }
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
        <p className="mt-2 text-[14px] leading-6 text-muted">UPI is the method that can be charged. The amount includes GST.</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Payment method">
          {methods.map((item) => {
            const active = method === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={!item.available || pending}
                className={`h-12 rounded-[14px] px-4 text-left text-[14px] disabled:cursor-not-allowed disabled:opacity-50 ${
                  active && item.available
                    ? "bg-foreground text-surface shadow-[0_2px_6px_rgb(17_19_24/0.18)]"
                    : "border border-border text-foreground"
                }`}
                onClick={() => item.available && setMethod(item.id)}
              >
                {item.label}
                {item.available ? "" : " · unavailable"}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-[14px] leading-6 text-muted">{selected.note}</p>
        {error ? (
          <p className="mt-4 text-[14px] text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" disabled={pending || method !== "upi"} onClick={pay}>
            {pending ? "Starting UPI…" : "Pay with UPI"}
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
        method="UPI"
        model={
          model
            ? { displayName: model.displayName, provider: model.provider, providerSlug: model.providerSlug }
            : null
        }
      />
    </div>
  );
}
