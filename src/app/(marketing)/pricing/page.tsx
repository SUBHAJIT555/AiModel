import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PricingBoard } from "@/components/pricing/PricingBoard";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three paid plans, in rupees. Route is a fixed fee, Volume runs from ₹10 to ₹9,899, and Command adds a region pin and an audit.",
};

const notes = [
  {
    title: "Route",
    body: "₹999 once. One endpoint, a route you can set, and the catalog.",
  },
  {
    title: "Volume",
    body: "Any amount from ₹10 to ₹9,899. Drag the slider to set what you pay.",
  },
  {
    title: "Command",
    body: "₹8,999 once. A region pin, an audit of policy changes, and a named contact.",
  },
];

export default function PricingPage() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-8 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/pricing.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-8 text-center md:pt-14 md:pb-10">
            <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
              <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
              Pricing
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              Pay for the
              <span className="block">
                <span className="text-primary">route</span> you run.
              </span>
            </h1>
            <p className="mt-5 max-w-[460px] text-[15px] leading-7 text-muted md:text-[16px]">
              Route is a fixed fee. Volume runs from ₹10 to ₹9,899. Command is the plan with a region pin and an audit. There is no free plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#plans">
                See the plans
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/credits" variant="secondary">
                Buy credits
              </Button>
            </div>
          </div>
        </div>

        <div id="plans" className="scroll-mt-28 border-t border-border">
          <PricingBoard />
        </div>

        <div className="grid border-t border-border md:grid-cols-3">
          {notes.map((note) => (
            <div key={note.title} className="border-b border-border px-6 py-8 md:border-r md:border-b-0 md:px-10 md:last:border-r-0">
              <h2 className="text-[15px] font-medium tracking-[-0.02em]">{note.title}</h2>
              <p className="mt-2 text-[14px] leading-6 text-muted">{note.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 md:px-10">
          <p className="max-w-xl text-[14px] leading-6 text-muted">
            Prices are in rupees. Credits you buy can be redeemed at checkout.{" "}
            <Link href="/refund-policy" className="whitespace-nowrap text-foreground underline decoration-border underline-offset-4">
              Refund policy
            </Link>
            .
          </p>
          <Button href="/contact">Talk to us</Button>
        </div>
      </div>
    </section>
  );
}
