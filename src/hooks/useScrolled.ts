"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getSnapshot() {
  return window.scrollY > 8;
}

function getServerSnapshot() {
  return false;
}

export function useScrolled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
