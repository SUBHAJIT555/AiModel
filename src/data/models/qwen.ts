import { defineModels } from "@/data/models/define";

export const qwenModels = defineModels("Qwen", "qwen", [
  { slug: "qwen-max", name: "Qwen Max", categories: ["text", "reasoning"], context: 128000, outputTokens: 8192, inputPrice: 1.6, outputPrice: 6.4, capabilities: ["chat", "reasoning"] },
  { slug: "qwen-plus", name: "Qwen Plus", categories: ["text"], context: 128000, outputTokens: 8192, inputPrice: 0.4, outputPrice: 1.2, capabilities: ["chat"] },
  { slug: "qwen-turbo", name: "Qwen Turbo", categories: ["text"], context: 128000, outputTokens: 8192, inputPrice: 0.05, outputPrice: 0.2, latency: "fast", capabilities: ["chat"] },
  { slug: "qwen-vl-max", name: "Qwen VL Max", categories: ["vision"], context: 32000, outputTokens: 4096, inputPrice: 0.8, outputPrice: 2.4, capabilities: ["vision"] },
  { slug: "qwen-coder", name: "Qwen Coder", categories: ["coding"], context: 128000, outputTokens: 8192, inputPrice: 0.3, outputPrice: 0.9, capabilities: ["coding"] },
  { slug: "qwen-omni", name: "Qwen Omni", categories: ["multimodal", "audio"], context: 32000, outputTokens: 4096, inputPrice: 0.6, outputPrice: 1.8, capabilities: ["chat", "vision", "audio"] },
]);
