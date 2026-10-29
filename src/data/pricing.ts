import type { PricingPlan } from "@/types/pricing";

/** Volume and credit meters, in rupees. */
export const MIN_PURCHASE_RUPEES = 10;
export const MAX_PURCHASE_RUPEES = 9899;

export function clampVolumeRupees(value: number) {
  const amount = Math.round(Number(value) || 0);
  return Math.min(MAX_PURCHASE_RUPEES, Math.max(MIN_PURCHASE_RUPEES, amount));
}

/** Paid plans, in rupees. Volume is priced from the rupee slider. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "route",
    name: "Route",
    description: "A fixed fee. One endpoint, the catalog, and a route you can set.",
    monthlyBase: 999,
    features: ["One shared endpoint", "Routing, if you want it", "The catalog", "Email support"],
    cta: "Choose Route",
  },
  {
    id: "volume",
    name: "Volume",
    description: "Move the slider. Any amount from ₹10 to ₹9,899.",
    variable: true,
    ratePerMillion: 80,
    featured: true,
    features: ["A fallback list", "Usage you can export", "Workspace controls", "Pay the amount on the slider"],
    cta: "Choose Volume",
  },
  {
    id: "command",
    name: "Command",
    description: "The higher fee. Pin a region, keep an audit, and name a contact.",
    monthlyBase: 8999,
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
