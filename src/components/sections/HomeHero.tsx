import { HeroIntro } from "@/components/sections/HeroIntro";
import { ProviderStrip } from "@/components/sections/ProviderStrip";

export function HomeHero() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <HeroIntro />
        <ProviderStrip />
      </div>
    </section>
  );
}
