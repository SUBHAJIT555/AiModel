# QA Checklist

## Visual

- [ ] Header aligns correctly at all breakpoints
- [ ] No accidental generic Tailwind default look
- [ ] Consistent radii
- [ ] Consistent border colors
- [ ] Section vertical rhythm is deliberate
- [ ] Typography tracking/line-height checked
- [ ] Code blocks do not overflow
- [ ] Model tables are usable on mobile
- [ ] Dark sections have correct contrast

## Motion

- [ ] No layout shift from animation
- [ ] Hover only applies on capable devices where appropriate
- [ ] Reduced motion supported
- [ ] Route animation does not distract from hero copy
- [ ] Navbar dropdown has no flicker
- [ ] Sticky sections release correctly

## Responsive

- [ ] 360px
- [ ] 390px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px+
- [ ] no horizontal scroll
- [ ] tap targets >= ~44px when appropriate

## Accessibility

- [ ] one H1 per page
- [ ] logical heading hierarchy
- [ ] all controls keyboard accessible
- [ ] focus-visible state
- [ ] form labels
- [ ] validation messages associated with fields
- [ ] icons have accessible labels when needed
- [ ] decorative SVGs hidden from assistive tech

## Technical

- [ ] `npm run lint`
- [ ] typecheck command
- [ ] `npm run build`
- [ ] no console errors
- [ ] no hydration warnings
- [ ] no dead imports
- [ ] metadata on all public routes
- [ ] sitemap valid
- [ ] robots valid

## Frontend-only payment safety

- [ ] no raw card capture unless embedded/hosted payment provider handles it
- [ ] no secret API key in client bundle
- [ ] checkout clearly separates UI state from real transaction state
