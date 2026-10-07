import { catalogProviders, models } from "@/data/models";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const items = [
  [String(models.length), "demo models"],
  [String(catalogProviders.length), "provider families"],
  ["1", "request format"],
  ["4", "routing policies"],
];

export function MetricsSection() {
  return (
    <Section dividerBottom spacing="compact">
      <Container>
        <Reveal className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([value, label]) => (
            <div key={label} className="border-r border-b border-border px-5 py-6">
              <p className="text-[clamp(2rem,4vw,2.75rem)] leading-none font-medium tracking-[-0.04em]">{value}</p>
              <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-muted uppercase">{label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
