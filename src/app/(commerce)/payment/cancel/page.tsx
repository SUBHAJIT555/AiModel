import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-xl border border-border bg-surface p-6">
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Payment cancelled</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">Nothing was charged</h1>
          <p className="mt-3 text-sm leading-6 text-muted">The demo stopped before a payment simulation finished.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/checkout?plan=scale&billing=monthly" size="sm">
              Return to checkout
            </Button>
            <Button href="/pricing" size="sm" variant="secondary">
              View pricing
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
