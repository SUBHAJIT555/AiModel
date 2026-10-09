"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getModel } from "@/data/models";
import { getPlan } from "@/data/pricing";
import { OrderReceipt } from "@/components/checkout/OrderReceipt";
import { modelRate, quotedAmount } from "@/components/pricing/formatPlanPrice";
import { formatMillions } from "@/lib/inr";
import { Button } from "@/components/ui/Button";
import { saveCheckout } from "@/lib/demo-checkout";

const fieldClass =
  "h-11 w-full rounded-md border border-black/15 bg-white px-3 text-[14px] font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-[#1a1c20]/45 focus:border-black/50";

const labelClass = "block text-[11px] tracking-[0.06em] text-[#1a1c20] uppercase font-bold";

const countries = ["India", "United States", "United Kingdom", "Germany", "Singapore"];

export function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const billing = params.get("billing") === "annual" ? "annual" : "monthly";
  const plan = getPlan(params.get("plan"));
  const model = getModel(params.get("model") ?? "");
  const tokens = Number(params.get("tokens")) || 0;
  const unit = params.get("unit");
  const rate = modelRate(model?.slug ?? null);
  const amount = quotedAmount(plan, billing, tokens, model?.slug ?? null);
  const volume =
    tokens > 0 && (plan.variable || rate)
      ? unit === "million" || (!unit && plan.variable)
        ? `${formatMillions(tokens)} tokens`
        : `${tokens} ${unit ?? "units"}`
      : null;
  const [error, setError] = useState("");
  const [country, setCountry] = useState("India");

  function submit(formData: FormData) {
    const first = String(formData.get("firstName") ?? "").trim();
    const middle = String(formData.get("middleName") ?? "").trim();
    const last = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const zip = String(formData.get("zip") ?? "").trim();
    const mobile = String(formData.get("mobile") ?? "").trim();
    if (!first || !last || !address || !city || !zip || !mobile || !email.includes("@")) {
      setError("Add your name, address, city, zip code, email, and mobile number to continue.");
      return;
    }
    saveCheckout({
      plan: plan.id,
      billing,
      model: model?.slug,
      name: [first, middle, last].filter(Boolean).join(" "),
      company: String(formData.get("company") ?? ""),
      email,
      country,
      phone: mobile,
      address,
      city,
      zip,
      tokens: tokens > 0 ? tokens : undefined,
    });
    const query = new URLSearchParams({ plan: plan.id, billing, country });
    if (model) query.set("model", model.slug);
    if (tokens) query.set("tokens", String(tokens));
    if (unit) query.set("unit", unit);
    router.push(`/checkout/payment?${query.toString()}`);
  }

  return (
    <form action={submit} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:justify-between">
      <div className="flex flex-col bg-white px-6 py-6 text-[#1a1c20] shadow-[0_10px_28px_-18px_rgb(17_19_24/0.45),0_0_0_1px_rgb(17_19_24/0.06)] md:px-7">
        <h2 className="text-center text-[15px] font-semibold tracking-[0.18em]">YOUR DETAILS</h2>
        <div className="my-3 border-t border-dashed border-black/25" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" placeholder="Enter first name" required />
          <Field label="Middle name" optional name="middleName" autoComplete="additional-name" placeholder="Enter middle name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" placeholder="Enter last name" required />
          <Field label="Company" optional name="company" autoComplete="organization" placeholder="Enter company" />
          <div className="sm:col-span-2">
            <span className={labelClass}>Country</span>
            <CountryField value={country} onChange={setCountry} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Address" name="address" autoComplete="street-address" placeholder="Enter address" required />
          </div>
          <Field label="City" name="city" autoComplete="address-level2" placeholder="Enter city" required />
          <Field label="Zip code" name="zip" autoComplete="postal-code" placeholder="Enter zip code" required />
          <Field label="Email" name="email" type="email" autoComplete="email" placeholder="Enter email" required />
          <Field label="Mobile number" name="mobile" type="tel" autoComplete="tel" placeholder="Enter mobile number" required />
          <Field
            label="Secondary contact number"
            optional
            name="secondary"
            type="tel"
            autoComplete="tel"
            placeholder="Enter secondary number"
          />
        </div>
        {error ? <p className="mt-4 text-[12px] text-danger">{error}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="submit">Continue to payment</Button>
          <Button href="/pricing" variant="secondary">
            Back to pricing
          </Button>
        </div>
      </div>
      <OrderReceipt
        planName={plan.name}
        billing={billing}
        variable={Boolean(plan.variable)}
        subtotal={amount}
        country={country}
        volume={volume}
        model={
          model
            ? { displayName: model.displayName, provider: model.provider, providerSlug: model.providerSlug }
            : null
        }
      />
    </form>
  );
}

function Field({
  label,
  optional,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required,
}: {
  label: string;
  optional?: boolean;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {optional ? <span className="ml-1 font-medium tracking-normal normal-case text-black/45">(optional)</span> : null}
      <input className={`${fieldClass} mt-1.5`} name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} />
    </label>
  );
}

function CountryField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative mt-1.5">
      <button
        type="button"
        className={`${fieldClass} flex items-center justify-between text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {value}
        <ChevronDown aria-hidden className={`size-4 text-black/70 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={1.75} />
      </button>
      <input type="hidden" name="country" value={value} />
      {open ? (
        <ul
          role="listbox"
          aria-label="Country"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto border border-black/15 bg-white py-1 shadow-[0_16px_32px_-20px_rgb(17_19_24/0.45)]"
        >
          {countries.map((item) => {
            const selected = item === value;
            return (
              <li key={item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`flex w-full px-3 py-2 text-left text-[14px] ${selected ? "bg-[#1a1c20] text-white" : "text-[#1a1c20] hover:bg-[#f4f4f5]"}`}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
