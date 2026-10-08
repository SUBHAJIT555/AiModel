import Link from "next/link";
import { footerColumns } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { SectionDivider } from "@/components/layout/SectionDivider";

export function Footer() {
  return (
    <footer className="relative bg-surface-subtle">
      <SectionDivider placement="top" />
      <div className="mx-auto grid w-full max-w-[var(--container)] gap-12 px-8 py-14 md:px-14 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{siteConfig.description}</p>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">Newsletter</p>
            <p className="mt-1 max-w-xs text-sm leading-6 text-muted">
              An email for catalog news. This page does not send them.
            </p>
            <div className="mt-4">
              <FooterNewsletter />
            </div>
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-sm text-foreground hover:text-primary" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="relative">
        <SectionDivider placement="top" ticks={false} />
        <div className="mx-auto w-full max-w-[var(--container)] px-8 py-5 md:px-14 lg:px-16">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
