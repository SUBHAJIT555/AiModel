import type { Metadata } from "next";
import { PricingBoard } from "@/components/pricing/PricingBoard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Fixed plans in rupees, plus a usage plan that follows the token slider.",
};

export default function PricingPage() {
  return (
    <Section center dividerBottom grid ruler spacing="hero">
      <Container>
        <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Plans</p>
        <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.045em]">
          Plans in rupees.
        </h1>
        <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">
          Developer and Scale are fixed. Enterprise follows the token slider.
        </p>
        <div className="relative z-10 mt-10">
          <PricingBoard />
        </div>
      </Container>
    </Section>
  );
}
