import { defineModels } from "@/data/models/define";

export const anthropicModels = defineModels("Anthropic", "anthropic", [
  { slug: "claude-opus-4", name: "Claude Opus 4", categories: ["reasoning", "coding"], context: 200000, outputTokens: 32000, inputPrice: 15, outputPrice: 75, featured: true, capabilities: ["reasoning", "coding", "tools"] },
  { slug: "claude-sonnet-4", name: "Claude Sonnet 4", categories: ["text", "coding"], context: 200000, outputTokens: 16000, inputPrice: 3, outputPrice: 15, capabilities: ["chat", "coding", "tools"] },
  { slug: "claude-haiku-4", name: "Claude Haiku 4", categories: ["text"], context: 200000, outputTokens: 8192, inputPrice: 0.8, outputPrice: 4, latency: "fast", capabilities: ["chat", "classification"] },
  { slug: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", categories: ["reasoning", "coding"], context: 200000, outputTokens: 16000, inputPrice: 3, outputPrice: 15, capabilities: ["reasoning", "coding"] },
  { slug: "claude-3-5-haiku", name: "Claude 3.5 Haiku", categories: ["text"], context: 200000, outputTokens: 8192, inputPrice: 0.8, outputPrice: 4, latency: "fast", capabilities: ["chat"] },
  { slug: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", categories: ["text", "vision"], context: 200000, outputTokens: 8192, inputPrice: 3, outputPrice: 15, capabilities: ["chat", "vision", "coding"] },
]);
