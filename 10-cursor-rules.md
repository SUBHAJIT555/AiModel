# Cursor Implementation Rules

## General

- Read all files in `/docs` before writing production components.
- Follow the current stable Next.js and React documentation.
- Do not use deprecated APIs.
- TypeScript strict.
- No `any` unless there is a documented reason.
- Keep page files declarative; move complex UI into components.
- Prefer Server Components.
- Client components should be as small as practical.

## UI

- Do not produce generic “AI SaaS template” visuals.
- Do not use random purple/blue gradients as the primary design language.
- Do not use huge rounded cards everywhere.
- Do not use excessive shadows.
- Do not create dozens of tiny animations.
- Use the design token file and CSS variables.
- Maintain consistent alignment to the page grid.
- Build reusable sections but avoid premature abstraction.

## Reference usage

AccessGrid is a reference for:
- restraint
- whitespace
- fine borders
- product-led sections
- structured technical grids
- compact actions

Never copy:
- branding
- logos
- proprietary assets
- written copy
- exact section composition
- exact illustrations

## Responsive

Every component must work at:
- 360px
- 390px
- 768px
- 1024px
- 1280px
- 1440px+

No horizontal overflow.

## Accessibility

- semantic HTML
- keyboard navigation
- focus-visible states
- aria only when native semantics are insufficient
- reduced-motion handling
- correct heading order

## Code quality

Before completing any phase:
1. run lint
2. run typecheck
3. run build
4. fix every error
5. report changed files
6. report unresolved assumptions

## Do not

- add a backend
- add a database
- add auth
- add payment secrets
- hardcode secret keys
- install packages without a clear need
- rewrite unrelated files
