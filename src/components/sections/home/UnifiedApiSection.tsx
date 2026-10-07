import { CodeDemo } from "@/components/demos/CodeDemo";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHeading } from "./HomeHeading";

export function UnifiedApiSection() {
  return (
    <Section tone="dark" dividerBottom spacing="large">
      <Container>
        <HomeHeading eyebrow="Unified API" title="One interface. Every provider." tone="dark">
          Switch models without rewriting your application.
        </HomeHeading>
        <Reveal className="mt-10">
          <CodeDemo />
        </Reveal>
      </Container>
    </Section>
  );
}
