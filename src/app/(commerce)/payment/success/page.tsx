import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentSuccess } from "@/components/checkout/PaymentSuccess";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <Section>
      <Container>
        <Suspense fallback={null}>
          <PaymentSuccess />
        </Suspense>
      </Container>
    </Section>
  );
}
