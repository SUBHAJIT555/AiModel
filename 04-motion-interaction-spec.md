# Motion & Interaction Specification

## Motion philosophy

Motion explains system behavior. It should suggest routing, streaming, switching, and orchestration.

No animation should exist only to make the page “busy”.

## Global timings

- hover: 140–180ms
- dropdown: 180–240ms
- section reveal: 450–700ms
- tab transition: 220–320ms
- route pulse: 1.4–2.4s
- marquee: 25–50s linear

Use cubic-bezier curves resembling:
- enter: `[0.16, 1, 0.3, 1]`
- exit: `[0.4, 0, 1, 1]`

## Scroll reveal

Default:
- opacity 0 → 1
- y 14 → 0
- no blur by default
- trigger once
- viewport margin around `-10%`

Stagger children:
- 40–80ms

Avoid animating every paragraph independently.

## Navbar

Desktop:
- initial normal position near top
- optional subtle compact state after scroll
- background becomes slightly more opaque on scroll
- dropdown enter: opacity + y -4/+4 + scale .985 → 1
- close immediately enough to feel responsive

Mobile:
- sheet/dropdown
- animate opacity and y only
- lock body scroll while open

## Hero routing animation

Visual:
`Application → Unified Gateway → Model Providers → Response`

Behavior:
- line paths are static
- small packets/pulses travel along routes
- selected provider changes every few seconds
- latency/cost values crossfade
- response stream types into a small terminal
- user interaction can override auto cycle

Respect reduced motion:
- show static selected route

## Buttons

Primary:
- background transition
- icon translateX(0 → 3px)
- active scale .99

Secondary:
- border darkens
- background becomes subtle

## Model cards

Rest:
- flat surface

Hover:
- translateY(-2px)
- border becomes stronger
- model icon shifts 1–2px
- optional capability chips fade in

Do not apply heavy scale.

## Model directory table/list

Hover row:
- subtle surface highlight
- right arrow reveals or moves
- provider/model metadata stays readable

Filter chips:
- selected state snaps quickly
- results animate with layout transitions
- avoid expensive animations on hundreds of rows

## Code blocks

- language tabs
- crossfade code
- copy button
- copy icon → check for ~1.2s
- optional line highlight for the normalized API endpoint

## Workflow sections

Use sticky behavior only for one or two flagship sections:
- left narrative remains sticky
- right demo changes as steps enter view

On mobile:
- no sticky narrative
- stack steps naturally

## Pricing interaction

Billing monthly/annual:
- sliding selector or segmented control
- price number transition
- no excessive count-up animation

Usage estimator:
- range control
- calculated monthly estimate updates instantly
- chart changes smoothly

## Checkout

Keep motion minimal because it is transactional:
- step/summary feedback
- field focus
- plan selection
- success check animation max ~500ms

## Reduced motion

When `prefers-reduced-motion: reduce`:
- disable route pulses
- disable marquees
- remove translate-based section reveals
- no smooth-scroll dependency
- keep opacity transitions short or none
