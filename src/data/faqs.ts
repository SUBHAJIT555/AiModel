import type { FAQ } from "@/types/pricing";

export const faqs: FAQ[] = [
  {
    category: "Product",
    question: "Does the gateway replace the model provider?",
    answer:
      "No. Requests still run on a connected provider. The gateway normalizes the API, the routing decision, and the usage record.",
  },
  {
    category: "Routing",
    question: "Can one request fall back to another model?",
    answer:
      "Yes, when the route has a fallback chain and the error is marked safe to retry. The caller receives a single response.",
  },
  {
    category: "Pricing",
    question: "Are the prices on this site final?",
    answer:
      "The catalog and plan figures in this frontend are demo content. A live price is confirmed before a hosted checkout.",
  },
];
