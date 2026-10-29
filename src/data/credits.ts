/** Catalog credits. Keep in step with public/api/lib/catalog.php. */
export const CREDITS = {
  prefix: "MODX",
  min: 10,
  max: 9899,
  step: 1,
  quickAmounts: [10, 100, 250, 500, 1000, 2500, 5000, 9899],
  validityDays: 90,
  topupBonus: [
    { min: 500, percent: 3 },
    { min: 2000, percent: 5 },
    { min: 5000, percent: 8 },
  ],
  topupBonusCap: 500,
} as const;

export function topupBonusFor(amount: number) {
  const paid = Math.floor(Number(amount) || 0);
  let percent = 0;
  for (const tier of CREDITS.topupBonus) {
    if (paid >= tier.min && tier.percent > percent) percent = tier.percent;
  }
  return Math.min(Math.floor((paid * percent) / 100), CREDITS.topupBonusCap);
}

export function parseCreditAmount(text: string): [number | null, string] {
  const trimmed = String(text).trim();
  if (trimmed === "") return [null, "Enter an amount."];
  if (!/^\d+$/.test(trimmed)) return [null, "Enter a whole rupee amount."];
  const amount = Number(trimmed);
  if (amount < CREDITS.min || amount > CREDITS.max) {
    return [null, `Choose between ₹${CREDITS.min.toLocaleString("en-IN")} and ₹${CREDITS.max.toLocaleString("en-IN")}.`];
  }
  if (amount % CREDITS.step !== 0) {
    return [null, `Credits come in steps of ₹${CREDITS.step}.`];
  }
  return [amount, ""];
}
