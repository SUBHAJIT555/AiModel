import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";
import { PaymentStep } from "@/components/checkout/PaymentStep";

export const metadata: Metadata = {
  title: "Payment",
  description: "Pay the quoted plan with UPI.",
  robots: { index: false, follow: false },
};

export default function CheckoutPaymentPage() {
  return (
    <CheckoutFrame
      eyebrow="Payment"
      title="Pay with UPI."
      lede="UPI opens a QR code on a computer and your UPI app on a phone. Card and net banking are not charged."
    >
      <Suspense fallback={null}>
        <PaymentStep />
      </Suspense>
    </CheckoutFrame>
  );
}
