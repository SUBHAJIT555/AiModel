import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Services",
  description: "Gateway services: one API, routing, fallbacks, observability, and controls.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <SectionHeader
          as="h1"
          eyebrow="Platform"
          title="Services"
          description="Five service areas. Detail pages are structural placeholders for the next phase."
        />
        <ul className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="bg-surface p-6">
              <Link href={`/services/${service.slug}`}>
                <h2 className="text-xl font-semibold tracking-tight">{service.name}</h2>
                <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
