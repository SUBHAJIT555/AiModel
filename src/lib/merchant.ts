"use client";

import { useEffect, useState } from "react";
import { contactOffice } from "@/data/contact";
import { CREDITS } from "@/data/credits";

export type MerchantPublic = {
  email: string;
  creditValidityDays: number;
  loaded: boolean;
};

const fallback: MerchantPublic = {
  email: contactOffice.email,
  creditValidityDays: CREDITS.validityDays,
  loaded: false,
};

export function useMerchant() {
  const [merchant, setMerchant] = useState<MerchantPublic>(fallback);

  useEffect(() => {
    let alive = true;
    fetch("/api/merchant.php", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { email?: string; creditValidityDays?: number } | null) => {
        if (!alive) return;
        const days = Number(data?.creditValidityDays);
        setMerchant({
          email: data?.email || contactOffice.email,
          creditValidityDays: days > 0 && days <= 3650 ? days : CREDITS.validityDays,
          loaded: true,
        });
      })
      .catch(() => {
        if (alive) setMerchant((current) => ({ ...current, loaded: true }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return merchant;
}
