import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOffice } from "@/components/contact/ContactOffice";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask about a model, a route, or a plan. The form on this page does not send the message.",
};

export default function ContactPage() {
  return (
    <div className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <ContactHero />
      <ContactOffice />
      <ContactForm />
    </div>
  );
}
