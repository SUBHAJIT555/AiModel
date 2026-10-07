import { defineModels } from "@/data/models/define";

export const mistralModels = defineModels("Mistral", "mistral", [
  { slug: "mistral-large", name: "Mistral Large", categories: ["text", "coding"], context: 128000, outputTokens: 8192, inputPrice: 2, outputPrice: 6, capabilities: ["chat", "coding", "tools"] },
  { slug: "mistral-medium", name: "Mistral Medium", categories: ["text"], context: 128000, outputTokens: 8192, inputPrice: 0.4, outputPrice: 2, capabilities: ["chat"] },
  { slug: "mistral-small", name: "Mistral Small", categories: ["text"], context: 32000, outputTokens: 4096, inputPrice: 0.1, outputPrice: 0.3, latency: "fast", capabilities: ["chat"] },
  { slug: "codestral", name: "Codestral", categories: ["coding"], context: 256000, outputTokens: 8192, inputPrice: 0.3, outputPrice: 0.9, capabilities: ["coding"] },
  { slug: "pixtral-large", name: "Pixtral Large", categories: ["vision", "multimodal"], context: 128000, outputTokens: 8192, inputPrice: 2, outputPrice: 6, capabilities: ["vision", "chat"] },
  { slug: "mistral-embed", name: "Mistral Embed", categories: ["embedding"], context: 8192, inputPrice: 0.1, capabilities: ["embeddings"] },
]);
