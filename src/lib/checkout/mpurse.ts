export const PENDING_ORDER_KEY = "aimodel_pending_order_id";

export function preferredUpiMode(): "INTENT" | "QR" {
  if (typeof navigator === "undefined") return "QR";
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? "INTENT"
    : "QR";
}

export function splitCustomerName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Customer", lastName: "Customer" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Indian mobile as 10 digits starting 6–9. Accepts a leading 91. */
export function indianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : "";
}

export type MpurseStartResponse = {
  success?: boolean;
  error?: string;
  order_id?: string;
  pay_url?: string;
  amount?: string | number;
};

export async function startMpurseCheckout(payload: Record<string, unknown>): Promise<MpurseStartResponse> {
  const response = await fetch("/api/mpurse.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const raw = await response.text();
  let result: MpurseStartResponse = {};
  try {
    result = raw ? (JSON.parse(raw) as MpurseStartResponse) : {};
  } catch {
    throw new Error("Payment server is not running. In a second terminal run: yarn php:api");
  }
  if (!response.ok || !result.order_id) {
    throw new Error(result.error ?? "Unable to start UPI payment.");
  }
  return result;
}
