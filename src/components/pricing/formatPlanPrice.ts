import type { PricingPlan } from "@/types/pricing";
import { clampVolumeRupees } from "@/data/pricing";
import { getModel } from "@/data/models";
import { formatInr, usdToInr } from "@/lib/inr";

export function formatPlanPrice(plan: PricingPlan, rupees = 0) {
  if (plan.variable) return formatInr(clampVolumeRupees(rupees));
  const amount = plan.monthlyBase;
  if (amount == null) return "Custom";
  if (amount === 0) return `${formatInr(0)} platform fee`;
  return formatInr(amount);
}

export function planAmount(plan: PricingPlan) {
  return plan.monthlyBase ?? 0;
}

export function usageAmount(plan: PricingPlan, rupees: number) {
  if (plan.variable) return clampVolumeRupees(rupees);
  return (plan.ratePerMillion ?? 0) * rupees;
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

export function quotedAmount(plan: PricingPlan, tokens: number, modelSlug: string | null, rupees?: number) {
  if (rupees && rupees > 0) return clampVolumeRupees(rupees);
  if (plan.variable) return clampVolumeRupees(tokens);
  const rate = modelRate(modelSlug);
  if (rate && tokens > 0) return clampVolumeRupees(rate.each * tokens);
  return planAmount(plan);
}
