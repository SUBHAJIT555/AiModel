import { catalogProviders } from "@/data/models";

export const providers = catalogProviders;

export function getProvider(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}
