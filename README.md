# AI Gateway Frontend Blueprint

Frontend-only marketing/product website for a service described as:

> Unified API gateway for running hundreds of AI models.

This repository blueprint is inspired by the **design principles** observed on AccessGrid — restrained SaaS typography, tight navigation, generous whitespace, fine grid/border details, compact CTAs, product UI demonstrations, and controlled motion — while intentionally creating a new visual identity and information architecture.

## Target stack

- Next.js (latest stable, App Router)
- React (version required by current Next.js)
- TypeScript, strict mode
- Tailwind CSS v4
- Motion for React (`motion`)
- Lucide React
- `next/font`
- ESLint
- Prettier
- Static-first architecture
- No database
- No custom backend/API
- No authentication implementation in v1
- Mock/model catalog data kept locally in typed TS files

## Pages

- `/`
- `/about`
- `/models`
- `/models/[slug]`
- `/services`
- `/services/[slug]`
- `/pricing`
- `/contact`
- `/checkout`
- `/payment/success`
- `/payment/cancel`
- `/legal/terms`
- `/legal/privacy`
- `/legal/cookies`
- `/legal/acceptable-use`

## Documentation

Read these files before implementation:

1. `docs/01-product-brief.md`
2. `docs/02-reference-study.md`
3. `docs/03-design-system.md`
4. `docs/04-motion-interaction-spec.md`
5. `docs/05-information-architecture.md`
6. `docs/06-page-specs.md`
7. `docs/07-content-model.md`
8. `docs/08-frontend-architecture.md`
9. `docs/09-implementation-phases.md`
10. `docs/10-cursor-rules.md`
11. `docs/11-qa-checklist.md`
12. `prompts/phase-01-setup.md`

## Important constraints

- Do not clone AccessGrid pixel-for-pixel.
- Do not copy AccessGrid copywriting, illustrations, logos, or branded visual assets.
- Reuse only high-level interaction/design ideas.
- Build a distinct AI-infrastructure visual identity.
- Payment screens are a frontend demonstration. They do not contact a payment provider.
