import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demonstration checkout. No payment is collected.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Section>
      <Container>
        <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Checkout</p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Review the demo order</h1>
        <div className="mt-8">
          <Suspense fallback={null}>
            <CheckoutForm />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
