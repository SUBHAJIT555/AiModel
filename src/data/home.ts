export const howItWorks = [
  {
    title: "Send one request",
    body: "Use a normalized API instead of integrating every provider separately.",
  },
  {
    title: "Route to the right model",
    body: "Choose automatically based on cost, speed, capability or availability.",
  },
  {
    title: "Receive one consistent response",
    body: "Handle model output through one stable response format.",
  },
] as const;

export const platformFeatures = [
  { title: "Unified API", body: "One request shape across the models in the catalog." },
  { title: "Smart routing", body: "Pick a model for cost, latency, or capability." },
  { title: "Automatic fallback", body: "Move a request when the first provider does not answer." },
  { title: "Usage analytics", body: "Review latency, tokens, and spend in one place." },
  { title: "Rate controls", body: "Set simple limits for a workspace in the demo." },
  { title: "Provider abstraction", body: "Keep application code stable while the model changes." },
  { title: "Model switching", body: "Change the model field without rewriting the call." },
  { title: "Cost visibility", body: "See illustrative prices next to each listing." },
] as const;

export const productionSteps = [
  { title: "Create an account", body: "Open a workspace and keep the demo catalog in view." },
  { title: "Use one API format", body: "Send chat, image, or audio calls through the same shape." },
  { title: "Select models or a policy", body: "Pin a model or let routing choose from the list." },
  { title: "Ship your application", body: "Keep the integration stable as the catalog grows." },
] as const;

export const sdkInstall: Record<string, string> = {
  JavaScript: "npm install aimodel",
  Python: "pip install aimodel",
  Go: "go get github.com/example/aimodel",
  Ruby: "gem install aimodel",
  Java: "implementation 'com.example:aimodel'",
  "C#": "dotnet add package Aimodel",
  PHP: "composer require example/aimodel",
  Rust: "cargo add aimodel",
};
