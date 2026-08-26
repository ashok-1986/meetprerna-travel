# PRD — meetprerna-travel.vercel.app Rebuild (No-Code Handoff for AI IDE)
**Live:** https://meetprerna-travel.vercel.app/ | **Date:** 26 Aug 2026 (Review Context) | **Version:** Final v2.1
**Owner:** Prerna — Slow Travel + Hand-poked Tattoos | Mumbai + Darjeeling 17-20 Aug

## 1. Problem
Live site is stale: Travel & Stay shows 1 card instead of 10, most images 404, Sora used for headers looks awful, nav solid white blocks hero, no animations (grain, progress bar, reveal missing), Day 1-7 timeline SOP kills vibe, pricing should not be shown.

Local folder has 16 webp + your new uploads: bare_feet_stream, candid_phone_photo, cinematic_mountain_photographer, cinematic_temple_portrait, cozy_neon_studio, ethereal_forest_canopy, goa_beach_sunset, golden_tea_plantation, intimate_bw_portrait, misty_forest_portrait, misty_mountain_valley, misty_shiva_statue, mystical_forest_cathedral, shiva_statue_daylight, tea_garden_panorama, tea_plantation_landscape (hero poles removed) + new: darjeeling_balcony_sunglasses_stay (edited), group mirror photos, snowy mountain group selfies.

Vercel only has 2 images deployed. Code references non-existent files.

## 2. Goals
- Portfolio, not pitch deck. Prove real stays with real photos. Sale offline, no pricing.
- 2-level font: editorial header + clean body (user edit: body = Poppins, header = Instrument Serif ONLY, never Sora for header).
- Transparent nav with white text visible over hero, turning blurred on scroll.
- Apple motion slow intentional.
- Production bulletproof.

## 3. Assets
All images must be in public/images/ and committed. Use your 16 + new edits. Renamed edited image: darjeeling_balcony_sunglasses_stay.webp (subtle cleanup, no face/body change, original IMG20250307154508.jpg).

## 4. Design System
**Fonts:** Header Instrument Serif ONLY weight 400 italic accent tracking -0.02em line-height 0.88-0.95. Body Poppins (per your latest file edit) weight 300-500 line-height 1.5-1.7. Rule: .font-header {Instrument Serif !important} .font-body {Poppins !important} h1,h2,h3 {Instrument Serif !important}

**Nav:** Default fixed bg-transparent border-b border-white/10 text-white logo white. Scrolled >20px bg-[#FFFCF5]/80 backdrop-blur-xl border-black/5 text-black. Use useState scrolled + scroll listener cleanup. Use Link from next/link.

**Colors:** Cream #FFFCF5, Charcoal #1A1A18, Terracotta #C86B5A, Sand #E8DCC6.

## 5. Sections
**Hero:** 100vh, tea_plantation_landscape.webp scale 110->105 Ken Burns 15s, overlay gradient, badge Darjeeling Live, H1 Where Journeys / Become Ink. (Instrument Serif white + italic #E8DCC6), sub Poppins white/70, CTA gap-3, grain 0.025, progress 2px terracotta.

**Travel & Stay:** Title Where I've stayed slow. (stayed slow italic terracotta). Grid md:grid-cols-12 gap-5 NO pin NO parallax scrub. Use ONLY existing files + new sunglasses balcony shot. Map: 8col tea_plantation_landscape Morning mist no poles, 4col stack golden_tea_plantation + misty_forest_portrait, 9 cards 3col: mystical_forest_cathedral, shiva_statue_daylight, cinematic_temple_portrait, cinematic_mountain_photographer, bare_feet_stream, goa_beach_sunset, cozy_neon_studio, ethereal_forest_canopy, darjeeling_balcony_sunglasses_stay for balcony vibe, plus candid_phone_photo + intimate_bw_portrait banner. onError fallback.

**Services:** Delete Day 1-7 timeline completely. Replace with 6 cards: Reels (2-3), Photo Set (25-30), Blog Story, Google + IG Review, Story Takeover, Tattoo Pop-up optional.

**Instagram Pull:** Use recent IG @meetprerna posts: Chardham Shiva misty reel, barefoot Shiva temple, temple bell UPSC joke, olive dress chest tattoo (already fetched). These prove real travel.

**Contact:** Add a concrete Contact section targeting #contact with an inquiry form, submission success state, and direct WhatsApp/email fallback.

## 6. Animations (animations.md)
Lenis lerp 0.08, gsap.context() revert cleanup, hero line stagger y 105%->0% power3.out, hero-bg scale, hero-fade y 14px, reveal IntersectionObserver 0.15, grain, progress bar.

## 7. Production Bugs
1 Memory Leaks track listeners array remove, 2 Lenis cancelled flag, 3 gsap.context, 4 resize listener 768px, 5 Link.

## 8. Config
next.config.js images unoptimized true, gsap 3.12.5 lenis 1.1.20.

## 9. Acceptance
- Nav transparent white visible over hero turning cream on scroll
- Headers Instrument Serif ONLY body Poppins no Sora in h1/h2
- Travel 12 cards total all images loading no 404
- No Day 1-7 no pricing
- Valid robots.txt and sitemap.xml generated
- Canonical and social metadata present
- Semantic landmarks (header, main, footer) applied
- Visible keyboard focus and absence of unintended horizontal overflow
- "Let's talk" CTA successfully navigates to #contact, form submissions work, and WhatsApp/email fallback is available
- Animations run, but respect prefers-reduced-motion query
- Vercel has 16+ webp

Out of scope: Pricing, Day 1-7 SOP.
