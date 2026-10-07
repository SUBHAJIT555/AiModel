import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Payment",
  description: "Simulated payment step. No card details are collected.",
  robots: { index: false, follow: false },
};

export default function CheckoutPaymentPage() {
  return (
    <Section>
      <Container>
        <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Payment</p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Choose a method</h1>
        <div className="mt-8">
          <Suspense fallback={null}>
            <PaymentStep />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
