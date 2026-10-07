import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getModel, models, relatedModels } from "@/data/models";
import { formatContext } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";
import { Button } from "@/components/ui/Button";
import type { Model } from "@/types/model";

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

function specsFor(model: Model) {
  const specs = [
    { label: "Context", value: formatContext(model.contextWindow) },
    { label: "Max output", value: formatContext(model.maxOutputTokens) },
    { label: "Input", value: model.inputModalities.join(", ") },
    { label: "Output", value: model.outputModalities.join(", ") },
  ];
  if (model.unitPrice) {
    specs.push(
      { label: "Price", value: `$${model.unitPrice.amount} / ${model.unitPrice.unit}` },
      { label: "Status", value: model.status.replace("-", " ") },
    );
  } else {
    specs.push(
      { label: "Input price", value: model.inputPricePerMillion != null ? `$${model.inputPricePerMillion} / 1M` : "—" },
      { label: "Output price", value: model.outputPricePerMillion != null ? `$${model.outputPricePerMillion} / 1M` : "—" },
    );
  }
  return specs;
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
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pt-14 pb-12 text-center md:pt-20 md:pb-14">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium">
            <ProviderMark slug={model.providerSlug} name={model.provider} size="md" />
            {model.provider}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
            {model.displayName}
          </h1>
          <p className="mt-5 max-w-[480px] text-[15px] leading-7 text-muted md:text-[16px]">{model.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={`/checkout?plan=scale&billing=monthly&model=${model.slug}`}>
              Use this model
              <ArrowRight aria-hidden strokeWidth={1.75} />
            </Button>
            <Button href="/pricing" variant="secondary">
              View pricing
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {specsFor(model).map((spec) => (
            <div key={spec.label} className="bg-surface px-4 py-4 md:px-6">
              <dt className="text-[12px] text-muted">{spec.label}</dt>
              <dd className="mt-1.5 text-[15px] font-medium tracking-[-0.02em] capitalize">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-b border-border px-4 py-5 md:px-6">
          <h2 className="text-[12px] text-muted">Capabilities</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {[...new Set([...model.capabilities, ...model.categories])].map((tag) => (
              <li key={tag} className="inline-flex h-8 items-center rounded-[10px] border border-border px-2.5 text-[13px] text-muted capitalize">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b border-border">
          <h2 className="border-b border-border bg-[#f3f4f7] px-4 py-3 text-[12px] font-medium text-muted md:px-6">Demo request</h2>
          <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 text-foreground md:px-6">{example}</pre>
        </div>

        <div className="border-b border-border">
          <h2 className="px-4 py-4 text-[13px] font-medium text-muted md:px-6">Related models</h2>
          <ul className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="bg-surface">
                <Link href={`/models/${item.slug}`} className="flex items-center gap-3 px-4 py-5 transition-colors hover:bg-[#f7f8fa] md:px-6">
                  <ProviderMark slug={item.providerSlug} name={item.provider} size="md" />
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium tracking-[-0.02em]">{item.displayName}</span>
                    <span className="block truncate text-[13px] text-muted">{item.provider}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
