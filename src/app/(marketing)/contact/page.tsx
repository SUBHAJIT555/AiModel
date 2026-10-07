import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/sections/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the team about routing, fallbacks, or an enterprise workspace.",
};

export default function ContactPage() {
  return (
    <RoutePlaceholder
      eyebrow="Sales"
      title="Contact"
      description="The contact form is a later phase. This route is reserved so the navigation can resolve."
    />
  );
}
