import { ArrowRight } from "lucide-react";
import { BrandCycle } from "@/components/sections/home/BrandCycle";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

const providers = [
  { name: "OpenAI", src: "/brands/openai.svg" },
  { name: "Anthropic", src: "/brands/anthropic.svg" },
  { name: "Google", src: "/brands/google.svg" },
  { name: "Meta", src: "/brands/meta.svg" },
  { name: "Mistral", src: "/brands/mistral.svg" },
  { name: "DeepSeek", src: "/brands/deepseek.svg" },
];

export function AboutHero() {
  return (
    <section className="bg-surface">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/home.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-16 pb-16 text-center md:pt-24 md:pb-20">
            <h1 className="text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em]">
              About Aimodel
            </h1>
            <BrandCycle />
            <p className="mx-auto mt-6 max-w-[540px] text-[16px] leading-7 text-muted md:text-[17px]">
              One catalog, rupee pricing, and a request your app can keep when the model behind it changes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/models">
                Explore models
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/pricing" variant="secondary">
                View pricing
              </Button>
            </div>
          </div>
        </div>
        <div className="px-6 pt-16 pb-14 text-center md:pt-20">
          <p className="text-[15px] text-foreground">Providers in the catalog</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {providers.map((provider) => (
              <li key={provider.name}>
                <img src={provider.src} alt={provider.name} width={28} height={28} className="h-7 w-auto" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
