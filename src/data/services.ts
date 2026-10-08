import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "unified-api",
    anchor: "unified-api",
    index: "01",
    name: "Unified API",
    eyebrow: "Interface",
    shortDescription: "Use one request format across text, vision, audio, video and embeddings.",
    description:
      "Send requests through one consistent interface instead of rebuilding your application for every provider.",
    sectionTitle: "One request format. Any model.",
    features: ["Normalized requests", "Consistent responses", "Multimodal support", "Provider abstraction"],
    icon: "Waypoints",
    demo: "api",
  },
  {
    slug: "smart-routing",
    anchor: "smart-routing",
    index: "02",
    name: "Smart Routing",
    eyebrow: "Traffic",
    shortDescription: "Select a model by cost, latency, capability or availability.",
    description:
      "Select models by cost, latency, capability, quality or availability without changing application logic.",
    sectionTitle: "Route by what matters.",
    features: ["Cost, latency and capability policies", "Allow lists per route", "Same request when the model changes"],
    icon: "Split",
    demo: "routing",
  },
  {
    slug: "fallbacks",
    anchor: "fallbacks",
    index: "03",
    name: "Automatic Fallbacks",
    eyebrow: "Reliability",
    shortDescription: "Move a request to the next healthy model when one fails.",
    description: "Automatically route to another compatible model when the preferred model or provider is unavailable.",
    sectionTitle: "Keep requests moving.",
    features: ["Ordered fallback chains", "Timeouts and provider errors", "One response, one request id"],
    icon: "RefreshCw",
    demo: "fallback",
  },
  {
    slug: "observability",
    anchor: "observability",
    index: "04",
    name: "Observability",
    eyebrow: "Visibility",
    shortDescription: "Track latency, spend, errors and which model served the call.",
    description: "Track latency, spend, errors and model usage through one consistent view.",
    sectionTitle: "See every request.",
    features: ["Latency and success rate", "Spend by model", "Fallback events", "Provider breakdown"],
    icon: "Activity",
    demo: "observability",
  },
  {
    slug: "enterprise",
    anchor: "enterprise-controls",
    index: "05",
    name: "Enterprise Controls",
    eyebrow: "Governance",
    shortDescription: "Limit which teams, regions and models a workspace can use.",
    description: "Define model access, workspace policies, usage limits and regional restrictions from one layer.",
    sectionTitle: "Control what teams can use.",
    features: ["Model access by workspace", "Region pins", "Usage limits", "Audit of policy changes"],
    icon: "Shield",
    demo: "enterprise",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
