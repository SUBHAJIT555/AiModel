import type { Metadata } from "next";
import Link from "next/link";
import { models } from "@/data/models";
import { ModelDirectory } from "@/components/models/ModelDirectory";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Models",
  description: "Explore a demonstration catalog of AI models across reasoning, coding, vision, image, video, and audio.",
};

export default function ModelsPage() {
  return (
    <>
      <Section center dividerBottom grid ruler spacing="hero">
        <Container>
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Catalog</p>
          <h1 className="mt-4 max-w-[12ch] text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.045em]">
            Every model.
            <span className="block">One interface.</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-[1.6] text-muted">
            Explore AI models across reasoning, coding, vision, image, video and audio through one unified interface.
          </p>
        </Container>
      </Section>
      <Section spacing="compact">
        <Container>
          <ModelDirectory models={models} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border border-border bg-surface px-5 py-5">
            <p className="text-sm text-muted">Compare plans for the demo workspace.</p>
            <Button href="/pricing" size="sm">
              View pricing
            </Button>
          </div>
          <p className="mt-4 text-[12px] text-muted">
            <Link className="hover:text-foreground" href="/pricing">
              Pricing
            </Link>{" "}
            on this page is illustrative.
          </p>
        </Container>
      </Section>
    </>
  );
}
