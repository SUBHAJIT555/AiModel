# Frontend Architecture

## Stack

- Next.js latest stable
- App Router
- React
- TypeScript strict
- Tailwind CSS v4
- Motion for React
- Lucide React
- next/font

## Project structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── models/page.tsx
│   │   ├── models/[slug]/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── contact/page.tsx
│   ├── (commerce)/
│   │   ├── checkout/page.tsx
│   │   └── payment/
│   │       ├── success/page.tsx
│   │       └── cancel/page.tsx
│   ├── legal/
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── cookies/page.tsx
│   │   └── acceptable-use/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── ui/
│   ├── motion/
│   ├── demos/
│   ├── models/
│   ├── pricing/
│   └── legal/
├── data/
├── lib/
├── hooks/
└── types/
```

## Server vs client

Default to Server Components.

Use `"use client"` only for:
- navbar interactions
- motion wrappers
- filters
- pricing calculator
- interactive demos
- contact form validation
- checkout selection state

Do not turn entire pages into Client Components.

## Static generation

Model detail pages should be generated from local typed model data.

Use `generateStaticParams`.

## State

No global state library initially.

Use:
- URL search params for model directory filters when practical
- local component state for demos/calculators
- context only if a real cross-tree need appears

## Styling

- semantic CSS variables in `globals.css`
- Tailwind utilities for layout
- component variants written intentionally
- avoid giant class strings by extracting reusable primitives

## Motion

Use Motion only where animation materially improves UX.

Create reusable:
- `Reveal`
- `Stagger`
- `RoutePulse`
- `AnimatedNumber`
- `PresencePanel`

## SEO

Each route:
- metadata
- canonical strategy
- Open Graph values
- descriptive title
- descriptive meta
- semantic headings

Add:
- sitemap
- robots
- structured data where appropriate

## Performance

Targets:
- minimal client JS
- no autoplay background video
- CSS graphics when possible
- SVG only when meaningful
- lazy-load below-fold demos
- no large animation libraries beyond Motion
- dynamic import heavy interactive demos
