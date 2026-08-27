# Prerna Travel Website — UX/UI Audit, PRD Revision, and Redesign Plan

## Goal

Validate whether the current PRD can produce a usable, production-ready website for two equal audiences—travellers seeking hand-poked tattoo experiences and stays/properties seeking travel content collaborations—then revise the PRD, define a clearer information architecture, and prepare an implementation-ready redesign specification.

The redesign will use WhatsApp as the primary conversion path at `+91 77381 47935` and `prerna@meetprerna.com` as the email fallback. The reference direction is the Fuel Framer portfolio template: editorial portfolio presentation, confident typography, strong image-led storytelling, restrained navigation, and clear project/service pathways. The reference will guide composition and interaction quality, not be copied literally.

## Current evidence and key decisions

*(Pre-redesign baseline evidence)* The live deployment and repository were out of sync. The live page previously inspected contained only the hero, stays/gallery, and services sections; its `Let's talk` anchor pointed to a missing `#contact` target, and it exposed internal draft copy. The repository’s `page.tsx` contained an audience split, About/process section, footer, and contact section, but the form prevented submission and used placeholder contact destinations (`hello@example.com` and `wa.me/0000000000`). The redesign has since addressed these repository and content issues, replacing the form with direct WhatsApp/email CTAs and implementing the new narrative structure, though the live deployment remains unverified.

The current PRD is directionally useful but over-specifies animation and card counts before the business model and conversion flow are fully resolved. It also mixes a portfolio goal with package-sales language and asks one page to serve two audiences without defining priority, routing, or proof requirements. The redesign will retain the “portfolio, not pitch deck” constraint and “no public pricing” constraint, while making the two audience paths explicit and commercially legible.

## Phase 1 — Validate the product brief and business model

1. Confirm the audience model as a deliberate two-track site: travellers and stays/properties receive equal top-level paths.
2. Define the primary conversion event as a WhatsApp conversation, with email as a secondary contact method. The site will not imply online booking or payment unless the owner explicitly adds that requirement later.
3. Clarify the service boundaries:
   - Traveller path: hand-poked tattoo experience, availability, locations, preparation, and enquiry.
   - Property path: content collaboration, deliverables, process, usage rights, locations, and enquiry.
4. Preserve “no public pricing” but replace vague service bullets with scope, inclusions, and an enquiry CTA. Avoid implying fixed packages if the offer is custom.
5. Define proof requirements before implementation: approved images, real locations, testimonials or published work, Instagram references, and any disclosure required for gifted/sponsored stays.
6. Identify the source of truth for deployment: the attached repository must be built and deployed, and the live URL must be rechecked after deployment.

## Phase 2 — Revised information architecture

The immediate release should remain a fast, focused site, but the content must be structured as two clear journeys rather than one undifferentiated scroll.

```text
/
├── Hero: what Prerna does + two audience CTAs
├── Audience split
│   ├── /#travellers or dedicated traveller section
│   └── /#stays or dedicated property section
├── Selected work / real places
├── Traveller experience
├── Stay/property collaborations
├── About Prerna and process
├── Proof / social links / testimonials
├── Contact / WhatsApp-first enquiry
└── Footer: Instagram, email, privacy, copyright
```

For the first implementation, use one page with stable anchors so the launch remains simple: `#travellers`, `#stays`, `#work`, `#about`, and `#contact`. If analytics or user testing shows materially different audiences, promote the two paths into `/tattoos` and `/stays` in a later phase. The primary navigation should contain no more than five meaningful items and should include a persistent WhatsApp CTA.

The revised PRD will define each section’s purpose, required content, CTA, responsive behavior, semantic landmark, and acceptance criteria. It will remove the current ambiguity between “travel experience,” “tattoo pop-up,” “reviews,” and “content packages.”

## Phase 3 — UX/UI redesign specification

### Hero and first screen

Retain the editorial mood, Instrument Serif headings, Poppins body text, cream/charcoal/terracotta palette, and restrained motion. Rewrite the hero so the poetic line is immediately followed by a literal explanation. Provide two visibly distinct actions: `Book a tattoo experience` and `Create a story for your stay`. Do not make both CTAs point to a generic contact form without preserving the selected enquiry type.

The header should be transparent over the hero, become readable on scroll, and include a mobile menu or a clearly visible mobile WhatsApp CTA. The logo, nav, and CTA must remain legible over the selected hero image at all breakpoints.

### Audience routing

Add two substantial audience cards directly after the hero. Each card should state the audience, the offer, the expected outcome, and the next step. The traveller card should route to tattoo information; the property card should route to collaboration information. This is the primary fix for the current “is this a tattoo artist or a hotel content creator?” confusion.

### Work gallery

Use the approved local image set only after verifying every asset exists in the deployed `public/images/` path. Present the gallery as selected work with location and context, not as a large undifferentiated image wall. Each image needs an accurate alt description and a short caption that explains what the viewer is seeing. Avoid production notes such as folder status, editing instructions, device references, or internal asset debugging.

### Traveller experience

Define what a traveller actually receives: the hand-poked process, how the place influences the design, where sessions happen, what to prepare, approximate response/availability expectations, and how to enquire. This section should lead to WhatsApp with a prefilled message that includes the traveller intent.

### Property collaboration

Present the property offer as a portfolio service, not an aggressive sales page. Show the content types already named in the PRD—reels, photography, story, blog, social review, and optional tattoo pop-up—but group them into clear collaboration outcomes. Include process, expected deliverables, content usage rights, travel scope, and a `Discuss a collaboration` CTA. Do not show pricing.

### About, proof, and process

Add a concise personal introduction, working regions, creative approach, and a three-step process. Add only real proof: approved testimonials, named properties, published links, Instagram work, or a transparent early-portfolio statement. Do not use invented ratings, logos, client names, or performance claims.

### Contact

Replace the UI-only form with a WhatsApp-first contact block. The form may remain as a convenience, but it must either submit to a configured backend/form provider or be removed. It must never present a “Send message” button that silently prevents submission. Include the real email and WhatsApp number, a clear response expectation only if operationally accurate, and intent-specific prefilled WhatsApp messages for traveller and property enquiries.

## Phase 4 — Technical implementation plan

1. Reconcile the repository and deployment. Build from the attached project and confirm the live URL serves the same commit/version.
2. Verify and deploy all approved WebP files. Add a build-time or test-time asset check that fails when a referenced image is missing.
3. Replace placeholder contact destinations with:
   - `https://wa.me/917738147935` for direct WhatsApp.
   - `mailto:prerna@meetprerna.com` for email.
   - Prefilled WhatsApp messages that vary by audience where supported. This is mandatory for all relevant CTAs: use the defined traveller template for traveller actions and the property template for property-owner actions, with an explicit fallback for unsupported or unknown audiences. Apply this consistently to the hero and contact CTAs, and add tests verifying each generated WhatsApp URL contains the correct encoded message or fallback.
4. Implement mobile navigation. The current repository hides desktop links below the medium breakpoint but does not provide an alternative mobile menu.
5. Implement semantic structure with one `header`, one `main`, one `footer`, labelled sections, proper button/link semantics, visible focus states, and keyboard-reachable navigation.
6. Fix the contact interaction. Decide one of two valid implementations before coding: a real form endpoint with success/error states, or a WhatsApp/email-only contact flow without a fake form.
7. Keep Instrument Serif for editorial headings and Poppins for body/UI. Remove unused font baggage and verify no Sora or unintended font is applied to headings.
8. Keep animation restrained and progressive. Use GSAP/Lenis only where it improves orientation or storytelling; clean up listeners and contexts; disable non-essential motion under `prefers-reduced-motion`.
9. Fix layout overflow rather than hiding it with global clipping. Test grid widths, image aspect ratios, fixed header offsets, and contact anchor positioning.
10. Generate and verify valid `robots.txt`, `sitemap.xml`, canonical metadata, Open Graph image, favicon, and page metadata. Direct requests to crawler files must return the correct file formats rather than the app’s 404 page.
11. Add analytics events for hero CTAs, audience-route clicks, WhatsApp clicks, email clicks, form starts, and successful form submissions if a real form is retained.

## Phase 5 — Validation and acceptance testing

### Functional checks

- Every header, hero, audience, service, and footer CTA reaches a real target.
- `Let's talk` or its replacement reaches `#contact` and preserves the visitor’s intended enquiry type.
- WhatsApp opens the correct number and email opens `prerna@meetprerna.com`.
- No placeholder email, phone number, fake form success, or dead anchor remains.
- Every referenced image loads in production; no console 404s occur.
- The production URL matches the repository version used for testing.

### Responsive checks

Test at minimum 320px, 375px, 768px, 1024px, and 1440px widths. Verify there is no unintended horizontal overflow, no clipped CTA, no unreadable hero text, no inaccessible mobile navigation, no excessive blank region, and no fixed-header overlap at anchor destinations.

### Accessibility checks

Verify semantic landmarks, heading hierarchy, keyboard navigation, focus visibility, form labels, link names, alt text, color contrast, reduced-motion behavior, and logical reading order. Confirm that the page remains usable with images disabled and with a screen reader landmark/heading navigation model.

### Performance checks

Verify hero loading priority, below-the-fold lazy loading, responsive image sizing, font loading behavior, and animation cost on a throttled mobile connection. The site should not load every large gallery asset at full cost before the user reaches it.

### Content and brand checks

Run a content QA pass for internal notes, unsupported claims, inconsistent audience language, stale dates, unapproved images, unclear location statements, and missing disclosures. Confirm the final copy preserves the editorial tone without sacrificing literal clarity.

### Conversion checks

Conduct a five-second test with at least three people. Ask each person: “What does Prerna offer?”, “Which option is for you?”, and “How would you contact her?” The redesign fails if responses are materially inconsistent or if any tester cannot locate WhatsApp within ten seconds.

## Deliverables after approval

1. A revised PRD that replaces the current PRD’s ambiguous sections with validated requirements, user journeys, content rules, responsive behavior, and acceptance criteria.
2. A page-level information architecture and section-to-CTA map.
3. An implementation checklist mapped to repository files and deployment tasks.
4. A copy/content inventory identifying approved, missing, stale, and prohibited content.
5. A QA matrix covering functional, responsive, accessibility, performance, SEO, and conversion validation.
6. If requested after the plan is approved, the actual code changes and deployment verification.

## Assumptions and open risks

The plan assumes the site is intentionally a two-audience portfolio rather than a transactional booking platform. It assumes public pricing remains out of scope and that WhatsApp is the primary lead channel. It assumes the supplied phone number and email are correct and approved for public display.

The primary risk is not animation quality; it is unresolved offer prioritisation. If the tattoo and property services have different locations, availability, or legal/operational constraints, they may eventually require separate pages or separate sites. A second risk is asset approval: all images must be verified as authentic, public, and correctly captioned. A third risk is contact handling: a form cannot be considered complete until its delivery mechanism, privacy expectations, spam protection, and success/error behavior are defined.

## Decision required before implementation

Approve the two-track information architecture and choose whether the first release will use **WhatsApp/email only** or a **real submitted form plus WhatsApp/email fallback**. Do not begin animation or visual polish until this decision and the deployment source-of-truth are confirmed.
