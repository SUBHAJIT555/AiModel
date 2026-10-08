export type Service = {
  slug: string;
  anchor: string;
  index: string;
  name: string;
  eyebrow?: string;
  shortDescription: string;
  description: string;
  sectionTitle: string;
  features: string[];
  icon: string;
  demo: "api" | "routing" | "fallback" | "observability" | "enterprise";
};
