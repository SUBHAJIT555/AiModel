const paise = (amount: number) => Math.round(amount * 100) / 100;

export type GstLine = {
  label: string;
  amount: number;
};

/** Indian GST on the taxable value. Domestic bills split 18% into CGST and SGST. Exports are zero-rated. */
export function gstBreakup(subtotal: number, country: string) {
  const taxable = paise(subtotal);
  if (country !== "India") {
    return {
      taxable,
      lines: [{ label: "IGST 0%", amount: 0 }] as GstLine[],
      note: "Export of services",
      tax: 0,
      total: taxable,
    };
  }
  const cgst = paise(taxable * 0.09);
  const sgst = paise(taxable * 0.09);
  const tax = paise(cgst + sgst);
  return {
    taxable,
    lines: [
      { label: "CGST 9%", amount: cgst },
      { label: "SGST 9%", amount: sgst },
    ] as GstLine[],
    note: "GST 18%",
    tax,
    total: paise(taxable + tax),
  };
}
