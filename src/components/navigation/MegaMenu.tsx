"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { megaMenus } from "@/data/mega-menu";
import type { MegaMenuKey } from "@/types/mega-menu";
import { transitions } from "@/components/motion/transitions";
import { MegaMenuFooter } from "@/components/navigation/MegaMenuFooter";
import { MegaMenuPanel } from "@/components/navigation/MegaMenuPanel";

type MegaMenuProps = {
  active: MegaMenuKey;
  panelId: string;
  onNavigate: () => void;
  onEscape: () => void;
};

export function MegaMenu({ active, panelId, onNavigate, onEscape }: MegaMenuProps) {
  const reduce = useReducedMotion();
  const menu = megaMenus[active];

  return (
    <motion.div
      className="mega-layer"
      initial={reduce ? false : "closed"}
      animate="open"
      exit="closed"
      variants={{
        open: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: reduce ? { duration: 0 } : transitions.dropdown,
        },
        closed: {
          opacity: 0,
          y: -4,
          scale: 0.99,
          transition: reduce ? { duration: 0 } : transitions.dropdownClose,
        },
      }}
    >
      <div
        id={panelId}
        role="region"
        aria-label={menu.trigger}
        className="mega-card"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            onEscape();
          }
        }}
      >
        <div className="mega-inset">
          <div className="mega-stack">
            <AnimatePresence initial={false}>
              <motion.div
                key={menu.key}
                className="mega-stage-pane"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                transition={reduce ? { duration: 0 } : { duration: 0.16, ease: transitions.fast.ease }}
              >
                <div className="mega-stage">
                  <MegaMenuPanel menu={menu} onNavigate={onNavigate} />
                </div>
                <MegaMenuFooter footer={menu.footer} onNavigate={onNavigate} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
