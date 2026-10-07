export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyBase?: number;
  annualBase?: number;
  popular?: boolean;
  features: string[];
  cta: string;
};

export type FAQ = {
  question: string;
  answer: string;
  category?: string;
};
