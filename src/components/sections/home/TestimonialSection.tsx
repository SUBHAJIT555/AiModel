import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function TestimonialSection() {
  return (
    <Section center dividerBottom ruler spacing="large">
      <Container>
        <Reveal>
        <figure className="mx-auto max-w-3xl py-4 text-center">
          <blockquote className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.03em]">
            “We replaced multiple provider integrations with one interface and cut model-switching work dramatically.”
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3 text-[13px] text-muted">
            <span className="grid size-8 place-items-center border border-border font-mono text-[11px]">AM</span>
            <span>Alex Morgan, CTO, Example Labs</span>
          </figcaption>
        </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
