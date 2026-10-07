import { defineModels } from "@/data/models/define";

export const metaModels = defineModels("Meta", "meta", [
  { slug: "llama-4-maverick", name: "Llama 4 Maverick", categories: ["multimodal", "text"], context: 1000000, outputTokens: 16384, inputPrice: 0.5, outputPrice: 1.5, featured: true, capabilities: ["chat", "vision"] },
  { slug: "llama-4-scout", name: "Llama 4 Scout", categories: ["text"], context: 512000, outputTokens: 8192, inputPrice: 0.2, outputPrice: 0.6, latency: "fast", capabilities: ["chat"] },
  { slug: "llama-3-3-70b", name: "Llama 3.3 70B", categories: ["text", "coding"], context: 128000, outputTokens: 8192, inputPrice: 0.6, outputPrice: 0.6, capabilities: ["chat", "coding"] },
  { slug: "llama-3-1-405b", name: "Llama 3.1 405B", categories: ["reasoning"], context: 128000, outputTokens: 8192, inputPrice: 3, outputPrice: 3, capabilities: ["reasoning", "coding"] },
  { slug: "llama-3-1-8b", name: "Llama 3.1 8B", categories: ["text"], context: 128000, outputTokens: 4096, inputPrice: 0.05, outputPrice: 0.08, latency: "fast", capabilities: ["chat"] },
  { slug: "llama-3-2-vision", name: "Llama 3.2 Vision", categories: ["vision"], context: 128000, outputTokens: 4096, inputPrice: 0.3, outputPrice: 0.3, capabilities: ["vision"] },
]);
