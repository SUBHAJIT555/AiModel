import type { Metadata } from "next";
import { getService } from "@/data/services";
import { EnterprisePanel } from "@/components/services/EnterprisePanel";
import { FallbackPanel } from "@/components/services/FallbackPanel";
import { ObservabilityPanel } from "@/components/services/ObservabilityPanel";
import { FaqSection } from "@/components/services/FaqSection";
import { WhyChooseSection } from "@/components/services/WhyChooseSection";
import { RoutingPanel } from "@/components/services/RoutingPanel";
import { ServiceSplit } from "@/components/services/ServiceSplit";
import { ServicesCta } from "@/components/services/ServicesCta";
import { ServicesHero } from "@/components/services/ServicesHero";
import { UnifiedApiPanel } from "@/components/services/UnifiedApiPanel";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Unified API, intelligent model routing, automatic fallbacks, observability and controls for modern AI applications.",
};

function requiredService(slug: string) {
  const service = getService(slug);
  if (!service) throw new Error(`Missing service: ${slug}`);
  return service;
}

export default function ServicesPage() {
  const api = requiredService("unified-api");
  const routing = requiredService("smart-routing");
  const fallbacks = requiredService("fallbacks");
  const observability = requiredService("observability");
  const enterprise = requiredService("enterprise");

  return (
    <div className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <ServicesHero />
      <ServiceSplit service={api}>
        <UnifiedApiPanel />
      </ServiceSplit>
      <ServiceSplit service={routing} flip>
        <RoutingPanel />
      </ServiceSplit>
      <ServiceSplit service={fallbacks}>
        <FallbackPanel />
      </ServiceSplit>
      <section id={observability.anchor} className="scroll-mt-28 bg-surface">
        <div className="home-frame border-t border-border">
          <Reveal className="px-6 py-14 md:px-10 md:py-16">
            <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">
              {observability.index} / {observability.name}
            </p>
            <h2 className="mt-3 max-w-[12em] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.035em]">
              {observability.sectionTitle}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">{observability.description}</p>
          </Reveal>
          <Reveal delay={0.08} className="border-t border-border">
            <ObservabilityPanel />
          </Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 md:px-10">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {observability.features.map((feature) => (
                <li key={feature} className="text-[13px] text-muted">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <ServiceSplit service={enterprise}>
        <EnterprisePanel />
      </ServiceSplit>
      <WhyChooseSection />
      <FaqSection />
      <ServicesCta />
    </div>
  );
}
