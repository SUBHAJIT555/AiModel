import type { PricingPlan } from "@/types/pricing";

/** Editable demo plan figures. Not a published price list. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "developer",
    name: "Developer",
    description: "$0 platform fee. Model usage is shown as pay as you go.",
    monthlyBase: 0,
    annualBase: 0,
    features: ["Shared gateway endpoint", "Catalog access", "Demo request logs"],
    cta: "Choose Developer",
  },
  {
    id: "scale",
    name: "Scale",
    description: "A platform fee plus model usage.",
    monthlyBase: 99,
    annualBase: 990,
    popular: true,
    features: ["Routing policies", "Fallback chains", "Usage export", "Email support"],
    cta: "Choose Scale",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom terms for a larger workspace.",
    features: ["Workspace controls", "Region pins", "Audit log", "Named support"],
    cta: "Contact sales",
  },
];

export function getPlan(id: string | null) {
  return pricingPlans.find((plan) => plan.id === id) ?? pricingPlans[0];
}
