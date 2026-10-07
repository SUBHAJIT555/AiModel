import type { LatencyClass, Model, ModelCategory, ModelStatus, Modality, UnitPrice } from "@/types/model";

export type ModelSpec = {
  slug: string;
  name: string;
  description?: string;
  categories: ModelCategory[];
  input?: Modality[];
  output?: Modality[];
  capabilities?: string[];
  context?: number;
  outputTokens?: number;
  inputPrice?: number;
  outputPrice?: number;
  unit?: UnitPrice;
  featured?: boolean;
  status?: ModelStatus;
  latency?: LatencyClass;
};

function defaults(categories: ModelCategory[]): { input: Modality[]; output: Modality[] } {
  const input = new Set<Modality>(["text"]);
  const output = new Set<Modality>(["text"]);
  if (categories.includes("vision") || categories.includes("multimodal")) input.add("image");
  if (categories.includes("image")) {
    input.add("text");
    output.delete("text");
    output.add("image");
  }
  if (categories.includes("video")) {
    output.delete("text");
    output.add("video");
  }
  if (categories.includes("audio")) {
    input.add("audio");
    output.add("audio");
  }
  if (categories.includes("embedding")) {
    output.delete("text");
    output.add("embeddings");
  }
  return { input: [...input], output: [...output] };
}

export function defineModels(provider: string, providerSlug: string, specs: ModelSpec[]): Model[] {
  return specs.map((spec) => {
    const fallback = defaults(spec.categories);
    const inputModalities = spec.input ?? fallback.input;
    const outputModalities = spec.output ?? fallback.output;
    const modalities = [...new Set([...inputModalities, ...outputModalities])];
    return {
      id: `${providerSlug}:${spec.slug}`,
      slug: spec.slug,
      name: spec.name,
      displayName: spec.name,
      provider,
      providerSlug,
      description:
        spec.description ??
        `${spec.name} is a demonstration listing for ${spec.categories.join(" and ")} workflows.`,
      modalities,
      inputModalities,
      outputModalities,
      capabilities: spec.capabilities ?? spec.categories,
      categories: spec.categories,
      contextWindow: spec.context,
      maxOutputTokens: spec.outputTokens,
      inputPricePerMillion: spec.inputPrice,
      outputPricePerMillion: spec.outputPrice,
      unitPrice: spec.unit,
      latencyClass: spec.latency ?? (spec.categories.includes("reasoning") ? "deep" : "balanced"),
      featured: spec.featured,
      status: spec.status ?? "available",
    };
  });
}
