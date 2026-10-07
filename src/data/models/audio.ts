import { defineModels } from "@/data/models/define";

export const audioModels = [
  ...defineModels("ElevenLabs", "elevenlabs", [
    { slug: "eleven-multilingual", name: "Eleven Multilingual", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.1, unit: "minute" }, capabilities: ["speech"] },
    { slug: "eleven-turbo", name: "Eleven Turbo", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.05, unit: "minute" }, latency: "fast", capabilities: ["speech"] },
  ]),
  ...defineModels("AssemblyAI", "assemblyai", [
    { slug: "scribe-v1", name: "Scribe", categories: ["audio"], input: ["audio"], output: ["text"], unit: { amount: 0.006, unit: "minute" }, capabilities: ["transcription"] },
  ]),
  ...defineModels("Stability", "stability", [
    { slug: "stable-audio-2", name: "Stable Audio 2", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.08, unit: "minute" }, capabilities: ["generation"] },
  ]),
  ...defineModels("Suno", "suno", [
    { slug: "suno-v4", name: "Suno V4", categories: ["audio"], input: ["text"], output: ["audio"], unit: { amount: 0.12, unit: "minute" }, capabilities: ["generation"] },
  ]),
];
