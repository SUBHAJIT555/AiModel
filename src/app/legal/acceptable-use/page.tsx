import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata: Metadata = legalMetadata("acceptable-use");

export default function Page() {
  return <LegalPage slug="acceptable-use" />;
}
