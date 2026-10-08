export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyBase?: number;
  annualBase?: number;
  /** Token volume sets the price instead of a fixed fee. */
  variable?: boolean;
  /** Rupees charged for each million tokens on the variable plan. */
  ratePerMillion?: number;
  popular?: boolean;
  featured?: boolean;
  features: string[];
  cta: string;
};

export type FAQ = {
  question: string;
  answer: string;
  category?: string;
};
