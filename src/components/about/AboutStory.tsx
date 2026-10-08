import { Check } from "lucide-react";
import Link from "next/link";

const mission = [
  "One endpoint for the whole catalog",
  "The request stays put when the model changes",
  "The receipt shows Aimodel, then the model you chose",
  "Plans listed in rupees",
];

const vision = [
  "Text, vision, audio, and video on one request",
  "A fallback when a provider fails",
  "Tax that follows the country on the receipt",
  "A demo you can walk before you integrate",
];

export function AboutStory() {
  return (
    <>
      <section id="origin" className="scroll-mt-28 bg-surface">
        <div className="home-frame grid border-t border-border px-6 py-16 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:px-10 md:py-20 lg:px-12">
          <div>
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">The route</p>
            <h2 className="mt-4 max-w-[8em] text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.035em]">
              Our story
            </h2>
            <p className="mt-4 text-[15px] text-muted">One request, many models</p>
          </div>
          <div className="mt-8 space-y-5 text-[15px] leading-7 text-foreground/80 md:mt-0 md:border-l md:border-border md:pl-10 lg:pl-14">
            <p>
              Aimodel started as the layer between an app and the providers. Teams were keeping a new client for every model. The gateway keeps that request in one shape.
            </p>
            <p>
              The catalog stays open, the bill stays in rupees, and the model you pick is the one that shows on the receipt. India adds CGST and SGST. Other countries are labeled as an export of services.
            </p>
          </div>
        </div>
      </section>

      <section id="brand" className="scroll-mt-28 bg-surface">
        <div className="home-frame border-t border-border px-6 py-16 text-center md:px-10 md:py-20">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.035em]">
            About Aimodel
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-7 text-muted">
            Aimodel is the gateway your app calls. Providers stay in the catalog. Route, Volume, and Command are paid plans, and Volume follows ₹80 for each million tokens.
          </p>
          <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
            <article className="rounded-[20px] border border-border bg-surface p-8 md:p-10">
              <h3 className="text-[22px] font-medium tracking-[-0.03em]">Mission</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted">
                Keep one route between the product and the models.
              </p>
              <ul className="mt-6 space-y-3">
                {mission.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check aria-hidden className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[20px] bg-primary p-8 text-white md:p-10">
              <h3 className="text-[22px] font-medium tracking-[-0.03em]">Vision</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-white/80">
                A catalog, a bill, and a request teams can keep.
              </p>
              <ul className="mt-6 space-y-3">
                {vision.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/15">
                      <Check aria-hidden className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-10 text-[15px] text-muted">Every plan is paid, and the bill stays in rupees.</p>
          <p className="mt-2 text-[15px]">
            <Link href="/pricing" className="text-primary">
              View pricing
            </Link>{" "}
            <span className="text-muted">or</span>{" "}
            <Link href="/contact" className="text-primary">
              talk to us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
