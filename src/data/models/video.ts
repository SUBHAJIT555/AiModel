import { defineModels } from "@/data/models/define";

export const videoModels = [
  ...defineModels("Kling", "kling", [
    { slug: "kling-v2", name: "Kling 2", categories: ["video"], unit: { amount: 0.1, unit: "second" }, capabilities: ["generation"], latency: "deep" },
    { slug: "kling-v1-6", name: "Kling 1.6", categories: ["video"], unit: { amount: 0.07, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Runway", "runway", [
    { slug: "runway-gen3", name: "Runway Gen-3", categories: ["video"], unit: { amount: 0.1, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Luma", "luma", [
    { slug: "luma-ray-2", name: "Luma Ray 2", categories: ["video"], unit: { amount: 0.08, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Pika", "pika", [
    { slug: "pika-2", name: "Pika 2", categories: ["video"], unit: { amount: 0.06, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Tencent", "tencent", [
    { slug: "hunyuan-video", name: "Hunyuan Video", categories: ["video"], unit: { amount: 0.05, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
  ...defineModels("Alibaba", "alibaba", [
    { slug: "wan-2-1", name: "Wan 2.1", categories: ["video"], unit: { amount: 0.05, unit: "second" }, capabilities: ["generation"], latency: "deep" },
  ]),
];
