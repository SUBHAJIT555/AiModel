"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OrderReceipt } from "@/components/checkout/OrderReceipt";
import { getModel } from "@/data/models";
import { clampVolumeRupees, getPlan } from "@/data/pricing";
import { CREDITS } from "@/data/credits";
import { quotedAmount } from "@/components/pricing/formatPlanPrice";
import { formatInr, formatMillions } from "@/lib/inr";
import { Button } from "@/components/ui/Button";
import { readCheckout, saveCheckout } from "@/lib/demo-checkout";
import { indianMobile, preferredUpiMode, splitCustomerName, startMpurseCheckout, PENDING_ORDER_KEY } from "@/lib/checkout/mpurse";

const methods = [
  { id: "upi", label: "UPI", available: true, note: "On a phone, your UPI app opens. On a computer, you scan a QR code on the next page." },
  { id: "card", label: "Card", available: false, note: "Cards are not available." },
  { id: "netbanking", label: "Net banking", available: false, note: "Net banking is not available." },
] as const;

type CreditToken = {
  hint: string;
  available: number;
  balance: number;
  expires_at: string;
};

export function PaymentStep() {
  const params = useSearchParams();
  const plan = getPlan(params.get("plan"));
  const tokens = Number(params.get("tokens")) || 0;
  const unit = params.get("unit");
  const rupees = Number(params.get("amount")) || 0;
  const modelSlug = params.get("model");
  const model = getModel(modelSlug ?? "");
  const amount = quotedAmount(plan, tokens, modelSlug, rupees);
  const country = params.get("country") || "India";
  const payable = amount;
  const volume = plan.variable
    ? formatInr(clampVolumeRupees(rupees || amount))
    : tokens > 0 && model
      ? unit === "million"
        ? `${formatMillions(tokens)} tokens`
        : `${tokens} ${unit ?? "units"}`
      : null;
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("upi");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [creditUse, setCreditUse] = useState("");
  const [checked, setChecked] = useState<CreditToken | null>(null);
  const [tokenNote, setTokenNote] = useState("");
  const [checking, setChecking] = useState(false);
  const selected = methods.find((item) => item.id === method) ?? methods[0];

  const maxCredit = checked ? Math.min(checked.available, payable) : 0;
  const useNow = creditUse ? Math.min(Math.max(0, Number(creditUse) || 0), maxCredit) : maxCredit;
  const creditsApplied = checked && useNow > 0 ? useNow : 0;
  const due = Math.max(0, payable - creditsApplied);

  async function lookupToken() {
    const code = token.trim();
    if (!code) return;
    setChecking(true);
    setTokenNote("");
    setChecked(null);
    try {
      const response = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "credit_check", credit_token: code }),
      });
      const data = (await response.json()) as { success?: boolean; token?: CreditToken; message?: string; error?: string };
      if (!response.ok || !data.token) {
        setTokenNote(data.error || data.message || "We could not find this token.");
        return;
      }
      setChecked(data.token);
      setTokenNote(data.message || "");
    } catch {
      setTokenNote("Payment server is not running. In a second terminal run: yarn php:api");
    } finally {
      setChecking(false);
    }
  }

  async function pay() {
    if (pending) return;
    const current = readCheckout();
    const phone = indianMobile(current?.phone ?? "");
    const city = current?.city?.trim() ?? "";
    const address = current?.address?.trim() ?? "";
    if (!current?.email || !phone || !address || !city) {
      setError("Go back and add your address, city, email, and a 10-digit Indian mobile number.");
      return;
    }
    if (due < 1 && creditsApplied < 1) {
      setError("This order has no amount to charge.");
      return;
    }
    if (due >= 1 && method !== "upi") {
      setError("UPI is the method that can be charged.");
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
        credit_token: checked ? token.trim() : "",
        credit_use: checked && creditsApplied > 0 ? String(creditsApplied) : "",
        cart_items: [
          {
            name: itemName,
            quantity: 1,
            price: payable,
          },
        ],
      });
      saveCheckout({
        ...current,
        order: result.order_id,
        tokens: tokens > 0 ? tokens : current.tokens,
        rupees: plan.variable ? amount : current.rupees,
      });
      if (result.flow === "credits") {
        window.location.assign(`/payment/success?order_id=${encodeURIComponent(result.order_id!)}`);
        return;
      }
      sessionStorage.setItem(PENDING_ORDER_KEY, result.order_id!);
      window.location.assign(`/checkout/pay?order_id=${encodeURIComponent(result.order_id!)}`);
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : "Unable to start payment.");
      setPending(false);
    }
  }

  const back = new URLSearchParams({ plan: plan.id });
  if (tokens) back.set("tokens", String(tokens));
  if (unit) back.set("unit", unit);
  if (plan.variable) back.set("amount", String(amount));
  if (modelSlug) back.set("model", modelSlug);
  if (params.get("country")) back.set("country", params.get("country") ?? "");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
      <div className="rounded-[22px] border border-border bg-surface p-6 md:p-8">
        <h2 className="text-[18px] font-medium tracking-[-0.02em]">Redeem credits</h2>
        <p className="mt-2 text-[14px] leading-6 text-muted">
          Have a token? Paste it here. Unused balance stays on the token.{" "}
          <Link href="/credits" className="text-foreground underline decoration-border underline-offset-4">
            Buy credits
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="credit-token">
            Credit token
          </label>
          <input
            id="credit-token"
            value={token}
            onChange={(event) => {
              setToken(event.target.value.toUpperCase());
              setChecked(null);
              setTokenNote("");
            }}
            placeholder={`${CREDITS.prefix}-XXXX-XXXX-XXXX`}
            autoComplete="off"
            spellCheck={false}
            className="h-11 min-w-0 flex-1 rounded-md border border-border bg-white px-3 font-mono text-[13px] outline-none focus:border-foreground"
          />
          <Button type="button" variant="secondary" disabled={checking || !token.trim()} onClick={() => void lookupToken()}>
            {checking ? "Checking…" : "Check"}
          </Button>
        </div>
        {tokenNote ? (
          <p className="mt-2 text-[13px] text-danger" role="alert">
            {tokenNote}
          </p>
        ) : null}
        {checked ? (
          <div className="mt-4 rounded-[16px] border border-border bg-background px-4 py-3">
            <p className="font-mono text-[12px] text-muted">{checked.hint}</p>
            <p className="mt-1 text-[14px]">
              Available {formatInr(checked.available)} · this order can use {formatInr(maxCredit)}
            </p>
            {maxCredit > 1 ? (
              <label className="mt-3 block text-[12px] text-muted">
                Use now (leave blank for the maximum)
                <input
                  inputMode="numeric"
                  value={creditUse}
                  onChange={(event) => setCreditUse(event.target.value.replace(/[^\d]/g, ""))}
                  placeholder={String(maxCredit)}
                  className="mt-1.5 h-10 w-full rounded-md border border-border bg-white px-3 text-[14px] outline-none focus:border-foreground"
                />
              </label>
            ) : null}
          </div>
        ) : null}

        <h2 className="mt-8 text-[18px] font-medium tracking-[-0.02em]">Payment method</h2>
        <p className="mt-2 text-[14px] leading-6 text-muted">
          {due < 1 && creditsApplied > 0
            ? "Credits cover this order. No UPI payment is needed."
            : "UPI is the method that can be charged. Credits come off the total."}
        </p>
        {due >= 1 ? (
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
        ) : null}
        {due >= 1 ? <p className="mt-4 text-[14px] leading-6 text-muted">{selected.note}</p> : null}
        {error ? (
          <p className="mt-4 text-[14px] text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" disabled={pending || (due >= 1 && method !== "upi")} onClick={() => void pay()}>
            {pending ? "Starting…" : due < 1 && creditsApplied > 0 ? "Place order with credits" : "Pay with UPI"}
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
        variable={Boolean(plan.variable)}
        subtotal={amount}
        country={country}
        volume={volume}
        method={due < 1 && creditsApplied > 0 ? "Credits" : "UPI"}
        creditsApplied={creditsApplied}
        model={
          model
            ? { displayName: model.displayName, provider: model.provider, providerSlug: model.providerSlug }
            : null
        }
      />
    </div>
  );
}
