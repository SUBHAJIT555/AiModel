# Implementation Phases

## Phase 0 — Product + design specification

Already covered by the markdown documents in this blueprint.

Deliverable:
- finalized brand name
- color direction
- copy placeholders accepted
- route tree accepted

## Phase 1 — Foundation / project setup

Goals:
- create Next.js project
- install dependencies
- establish folder architecture
- create tokens/global styles
- font setup
- base layout
- utility primitives
- navbar/footer skeleton
- route placeholders
- data types
- lint/typecheck/build clean

No detailed homepage implementation yet.

## Phase 2 — Design system + global shell

Build:
- Navbar
- mega menu
- mobile navigation
- footer
- container/grid primitives
- buttons
- chips
- cards
- section header
- code block
- technical grid
- motion primitives

Add `/design-system` internal dev page if helpful; remove before production.

## Phase 3 — Homepage

Build all homepage sections with responsive behavior and motion.

Priority:
1. hero routing visual
2. model/provider rail
3. unified API workflow
4. code block
5. feature/service sections
6. pricing teaser
7. CTA/footer integration

## Phase 4 — Models

Build:
- models directory
- filtering
- search
- sorting
- model cards/list
- detail pages
- related models
- code examples

## Phase 5 — Services

Build services overview and service detail template.

Create enough visual variation that service pages do not feel like duplicated landing-page templates.

## Phase 6 — About + Pricing + Contact

Build editorial About page, interactive Pricing page and validated Contact UI.

## Phase 7 — Checkout + Payment states

Frontend-only:
- selected plan state
- checkout summary
- hosted payment redirect abstraction
- success/cancel pages

Do not implement insecure card collection.

## Phase 8 — Legal + SEO

Build:
- Terms
- Privacy
- Cookies
- Acceptable Use
- metadata
- sitemap
- robots
- structured data

Legal copy remains placeholder/template pending legal review.

## Phase 9 — Motion / responsive / accessibility polish

Audit:
- desktop
- tablet
- mobile
- keyboard
- reduced motion
- focus states
- overflow
- touch targets
- animation performance

## Phase 10 — Final QA + production build

Run:
- lint
- typecheck
- production build
- route crawl
- Lighthouse
- accessibility pass
- visual regression screenshots if configured

Remove:
- dead components
- debug text
- placeholder console logs
- unused packages
