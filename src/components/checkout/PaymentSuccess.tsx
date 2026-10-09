"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { OrderReceipt } from "@/components/checkout/OrderReceipt";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/components/motion/transitions";
import { contactOffice } from "@/data/contact";
import { getModel } from "@/data/models";
import { getPlan } from "@/data/pricing";
import { quotedAmount } from "@/components/pricing/formatPlanPrice";
import { formatMillions } from "@/lib/inr";
import { readCheckout, type DemoCheckout } from "@/lib/demo-checkout";

type PaymentSuccessProps = {
  orderId?: string;
  receiptSent?: boolean;
  mailError?: string;
  paidTotal?: number | null;
};

export function PaymentSuccess({ orderId, receiptSent, mailError, paidTotal }: PaymentSuccessProps) {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [checkout, setCheckout] = useState<DemoCheckout | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCheckout(readCheckout());
    setReady(true);
  }, []);

  const planId = checkout?.plan || params.get("plan") || "volume";
  const plan = getPlan(planId);
  const billing = checkout?.billing || (params.get("billing") === "annual" ? "annual" : "monthly");
  const country = checkout?.country || params.get("country") || "India";
  const model = getModel(checkout?.model || params.get("model") || "");
  const order = orderId || params.get("order_id") || params.get("order") || checkout?.order || "";
  const tokens = resolveTokens(checkout?.tokens, params.get("tokens"), plan.variable, plan.ratePerMillion, country, paidTotal);
  const subtotal = quotedAmount(plan, billing, tokens, model?.slug ?? null);
  const volume =
    tokens > 0 && (plan.variable || model)
      ? `${formatMillions(tokens)} tokens`
      : null;
  const note = receiptNote({
    order,
    email: checkout?.email,
    receiptSent,
    mailError,
  });

  return (
    <section className="bg-background -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="flex flex-col items-center px-6 py-10 md:py-14">
          <CheckMark reduce={!!reduce} />
          <h1 className="mt-5 text-center text-[clamp(1.75rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.04em]">
            Payment received.
          </h1>
          <p className="mt-3 max-w-sm text-center text-[15px] leading-7 text-muted">{ready ? note : "Confirming the order."}</p>
          {ready ? (
            <motion.div
              className="relative mt-8 w-full max-w-[320px]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.35, duration: 0.55, ease: easeOut }}
            >
              <OrderReceipt
                planName={plan.name}
                billing={billing}
                variable={!!plan.variable}
                subtotal={subtotal}
                country={country}
                volume={volume}
                model={
                  model
                    ? { displayName: model.displayName, provider: model.provider, providerSlug: model.providerSlug }
                    : null
                }
                paid
                orderId={order || undefined}
              />
              <PaidStamp reduce={!!reduce} />
            </motion.div>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/models" variant="secondary">
              See the models
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function resolveTokens(
  saved: number | undefined,
  query: string | null,
  variable: boolean | undefined,
  rate: number | undefined,
  country: string,
  paidTotal?: number | null,
) {
  if (saved && saved > 0) return saved;
  const fromQuery = Number(query);
  if (fromQuery > 0) return fromQuery;
  if (variable && paidTotal && paidTotal > 0 && rate) {
    const taxable = country === "India" ? paidTotal / 1.18 : paidTotal;
    return Math.max(1, Math.round(taxable / rate));
  }
  return variable ? 20 : 0;
}

function receiptNote({
  order,
  email,
  receiptSent,
  mailError,
}: {
  order: string;
  email?: string;
  receiptSent?: boolean;
  mailError?: string;
}) {
  const orderLine = order ? `Order ${order}. ` : "";
  if (receiptSent && email) {
    return `${orderLine}A receipt was sent to ${email}. Check the inbox and the spam folder.`;
  }
  if (mailError) {
    return `${orderLine}Payment recorded. The receipt email did not send. Save the order id and write to ${contactOffice.email}.`;
  }
  if (email) {
    return `${orderLine}Payment recorded for ${email}. The receipt email sends once mail is configured.`;
  }
  return `${orderLine}Payment recorded. Keep this receipt.`;
}

function CheckMark({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="grid size-16 place-items-center rounded-full bg-success/10"
      initial={reduce ? false : { scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 18 }}
    >
      <svg viewBox="0 0 72 72" className="size-14" aria-hidden>
        <motion.circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="var(--success)"
          strokeWidth="2"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: easeOut }}
        />
        <motion.path
          d="M23 37.5 L32.5 47 L50 27"
          fill="none"
          stroke="var(--success)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.32, delay: reduce ? 0 : 0.32, ease: easeOut }}
        />
      </svg>
      <span className="sr-only">Payment complete</span>
    </motion.div>
  );
}

function PaidStamp({ reduce }: { reduce: boolean }) {
  return (
    <motion.p
      aria-hidden
      className="pointer-events-none absolute right-5 bottom-16 grid size-20 place-items-center rounded-full border-2 border-success bg-white font-mono text-[12px] font-semibold tracking-[0.18em] text-success uppercase shadow-[0_8px_18px_-12px_rgb(34_160_107/0.9)]"
      initial={reduce ? false : { opacity: 0, scale: 1.45, rotate: -24 }}
      animate={{ opacity: 1, scale: 1, rotate: -14 }}
      transition={reduce ? { duration: 0 } : { delay: 0.85, type: "spring", stiffness: 420, damping: 16 }}
    >
      Paid
    </motion.p>
  );
}
