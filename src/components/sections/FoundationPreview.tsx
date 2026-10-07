import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { RoutePulse } from "@/components/motion/RoutePulse";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { models } from "@/data/models";

export function FoundationPreview() {
  return (
    <>
      <Section dividerBottom grid ruler spacing="hero">
        <Container className="relative">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
            Unified AI infrastructure
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[1.12] font-medium tracking-[-0.03em] text-balance md:text-5xl md:tracking-[-0.035em]">
            One API. Every model.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted md:text-[15px]">
            A single gateway for model discovery, routing, fallback, and usage records. This page
            is a foundation preview, not the finished homepage.
          </p>
          <div className="mt-8 max-w-sm">
            <DemoFrame label="routing visual" />
          </div>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted">
            <RoutePulse />
            <span>
              <AnimatedNumber value={models.length} /> models in the demo catalog
            </span>
          </div>
        </Container>
      </Section>
      <Section dividerBottom={false} grid spacing="normal" tone="dark">
        <Container className="relative grid gap-6 md:grid-cols-3">
          {["Normalize", "Route", "Observe"].map((label) => (
            <div key={label} className="rounded-[8px] border border-dark-border bg-dark-surface p-6">
              <Badge>{label}</Badge>
              <p className="mt-4 text-sm leading-6 text-dark-muted">
                Sample grid cell used to check type, border, and dark-section tokens.
              </p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
