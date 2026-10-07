import Link from "next/link";
import { footerColumns, socialLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";
import { SectionDivider } from "@/components/layout/SectionDivider";

export function Footer() {
  return (
    <footer className="relative bg-surface">
      <SectionDivider placement="top" />
      <div className="mx-auto grid w-full max-w-[var(--container)] gap-10 px-[var(--gutter)] py-14 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted">{siteConfig.description}</p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h2 className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{column.title}</h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link className="text-sm hover:text-primary" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative">
        <SectionDivider placement="top" ticks={false} />
        <div className="mx-auto flex w-full max-w-[var(--container)] flex-col gap-4 px-[var(--gutter)] py-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            {siteConfig.statusLabel}
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="max-w-sm text-[12px]">
            Model names, availability and pricing shown are for demonstration purposes.
          </p>
          <ul className="flex gap-4">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
