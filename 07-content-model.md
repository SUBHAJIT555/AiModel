# Content Model

## Model type

```ts
export type Model = {
  slug: string
  name: string
  provider: string
  providerSlug: string
  description: string
  modalities: Array<'text' | 'image' | 'audio' | 'video' | 'embeddings'>
  capabilities: string[]
  contextWindow?: number
  maxOutputTokens?: number
  inputPricePerMillion?: number
  outputPricePerMillion?: number
  latencyClass?: 'fast' | 'balanced' | 'deep'
  featured?: boolean
  status: 'available' | 'beta' | 'coming-soon'
}
```

## Service type

```ts
export type Service = {
  slug: string
  name: string
  eyebrow?: string
  shortDescription: string
  description: string
  features: string[]
  icon: string
}
```

## Pricing plan type

```ts
export type PricingPlan = {
  id: string
  name: string
  description: string
  monthlyBase?: number
  annualBase?: number
  popular?: boolean
  features: string[]
  cta: string
}
```

## FAQ type

```ts
export type FAQ = {
  question: string
  answer: string
  category?: string
}
```

## Navigation type

```ts
export type NavItem = {
  label: string
  href?: string
  children?: Array<{
    label: string
    href: string
    description?: string
  }>
}
```

## Data location

Use:
- `src/data/models.ts`
- `src/data/providers.ts`
- `src/data/services.ts`
- `src/data/pricing.ts`
- `src/data/faqs.ts`
- `src/data/navigation.ts`

Keep data separate from presentational components.
