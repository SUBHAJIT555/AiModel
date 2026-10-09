import type { Metadata } from "next";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return (
    <CheckoutFrame
      eyebrow="Payment cancelled"
      title="Nothing was charged."
      lede="You left before a UPI payment started."
    >
      <div className="flex flex-wrap gap-3">
        <Button href="/checkout?plan=route&billing=monthly">Return to checkout</Button>
        <Button href="/pricing" variant="secondary">
          View pricing
        </Button>
      </div>
    </CheckoutFrame>
  );
}
