import { ArrowRight } from "lucide-react";
import { BrandCycle } from "@/components/sections/home/BrandCycle";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section className="bg-surface">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/home.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-10 text-center md:pt-14 md:pb-12">
            <h1 className="text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em]">
              The app stays.
              <span className="block">
                The <span className="text-primary">model</span> can move.
              </span>
            </h1>
            <BrandCycle />
            <p className="mx-auto mt-6 max-w-[540px] text-[16px] leading-7 text-muted md:text-[17px]">
              OpenAI, Anthropic, Google, and the rest of the catalog. Your app posts once. The model name is the part that changes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/models">
                See the models
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/contact" variant="secondary">
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
