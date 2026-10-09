"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { mobileLinks } from "@/data/mega-menu";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/components/motion/transitions";

type MobileNavigationProps = {
  open: boolean;
  panelId: string;
  onNavigate: () => void;
};

export function MobileNavigation({ open, panelId, onNavigate }: MobileNavigationProps) {
  const reduce = useReducedMotion();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setSection(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onNavigate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onNavigate]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pointer-events-auto fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18, ease: easeOut }}
        >
          <button type="button" className="absolute inset-0 bg-foreground/15" aria-label="Close menu" onClick={onNavigate} />
          <motion.nav
            id={panelId}
            aria-label="Mobile"
            className="relative mx-3 mt-1 flex max-h-[min(32rem,calc(100dvh-5.25rem))] flex-col overflow-hidden rounded-[18px] bg-surface shadow-[var(--shadow-dropdown)]"
            initial={reduce ? false : { y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: -6, opacity: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
          >
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {primaryNav.map((item) =>
                item.mega ? (
                  <div key={item.label} className="border-b border-border last:border-b-0">
                    <button
                      type="button"
                      className="flex h-12 w-full items-center justify-between rounded-[12px] px-3 text-left text-[15px] font-medium"
                      aria-expanded={section === item.label}
                      onClick={() => setSection((current) => (current === item.label ? null : item.label))}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={`size-4 text-muted transition-transform ${section === item.label ? "rotate-180" : ""}`}
                        strokeWidth={1.75}
                      />
                    </button>
                    {section === item.label ? (
                      <ul className="grid gap-0.5 px-1 pb-2 md:grid-cols-2">
                        {mobileLinks(item.mega).map((link) => (
                          <li key={link.href + link.title}>
                            <Link
                              className="block rounded-[12px] px-3 py-2.5 hover:bg-surface-subtle"
                              href={link.href}
                              onClick={onNavigate}
                            >
                              <span className="block text-[14px] font-medium">{link.title}</span>
                              <span className="mt-0.5 block text-[12px] leading-5 text-muted">{link.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    className="flex h-12 items-center rounded-[12px] border-b border-border px-3 text-[15px] font-medium last:border-b-0"
                    href={item.href ?? "/"}
                    onClick={onNavigate}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
            <div className="border-t border-border p-3">
              <Button className="w-full justify-center" href={siteConfig.ctaHref} onClick={onNavigate}>
                Pricing
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
