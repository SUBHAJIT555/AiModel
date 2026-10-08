import type { PricingPlan } from "@/types/pricing";

/** Fixed plans, in rupees. Usage is priced separately from the token slider. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "developer",
    name: "Developer",
    description: "No platform fee. Pay only if you move up to a larger plan.",
    monthlyBase: 0,
    annualBase: 0,
    features: ["Shared gateway endpoint", "Catalog access", "Demo request logs"],
    cta: "Choose Developer",
  },
  {
    id: "scale",
    name: "Scale",
    description: "A fixed platform fee, plus whatever you run.",
    monthlyBase: 4999,
    annualBase: 49990,
    popular: true,
    features: ["Routing policies", "Fallback chains", "Usage export", "Email support"],
    cta: "Choose Scale",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Slide the volume. The amount follows the token rate.",
    variable: true,
    ratePerMillion: 80,
    features: ["Workspace controls", "Region pins", "Audit log", "Named support"],
    cta: "Continue",
  },
];

export function getPlan(id: string | null) {
  const key = id === "usage" ? "enterprise" : id;
  return pricingPlans.find((plan) => plan.id === key) ?? pricingPlans[0];
}
