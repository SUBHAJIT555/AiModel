import { Mail, MessageSquare, Phone } from "lucide-react";
import { ContactWorldMap } from "@/components/contact/ContactWorldMap";
import { contactOffice } from "@/data/contact";
import { cn } from "@/lib/cn";

const channels = [
  {
    title: "Email",
    body: "A model, a fallback, or which provider answered.",
    action: contactOffice.email,
    href: `mailto:${contactOffice.email}`,
    icon: Mail,
  },
  {
    title: "A plan",
    body: "Route, Volume, or Command. Say which, and how many tokens you expect.",
    action: "Leave a note",
    href: "#message",
    icon: MessageSquare,
  },
  {
    title: "Call us",
    body: `${contactOffice.days}, ${contactOffice.hours}. ${contactOffice.closed} closed.`,
    action: contactOffice.phone,
    href: contactOffice.phoneHref,
    icon: Phone,
  },
];

export function ContactHero() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-[5.5rem] h-[calc(14rem+5.5rem)] w-[min(calc(100%-(var(--gutter)*2)),calc(var(--container)-(var(--gutter)*2)))] -translate-x-1/2 md:-top-[7.5rem] md:h-[calc(15rem+7.5rem)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--primary) 20%, transparent) 1.1px, transparent 0)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 10%, transparent 100%)",
          maskMode: "alpha",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-4 text-center">
        <h1 className="text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.08] font-medium tracking-[-0.04em]">
          Ask about the call
          <span className="block">you want to send.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-7 text-muted">
          A model, a route, or a plan. Say which one, and what the call has to do.
        </p>
      </div>
      <div className="relative z-10 px-4 md:px-8">
        <ContactWorldMap className="py-2 md:py-4" />
      </div>
      <div className="home-frame relative z-10 px-6 pt-6 pb-8 md:pb-10">
        <div className="grid border-t border-dashed border-border pt-6 md:grid-cols-3 md:pt-8">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <article
                key={channel.title}
                className={cn(
                  "px-2 py-8 text-center md:px-6 md:py-2",
                  index > 0 && "border-t border-dashed border-border md:border-t-0 md:border-l",
                )}
              >
                <span className="mx-auto grid size-10 place-items-center rounded-xl border border-dashed border-border bg-surface text-primary shadow-[0_8px_20px_-14px_rgba(17,19,24,0.45)]">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <h2 className="mt-4 text-[16px] font-medium tracking-[-0.02em]">{channel.title}</h2>
                <p className="mx-auto mt-2 max-w-[16rem] text-[14px] leading-6 text-muted">{channel.body}</p>
                <a
                  href={channel.href}
                  className="mt-4 inline-flex text-[14px] font-medium text-primary underline decoration-primary/40 decoration-dotted underline-offset-4"
                >
                  {channel.action}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
