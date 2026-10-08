import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { contactOffice } from "@/data/contact";

export function ContactOffice() {
  return (
    <section className="bg-surface">
      <div className="home-frame border-t border-border px-5 py-4 md:px-6">
        <div
          className="grid items-center gap-6 rounded-xl px-5 py-6 md:px-8 md:py-7 lg:grid-cols-2 lg:gap-8"
          style={{
            background:
              "radial-gradient(ellipse 95% 78% at 5% 5%, color-mix(in srgb, var(--primary) 12%, transparent), transparent 70%), radial-gradient(ellipse 90% 75% at 95% 8%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 72%), linear-gradient(160deg, #f7f6ff 0%, #f3f1ff 50%, #f8f7ff 100%)",
          }}
        >
          <div className="max-w-sm">
            <p className="text-[13px] text-muted">Office</p>
            <h2 className="mt-1.5 text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.03em]">
              Bengaluru, for now
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-muted">
              The address is a stand-in.{" "}
              <span className="text-foreground underline decoration-primary/40 decoration-dotted underline-offset-4">
                It will be replaced when the office details are final.
              </span>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-primary" strokeWidth={1.75} />
              <div>
                <h3 className="text-[16px] font-medium tracking-[-0.02em]">{contactOffice.city}</h3>
                <p className="text-[13px] text-muted">{contactOffice.company}</p>
              </div>
            </div>
            <div className="my-3 border-t border-dashed border-border" />
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div>
                <p className="text-[10px] font-medium tracking-[0.12em] text-muted uppercase">Address</p>
                <p className="mt-0.5 max-w-sm text-[14px] leading-6">{contactOffice.address}</p>
              </div>
              <a
                href={contactOffice.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-[14px] font-medium text-primary"
              >
                Google Maps
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
            <div className="my-3 border-t border-dashed border-border" />
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.75} />
              <div>
                <p className="text-[10px] font-medium tracking-[0.12em] text-muted uppercase">Office timing</p>
                <dl className="mt-1 space-y-1 text-[14px]">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <dt className="text-muted">{contactOffice.days}</dt>
                    <dd className="font-medium">{contactOffice.hours}</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <dt className="text-muted">{contactOffice.closed}</dt>
                    <dd className="font-medium">Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
