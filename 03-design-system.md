# Design System

## Design direction

“Precision infrastructure.”

Minimal, technical, structured, developer-oriented.

## Font

Default:
- `Geist Sans` via `next/font/google` if available in the installed Next.js version.
- Fallback: `Inter`.

Code:
- `Geist Mono` or `Roboto Mono`.

Use one sans family and one mono family only.

## Type scale

Desktop:
- Display: clamp(3.5rem, 7vw, 7rem), weight 560–650, tracking -0.055em
- H1: clamp(3rem, 5.4vw, 5.5rem)
- H2: clamp(2.25rem, 4vw, 4rem)
- H3: 1.5–2rem
- Body large: 1.125rem / 1.7
- Body: 1rem / 1.65
- Small: .875rem / 1.45
- Micro: .75rem / 1.4
- Code: .8125–.875rem

Avoid excessive bold weights.

## Proposed palette

Create a new identity rather than cloning the reference.

### Light
- Canvas: `#F7F8FA`
- Surface: `#FFFFFF`
- Surface subtle: `#F1F3F6`
- Ink: `#111318`
- Ink muted: `#626976`
- Border: `#E2E5EA`
- Border strong: `#C8CDD6`

### Accent
- Primary: `#6C5CFF`
- Primary hover: `#5C4BEF`
- Accent cyan: `#20C7D9`
- Success: `#22A06B`
- Warning: `#D98B19`
- Danger: `#D64545`

### Dark technical section
- Dark canvas: `#0C0D10`
- Dark surface: `#12141A`
- Dark border: `#252933`
- Dark text: `#F7F8FA`
- Dark muted: `#9299A6`

## CSS variables

Create semantic variables, not raw color usage throughout components.

Examples:
- `--background`
- `--foreground`
- `--surface`
- `--surface-subtle`
- `--muted`
- `--border`
- `--primary`
- `--primary-hover`
- `--success`

## Layout

- `--container`: 1240px
- gutter desktop: 32px
- gutter tablet: 24px
- gutter mobile: 20px
- global 12-column desktop grid
- 6-column tablet
- 4-column mobile

## Radius

Keep restrained:
- xs 6px
- sm 8px
- md 12px
- lg 16px
- pill 999px

Do not use 24–40px radius everywhere.

## Borders

- default: 1px solid semantic border
- grid line: 1px
- emphasized separator: 1px with stronger neutral

## Shadows

Avoid large SaaS shadows.

Allowed:
- navbar: extremely soft ambient shadow
- dropdown: medium soft shadow
- elevated demo panel: low-opacity shadow

## Buttons

### Primary
- height 42–44px
- compact horizontal padding
- primary background
- white text
- 8–10px radius
- arrow icon optional

### Secondary
- white/subtle surface
- 1px border
- dark text

### Text button
- no container
- arrow or chevron
- underline only on hover/focus if appropriate

All buttons:
- keyboard focus-visible ring
- disabled state
- 150–220ms transition
- active scale no lower than .985

## Icons

- Lucide
- 16 / 18 / 20 / 24 sizes
- stroke width generally 1.5–1.75
- avoid mixed icon packs

## Grid background

Create a reusable `<TechnicalGrid />` background:
- CSS-only
- subtle 1px lines
- no raster texture
- configurable cell size
- fade mask toward edges

## Accessibility

- WCAG AA contrast minimum
- semantic landmarks
- visible focus
- motion reduced with `prefers-reduced-motion`
- no hover-only essential information
