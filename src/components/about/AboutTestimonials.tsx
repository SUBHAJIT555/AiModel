const voices = [
  {
    quote: "We kept one client. When the model changed, the request stayed where it was.",
    role: "Product engineer",
  },
  {
    quote: "Routing, fallbacks, and spend sit together, so an outage stays in one place.",
    role: "Platform lead",
  },
  {
    quote: "The plan is in rupees, and the receipt shows the tax for the country we bill from.",
    role: "Finance partner",
  },
];

export function AboutTestimonials() {
  return (
    <section id="voices" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border px-6 py-16 text-center md:px-10 md:py-20">
        <p className="text-[12px] tracking-[0.16em] text-muted uppercase">Voices</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-medium tracking-[-0.03em]">
          How the route gets described
        </h2>
        <p className="mt-3 text-[14px] text-muted">Sample voices written for this demonstration.</p>
        <img src="/figures/about-feedback.svg" alt="" width={640} height={480} className="mx-auto mt-8 w-full max-w-[220px]" />
        <div className="mt-10 grid gap-10 text-left md:grid-cols-3">
          {voices.map((voice) => (
            <blockquote key={voice.role}>
              <p className="text-[16px] leading-7 tracking-[-0.02em]">“{voice.quote}”</p>
              <footer className="mt-4 text-[13px] text-muted">{voice.role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
