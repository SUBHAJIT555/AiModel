import { HomeHero } from "@/components/sections/HomeHero";
import { FeatureGrid } from "@/components/sections/home/FeatureGrid";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { PlatformToolsSection } from "@/components/sections/home/PlatformToolsSection";
import { ProductionPath } from "@/components/sections/home/ProductionPath";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HowItWorks />
      <PlatformToolsSection />
      <FeatureGrid />
      <ProductionPath />
      <FinalCta />
    </>
  );
}
