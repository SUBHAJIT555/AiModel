import type { CSSProperties } from "react";
import { ProviderMark } from "@/components/models/ProviderMark";

const groups = [
  [
    { slug: "openai", name: "OpenAI" },
    { slug: "mistral", name: "Mistral" },
    { slug: "elevenlabs", name: "ElevenLabs" },
  ],
  [
    { slug: "anthropic", name: "Anthropic" },
    { slug: "deepseek", name: "DeepSeek" },
    { slug: "cohere", name: "Cohere" },
  ],
  [
    { slug: "google", name: "Google" },
    { slug: "qwen", name: "Qwen" },
    { slug: "black-forest", name: "Flux" },
  ],
  [
    { slug: "meta", name: "Meta" },
    { slug: "xai", name: "xAI" },
    { slug: "runway", name: "Runway" },
  ],
];

export function BrandCycle() {
  return (
    <div className="brand-cycle mx-auto mt-8 flex items-center justify-center gap-6 sm:gap-10" aria-hidden>
      {groups.map((logos) => (
        <div key={logos[0].slug} className="relative h-7 w-7 sm:w-[9.5rem]">
          {logos.map((logo, index) => (
            <div
              key={logo.slug}
              className="brand-cycle__item absolute inset-0 flex items-center justify-center gap-2"
              style={{ "--i": index } as CSSProperties}
            >
              <ProviderMark slug={logo.slug} name={logo.name} size="md" />
              <span className="hidden text-[14px] font-medium tracking-[-0.02em] sm:inline">{logo.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
