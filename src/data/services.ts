import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "unified-api",
    name: "Unified API",
    eyebrow: "Interface",
    shortDescription: "One request shape for text, vision, audio, and embeddings.",
    description:
      "Send the same request contract to every connected model. Provider-specific fields stay behind the gateway so application code does not change when a model does.",
    features: [
      "Normalized chat and completion schema",
      "Shared authentication and request ids",
      "Model names that stay stable across providers",
    ],
    icon: "Waypoints",
  },
  {
    slug: "smart-routing",
    name: "Smart Routing",
    eyebrow: "Traffic",
    shortDescription: "Choose a model for cost, latency, quality, or availability.",
    description:
      "Attach a routing policy to a request. The gateway picks a model that matches the policy instead of hard-coding a provider in the application.",
    features: [
      "Policies for cost, latency, and quality",
      "Per-route model allow lists",
      "Sticky routing when a conversation must stay on one model",
    ],
    icon: "Split",
  },
  {
    slug: "fallbacks",
    name: "Automatic Fallbacks",
    eyebrow: "Reliability",
    shortDescription: "Move a request to the next healthy model when one fails.",
    description:
      "Timeouts, rate limits, and provider errors can fall through to the next eligible model. The caller still receives one response and one request id.",
    features: [
      "Ordered fallback chains",
      "Timeouts that do not double-charge a failed attempt",
      "Error classes that are safe to retry",
    ],
    icon: "RefreshCw",
  },
  {
    slug: "observability",
    name: "Observability",
    eyebrow: "Visibility",
    shortDescription: "See latency, cost, and errors for every routed request.",
    description:
      "Each request records the model that served it, the latency, the token counts, and the fallback path. That record is the source for usage and incident review.",
    features: [
      "Request traces across fallback hops",
      "Cost and latency broken out by model",
      "Exportable logs for your own collector",
    ],
    icon: "Activity",
  },
  {
    slug: "enterprise",
    name: "Enterprise Controls",
    eyebrow: "Governance",
    shortDescription: "Limit which teams, regions, and models a workspace can use.",
    description:
      "Workspace policies decide who can call which models, where requests may run, and which data classes are allowed to leave the network.",
    features: [
      "Model allow lists by workspace",
      "Region pins for eligible providers",
      "Audit log of policy changes",
    ],
    icon: "Shield",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
