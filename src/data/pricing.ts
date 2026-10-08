import type { PricingPlan } from "@/types/pricing";

/** Paid plans, in rupees. Volume is priced from the token slider. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "route",
    name: "Route",
    description: "A monthly fee. One endpoint, the catalog, and a route you can set.",
    monthlyBase: 999,
    annualBase: 9990,
    features: ["One shared endpoint", "Routing, if you want it", "The catalog", "Email support"],
    cta: "Choose Route",
  },
  {
    id: "volume",
    name: "Volume",
    description: "Move the slider. The amount follows ₹80 for each million tokens.",
    variable: true,
    ratePerMillion: 80,
    featured: true,
    features: ["A fallback list", "Usage you can export", "Workspace controls", "The token rate on the slider"],
    cta: "Choose Volume",
  },
  {
    id: "command",
    name: "Command",
    description: "The higher fee. Pin a region, keep an audit, and name a contact.",
    monthlyBase: 8999,
    annualBase: 89990,
    features: ["Region pins", "An audit of policy changes", "A named contact", "A cap on usage"],
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
