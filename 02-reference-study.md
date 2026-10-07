# Reference Study — AccessGrid

Reference:
- https://accessgrid.com/customers/hardware-manufacturers
- https://accessgrid.com/
- https://accessgrid.com/about

## What to learn from it

The objective is **not** to reproduce AccessGrid. The useful pattern is its disciplined visual system: restrained typography, small radii, fine borders, large negative space, product UI embedded into editorial sections, and subtle interaction rather than decorative animation.

## Visual characteristics

### Overall character
- Clean technical SaaS aesthetic
- White / near-white surfaces dominate
- Dark charcoal type
- Bright blue used selectively as the action/accent color
- Thin neutral borders create structure without heavy cards
- Layout feels grid-derived
- Large areas of empty space are intentional
- Product interfaces become visual storytelling assets

### Color references observed in third-party design indexing
Reference palette reported for AccessGrid:
- `#26262B`
- `#F7F7F8`
- `#B8B9C1`
- `#EEEEF0`
- `#5E5F6B`
- `#92939E`
- `#285DF5`
- `#4D4E57`

Do **not** copy this palette exactly. Use it to understand contrast ratios and the “mostly neutral + one electric accent” strategy.

### Typography
Third-party design references identify:
- Inter
- ABC Diatype
- system fallbacks such as Apple / Segoe / Noto

For our project:
- Use a freely distributable web font.
- Recommended: `Geist Sans` or `Inter`.
- Optional display contrast: `Geist Sans` with tighter tracking and variable weight instead of relying on a proprietary face.

### Type behavior
- Headlines: bold but not oversized marketing spectacle.
- Body: compact, readable, high-contrast.
- Small UI text is intentionally small.
- Labels often behave like product UI rather than editorial text.
- Hierarchy is created through size + weight + whitespace, not many colors.

## Navigation pattern

Observed:
- Compact centered/contained header
- Primary nav links
- Secondary account/action links
- Strong single primary CTA
- Developer/product dropdown content is richer than a basic menu
- Nav visually floats with subtle border/background treatment

Reinterpretation:
- Desktop floating pill/rounded-rectangle navbar
- Models mega-menu
- Services mega-menu
- About and Contact links
- “Pricing” primary action
- Mobile menu becomes a panel with the same groups

## Hero behavior

Observed pattern:
- Centered or carefully constrained messaging
- Short headline
- Supporting paragraph
- Primary/secondary actions
- Product/use-case selector or visual directly under hero
- Hero avoids visual noise

Reinterpretation for AI gateway:
- Headline: “One API. Every model.”
- Subcopy describing unified routing
- CTAs
- Animated model-routing visual showing:
  App → Gateway → multiple models → normalized response
- Small live-status/model-count metadata

## Grid language

A repeated visual motif is a light technical grid with thin dashed/dotted or hairline boundaries.

Use:
- CSS background grid
- `1px` neutral borders
- Grid intersections
- Subtle moving routing nodes
- Section dividers aligned to global page columns

Do not:
- Add loud gradients everywhere
- Use large glassmorphism stacks
- Use thick shadows
- Turn every section into a floating card

## Cards

Typical qualities:
- Hairline border
- Very small or medium radius
- Flat background
- Minimal shadow, often none
- Hover feedback comes from border, translation, subtle background, or content movement

Our AI cards:
- Model cards
- Provider cards
- Routing strategy cards
- Feature cards
- Pricing cards
- Code examples

## Product demonstrations

One of the strongest ideas in the reference is showing product workflow screens directly inside the page.

For our site, show:
- API request builder
- Model routing panel
- Latency/cost comparison
- Provider fallback timeline
- Streaming response simulation
- Model selector
- Usage graph UI

These should be **purpose-built demo components**, not screenshots.

## Scroll rhythm

Target rhythm:
- Dense navbar
- Spacious hero
- Trust/logo strip
- Product explanation
- Interactive workflow
- Feature grid
- technical proof / stats
- code section
- pricing CTA
- footer

Sections should alternate between:
- open whitespace
- bordered grid zones
- dark technical panels
- product UI demonstrations

## Animation principles

Reference feel:
- restrained
- purposeful
- low amplitude
- UI-like
- nothing constantly bouncing

Use:
- fade + 8–20px translate on reveal
- line-draw animation for routes
- small icon translation on button hover
- card border/background transitions
- crossfades between model tabs
- number transitions for pricing calculator
- marquee only for model/provider logos and only if it improves comprehension
- sticky sections sparingly

## Hover language

Recommended:
- Links: text color shift + subtle underline/arrow
- Primary CTA: background shade shift; arrow x +2–4px
- Cards: translateY(-2px), border darkens, nested icon moves
- Model rows: background changes, metadata reveals
- Code copy: icon swap to check state
- Provider icon cells: grayscale/opacity → full emphasis
- Nav dropdown: fade + scale from 0.98; short duration

## Spacing language

Base unit: 4px.

Common spacing:
- micro: 4 / 8 / 12
- component: 16 / 20 / 24
- card: 24 / 32
- section: 80 / 96 / 120 desktop
- mobile section: 56 / 64 / 72

Max content width:
- 1200–1280px main
- 720–800px text column
- full-bleed grid backgrounds behind constrained content

## What we intentionally change

AccessGrid is access-control infrastructure; our concept is AI infrastructure. The new site should feel:
- more computational
- more model/data-driven
- darker technical moments
- stronger code visuals
- interactive model catalog
- animated routing diagrams
- cost/latency comparisons
- still minimal and premium

## Reference-study rule

When implementing a component:
1. Match the **discipline**, not the exact composition.
2. Keep the same level of restraint.
3. Create original copy, graphics, component geometry, and motion.
4. Prefer functional product demos over decorative 3D visuals.
