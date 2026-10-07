import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/sections/RoutePlaceholder";

export const metadata: Metadata = {
  title: "About",
  description: "Why a single model gateway exists, and how the product is scoped.",
};

export default function AboutPage() {
  return (
    <RoutePlaceholder
      eyebrow="Company"
      title="About"
      description="Editorial page for the product’s scope. The full story is a later phase."
    />
  );
}
