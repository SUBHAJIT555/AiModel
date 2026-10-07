import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModel, models, relatedModels } from "@/data/models";
import { formatContext, formatPrice } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  return {
    title: model?.name ?? "Model",
    description: model?.description,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();
  const related = relatedModels(model);
  const example = `const response = await client.chat({
  model: "${model.slug}",
  messages: [{ role: "user", content: "Summarize this brief." }],
});`;

  return (
    <Section>
      <Container>
        <Link className="font-mono text-[12px] text-muted hover:text-foreground" href="/models">
          Catalog
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <ProviderMark name={model.provider} />
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">{model.provider}</p>
        </div>
        <h1 className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.04em]">
          {model.displayName}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-muted">{model.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {model.categories.map((category) => (
            <li key={category}>
              <Badge>{category}</Badge>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {[
            ["Context", formatContext(model.contextWindow)],
            ["Output", model.maxOutputTokens ? formatContext(model.maxOutputTokens) : "—"],
            ["Input", model.inputModalities.join(", ")],
            ["Price", formatPrice(model)],
          ].map(([label, value]) => (
            <div key={label} className="bg-surface p-4">
              <dt className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</dt>
              <dd className="mt-2 text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 max-w-3xl">
          <h2 className="text-sm font-medium">Capabilities</h2>
          <p className="mt-2 text-sm text-muted">{model.capabilities.join(" · ")}</p>
          <h2 className="mt-8 text-sm font-medium">Demo request</h2>
          <pre className="mt-3 overflow-x-auto border border-border bg-background p-4 font-mono text-[12px] leading-6 text-foreground">
            {example}
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`/checkout?plan=scale&billing=monthly&model=${model.slug}`} size="sm">
              Use this model
            </Button>
            <Button href="/pricing" size="sm" variant="secondary">
              View pricing
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-sm font-medium">Related listings</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {related.map((item) => (
              <li key={item.slug}>
                <Link className="flex items-center justify-between gap-4 py-3 text-sm hover:text-primary" href={`/models/${item.slug}`}>
                  <span>{item.displayName}</span>
                  <span className="text-muted">{item.provider}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
