/** Demo conversion so every listed price can be shown in rupees. */
export const USD_TO_INR = 84;

export const usageRatePerMillion = 80;

export function usdToInr(amount: number) {
  return Math.round(amount * USD_TO_INR * 100) / 100;
}

export function formatInr(amount: number) {
  const whole = Math.abs(amount - Math.round(amount)) < 0.001;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

export function formatMillions(value: number) {
  return `${value}M`;
}
