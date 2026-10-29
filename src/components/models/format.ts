import type { Model } from "@/types/model";
import { MAX_PURCHASE_RUPEES, MIN_PURCHASE_RUPEES } from "@/data/pricing";
import { formatInr } from "@/lib/inr";

export function formatContext(value?: number) {
  if (!value) return "—";
  if (value < 1000) return value.toLocaleString("en-US");
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  return `${Math.round(value / 1000)}k`;
}

export function formatPrice(_model?: Model) {
  return `${formatInr(MIN_PURCHASE_RUPEES)} – ${formatInr(MAX_PURCHASE_RUPEES)}`;
}

export function contextFloor(value: string, context?: number) {
  if (value === "all") return true;
  if (!context) return false;
  return context >= Number(value);
}
