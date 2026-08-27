# Prerna Motion Specification

This document describes the motion that is safe to ship for the Prerna editorial portfolio. Motion supports orientation and atmosphere; it must not hide content, delay contact, or create scroll-jacking behavior.

## Production principles

- Motion is subtle, slow, and optional.
- Content is visible and usable without animation.
- Every effect must respect `prefers-reduced-motion: reduce`.
- Animate only `transform` and `opacity` where possible.
- Avoid pinned sections, custom cursors, magnetic controls, aggressive parallax, and scroll-jacking in the first release.
- Do not use motion to compensate for unclear hierarchy or missing functionality.

## Approved first-release effects

### 1. Hero image rotation and Ken Burns

Use the two approved hero images:

```text
/images/golden_tea_plantation.webp
/images/cinematic_temple_portrait.webp
```

Start with the tea plantation image. Crossfade between images every 8 seconds with a 1.5–1.8 second overlap. Apply a restrained scale from approximately `1.04` to `1.09` over 12–15 seconds. Preserve the subject and maintain readable text placement on desktop and mobile.

The first image must be visible immediately. The second image must not be allowed to create layout shift. Use absolutely positioned layers inside a fixed-aspect or full-height hero container.

For reduced motion, keep one stable image visible and disable the crossfade and Ken Burns movement.

### 2. Hero text reveal

Reveal the hero headline with a masked vertical movement from approximately `translateY(105%)` to `translateY(0)`. Use a single short stagger between lines. Do not hide the heading indefinitely if JavaScript fails.

### 3. Section reveal

Use IntersectionObserver or ScrollTrigger to reveal sections with a small vertical offset and opacity change. Recommended range: 12–20px vertical movement and 600–900ms duration. Avoid blur-heavy effects because they can reduce legibility and increase rendering cost.

### 4. Scroll progress

Use a thin terracotta progress bar at the top of the viewport. Clamp the value between 0 and 100 and guard against a document whose scrollable height is zero. Remove the scroll listener on cleanup.

### 5. Grain

A very subtle fixed grain overlay is allowed at low opacity. It must be `pointer-events: none`, must not interfere with text contrast, and must be disabled for reduced-motion users or low-power mobile contexts.

## SmoothScroll requirements

The active `src/app/components/SmoothScroll.tsx` implementation should:

- Register ScrollTrigger once.
- Use a named GSAP ticker callback.
- Remove the same callback during cleanup.
- Destroy Lenis during cleanup.
- Avoid initialising Lenis when reduced motion is requested.
- Prevent duplicate instances.
- Keep the page usable if Lenis fails to load.

Never use an anonymous callback in `gsap.ticker.add()` if it cannot be passed to `gsap.ticker.remove()` later.

## Explicitly rejected patterns for first release

The following patterns are not approved until the base UX is validated:

- Pinned stack cards.
- Pinning multiple cards with `pinSpacing: false`.
- Magnetic buttons.
- Custom cursor effects.
- Large-scale parallax or scrub effects.
- Long animated delays before the CTA becomes usable.
- Full-page scroll hijacking.
- Decorative blobs that compete with photography or typography.

## QA requirements

Test motion at 320px, 375px, 768px, 1024px, and 1440px widths. Test keyboard navigation, reduced-motion settings, slow network conditions, and a low-power mobile device. The page must remain understandable and all contact actions must remain available when motion is disabled or JavaScript is delayed.
