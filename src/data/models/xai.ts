import { defineModels } from "@/data/models/define";

export const xaiModels = defineModels("xAI", "xai", [
  { slug: "grok-3", name: "Grok 3", categories: ["reasoning", "text"], context: 131072, outputTokens: 16384, inputPrice: 3, outputPrice: 15, capabilities: ["reasoning", "chat"] },
  { slug: "grok-3-mini", name: "Grok 3 Mini", categories: ["text"], context: 131072, outputTokens: 8192, inputPrice: 0.3, outputPrice: 0.5, latency: "fast", capabilities: ["chat"] },
  { slug: "grok-2", name: "Grok 2", categories: ["text"], context: 131072, outputTokens: 8192, inputPrice: 2, outputPrice: 10, capabilities: ["chat"] },
  { slug: "grok-2-vision", name: "Grok 2 Vision", categories: ["vision"], context: 32000, outputTokens: 4096, inputPrice: 2, outputPrice: 10, capabilities: ["vision"] },
]);
