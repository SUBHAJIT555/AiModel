import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PricingBoard } from "@/components/pricing/PricingBoard";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Route is the smaller fee, Volume follows the tokens you run, and Command is the higher fee. Prices are in rupees.",
};

const notes = [
  {
    title: "Route",
    body: "₹999 a month, or ₹9,990 a year. A shared endpoint, routing policies, and the catalog.",
  },
  {
    title: "Volume",
    body: "₹80 for each million tokens, from 1M up to 1B. At the top of the slider that is ₹80,000.",
  },
  {
    title: "Command",
    body: "₹8,999 a month, or ₹89,990 a year. Region pins, an audit log, and a named contact.",
  },
];

export default function PricingPage() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/services.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-14 pb-12 text-center md:pt-20 md:pb-16">
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
              A smaller monthly fee, a token rate you set up to ₹80,000, and a higher plan. There is no free plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#plans">
                Compare plans
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/models" variant="secondary">
                Explore models
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
          <p className="max-w-md text-[14px] leading-6 text-muted">
            Amounts are in INR for this demo.{" "}
            <Link href="/contact" className="text-foreground underline decoration-border underline-offset-4">
              Contact
            </Link>{" "}
            does not start a contract.
          </p>
          <Button href="/contact">Talk to us</Button>
        </div>
      </div>
    </section>
  );
}
