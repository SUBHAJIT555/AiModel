import { Check } from "lucide-react";
import Link from "next/link";

const kept = [
  "One endpoint for chat, image, audio, and video",
  "The same fields when the model changes",
  "A route, when you do not want to name one",
  "The next model, if the first one fails",
];

const moves = [
  "A catalog you can open before you send a call",
  "You can see which model answered",
  "Each team can be told which models it may use",
  "The plan is listed in rupees",
];

export function AboutStory() {
  return (
    <>
      <section id="origin" className="scroll-mt-28 bg-surface">
        <div className="home-frame grid border-t border-border px-6 py-10 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:px-10 md:py-12 lg:px-12">
          <div>
            <p className="text-[12px] tracking-[0.16em] text-muted uppercase">The work</p>
            <h2 className="mt-4 max-w-[8em] text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.035em]">
              One client was enough
            </h2>
            <p className="mt-4 text-[15px] text-muted">The catalog is the part that grows</p>
          </div>
          <div className="mt-8 space-y-5 text-[15px] leading-7 text-foreground/80 md:mt-0 md:border-l md:border-border md:pl-10 lg:pl-14">
            <p>
              Teams were writing a new client every time they added a provider. The body changed. The fields changed. The app had to change with them.
            </p>
            <p>
              Aimodel keeps that request in one shape. Name a model, or leave the route to decide. If the first one does not answer, the next one can. You still read one reply.
            </p>
          </div>
        </div>
      </section>

      <section id="brand" className="scroll-mt-28 bg-surface">
        <div className="home-frame border-t border-border px-6 py-10 text-center md:px-10 md:py-12">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.035em]">
            What stays, and what can move
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-7 text-muted">
            The request your app sends stays. The model behind it can change, and so can the provider.
          </p>
          <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
            <article className="rounded-[20px] border border-border bg-surface p-8 md:p-10">
              <h3 className="text-[22px] font-medium tracking-[-0.03em]">What stays</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted">
                The call your app already knows how to send.
              </p>
              <ul className="mt-6 space-y-3">
                {kept.map((item) => (
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
              <h3 className="text-[22px] font-medium tracking-[-0.03em]">What can move</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-white/80">
                The catalog behind that call, and who is allowed to use it.
              </p>
              <ul className="mt-6 space-y-3">
                {moves.map((item) => (
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
          <p className="mt-10 text-[15px] text-muted">The plans are listed in rupees.</p>
          <p className="mt-2 text-[15px]">
            <Link href="/pricing" className="text-primary">
              See plans
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
