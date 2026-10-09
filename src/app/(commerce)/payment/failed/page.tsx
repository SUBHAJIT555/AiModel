import type { Metadata } from "next";
import { CheckoutFrame } from "@/components/checkout/CheckoutFrame";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment failed",
  robots: { index: false, follow: false },
};

export default function PaymentFailedPage() {
  return (
    <CheckoutFrame
      eyebrow="Payment failed"
      title="Payment couldn't be completed."
      lede="The UPI payment did not finish. You can start it again from checkout."
    >
      <div className="flex flex-wrap gap-3">
        <Button href="/checkout/payment?plan=route&billing=monthly">Try again</Button>
        <Button href="/checkout?plan=route&billing=monthly" variant="secondary">
          Return to checkout
        </Button>
      </div>
    </CheckoutFrame>
  );
}
