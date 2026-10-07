# Page Specifications

## Home `/`

Recommended sections:

1. Floating navbar
2. Hero
3. Provider/model logo rail
4. Unified API explanation
5. Interactive routing demo
6. “Hundreds of models, one schema” model showcase
7. Smart routing / fallback feature split
8. Code example section
9. Performance/cost proof section
10. Services bento/grid
11. Pricing preview
12. Pricing CTA
13. Footer

Hero concept:
- eyebrow: `Unified AI Infrastructure`
- H1: `One API. Every model.`
- body: `Run, route and switch between hundreds of AI models through one consistent API.`
- actions: `Start building`, `Explore models`

Hero visual:
- Request enters gateway node
- Gateway fans to model provider nodes
- one route becomes active
- response streams back
- small live metadata: latency, model, cost

## About `/about`

Sections:
1. Mission hero
2. Why unified model access matters
3. Principles
4. Infrastructure philosophy
5. Timeline / story
6. Team/company placeholder block
7. CTA

Keep editorial and spacious.

## Models `/models`

Core experience:
- page header
- search
- capability filters
- provider filters
- context/pricing filters
- featured model cards
- sortable model table/list
- compare CTA

Client-side only.

Possible fields:
- provider
- model name
- slug
- family
- context window
- input cost
- output cost
- modalities
- capabilities
- latency class
- status

## Model detail `/models/[slug]`

Sections:
1. Breadcrumb
2. Model identity + provider
3. Capability badges
4. Context / pricing / modalities stats
5. Try/request UI mock
6. API code tabs
7. Use cases
8. Benchmarks placeholder
9. Related models
10. CTA

## Services `/services`

Overview of all platform services:
- unified API
- model routing
- provider fallback
- observability
- enterprise controls

Each card links to detail route.

## Service detail `/services/[slug]`

Pattern:
1. focused hero
2. problem
3. architecture diagram
4. product UI/demo
5. features
6. code or workflow
7. proof stats
8. CTA

## Pricing `/pricing`

Sections:
1. headline
2. pricing philosophy
3. plans
4. per-model usage explanation
5. usage calculator
6. feature comparison
7. FAQs
8. CTA

Possible plans:
- Developer
- Scale
- Enterprise

Do not invent actual commercial prices until supplied; use clearly editable placeholder values.

## Contact `/contact`

Two-column:
- concise sales/contact message
- form

Form fields:
- name
- work email
- company
- team size
- use case
- estimated monthly AI spend
- message

Frontend validation only.

## Checkout `/checkout`

Frontend checkout shell:
- selected plan
- billing cycle
- account/contact details
- order summary
- pricing disclaimer
- CTA to hosted checkout abstraction

Do not collect raw card details without a PCI-compliant payment provider.

## Payment success `/payment/success`

- success state
- order/plan summary placeholder
- next steps
- docs CTA

## Payment cancel `/payment/cancel`

- payment not completed
- return to checkout
- pricing link

## Legal pages

Use consistent legal layout:
- title
- effective date placeholder
- table of contents
- long-form content container
- contact details placeholder

Legal text must be treated as a template and reviewed by qualified counsel before production use.
