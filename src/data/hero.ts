export const heroContent = {
  eyebrow: "Priced in rupees",
  titleLead: "Call any model",
  titleTail: "from",
  titleAccent: "one API",
  description:
    "OpenAI, Anthropic, Google, and the rest of the catalog. Text, image, audio, and video. Change the model name. The request stays the same.",
  primaryCta: { label: "See plans", href: "/pricing" },
  secondaryCta: { label: "Browse models", href: "/models" },
  stripLabel: "Providers on this gateway",
} as const;

export type HeroRoute = {
  id: string;
  label: string;
  model: string;
  provider: string;
  latency: string;
  tokens: string;
  cost: string;
  status: string;
};

export const heroRoutes: HeroRoute[] = [
  {
    id: "fast",
    label: "Fast",
    model: "GPT-4.1 nano",
    provider: "OpenAI",
    latency: "128ms",
    tokens: "214",
    cost: "₹0.03",
    status: "200",
  },
  {
    id: "balanced",
    label: "Balanced",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    latency: "384ms",
    tokens: "812",
    cost: "₹0.18",
    status: "200",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    model: "DeepSeek R1",
    provider: "DeepSeek",
    latency: "920ms",
    tokens: "1,460",
    cost: "₹0.74",
    status: "200",
  },
  {
    id: "vision",
    label: "Vision",
    model: "GPT-4o",
    provider: "OpenAI",
    latency: "510ms",
    tokens: "640",
    cost: "₹0.29",
    status: "200",
  },
];
