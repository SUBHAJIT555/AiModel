const people = [
  "0 0 262 262",
  "309 0 262 262",
  "628 0 262 262",
  "0 300 262 262",
  "309 300 262 262",
  "628 300 262 262",
  "0 618 262 262",
  "318 618 262 262",
];

export function AboutAudience() {
  return (
    <section id="audience" className="scroll-mt-28 bg-surface">
      <div className="home-frame grid border-t border-border px-6 py-10 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:px-10 md:py-12 lg:px-12">
        <div>
          <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Who it&apos;s for</p>
          <h2 className="mt-4 max-w-[9em] text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.035em] text-muted">
            The people who send the call
          </h2>
          <p className="mt-4 text-[15px] text-muted">And the people who have to account for it</p>
        </div>
        <div className="mt-8 md:mt-0 md:border-l md:border-border md:pl-10 lg:pl-14">
          <div className="space-y-5 text-[15px] leading-7 text-foreground/80">
            <p>
              Product engineers post once. Chat, image, audio, or video. When the model changes, they change the name, not the client.
            </p>
            <p>
              Platform teams set the route, the fallback, and which models a workspace may use. Finance reads the plan in rupees. On an India receipt, that is CGST and SGST. Elsewhere it is marked as an export of services.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-3">
            {people.map((viewBox) => (
              <li key={viewBox}>
                <svg viewBox={viewBox} className="size-16" aria-hidden>
                  <image href="/figures/about-team.svg" width="889.408" height="880" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
