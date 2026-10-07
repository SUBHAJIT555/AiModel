import { defineModels } from "@/data/models/define";

export const openaiModels = defineModels("OpenAI", "openai", [
  { slug: "gpt-4-1", name: "GPT-4.1", categories: ["text", "coding"], context: 1000000, outputTokens: 32768, inputPrice: 2, outputPrice: 8, featured: true, capabilities: ["chat", "coding", "tools"] },
  { slug: "gpt-4-1-mini", name: "GPT-4.1 mini", categories: ["text"], context: 1000000, outputTokens: 32768, inputPrice: 0.4, outputPrice: 1.6, latency: "fast", capabilities: ["chat", "tools"] },
  { slug: "gpt-4-1-nano", name: "GPT-4.1 nano", categories: ["text"], context: 1000000, outputTokens: 16384, inputPrice: 0.1, outputPrice: 0.4, latency: "fast", capabilities: ["chat", "classification"] },
  { slug: "gpt-4o", name: "GPT-4o", categories: ["multimodal", "vision"], context: 128000, outputTokens: 16384, inputPrice: 2.5, outputPrice: 10, capabilities: ["chat", "vision", "tools"] },
  { slug: "gpt-4o-mini", name: "GPT-4o mini", categories: ["multimodal", "vision"], context: 128000, outputTokens: 16384, inputPrice: 0.15, outputPrice: 0.6, latency: "fast", capabilities: ["chat", "vision"] },
  { slug: "o3", name: "o3", categories: ["reasoning"], context: 200000, outputTokens: 100000, inputPrice: 10, outputPrice: 40, capabilities: ["reasoning", "coding"] },
  { slug: "o4-mini", name: "o4-mini", categories: ["reasoning"], context: 200000, outputTokens: 100000, inputPrice: 1.1, outputPrice: 4.4, capabilities: ["reasoning"] },
  { slug: "gpt-image-1", name: "GPT Image", categories: ["image"], input: ["text", "image"], output: ["image"], unit: { amount: 0.04, unit: "image" }, capabilities: ["generation", "edit"] },
  { slug: "whisper-large", name: "Whisper", categories: ["audio"], input: ["audio"], output: ["text"], inputPrice: 0.006, capabilities: ["transcription"] },
  { slug: "tts-1", name: "TTS-1", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.015, unit: "minute" }, capabilities: ["speech"] },
  { slug: "text-embedding-3-large", name: "Embedding 3 Large", categories: ["embedding"], context: 8191, inputPrice: 0.13, capabilities: ["embeddings"] },
]);
