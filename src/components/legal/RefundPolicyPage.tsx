"use client";

import Link from "next/link";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { legalNav } from "@/data/legal";
import { useMerchant } from "@/lib/merchant";

export function RefundPolicyPage() {
  const { email, creditValidityDays: days } = useMerchant();

  const sections = [
    {
      title: "How to ask",
      body: [
        `If you cannot redeem a credit token, or you want a refund of unused credits, write to ${email} with your token code and order ID. The team replies as soon as possible, and within ${days} days of your message.`,
      ],
    },
    {
      title: "If you cannot use a model",
      body: [
        `If you paid for a plan or a model and you are unable to use it, write to ${email} with your Order ID. The team replies as soon as possible, and within ${days} days of your message.`,
      ],
    },
    {
      title: "Credit tokens",
      body: [
        `A catalog credit token is valid for ${days} days from the day you buy it. After that it cannot be redeemed.`,
        `Credits cannot be exchanged for cash except as a refund of the unused amount you actually paid, sent back to the original UPI account. Bonus credit is promotional and is not refunded.`,
        "Credits can be used only on this website, in part or in full. Unused balance stays on the token until it expires.",
      ],
    },
    {
      title: "Redeeming credits on a plan",
      body: [
        "At checkout, paste your token on the payment step. You can apply some or all of the available balance. If credits cover the whole bill, no UPI payment is taken. If a UPI remainder is started and then fails or expires, reserved credits go back to your token.",
        "If an order paid with credits is later refunded, the credit part returns to the token and any UPI part returns to the original UPI account.",
      ],
    },
    {
      title: "Plan orders",
      body: [
        "You can ask us to cancel a plan order by email before the workspace is opened. If we cancel an order, we refund the amount paid.",
        "Approved refunds of UPI payments go back to the original UPI account, normally within 5–7 working days after we confirm the request.",
      ],
    },
    {
      title: "Failed or duplicate payments",
      body: [
        "If money was debited but your order or credit token was not confirmed, or you were charged twice, write to us with your Order ID and UPI reference. Verified amounts are refunded to the original UPI account.",
      ],
    },
  ];

  return (
    <div className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <section>
        <div className="relative mx-auto w-full max-w-5xl">
          <HeroBackdrop src="/heroes/legal-terms.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-10 text-center md:pt-14 md:pb-12">
            <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
              <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
              Legal
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              Refund policy
            </h1>
            <p className="mt-5 max-w-[480px] text-[15px] leading-7 text-muted md:text-[16px]">
              If a token will not redeem, or you cannot use a model you paid for, write to {email}. We reply as soon as we can, within {days} days.
            </p>
            <p className="mt-6 text-[13px] text-muted">
              <a className="text-foreground underline decoration-border underline-offset-4" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Legal">
              {legalNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.slug === "refund" ? "page" : undefined}
                  className={
                    item.slug === "refund"
                      ? "text-[14px] font-medium text-foreground"
                      : "text-[14px] text-muted hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <article className="mx-auto w-full max-w-5xl px-6 py-8 md:py-10">
        {sections.map((section, index) => (
          <section key={section.title} className={index > 0 ? "mt-10 border-t border-border pt-10" : undefined}>
            <h2 className="text-[1.25rem] leading-snug font-medium tracking-[-0.03em]">
              <span className="mr-3 font-mono text-[12px] tracking-[0.08em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[15px] leading-7 text-muted">
                {paragraph.includes(email) ? (
                  <>
                    {paragraph.split(email).map((part, partIndex, parts) => (
                      <span key={`${section.title}-${partIndex}`}>
                        {part}
                        {partIndex < parts.length - 1 ? (
                          <a className="text-foreground underline decoration-border underline-offset-4" href={`mailto:${email}`}>
                            {email}
                          </a>
                        ) : null}
                      </span>
                    ))}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
