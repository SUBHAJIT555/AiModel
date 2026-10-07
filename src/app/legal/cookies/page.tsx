import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata: Metadata = legalMetadata("cookies");

export default function Page() {
  return <LegalPage slug="cookies" />;
}
