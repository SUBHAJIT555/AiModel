import { defineModels } from "@/data/models/define";

export const imageModels = [
  ...defineModels("Black Forest", "black-forest", [
    { slug: "flux-1-1-pro", name: "Flux 1.1 Pro", categories: ["image"], unit: { amount: 0.04, unit: "image" }, featured: true, capabilities: ["generation"] },
    { slug: "flux-dev", name: "Flux Dev", categories: ["image"], unit: { amount: 0.025, unit: "image" }, capabilities: ["generation"] },
    { slug: "flux-schnell", name: "Flux Schnell", categories: ["image"], unit: { amount: 0.003, unit: "image" }, latency: "fast", capabilities: ["generation"] },
  ]),
  ...defineModels("Stability", "stability", [
    { slug: "sd-3-5-large", name: "SD 3.5 Large", categories: ["image"], unit: { amount: 0.065, unit: "image" }, capabilities: ["generation"] },
    { slug: "sd-3-medium", name: "SD 3 Medium", categories: ["image"], unit: { amount: 0.035, unit: "image" }, capabilities: ["generation"] },
  ]),
  ...defineModels("Ideogram", "ideogram", [
    { slug: "ideogram-v2", name: "Ideogram 2", categories: ["image"], unit: { amount: 0.08, unit: "image" }, capabilities: ["generation"] },
  ]),
  ...defineModels("Recraft", "recraft", [
    { slug: "recraft-v3", name: "Recraft V3", categories: ["image"], unit: { amount: 0.04, unit: "image" }, capabilities: ["generation"] },
  ]),
];
