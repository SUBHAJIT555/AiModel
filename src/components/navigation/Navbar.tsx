"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import type { MegaMenuKey } from "@/types/mega-menu";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { NavItem } from "@/components/navigation/NavItem";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useScrolled } from "@/hooks/useScrolled";

const OPEN_DELAY = 60;
const CLOSE_DELAY = 150;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<MegaMenuKey | null>(null);
  const panelId = useId();
  const mobileId = useId();
  const scrolled = useScrolled();
  const barRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<MegaMenuKey | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const triggers = useRef<Partial<Record<MegaMenuKey, HTMLButtonElement | null>>>({});
  useLockBodyScroll(mobileOpen);

  function clearOpenTimer() {
    if (openTimer.current === null) return;
    window.clearTimeout(openTimer.current);
    openTimer.current = null;
  }

  function clearCloseTimer() {
    if (closeTimer.current === null) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function setMenu(key: MegaMenuKey | null) {
    activeRef.current = key;
    setActive(key);
  }

  function intent(key: MegaMenuKey) {
    clearCloseTimer();
    clearOpenTimer();
    if (activeRef.current) {
      setMenu(key);
      return;
    }
    openTimer.current = window.setTimeout(() => setMenu(key), OPEN_DELAY);
  }

  function scheduleClose() {
    clearOpenTimer();
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setMenu(null), CLOSE_DELAY);
  }

  function closeNow(focus?: MegaMenuKey | null) {
    clearOpenTimer();
    clearCloseTimer();
    const key = focus === undefined ? activeRef.current : focus;
    setMenu(null);
    if (key) triggers.current[key]?.focus();
  }

  useEffect(() => {
    return () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [active]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="nav-shell" data-scrolled={scrolled ? "true" : "false"}>
        <div
          ref={barRef}
          className="nav-bar pointer-events-auto relative hidden lg:flex"
          onMouseLeave={scheduleClose}
        >
          <div className="flex w-full items-center justify-between gap-16">
            <div className="flex items-center gap-2">
              <Logo compact />
              <nav aria-label="Primary" className="flex items-center">
                {primaryNav.map((item) =>
                  item.mega ? (
                    <NavItem
                      key={item.label}
                      buttonRef={(node) => {
                        triggers.current[item.mega!] = node;
                      }}
                      controls={panelId}
                      label={item.label}
                      open={active === item.mega}
                      onClick={(event) => {
                        if (event.detail === 0) {
                          setMenu(activeRef.current === item.mega ? null : item.mega!);
                          return;
                        }
                        setMenu(item.mega!);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") closeNow(item.mega);
                        if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey && active === item.mega)) {
                          event.preventDefault();
                          setMenu(item.mega!);
                          window.requestAnimationFrame(() => {
                            document.getElementById(panelId)?.querySelector("a")?.focus();
                          });
                        }
                      }}
                      onMouseEnter={() => intent(item.mega!)}
                    />
                  ) : (
                    <Link
                      key={item.label}
                      className="nav-link"
                      href={item.href ?? "/"}
                      onMouseEnter={scheduleClose}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </div>
            <div className="flex items-center" onMouseEnter={scheduleClose}>
              <Button className="nav-cta" href={siteConfig.ctaHref} size="sm">
                Pricing
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {active ? (
              <MegaMenu
                key="mega-shell"
                active={active}
                panelId={panelId}
                onEscape={() => closeNow()}
                onNavigate={() => setMenu(null)}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="nav-bar pointer-events-auto flex w-full items-center justify-between lg:hidden">
          <Logo compact />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[12px] text-foreground hover:bg-surface-subtle"
            aria-controls={mobileId}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <MobileNavigation open={mobileOpen} panelId={mobileId} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}
