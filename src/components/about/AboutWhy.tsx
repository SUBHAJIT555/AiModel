import { Globe, IndianRupee, Layers, Library, ReceiptText, Route } from "lucide-react";

const reasons = [
  {
    title: "One request to learn",
    body: "Chat, image, audio, and video share the same fields. A new provider does not mean a new client.",
    icon: Route,
  },
  {
    title: "A catalog you can read",
    body: "Reasoning, code, image, video, and voice. Open a row and see what that model is for.",
    icon: Library,
  },
  {
    title: "A route, if you want it",
    body: "Cheaper, faster, or a model you named. The call your app makes does not change.",
    icon: Layers,
  },
  {
    title: "The next model is ready",
    body: "A timeout or a provider error moves the call down the list you set. The caller still gets one reply.",
    icon: Globe,
  },
  {
    title: "You can see who answered",
    body: "Latency, errors, and the provider that served the call. One place, not a tab for every vendor.",
    icon: ReceiptText,
  },
  {
    title: "Priced in rupees",
    body: "Route, Volume, and Command are listed in INR. Volume follows ₹80 for each million tokens.",
    icon: IndianRupee,
  },
];

export function AboutWhy() {
  return (
    <section id="why-us" className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border px-6 py-10 md:px-10 md:py-12">
        
        <h2 className="mt-5 max-w-[14em] text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.035em]">
          Why one route is enough
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
          The catalog can change. The call your app makes does not.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title}>
                <Icon className="size-5 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 text-[16px] font-medium tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-6 text-muted">{reason.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
