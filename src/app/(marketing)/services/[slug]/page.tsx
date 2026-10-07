import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return {
    title: service?.name ?? "Service",
    description: service?.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <Section>
      <Container>
        {service.eyebrow ? (
          <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{service.eyebrow}</p>
        ) : null}
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{service.name}</h1>
        <p className="mt-4 max-w-2xl text-muted">{service.description}</p>
        <ul className="mt-8 max-w-xl divide-y divide-border border-y border-border">
          {service.features.map((feature) => (
            <li key={feature} className="py-3 text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
