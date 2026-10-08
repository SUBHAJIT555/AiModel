import type { PricingPlan } from "@/types/pricing";

/** Paid plans, in rupees. Volume is priced from the token slider. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "route",
    name: "Route",
    description: "The smaller platform fee. Policies and the catalog, on one shared endpoint.",
    monthlyBase: 999,
    annualBase: 9990,
    features: ["Shared gateway endpoint", "Routing policies", "Catalog access", "Email support"],
    cta: "Choose Route",
  },
  {
    id: "volume",
    name: "Volume",
    description: "The custom plan. Move the volume and the amount follows ₹80 for each million tokens.",
    variable: true,
    ratePerMillion: 80,
    featured: true,
    features: ["Fallback chains", "Usage export", "Workspace controls", "Token rate on the slider"],
    cta: "Continue",
  },
  {
    id: "command",
    name: "Command",
    description: "The higher platform fee. Region pins, an audit log, and a named contact.",
    monthlyBase: 8999,
    annualBase: 89990,
    features: ["Region pins", "Audit log", "Named support", "Usage limits"],
    cta: "Choose Command",
  },
];

const aliases: Record<string, string> = {
  usage: "volume",
  enterprise: "volume",
  developer: "route",
  scale: "route",
};

export function getPlan(id: string | null) {
  const key = id ? (aliases[id] ?? id) : null;
  return pricingPlans.find((plan) => plan.id === key) ?? pricingPlans[0];
}
