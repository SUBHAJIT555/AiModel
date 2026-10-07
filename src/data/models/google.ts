import { defineModels } from "@/data/models/define";

export const googleModels = defineModels("Google", "google", [
  { slug: "gemini-2-5-pro", name: "Gemini 2.5 Pro", categories: ["multimodal", "reasoning"], context: 1000000, outputTokens: 65536, inputPrice: 1.25, outputPrice: 10, featured: true, capabilities: ["reasoning", "vision", "tools"] },
  { slug: "gemini-2-5-flash", name: "Gemini 2.5 Flash", categories: ["text", "multimodal"], context: 1000000, outputTokens: 65536, inputPrice: 0.15, outputPrice: 0.6, latency: "fast", capabilities: ["chat", "vision"] },
  { slug: "gemini-2-5-flash-lite", name: "Gemini 2.5 Flash Lite", categories: ["text"], context: 1000000, outputTokens: 8192, inputPrice: 0.05, outputPrice: 0.2, latency: "fast", capabilities: ["chat"] },
  { slug: "gemini-2-0-flash", name: "Gemini 2.0 Flash", categories: ["multimodal"], context: 1000000, outputTokens: 8192, inputPrice: 0.1, outputPrice: 0.4, latency: "fast", capabilities: ["chat", "vision"] },
  { slug: "gemini-embedding", name: "Gemini Embedding", categories: ["embedding"], context: 8192, inputPrice: 0.15, capabilities: ["embeddings"] },
  { slug: "imagen-3", name: "Imagen 3", categories: ["image"], unit: { amount: 0.04, unit: "image" }, capabilities: ["generation"] },
  { slug: "veo-2", name: "Veo 2", categories: ["video"], unit: { amount: 0.1, unit: "second" }, capabilities: ["generation"], latency: "deep" },
]);
