export type DemoCheckout = {
  plan: string;
  billing: "monthly" | "annual";
  model?: string;
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  order?: string;
  tokens?: number;
};

const key = "aimodel-demo-checkout";

export function saveCheckout(value: DemoCheckout) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function readCheckout(): DemoCheckout | null {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoCheckout;
  } catch {
    return null;
  }
}
