import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHeading } from "./HomeHeading";

const events = [
  ["12:01:02", "Primary timeout"],
  ["12:01:03", "Fallback initiated"],
  ["12:01:03", "Response delivered"],
];

export function FallbackSection() {
  return (
    <Section dividerBottom spacing="normal">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <HomeHeading eyebrow="Reliability" title="Stay online when providers don't.">
              If the first provider times out, the gateway tries the next candidate and returns the same response shape.
            </HomeHeading>
            <Reveal>
              <ol className="mt-8 border-t border-border">
              {events.map(([time, label]) => (
                <li key={label} className="grid grid-cols-[88px_1fr] gap-4 border-b border-border py-3 text-[14px]">
                  <span className="font-mono text-[12px] text-muted">{time}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
            </Reveal>
          </div>
          <HairlineFigure
            name="patch"
            label="Line drawing of a patch panel, standing in for a fallback path."
            intensity={0.35}
            className="mx-auto w-full max-w-[260px]"
          />
        </div>
      </Container>
    </Section>
  );
}
