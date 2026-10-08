import type { Metadata } from "next";
import { AboutAudience } from "@/components/about/AboutAudience";
import { AboutClose } from "@/components/about/AboutClose";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { AboutWhy } from "@/components/about/AboutWhy";
import { catalogProviders, models } from "@/data/models";
import { pricingPlans } from "@/data/pricing";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aimodel sits between the app and the models. One request, a catalog you can read, and another model if the first one does not answer.",
};

export default function AboutPage() {
  const modalities = new Set(models.flatMap((model) => model.modalities)).size;

  return (
    <div className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <AboutHero />
      <AboutStory />
      <AboutAudience />
      <AboutStats
        models={models.length}
        providers={catalogProviders.length}
        plans={pricingPlans.length}
        modalities={modalities}
      />
      <AboutTestimonials />
      <AboutWhy />
      <AboutClose />
    </div>
  );
}
