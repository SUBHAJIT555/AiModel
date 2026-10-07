import type { Metadata } from "next";
import { PricingBoard } from "@/components/pricing/PricingBoard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Demonstration plans for the template. Figures are placeholders.",
};

export default function PricingPage() {
  return (
    <Section center dividerBottom grid ruler spacing="hero">
      <Container>
        <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Plans</p>
        <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.045em]">
          Simple platform pricing.
        </h1>
        <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">
          Developer, Scale, and Enterprise are interface examples. Nothing on this page bills a card.
        </p>
        <div className="mt-10">
          <PricingBoard />
        </div>
      </Container>
    </Section>
  );
}
