export const heroContent = {
  eyebrow: "AI model infrastructure",
  titleLead: "Run every model",
  titleTail: "through",
  titleAccent: "one API",
  description:
    "Connect to text, reasoning, vision, image, audio and video models through one consistent API — without rebuilding your integration for every provider.",
  primaryCta: { label: "Start building", href: "/pricing" },
  secondaryCta: { label: "Explore models", href: "/models" },
  stripLabel: "Models available through one gateway",
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
    cost: "$0.0004",
    status: "200",
  },
  {
    id: "balanced",
    label: "Balanced",
    model: "Claude Sonnet 4",
    provider: "Anthropic",
    latency: "384ms",
    tokens: "812",
    cost: "$0.0021",
    status: "200",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    model: "DeepSeek R1",
    provider: "DeepSeek",
    latency: "920ms",
    tokens: "1,460",
    cost: "$0.0088",
    status: "200",
  },
  {
    id: "vision",
    label: "Vision",
    model: "GPT-4o",
    provider: "OpenAI",
    latency: "510ms",
    tokens: "640",
    cost: "$0.0034",
    status: "200",
  },
];
