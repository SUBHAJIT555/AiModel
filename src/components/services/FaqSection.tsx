import { Accordion } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { faqCategories } from "@/data/faqs";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <Reveal className="px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">Questions</p>
          <h2 className="mt-3 max-w-[11em] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.035em]">
            Frequently asked questions.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
            How the gateway, routing, pricing, and support work in this frontend.
          </p>
          <img
            src="/figures/faq.svg"
            alt=""
            width={960}
            height={677}
            className="mt-10 hidden w-full max-w-[300px] lg:block"
          />
        </Reveal>
        <Reveal delay={0.08} className="border-t border-border px-6 py-10 md:px-10 lg:border-t-0 lg:border-l lg:px-12 lg:py-16">
          <div className="flex flex-col gap-8">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase font-bold">{category.title}</p>
                <Accordion hideSeparator className="mt-3 w-full overflow-hidden rounded-[16px] border border-border bg-surface">
                  {category.items.map((item, index) => (
                    <Accordion.Item
                      key={item.title}
                      style={
                        index < category.items.length - 1
                          ? { borderBottom: "1px solid var(--border)", boxShadow: "none" }
                          : undefined
                      }
                    >
                      <Accordion.Heading>
                        <Accordion.Trigger className="rounded-none px-4 py-3.5 text-[14px] font-medium tracking-[-0.02em] text-foreground">
                          {item.title}
                          <Accordion.Indicator>
                            <ChevronDown className="size-4 text-muted" strokeWidth={1.75} />
                          </Accordion.Indicator>
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body className="px-4 pt-0 pb-4 text-[14px] leading-6 text-muted">{item.content}</Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
