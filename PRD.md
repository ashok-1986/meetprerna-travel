# PRD — Prerna Travel & Tattoo Website

**Product:** Prerna — hand-poked tattoos and slow-travel storytelling  
**Primary URL:** `https://meetprerna-travel.vercel.app/`  
**Primary conversion:** WhatsApp enquiry to `+91 77381 47935`  
**Secondary conversion:** Email to `prerna@meetprerna.com`  
**Status:** Revised implementation-ready specification  
**Audience model:** Two equal audience paths: travellers and stays/properties

## 1. Product definition

This is an editorial portfolio and enquiry website for Prerna. It serves two audiences without pretending they are the same customer:

1. **Travellers** who want a meaningful hand-poked tattoo experience connected to a place or journey.
2. **Stays and properties** that want honest, place-led travel content such as reels, photography, stories, and optional tattoo pop-ups.

The site is not an ecommerce checkout, online booking engine, or pricing page. It must make the two offers clear enough for a visitor to choose the right path and start a WhatsApp conversation.

## 2. Problem statement

The current deployed site is visually distinctive but operationally unreliable. It has unclear audience positioning, a broken `Let's talk` destination, no working contact mechanism, internal draft copy exposed in public, incomplete image deployment, weak mobile navigation, and a repository/deployment mismatch. The revised product must prioritise clarity and trustworthy conversion before visual polish.

## 3. Goals and non-goals

### Goals

- Explain what Prerna offers within five seconds of landing.
- Route travellers and stays/properties into distinct journeys.
- Present authentic work using approved images and context.
- Convert qualified visitors into WhatsApp conversations.
- Provide email as a visible fallback.
- Preserve an editorial, cinematic, slow-travel visual identity.
- Work reliably on mobile, keyboard navigation, reduced motion, and production deployment.
- Ship valid crawler files, metadata, semantic landmarks, and zero broken image references.

### Non-goals

- Public pricing or fixed online checkout.
- Day 1–7 itinerary/SOP timeline.
- Fake booking availability, payment, ratings, logos, testimonials, or performance claims.
- A complex CMS, dashboard, or account system.
- Copying the Fuel reference website literally.

## 4. Success metrics

| Metric | Target for launch validation |
|---|---|
| Five-second comprehension | At least 3 of 3 test users can state that the site offers tattoos and/or property travel content. |
| Audience routing | At least 3 of 3 test users can identify the correct traveller or property path. |
| Contact discovery | WhatsApp is discoverable within 10 seconds on desktop and mobile. |
| CTA reliability | 100% of hero, navigation, service, and footer CTAs reach a real destination. |
| Asset integrity | Zero image 404s and zero placeholder asset paths in production. |
| Technical integrity | `/robots.txt` and `/sitemap.xml` return valid formats; no accidental `noindex` on the homepage. |
| Mobile quality | No unintended horizontal overflow at 320px, 375px, and 768px widths. |
| Reduced motion | Non-essential motion is disabled or simplified when `prefers-reduced-motion: reduce` is active. |

## 5. Information architecture

### First-release one-page structure

```text
/
├── Hero                         What Prerna does + two audience CTAs
├── Audience split               Travellers / Stays & properties
├── Selected work                Real places, projects, and context
├── Traveller experience         Tattoo offer, process, preparation, availability
├── Stay collaborations          Content offer, deliverables, process, usage rights
├── About and process             Prerna, regions, point of view
├── Proof                        Instagram, testimonials, published work if approved
├── Contact                      WhatsApp-first enquiry and email fallback
└── Footer                       Social, email, privacy, copyright
```

### Stable section IDs

`#travellers`, `#stays`, `#work`, `#about`, and `#contact` must exist in the DOM and must be used consistently by navigation and CTAs. The old generic `#services` anchor may remain only as a backwards-compatible redirect or alias during migration.

### Future page split

If analytics or user testing shows materially different user behavior, promote the audience sections into `/tattoos` and `/stays`. Do not create these routes until each has sufficient content and proof to stand alone.

## 6. User journeys

### Traveller journey

A traveller lands on the hero, recognises that the offer is a hand-poked tattoo experience, selects `Book a tattoo experience`, reads the process and availability context, then opens WhatsApp with a prefilled message containing their name, preferred location, dates, and idea. Email remains available if WhatsApp is unsuitable.

**Prefilled WhatsApp template:**

```text
Hi Prerna, I’m [name] and I’m interested in a hand-poked tattoo experience. My preferred location/date is [location/date], and the idea I have in mind is [idea].
```

### Property journey

A property representative lands on the hero, selects `Create a story for your stay`, reviews selected work and collaboration deliverables, understands the process and usage rights, then opens WhatsApp with a property-specific message.

**Prefilled WhatsApp template:**

```text
Hi Prerna, I’m interested in a travel-content collaboration for [property/location]. We’re considering [deliverables], for [dates]. Here’s a little about the stay: [details].
```

### Contact fallback

The contact section must display the real details in readable text and as links:

- WhatsApp: `https://wa.me/917738147935`
- Email: `mailto:prerna@meetprerna.com`

If a form is retained, it must have a real configured submission destination and visible success and error states. A form with `preventDefault()` and no submission handler is prohibited.

## 7. Content requirements

### Hero

Use an emotional headline followed immediately by a literal descriptor.

**Approved direction:**

> **Where journeys become something lasting.**  
> Hand-poked tattoos and thoughtful travel storytelling across India.

Primary CTA: `Book a tattoo experience`  
Secondary CTA: `Create a story for your stay`

The original `Where Journeys Become Ink.` may be retained as a campaign line if the literal descriptor remains visible beside it.

### Audience split

**For travellers**  
Meaningful hand-poked tattoos inspired by the places you visit and the stories you carry.  
CTA: `Explore tattoo experiences`

**For stays & properties**  
Cinematic reels, honest photography, and place-led stories that help guests feel the destination before they arrive.  
CTA: `Explore collaborations`

### Selected work

Each featured image must include a location or project context where factually known. Captions must describe the finished work, not implementation notes. Prohibited public copy includes references to local folders, missing files, offline sales, image cleanup instructions, device checks, or internal QA.

### Traveller experience content

The section must answer: what hand-poked means in this context, how a location influences the work, where sessions occur, how to prepare, how to enquire, and what information Prerna needs before confirming a conversation.

### Stay collaboration content

The section may include reels, photography, blog stories, Google/Instagram review support, story takeovers, and optional tattoo pop-ups. Present these as outcomes and collaboration components, not as a hard-sell rate card. Include scope, process, turnaround expectations if known, usage rights, travel regions, and an enquiry CTA. Do not publish prices.

### About and proof

Include Prerna’s short bio, working regions, creative approach, and a three-step process. Use only approved testimonials, named properties, published work, or social links. If the portfolio is early-stage, say so honestly rather than implying established results.

## 8. Visual system

Retain the following design direction from the current PRD:

| Token | Value | Use |
|---|---|---|
| Cream | `#FFFCF5` | Primary page surface |
| Charcoal | `#1A1A18` | Dark sections and strong text |
| Terracotta | `#C86B5A` | Accent, active progress, selected emphasis |
| Sand | `#E8DCC6` | Soft accent and italic heading emphasis |
| Instrument Serif | Variable font | Editorial headlines only |
| Poppins | Variable font | Body, navigation, labels, controls |

Use a two-radius system: larger editorial cards around 24px and smaller controls around 8–12px. Avoid excessive shadows and avoid using motion as a substitute for hierarchy. The Fuel reference should influence the confidence of the portfolio composition, not be reproduced as a template clone.

## 9. Interaction and motion

- Transparent header over the hero; readable cream/blurred header after approximately 20px scroll.
- Mobile navigation must exist; hidden desktop links alone are not a mobile solution.
- Hero motion may include a restrained Ken Burns effect, line reveal, grain, and progress indicator.
- Reveal animations should use transform and opacity, not layout-affecting properties.
- Use GSAP context cleanup, remove scroll/resize listeners, disconnect observers, and cancel smooth-scroll resources on unmount.
- Respect `prefers-reduced-motion: reduce` by removing grain and non-essential movement and showing content immediately.
- Do not add parallax scrub, pinned gallery behavior, or a Day 1–7 timeline.

## 10. Technical requirements

### Asset integrity

All approved images must exist in `public/images/` or the project’s chosen production asset path, be committed/deployed, and be referenced using exact case-sensitive filenames. Add an automated asset-reference check that fails the build when a local image path is missing.

### Semantics and accessibility

Use one `<header>`, one `<main>`, and one `<footer>`. Use labelled sections, a logical `h1 > h2 > h3` hierarchy, visible focus styles, descriptive link names, explicit form labels, accessible mobile navigation, and accurate alt text. Do not use headings solely for visual styling.

### SEO and metadata

Provide a canonical homepage URL, page title, description, Open Graph image, Twitter card metadata, favicon, and valid root-level `robots.txt` and `sitemap.xml`. The homepage must not contain an accidental `noindex` directive.

### Contact

Implement WhatsApp and email with the exact supplied destinations. The contact section must preserve intent, either through separate links or prefilled messages. If form submission is not backed by a configured provider, remove the form instead of shipping fake functionality.

### Responsive layout

Test 320px, 375px, 768px, 1024px, and 1440px widths. Fix overflow at the component level; do not rely on `overflow-x: clip` to hide layout defects. Ensure anchor scroll positions account for the fixed header.

## 11. File-level implementation map

| File | Required work |
|---|---|
| `src/app/page.tsx` | Rebuild section order, audience routes, real CTAs, content, mobile nav, traveller/property sections, contact links, and proof. |
| `src/app/layout.tsx` | Confirm metadata, canonical base, Open Graph/Twitter data, favicon, font loading, and semantic shell. |
| `src/app/globals.css` | Consolidate tokens, remove unused font baggage, preserve focus styles, correct responsive overflow, and gate motion. |
| `src/app/robots.ts` | Keep allow-all public rules and sitemap URL; verify deployed route. |
| `src/app/sitemap.ts` | Keep homepage entry; extend only when real routes exist. |
| `public/images/` | Verify all approved WebP assets are present and deployed. |
| `public/favicon.ico` | Add a small valid favicon. |
| `Animations.md` | Update to match the actual implementation; remove any unsupported or unimplemented claims. |
| `package.json` | Keep only required animation dependencies and ensure build/check scripts are reliable. |
| QA script or test | Add image-reference and broken-link checks before deployment. |

## 12. Release acceptance criteria

The release is accepted only when all of the following are true:

- The hero explains both offers and provides two working CTA paths.
- The header is readable over the hero, becomes readable on scroll, and has a working mobile menu.
- `#travellers`, `#stays`, `#work`, `#about`, and `#contact` exist and navigation reaches them.
- WhatsApp opens `+91 77381 47935`; email opens `prerna@meetprerna.com`.
- No placeholder links, fake form submission, draft production notes, or stale dates remain.
- All approved images load in production with no 404 requests.
- Instrument Serif is used for headings and Poppins for body/UI; Sora is absent from headings.
- No public prices and no Day 1–7 timeline appear.
- Semantic landmarks, focus states, alt text, and reduced-motion behavior are verified.
- No unintended horizontal overflow occurs at required widths.
- `/robots.txt` and `/sitemap.xml` return valid content types and content.
- Canonical, social metadata, favicon, and homepage indexing behavior are verified.
- The deployed site matches the tested repository commit.

## 13. Open operational decision

The owner must choose one valid contact implementation before coding:

**Option A — WhatsApp/email only:** fastest, reliable, no backend, recommended for first release.  
**Option B — Real form plus WhatsApp/email:** requires a configured form provider or backend, success/error handling, spam protection, and privacy handling.

The site must not ship a third option in which a form appears to submit but discards the visitor’s message.
