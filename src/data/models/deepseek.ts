import { defineModels } from "@/data/models/define";

export const deepseekModels = defineModels("DeepSeek", "deepseek", [
  { slug: "deepseek-v3", name: "DeepSeek V3", categories: ["text", "coding"], context: 128000, outputTokens: 8192, inputPrice: 0.27, outputPrice: 1.1, featured: true, capabilities: ["chat", "coding"] },
  { slug: "deepseek-r1", name: "DeepSeek R1", categories: ["reasoning"], context: 128000, outputTokens: 8192, inputPrice: 0.55, outputPrice: 2.19, capabilities: ["reasoning"] },
  { slug: "deepseek-coder", name: "DeepSeek Coder", categories: ["coding"], context: 128000, outputTokens: 8192, inputPrice: 0.14, outputPrice: 0.28, capabilities: ["coding"] },
  { slug: "deepseek-vl", name: "DeepSeek VL", categories: ["vision"], context: 64000, outputTokens: 4096, inputPrice: 0.3, outputPrice: 0.9, capabilities: ["vision"] },
  { slug: "deepseek-r1-distill", name: "DeepSeek R1 Distill", categories: ["reasoning"], context: 64000, outputTokens: 8192, inputPrice: 0.14, outputPrice: 0.28, latency: "fast", capabilities: ["reasoning"] },
]);
