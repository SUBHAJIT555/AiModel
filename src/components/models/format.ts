import type { Model } from "@/types/model";
import { formatInr, usdToInr } from "@/lib/inr";

export function formatContext(value?: number) {
  if (!value) return "—";
  if (value < 1000) return value.toLocaleString("en-US");
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  return `${Math.round(value / 1000)}k`;
}

export function formatPrice(model: Model) {
  if (model.unitPrice) return `${formatInr(usdToInr(model.unitPrice.amount))} / ${model.unitPrice.unit}`;
  if (model.inputPricePerMillion != null && model.outputPricePerMillion != null) {
    return `${formatInr(usdToInr(model.inputPricePerMillion))} / ${formatInr(usdToInr(model.outputPricePerMillion))} per 1M`;
  }
  if (model.inputPricePerMillion != null) return `${formatInr(usdToInr(model.inputPricePerMillion))} / 1M`;
  return "Usage";
}

export function contextFloor(value: string, context?: number) {
  if (value === "all") return true;
  if (!context) return false;
  return context >= Number(value);
}
