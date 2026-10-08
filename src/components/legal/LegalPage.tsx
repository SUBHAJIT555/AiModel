import type { Metadata } from "next";
import Link from "next/link";
import { legalDocs, legalNav, type LegalDoc } from "@/data/legal";
import { contactOffice } from "@/data/contact";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";

export function legalMetadata(slug: LegalDoc["slug"]): Metadata {
  const page = legalDocs[slug];
  return { title: page.title, description: page.description };
}

export function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const page = legalDocs[slug];

  return (
    <div className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <section>
        <div className="relative mx-auto w-full max-w-5xl">
            <HeroBackdrop src="/heroes/home.jpg" />
            <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-10 text-center md:pt-14 md:pb-12">
              <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
                <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
                Legal
              </p>
              <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
                {page.title}
              </h1>
              <p className="mt-5 max-w-[460px] text-[15px] leading-7 text-muted md:text-[16px]">{page.summary}</p>
              <p className="mt-6 flex flex-col items-center gap-1 text-[13px] text-muted sm:flex-row sm:gap-2">
                <span>Updated {page.updated}</span>
                <span className="hidden text-border-strong sm:inline" aria-hidden>
                  /
                </span>
                <a className="text-foreground underline decoration-border underline-offset-4" href={`mailto:${contactOffice.email}`}>
                  {contactOffice.email}
                </a>
              </p>
              <nav className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Legal">
                {legalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.slug === slug ? "page" : undefined}
                    className={
                      item.slug === slug
                        ? "text-[14px] font-medium text-foreground"
                        : "text-[14px] text-muted hover:text-foreground"
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
        </div>
      </section>
      <article className="mx-auto w-full max-w-5xl px-6 py-8 md:py-10">
        <div>
          {page.sections.map((section, index) => (
            <section key={section.title} className={index > 0 ? "mt-10 border-t border-border pt-10" : undefined}>
              <h2 className="text-[1.25rem] leading-snug font-medium tracking-[-0.03em]">
                <span className="mr-3 font-mono text-[12px] tracking-[0.08em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[15px] leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
              {section.points ? (
                <ul className="mt-4 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-7 text-muted">
                      <span aria-hidden className="mt-[0.7rem] size-1 shrink-0 rounded-full bg-border-strong" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
