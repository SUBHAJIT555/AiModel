import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Confirm the plan, then pay with UPI.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <CheckoutFrame
      eyebrow="Checkout"
      title="Review the order."
      lede="Confirm the plan and your details. The next step pays the total with UPI."
    >
      <Suspense fallback={null}>
        <CheckoutForm />
      </Suspense>
    </CheckoutFrame>
  );
}
