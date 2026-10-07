import type { Model } from "@/types/model";
import type { Provider } from "@/types/provider";
import { anthropicModels } from "@/data/models/anthropic";
import { audioModels } from "@/data/models/audio";
import { deepseekModels } from "@/data/models/deepseek";
import { googleModels } from "@/data/models/google";
import { imageModels } from "@/data/models/image";
import { metaModels } from "@/data/models/meta";
import { mistralModels } from "@/data/models/mistral";
import { openaiModels } from "@/data/models/openai";
import { otherModels } from "@/data/models/others";
import { qwenModels } from "@/data/models/qwen";
import { videoModels } from "@/data/models/video";
import { xaiModels } from "@/data/models/xai";

export const models: Model[] = [
  ...openaiModels,
  ...anthropicModels,
  ...googleModels,
  ...metaModels,
  ...mistralModels,
  ...deepseekModels,
  ...qwenModels,
  ...xaiModels,
  ...imageModels,
  ...videoModels,
  ...audioModels,
  ...otherModels,
];

const slugs = new Set<string>();
const ids = new Set<string>();
for (const model of models) {
  if (slugs.has(model.slug) || ids.has(model.id)) {
    throw new Error(`Duplicate demo model: ${model.slug}`);
  }
  slugs.add(model.slug);
  ids.add(model.id);
}

if (models.length < 85) {
  throw new Error(`Demo catalog needs at least 85 models. Found ${models.length}.`);
}

export function getModel(slug: string) {
  return models.find((model) => model.slug === slug);
}

export function relatedModels(model: Model, limit = 3) {
  const sameProvider = models.filter((item) => item.providerSlug === model.providerSlug && item.slug !== model.slug);
  if (sameProvider.length >= limit) return sameProvider.slice(0, limit);
  const sameCategory = models.filter(
    (item) => item.slug !== model.slug && item.categories.some((category) => model.categories.includes(category)),
  );
  return [...sameProvider, ...sameCategory.filter((item) => item.providerSlug !== model.providerSlug)].slice(0, limit);
}

export const catalogProviders: Provider[] = [...new Map(models.map((model) => [model.providerSlug, model])).values()].map(
  (model) => ({
    slug: model.providerSlug,
    name: model.provider,
    summary: `${models.filter((item) => item.providerSlug === model.providerSlug).length} models in the demo catalog`,
  }),
);
