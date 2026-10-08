export type FaqItem = {
  title: string;
  content: string;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        title: "Does the gateway replace the model provider?",
        content:
          "No. Requests still run on a connected provider. The gateway normalizes the API, the routing decision, and the usage record.",
      },
      {
        title: "Do I change my application when the model changes?",
        content:
          "No. You send one request shape. Routing, fallbacks, and workspace policy stay outside your application code.",
      },
    ],
  },
  {
    title: "Routing",
    items: [
      {
        title: "Can one request fall back to another model?",
        content:
          "Yes, when the route has a fallback chain and the error is safe to retry. The caller still receives a single response.",
      },
      {
        title: "What decides which model serves a request?",
        content:
          "A policy can prefer cost, latency, or capability, and it stays inside the models a workspace is allowed to use.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        title: "Are the prices on this site final?",
        content:
          "The catalog and plan figures in this frontend are demonstration content. A live price is confirmed before a hosted checkout.",
      },
      {
        title: "How is spend shown?",
        content:
          "Estimates on this site are in rupees and use demonstration traffic. They are a preview of the observability view, not an invoice.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "How do I get help?",
        content: "Use the contact page. This frontend records the message locally so you can see the flow before a backend is connected.",
      },
    ],
  },
];
