import type { ReactNode } from "react";

export function CheckoutFrame({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="px-6 pt-8 pb-6 md:px-10 md:pt-10">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
            <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-muted">{lede}</p>
        </div>
        <div className="border-t border-border px-6 py-10 md:px-10">{children}</div>
      </div>
    </section>
  );
}
