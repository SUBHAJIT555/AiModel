import type { Metadata } from "next";
import { CreditsPage } from "@/components/credits/CreditsPage";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Buy Modexa catalog credits from ₹10 to ₹9,899, then redeem them on a plan at checkout. Unused balance stays on your token.",
};

export default function CreditsRoute() {
  return <CreditsPage />;
}
