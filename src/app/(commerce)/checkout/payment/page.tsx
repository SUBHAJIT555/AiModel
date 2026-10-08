import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";
import { PaymentStep } from "@/components/checkout/PaymentStep";

export const metadata: Metadata = {
  title: "Payment",
  description: "Simulated payment step. No card details are collected.",
  robots: { index: false, follow: false },
};

export default function CheckoutPaymentPage() {
  return (
    <CheckoutFrame
      eyebrow="Payment"
      title="Choose a method."
      lede="Pick a method to finish the demo. No card number is collected and nothing is charged."
    >
      <Suspense fallback={null}>
        <PaymentStep />
      </Suspense>
    </CheckoutFrame>
  );
}
