import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutPay } from "@/components/checkout/CheckoutPay";

export const metadata: Metadata = {
  title: "UPI payment",
  robots: { index: false, follow: false },
};

export default function CheckoutPayPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPay />
    </Suspense>
  );
}
