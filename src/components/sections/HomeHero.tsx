import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { ProviderStrip } from "@/components/sections/ProviderStrip";

export function HomeHero() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/home.jpg" />
          <div className="relative z-10">
            <HeroIntro />
          </div>
        </div>
        <ProviderStrip />
      </div>
    </section>
  );
}
