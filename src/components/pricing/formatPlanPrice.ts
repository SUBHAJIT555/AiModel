import type { PricingPlan } from "@/types/pricing";

export function formatPlanPrice(plan: PricingPlan, billing: "monthly" | "annual" = "monthly") {
  const amount = billing === "annual" ? plan.annualBase : plan.monthlyBase;
  if (amount == null) return "Custom";
  if (amount === 0) return "$0 platform fee";
  if (billing === "annual") return `$${amount} / year`;
  return `$${amount} / month`;
}

export function planAmount(plan: PricingPlan, billing: "monthly" | "annual") {
  const amount = billing === "annual" ? plan.annualBase : plan.monthlyBase;
  return amount ?? 0;
}
