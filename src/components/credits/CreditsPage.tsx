"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { CreditPurchase, BalanceCheck } from "@/components/credits/CreditPurchase";
import { CREDITS, topupBonusFor } from "@/data/credits";
import { useMerchant } from "@/lib/merchant";
import { formatInr } from "@/lib/inr";
import { Button } from "@/components/ui/Button";

export function CreditsPage() {
  const { creditValidityDays: days } = useMerchant();
  const steps = [
    {
      title: "Pick an amount",
      body: `The meter starts at ${formatInr(CREDITS.min)} and runs to ${formatInr(CREDITS.max)}.`,
    },
    {
      title: "Pay by UPI",
      body: "You pay that amount. The token is created only after the payment is confirmed.",
    },
    {
      title: "Copy your token",
      body: `The code looks like ${CREDITS.prefix}-7K9P-X4QM-2B8D. Anyone who has it can spend the balance.`,
    },
    {
      title: "Redeem at checkout",
      body: `Paste it on the payment step. Use some now and keep the rest — valid ${days} days.`,
    },
  ];

  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-12 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/pricing.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-10 text-center md:pt-14 md:pb-12">
            <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
              <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
              Catalog credits
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              Buy credits now.
              <span className="block">Redeem on a plan later.</span>
            </h1>
            <p className="mt-5 max-w-[480px] text-[15px] leading-7 text-muted md:text-[16px]">
              Pre-pay from {formatInr(CREDITS.min)}. The token is valid for {days} days. Use it in part or in full at checkout. If it will not redeem, write to support — the reply window is on the refund page.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#buy-credits">
                Buy credits
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/refund-policy" variant="secondary">
                Refund policy
              </Button>
            </div>
          </div>
        </div>

        <div className="grid border-t border-border lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="border-b border-border px-6 py-10 md:px-10 lg:border-r lg:border-b-0">
            <h2 className="text-[22px] font-medium tracking-[-0.03em]">Why buy credits?</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-7 text-muted">
              <li>Bonus credit is added when you buy {formatInr(CREDITS.topupBonus[0].min)} or more.</li>
              <li>Redeem on Route, Volume, or Command. Unused balance stays on the token.</li>
              <li>Valid {days} days from the day you buy, set in the server configuration.</li>
            </ul>
            <div className="mt-8 overflow-hidden rounded-[20px] border border-border">
              <table className="w-full text-left text-[14px]">
                <caption className="sr-only">Bonus credit when you buy</caption>
                <thead className="bg-background text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">You buy</th>
                    <th className="px-4 py-3 font-medium">Bonus</th>
                    <th className="px-4 py-3 font-medium">You get</th>
                  </tr>
                </thead>
                <tbody>
                  {CREDITS.topupBonus.map((tier) => (
                    <tr key={tier.min} className="border-t border-border">
                      <td className="px-4 py-3">{formatInr(tier.min)} or more</td>
                      <td className="px-4 py-3">+{tier.percent}%</td>
                      <td className="px-4 py-3">{formatInr(tier.min + topupBonusFor(tier.min))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13px] text-muted">
              Maximum bonus {formatInr(CREDITS.topupBonusCap)} per purchase. Bonus credit is promotional and is not refunded.
            </p>
          </div>
          <aside className="px-6 py-10 md:px-8">
            <h2 className="text-[18px] font-medium tracking-[-0.02em]">How it works</h2>
            <ol className="mt-5 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <p className="font-mono text-[12px] tracking-[0.08em] text-muted">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-[15px] font-medium">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-6 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[13px] leading-6 text-muted">
              Credits are a prepaid balance for this website only. They are not cash. See the{" "}
              <Link href="/refund-policy" className="text-foreground underline decoration-border underline-offset-4">
                refund policy
              </Link>
              .
            </p>
          </aside>
        </div>

        <div className="border-t border-border px-6 py-10 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <CreditPurchase />
            <BalanceCheck />
          </div>
        </div>
      </div>
    </section>
  );
}
