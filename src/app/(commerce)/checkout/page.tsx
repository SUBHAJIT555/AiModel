import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demonstration checkout. No payment is collected.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <CheckoutFrame
      eyebrow="Checkout"
      title="Review the order."
      lede="Confirm the plan and your details. This demo does not collect a payment."
    >
      <Suspense fallback={null}>
        <CheckoutForm />
      </Suspense>
    </CheckoutFrame>
  );
}
