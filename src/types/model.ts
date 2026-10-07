export type Modality = "text" | "image" | "audio" | "video" | "embeddings";

export type LatencyClass = "fast" | "balanced" | "deep";

export type ModelStatus = "available" | "beta" | "coming-soon";

export type ModelCategory =
  | "text"
  | "reasoning"
  | "coding"
  | "vision"
  | "multimodal"
  | "image"
  | "video"
  | "audio"
  | "embedding";

export type UnitPrice = {
  amount: number;
  unit: "image" | "second" | "minute";
};

export type Model = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  provider: string;
  providerSlug: string;
  description: string;
  modalities: Modality[];
  inputModalities: Modality[];
  outputModalities: Modality[];
  capabilities: string[];
  categories: ModelCategory[];
  contextWindow?: number;
  maxOutputTokens?: number;
  inputPricePerMillion?: number;
  outputPricePerMillion?: number;
  unitPrice?: UnitPrice;
  latencyClass?: LatencyClass;
  featured?: boolean;
  status: ModelStatus;
};
