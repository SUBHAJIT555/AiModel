import { RoutingPolicyDemo } from "@/components/demos/RoutingPolicyDemo";
import { Reveal } from "@/components/motion/Reveal";
import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHeading } from "./HomeHeading";

export function SmartRoutingSection() {
  return (
    <Section dividerBottom ruler spacing="normal">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
          <div>
            <HomeHeading eyebrow="Smart routing" title="Route by what matters.">
              Automatically choose models by cost, latency, capability or availability.
            </HomeHeading>
            <Reveal className="mt-8">
              <RoutingPolicyDemo />
            </Reveal>
          </div>
          <HairlineFigure
            name="router"
            label="Line drawing of a router, standing in for request routing."
            intensity={0.4}
            className="mx-auto hidden w-full max-w-[320px] lg:block"
          />
        </div>
      </Container>
    </Section>
  );
}
