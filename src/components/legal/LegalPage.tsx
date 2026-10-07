import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/sections/RoutePlaceholder";

const pages: Record<string, { title: string; description: string }> = {
  terms: {
    title: "Terms",
    description: "Placeholder terms. Legal review is still required before publication.",
  },
  privacy: {
    title: "Privacy",
    description: "Placeholder privacy notice. It does not describe a live data practice yet.",
  },
  cookies: {
    title: "Cookies",
    description: "Placeholder cookie note. This frontend does not set advertising cookies.",
  },
  "acceptable-use": {
    title: "Acceptable use",
    description: "Placeholder acceptable-use rules for the gateway.",
  },
};

export function legalMetadata(slug: keyof typeof pages): Metadata {
  const page = pages[slug];
  return { title: page.title, description: page.description };
}

export function LegalPage({ slug }: { slug: keyof typeof pages }) {
  const page = pages[slug];
  return <RoutePlaceholder eyebrow="Legal" title={page.title} description={page.description} />;
}
