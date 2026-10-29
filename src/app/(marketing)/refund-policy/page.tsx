import type { Metadata } from "next";
import { RefundPolicyPage } from "@/components/legal/RefundPolicyPage";

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "If you cannot redeem a Modexa credit token, write to info@easy-bay.com. The team replies as soon as possible.",
};

export default function RefundPolicyRoute() {
  return <RefundPolicyPage />;
}
