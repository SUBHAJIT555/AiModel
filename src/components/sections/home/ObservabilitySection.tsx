import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHeading } from "./HomeHeading";

const stats = [
  ["Requests", "12,480"],
  ["Success rate", "99.2%"],
  ["Median latency", "214ms"],
  ["Spend", "$186"],
];

const providers = [
  ["OpenAI", "38%"],
  ["Anthropic", "27%"],
  ["Google", "21%"],
  ["Other", "14%"],
];

export function ObservabilitySection() {
  return (
    <Section dividerBottom ruler spacing="large">
      <Container>
        <HomeHeading eyebrow="Observability" title="See every request.">
          A sample window of traffic, latency, and spend. These figures are demonstration data.
        </HomeHeading>
        <Reveal className="mt-10 border border-border bg-surface">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(([label, value]) => (
              <div key={label} className="border-r border-b border-border px-4 py-4 last:border-r-0 md:border-b-0">
                <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</p>
                <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">{value}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 border-t border-border p-4 md:grid-cols-[minmax(0,1.4fr)_240px]">
            <svg viewBox="0 0 480 140" className="h-36 w-full text-foreground" aria-hidden="true">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                points="0,110 60,96 120,102 180,70 240,78 300,48 360,56 420,32 480,40"
              />
            </svg>
            <ul>
              {providers.map(([name, share]) => (
                <li key={name} className="flex items-center justify-between border-b border-border py-2 text-[13px] last:border-b-0">
                  <span>{name}</span>
                  <span className="font-mono text-muted">{share}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
