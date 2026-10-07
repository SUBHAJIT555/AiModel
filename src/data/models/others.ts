import { defineModels } from "@/data/models/define";

export const otherModels = [
  ...defineModels("Cohere", "cohere", [
    { slug: "command-r-plus", name: "Command R+", categories: ["text"], context: 128000, outputTokens: 4096, inputPrice: 2.5, outputPrice: 10, capabilities: ["chat", "tools"] },
    { slug: "command-r", name: "Command R", categories: ["text"], context: 128000, outputTokens: 4096, inputPrice: 0.15, outputPrice: 0.6, capabilities: ["chat"] },
    { slug: "command-a", name: "Command A", categories: ["reasoning"], context: 256000, outputTokens: 8192, inputPrice: 2.5, outputPrice: 10, capabilities: ["reasoning", "tools"] },
    { slug: "embed-v4", name: "Embed v4", categories: ["embedding"], context: 512, inputPrice: 0.12, capabilities: ["embeddings"] },
  ]),
  ...defineModels("Moonshot", "moonshot", [
    { slug: "kimi-k2", name: "Kimi K2", categories: ["reasoning", "coding"], context: 128000, outputTokens: 8192, inputPrice: 0.6, outputPrice: 2.5, capabilities: ["reasoning", "coding"] },
    { slug: "kimi-latest", name: "Kimi", categories: ["text"], context: 128000, outputTokens: 8192, inputPrice: 0.2, outputPrice: 0.6, capabilities: ["chat"] },
    { slug: "kimi-vl", name: "Kimi VL", categories: ["vision"], context: 128000, outputTokens: 4096, inputPrice: 0.4, outputPrice: 1.2, capabilities: ["vision"] },
  ]),
  ...defineModels("MiniMax", "minimax", [
    { slug: "minimax-m1", name: "MiniMax M1", categories: ["reasoning"], context: 1000000, outputTokens: 8192, inputPrice: 0.4, outputPrice: 1.6, capabilities: ["reasoning"] },
    { slug: "speech-02", name: "Speech 02", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.04, unit: "minute" }, capabilities: ["speech"] },
    { slug: "hailuo-02", name: "Hailuo 02", categories: ["video"], unit: { amount: 0.08, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Zhipu", "zhipu", [
    { slug: "glm-4-5", name: "GLM-4.5", categories: ["text", "coding"], context: 128000, outputTokens: 8192, inputPrice: 0.6, outputPrice: 2.2, capabilities: ["chat", "coding"] },
    { slug: "glm-4-flash", name: "GLM-4 Flash", categories: ["text"], context: 128000, outputTokens: 4096, inputPrice: 0.01, outputPrice: 0.01, latency: "fast", capabilities: ["chat"] },
    { slug: "glm-4v-plus", name: "GLM-4V Plus", categories: ["vision"], context: 8192, outputTokens: 4096, inputPrice: 0.5, outputPrice: 0.5, capabilities: ["vision"] },
  ]),
  ...defineModels("Perplexity", "perplexity", [
    { slug: "sonar-pro", name: "Sonar Pro", categories: ["text"], context: 200000, outputTokens: 8192, inputPrice: 3, outputPrice: 15, capabilities: ["chat", "search"] },
    { slug: "sonar-reasoning", name: "Sonar Reasoning", categories: ["reasoning"], context: 128000, outputTokens: 8192, inputPrice: 2, outputPrice: 8, capabilities: ["reasoning"] },
  ]),
  ...defineModels("Amazon", "amazon", [
    { slug: "nova-pro", name: "Nova Pro", categories: ["multimodal"], context: 300000, outputTokens: 8192, inputPrice: 0.8, outputPrice: 3.2, capabilities: ["chat", "vision"] },
    { slug: "nova-lite", name: "Nova Lite", categories: ["text"], context: 300000, outputTokens: 8192, inputPrice: 0.06, outputPrice: 0.24, latency: "fast", capabilities: ["chat"] },
    { slug: "nova-reel", name: "Nova Reel", categories: ["video"], unit: { amount: 0.08, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Microsoft", "microsoft", [
    { slug: "phi-4", name: "Phi-4", categories: ["text", "coding"], context: 16000, outputTokens: 4096, inputPrice: 0.07, outputPrice: 0.14, capabilities: ["chat", "coding"] },
    { slug: "phi-4-multimodal", name: "Phi-4 Multimodal", categories: ["multimodal"], context: 128000, outputTokens: 4096, inputPrice: 0.1, outputPrice: 0.3, capabilities: ["chat", "vision", "audio"] },
  ]),
  ...defineModels("AI21", "ai21", [
    { slug: "jamba-large", name: "Jamba Large", categories: ["text"], context: 256000, outputTokens: 4096, inputPrice: 2, outputPrice: 8, capabilities: ["chat"] },
  ]),
  ...defineModels("01.AI", "yi", [
    { slug: "yi-lightning", name: "Yi Lightning", categories: ["text"], context: 16000, outputTokens: 4096, inputPrice: 0.1, outputPrice: 0.3, latency: "fast", capabilities: ["chat"] },
  ]),
  ...defineModels("StepFun", "stepfun", [
    { slug: "step-2", name: "Step 2", categories: ["text", "reasoning"], context: 128000, outputTokens: 8192, inputPrice: 0.5, outputPrice: 1.5, capabilities: ["chat", "reasoning"] },
  ]),
];
