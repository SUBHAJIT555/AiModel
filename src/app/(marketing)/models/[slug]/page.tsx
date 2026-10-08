import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModel, models, relatedModels } from "@/data/models";
import { formatContext } from "@/components/models/format";
import { BrandWatermark } from "@/components/models/BrandWatermark";
import { ModelQuote } from "@/components/models/ModelQuote";
import { ProviderMark } from "@/components/models/ProviderMark";
import { usdToInr } from "@/lib/inr";
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

function factsFor(model: Model) {
  return [
    model.contextWindow ? { label: "Context", value: formatContext(model.contextWindow) } : null,
    model.maxOutputTokens ? { label: "Max output", value: formatContext(model.maxOutputTokens) } : null,
    { label: "Input", value: model.inputModalities.join(", ") },
    { label: "Output", value: model.outputModalities.join(", ") },
    model.latencyClass ? { label: "Latency", value: model.latencyClass } : null,
    { label: "Status", value: model.status.replace("-", " ") },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));
}

function exampleFor(model: Model) {
  if (model.outputModalities.includes("image") && !model.outputModalities.includes("text")) {
    return `const image = await client.images.generate({
  model: "${model.slug}",
  prompt: "A quiet server hall at dawn.",
});`;
  }
  if (model.outputModalities.includes("video")) {
    return `const clip = await client.video.generate({
  model: "${model.slug}",
  prompt: "A slow pan across a glass atrium.",
});`;
  }
  if (model.outputModalities.includes("embeddings")) {
    return `const vectors = await client.embeddings.create({
  model: "${model.slug}",
  input: "Route this document.",
});`;
  }
  if (model.outputModalities.includes("audio") && !model.outputModalities.includes("text")) {
    return `const audio = await client.audio.speech({
  model: "${model.slug}",
  input: "The same request shape, a different model.",
});`;
  }
  return `const response = await client.chat({
  model: "${model.slug}",
  messages: [{ role: "user", content: "Summarize this brief." }],
});`;
}

function aboutLine(model: Model) {
  const reads = model.inputModalities.join(" and ");
  const writes = model.outputModalities.join(" and ");
  const context = model.contextWindow ? ` It keeps ${formatContext(model.contextWindow)} of context` : "";
  const reply = model.maxOutputTokens ? ` and can write up to ${formatContext(model.maxOutputTokens)} tokens back` : "";
  return `You send ${reads}. It returns ${writes}.${context}${reply}.`;
}

function quoteFor(model: Model) {
  if (model.unitPrice) {
    return { each: usdToInr(model.unitPrice.amount), unit: model.unitPrice.unit };
  }
  return {
    each: usdToInr(model.inputPricePerMillion ?? 0),
    output: model.outputPricePerMillion != null ? usdToInr(model.outputPricePerMillion) : undefined,
    unit: "million",
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const related = relatedModels(model);
  const sameProvider = related.every((item) => item.providerSlug === model.providerSlug);
  const tags = [...new Set([...model.capabilities, ...model.categories])];
  const facts = factsFor(model);
  const quote = quoteFor(model);

  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-10 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative overflow-hidden">
          <BrandWatermark slug={model.providerSlug} />
          <div className="relative z-10 grid items-center gap-10 px-6 pt-10 pb-10 md:px-10 md:pt-14 md:pb-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[14px] font-medium">
              <ProviderMark slug={model.providerSlug} name={model.provider} size="md" />
              {model.provider}
            </p>
            <h1 className="mt-5 max-w-[12ch] text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.045em]">
              {model.displayName}
            </h1>
            <p className="mt-4 max-w-[460px] text-[15px] leading-7 text-muted md:text-[16px]">{model.description}</p>
            <p className="mt-3 max-w-[460px] text-[15px] leading-7 text-muted">{aboutLine(model)}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex h-8 items-center rounded-[10px] border border-border bg-[#f7f8fa] px-2.5 text-[13px] text-muted capitalize"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid max-w-[480px] grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[12px] text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium tracking-[-0.02em] capitalize">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ModelQuote slug={model.slug} each={quote.each} output={quote.output} unit={quote.unit} />
          </div>
        </div>

        <div className="border-b border-border px-6 py-10 md:px-8">
          <h2 className="text-[20px] leading-tight font-medium tracking-[-0.03em]">Same request. This model.</h2>
          <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-muted">
            Keep the client you already use. The model id is the only line that changes.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-[16px] border border-border bg-[#f7f8fa] px-5 py-5 font-mono text-[13px] leading-6 text-foreground">
            {exampleFor(model)}
          </pre>
        </div>

        <div className="px-6 py-10 md:px-8">
          <h2 className="text-[20px] leading-tight font-medium tracking-[-0.03em]">
            {sameProvider ? `More from ${model.provider}` : "Similar models"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/models/${item.slug}`}
                  className="flex min-w-0 items-center gap-3.5 rounded-[14px] border border-border bg-surface px-3.5 py-3.5 transition-colors hover:border-border-strong"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f3f4f7]">
                    <ProviderMark slug={item.providerSlug} name={item.provider} size="md" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium tracking-[-0.02em]">{item.displayName}</span>
                    <span className="mt-0.5 block truncate text-[12px] text-muted">{item.provider}</span>
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
