import type { PricingPlan } from "@/types/pricing";
import { getModel } from "@/data/models";
import { formatInr, usdToInr } from "@/lib/inr";

export function formatPlanPrice(plan: PricingPlan, billing: "monthly" | "annual" = "monthly", tokens = 0) {
  if (plan.variable) return formatInr(usageAmount(plan, tokens));
  const amount = billing === "annual" ? plan.annualBase : plan.monthlyBase;
  if (amount == null) return "Custom";
  if (amount === 0) return `${formatInr(0)} platform fee`;
  if (billing === "annual") return `${formatInr(amount)} / year`;
  return `${formatInr(amount)} / month`;
}

export function planAmount(plan: PricingPlan, billing: "monthly" | "annual") {
  const amount = billing === "annual" ? plan.annualBase : plan.monthlyBase;
  return amount ?? 0;
}

export function usageAmount(plan: PricingPlan, tokens: number) {
  return (plan.ratePerMillion ?? 0) * tokens;
}

export function modelRate(modelSlug: string | null) {
  const model = modelSlug ? getModel(modelSlug) : undefined;
  if (!model) return null;
  if (model.unitPrice) {
    return {
      each: usdToInr(model.unitPrice.amount),
      unit: model.unitPrice.unit,
      label: model.unitPrice.unit,
    };
  }
  if (model.inputPricePerMillion == null) return null;
  return {
    each: usdToInr(model.inputPricePerMillion),
    output: model.outputPricePerMillion != null ? usdToInr(model.outputPricePerMillion) : undefined,
    unit: "million" as const,
    label: "1M tokens",
  };
}

export function quotedAmount(plan: PricingPlan, billing: "monthly" | "annual", tokens: number, modelSlug: string | null) {
  const rate = modelRate(modelSlug);
  if (rate) return rate.each * tokens;
  if (plan.variable) return usageAmount(plan, tokens);
  return planAmount(plan, billing);
}
