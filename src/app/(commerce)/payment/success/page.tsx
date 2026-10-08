import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";
import { PaymentSuccess } from "@/components/checkout/PaymentSuccess";

export const metadata: Metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <CheckoutFrame
      eyebrow="Payment successful"
      title="Plan activated."
      lede="The demo marked this plan active. No charge was sent to a payment provider."
    >
      <Suspense fallback={null}>
        <PaymentSuccess />
      </Suspense>
    </CheckoutFrame>
  );
}
