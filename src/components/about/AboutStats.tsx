export function AboutStats({
  models,
  providers,
  plans,
  modalities,
}: {
  models: number;
  providers: number;
  plans: number;
  modalities: number;
}) {
  const tiles = [
    { value: String(models), label: "Models", note: "In the catalog", accent: true },
    { value: String(providers), label: "Providers", note: "Behind those models", accent: false },
    { value: String(plans), label: "Plans", note: "Listed in rupees", accent: false },
    { value: String(modalities), label: "Call types", note: "Text through embeddings", accent: false },
  ];

  return (
    <section id="stats" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border">
        <div className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-5 md:px-8">
          <h2 className="text-[18px] font-medium tracking-[-0.02em]">Counted from the catalog.</h2>
          <p className="text-[13px] text-muted">What this site lists today.</p>
        </div>
        <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {tiles.map((tile) => (
            <article
              key={tile.label}
              className="border-border px-6 py-5 max-md:[&:nth-child(odd)]:border-r max-md:[&:nth-child(-n+2)]:border-b md:px-8 md:[&:not(:last-child)]:border-r"
            >
              <p className={`text-[2rem] leading-none font-medium tracking-[-0.04em] ${tile.accent ? "text-primary" : ""}`}>
                {tile.value}
              </p>
              <p className="mt-3 text-[14px] font-medium tracking-[-0.02em]">{tile.label}</p>
              <p className="mt-0.5 text-[13px] text-muted">{tile.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
