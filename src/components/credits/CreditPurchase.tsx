"use client";

import { useState } from "react";
import Link from "next/link";
import WakeSlider from "@/components/pricing/WakeSlider";
import { Button } from "@/components/ui/Button";
import { CREDITS, parseCreditAmount, topupBonusFor } from "@/data/credits";
import { useMerchant } from "@/lib/merchant";
import { formatInr } from "@/lib/inr";
import { indianMobile, preferredUpiMode, splitCustomerName, startMpurseCheckout, PENDING_ORDER_KEY } from "@/lib/checkout/mpurse";

const sliderProps = {
  bars: 40,
  height: 20,
  restHeight: 20,
  gap: 3,
  fillColor: "#6c5cff",
  trackColor: "#e2e5ea",
  sensitivity: 1,
  reach: 6,
  skew: 0.6,
  glide: 0.3,
  smoothing: 100,
} as const;

export function CreditPurchase() {
  const { creditValidityDays: days } = useMerchant();
  const [amount, setAmount] = useState<number>(500);
  const [text, setText] = useState("500");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [, typedError] = parseCreditAmount(text);
  const valid = !typedError;
  const bonus = valid ? topupBonusFor(amount) : 0;
  const expires = new Date(Date.now() + days * 86400000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const choose = (next: number) => {
    setAmount(next);
    setText(String(next));
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    if (!valid) {
      setError(typedError);
      return;
    }
    const phone = indianMobile(mobile);
    if (!name.trim() || !email.includes("@") || !phone) {
      setError("Add your name, email, and a 10-digit Indian mobile number.");
      return;
    }
    setError("");
    setPending(true);
    const { firstName, lastName } = splitCustomerName(name);
    try {
      const result = await startMpurseCheckout({
        action: "credit_purchase",
        amount: String(amount),
        upi_mode: preferredUpiMode(),
        billing_first_name: firstName,
        billing_last_name: lastName,
        billing_email: email.trim(),
        billing_phone: phone,
      });
      sessionStorage.setItem(PENDING_ORDER_KEY, result.order_id!);
      window.location.assign(`/checkout/pay?order_id=${encodeURIComponent(result.order_id!)}`);
    } catch (payError) {
      setError(payError instanceof Error ? payError.message : "Unable to start UPI payment.");
      setPending(false);
    }
  }

  return (
    <form id="buy-credits" onSubmit={(event) => void submit(event)} noValidate className="overflow-hidden rounded-[24px] border border-border bg-surface">
      <div className="bg-[#17191e] px-6 py-7 text-white md:px-8">
        <p className="font-mono text-[12px] tracking-[0.08em] text-white/50 uppercase">Buy catalog credits</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <p className="text-[40px] leading-none font-medium tracking-[-0.04em] tabular-nums" aria-live="polite">
            {formatInr(amount)}
          </p>
          <p className="text-[13px] text-white/55">Drag, tap, or type</p>
        </div>
        <div className="mt-6">
          <WakeSlider
            {...sliderProps}
            value={amount}
            min={CREDITS.min}
            max={CREDITS.max}
            step={CREDITS.step}
            ariaLabel="Credit amount in rupees"
            formatValue={formatInr}
            onChange={choose}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Quick amounts">
          {CREDITS.quickAmounts.map((quick) => (
            <button
              key={quick}
              type="button"
              aria-pressed={amount === quick && valid}
              onClick={() => choose(quick)}
              className={`h-9 rounded-full px-3.5 text-[13px] ${
                amount === quick && valid ? "bg-white text-[#17191e]" : "bg-white/10 text-white"
              }`}
            >
              {formatInr(quick)}
            </button>
          ))}
        </div>
        <label htmlFor="credit-amount" className="mt-5 block text-[13px] text-white/70">
          Or enter an amount
        </label>
        <div className="mt-1.5 flex items-center rounded-[12px] bg-white px-4 text-[#17191e]">
          <span className="text-[22px] font-medium">₹</span>
          <input
            id="credit-amount"
            inputMode="numeric"
            value={text}
            onChange={(event) => {
              const clean = event.target.value.replace(/[^\d]/g, "").slice(0, 5);
              setText(clean);
              const [parsed] = parseCreditAmount(clean);
              if (parsed) setAmount(parsed);
            }}
            onBlur={() => {
              if (!valid) setText(String(amount));
            }}
            aria-invalid={!valid}
            className="h-14 w-full bg-transparent px-2 text-[22px] font-medium outline-none"
          />
        </div>
        <p className={`mt-2 text-[13px] ${valid ? "text-white/55" : "text-[#f5c97a]"}`} role={valid ? undefined : "alert"}>
          {valid
            ? `Any amount from ${formatInr(CREDITS.min)} to ${formatInr(CREDITS.max)}.`
            : typedError}
        </p>
        {valid ? (
          <p className="mt-4 rounded-[12px] bg-white/8 px-4 py-3 text-[14px]">
            You pay {formatInr(amount)} → you get {formatInr(amount + bonus)}
            {bonus > 0 ? ` (${formatInr(bonus)} bonus)` : ` · buy ${formatInr(CREDITS.topupBonus[0].min)} or more for bonus credit`}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 px-6 py-6 md:grid-cols-2 md:px-8">
        <label className="md:col-span-2 text-[11px] font-bold tracking-[0.06em] uppercase">
          Full name
          <input
            className="mt-1.5 h-11 w-full rounded-md border border-border bg-white px-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:border-foreground"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className="text-[11px] font-bold tracking-[0.06em] uppercase">
          Mobile number
          <input
            className="mt-1.5 h-11 w-full rounded-md border border-border bg-white px-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:border-foreground"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
          />
        </label>
        <label className="text-[11px] font-bold tracking-[0.06em] uppercase">
          Email
          <input
            className="mt-1.5 h-11 w-full rounded-md border border-border bg-white px-3 text-[14px] font-normal normal-case tracking-normal outline-none focus:border-foreground"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <dl className="md:col-span-2 space-y-2 rounded-[16px] bg-background px-4 py-4 text-[14px]">
          <div className="flex justify-between">
            <dt>Credits you pay for</dt>
            <dd className="tabular-nums">{valid ? formatInr(amount) : "—"}</dd>
          </div>
          {bonus > 0 ? (
            <div className="flex justify-between text-success">
              <dt>Bonus credit</dt>
              <dd className="tabular-nums">+{formatInr(bonus)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt>Total on your token</dt>
            <dd className="tabular-nums">{valid ? formatInr(amount + bonus) : "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Valid until (if bought today)</dt>
            <dd>{expires}</dd>
          </div>
          <div className="flex items-end justify-between border-t border-border pt-3">
            <dt className="font-medium">You pay by UPI</dt>
            <dd className="text-[22px] font-medium tracking-[-0.03em] tabular-nums">{valid ? formatInr(amount) : "—"}</dd>
          </div>
        </dl>
        {error ? (
          <p className="md:col-span-2 text-[14px] text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <div className="md:col-span-2">
          <Button type="submit" className="w-full" disabled={pending || !valid}>
            {pending ? "Starting UPI…" : `Purchase credits · ${valid ? formatInr(amount) : ""}`}
          </Button>
          <p className="mt-3 text-[12px] leading-5 text-muted">
            Credits are a prepaid balance for this website, valid for {days} days. They are not cash and cannot be withdrawn.
            Bonus credit is promotional and not refundable. See the{" "}
            <Link href="/refund-policy" className="underline decoration-border underline-offset-4">
              refund policy
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

type TokenInfo = {
  hint: string;
  original: number;
  balance: number;
  available: number;
  on_hold?: number;
  status: string;
  created_at: string;
  expires_at: string;
};

export function BalanceCheck() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [error, setError] = useState("");

  async function check(event: React.FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setToken(null);
    setError("");
    try {
      const response = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "credit_check", credit_token: code.trim() }),
      });
      const data = (await response.json()) as { success?: boolean; token?: TokenInfo; error?: string; message?: string };
      if (data.token) {
        setToken(data.token);
        setError(data.message || "");
      } else {
        setError(data.error || "We could not check this token.");
      }
    } catch (checkError) {
      setError(checkError instanceof Error ? checkError.message : "Could not reach the payment server.");
    } finally {
      setLoading(false);
    }
  }

  const dateText = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div id="balance" className="scroll-mt-28 rounded-[24px] border border-border bg-surface p-6 md:p-8">
      <h2 className="text-[18px] font-medium tracking-[-0.02em]">Check a token</h2>
      <p className="mt-2 text-[14px] leading-6 text-muted">Paste a code you already have. Nothing is spent here.</p>
      <form onSubmit={(event) => void check(event)} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="bal-code" className="sr-only">
          Credit token
        </label>
        <input
          id="bal-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder={`${CREDITS.prefix}-XXXX-XXXX-XXXX`}
          autoComplete="off"
          spellCheck={false}
          className="h-11 min-w-0 flex-1 rounded-md border border-border bg-white px-3 font-mono text-[13px] outline-none focus:border-foreground"
        />
        <Button type="submit" variant="secondary" disabled={loading || !code.trim()}>
          {loading ? "Checking…" : "Check"}
        </Button>
      </form>
      {error && !token ? (
        <p className="mt-3 text-[14px] text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {token ? (
        <div className="mt-5" role="status">
          <p className="font-mono text-[12px] text-muted">{token.hint}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
            <div className="rounded-[14px] bg-background px-3 py-3">
              <dt className="text-muted">Purchased</dt>
              <dd className="mt-1 text-[18px] font-medium">{formatInr(token.original)}</dd>
            </div>
            <div className="rounded-[14px] bg-background px-3 py-3">
              <dt className="text-muted">Remaining</dt>
              <dd className="mt-1 text-[18px] font-medium">{formatInr(token.available)}</dd>
            </div>
            <div className="rounded-[14px] bg-background px-3 py-3">
              <dt className="text-muted">Bought on</dt>
              <dd className="mt-1 font-medium">{dateText(token.created_at)}</dd>
            </div>
            <div className="rounded-[14px] bg-background px-3 py-3">
              <dt className="text-muted">Expires</dt>
              <dd className="mt-1 font-medium">{dateText(token.expires_at)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[12px] capitalize text-muted">{token.status}</p>
          {token.on_hold && token.on_hold > 0 ? (
            <p className="mt-2 text-[12px] text-muted">
              {formatInr(token.on_hold)} is reserved for a payment in progress and comes back if that payment does not complete.
            </p>
          ) : null}
          {error ? <p className="mt-2 text-[13px] text-danger">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
