import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Payment failed",
  robots: { index: false, follow: false },
};

export default function PaymentFailedPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-xl border border-border bg-surface p-6">
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Payment failed</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Payment couldn&apos;t be completed</h1>
          <p className="mt-3 text-sm leading-6 text-muted">This is a demonstration error. No transaction was attempted.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/checkout/payment?plan=scale&billing=monthly" size="sm">
              Try again
            </Button>
            <Button href="/checkout?plan=scale&billing=monthly" size="sm" variant="secondary">
              Return to checkout
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
