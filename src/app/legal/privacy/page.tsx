import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata: Metadata = legalMetadata("privacy");

export default function Page() {
  return <LegalPage slug="privacy" />;
}
