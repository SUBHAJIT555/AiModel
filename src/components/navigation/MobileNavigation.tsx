"use client";

import Link from "next/link";
import { primaryNav } from "@/data/navigation";
import { mobileLinks } from "@/data/mega-menu";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type MobileNavigationProps = {
  open: boolean;
  panelId: string;
  onNavigate: () => void;
};

export function MobileNavigation({ open, panelId, onNavigate }: MobileNavigationProps) {
  if (!open) return null;

  return (
    <div className="pointer-events-auto px-1 pt-2 lg:hidden" id={panelId}>
      <nav
        aria-label="Mobile"
        className="nav-panel max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[16px] bg-surface p-2 shadow-[var(--shadow-dropdown)]"
      >
        {primaryNav.map((item) => (
          <div key={item.label} className="border-b border-border px-2 py-3 last:border-b-0">
            <Link className="nav-link" href={item.href ?? "/"} onClick={onNavigate}>
              {item.label}
            </Link>
            {item.mega ? (
              <ul className="mt-1">
                {mobileLinks(item.mega).map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      className="block rounded-[10px] px-3 py-2 hover:bg-surface-subtle"
                      href={link.href}
                      onClick={onNavigate}
                    >
                      <span className="block text-[13px] leading-6 font-medium text-foreground">
                        {link.title}
                      </span>
                      <span className="block text-xs leading-5 text-muted">{link.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <div className="flex flex-col gap-2 p-2">
          <Button href={siteConfig.ctaHref} onClick={onNavigate}>
            Pricing
          </Button>
        </div>
      </nav>
    </div>
  );
}
