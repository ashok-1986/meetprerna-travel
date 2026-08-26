# COMPREHENSIVE PROMPT FOR AI IDE — Paste into Cursor / OpenCode / Windsurf

You are fixing https://meetprerna-travel.vercel.app/ — portfolio for Prerna (slow travel + hand-poked tattoos). Sale offline, no pricing. Live is stale: 1 card in Travel & Stay not 10, images 404, Sora for headers awful, nav solid white not transparent, zero animations.

Read PRD.md and animations.md first. Source of truth. Do not write code until you read them.

CONTEXT: User has 16 local webp + new uploads (sunglasses balcony IMG20250307154508.jpg edited to darjeeling_balcony_sunglasses_stay.webp subtle cleanup no face/body change). These MUST be in public/images/ and committed. Vercel only has 2. Old code referenced darjeeling_misty_balcony.webp and gopuram_golden_sunset.webp which DO NOT EXIST — never reference.

Also fetched recent IG @meetprerna and @meetprerna.tattoos: Chardham Shiva misty garden, barefoot Shiva temple walk, temple bell UPSC joke, olive dress chest tattoo, Darjeeling 17-20 Aug announcement. Use for social proof.

TASKS:

1. Fonts 2 Level: User edited body to Poppins in latest file — respect. Headers Instrument Serif ONLY, Body Poppins. Define .font-header {Instrument Serif !important} .font-body {Poppins !important} h1,h2,h3 {Instrument Serif !important}. Import Instrument Serif Google Fonts. Never use Poppins/Sora for h1/h2.

2. Nav Transparent + Visible: Default fixed bg-transparent border-b border-white/10 text-white logo white visible over tea hero. Scrolled >20px useState -> bg-[#FFFCF5]/80 backdrop-blur-xl border-black/5 text-black CTA bg-black. Cleanup listener. Use Link from next/link.

3. Travel & Stay Critical No Missing: Delete old grid using non-existent files. Build md:grid-cols-12 gap-5 NO pin NO parallax. Use ONLY existing 16 + new darjeeling_balcony_sunglasses_stay.webp. Map per PRD: 8col tea_plantation_landscape, 4col stack golden_tea_plantation + misty_forest_portrait, 9 cards 3col mystical_forest_cathedral, shiva_statue_daylight, cinematic_temple_portrait, cinematic_mountain_photographer, bare_feet_stream, goa_beach_sunset, cozy_neon_studio, ethereal_forest_canopy, darjeeling_balcony_sunglasses_stay, banner candid_phone_photo + intimate_bw_portrait. onError fallback to tea_plantation_landscape.webp.

4. Remove Clumsy: Delete Day 1-7 timeline (Arrival, Golden hour Reels, Detail shots, Edit, Blog, Review, Delivery). Delete pricing.

5. Apple Animations: SmoothScroll.tsx Lenis lerp 0.08 fix race cancelled flag useRef destroy, page.tsx gsap.context revert, hero line stagger y 105%->0% power3.out, bg scale 1.1->1.05 15s, fade y 14px, reveal IntersectionObserver 0.15, grain 0.025, progress 2px terracotta. Ensure prefers-reduced-motion mode disables or simplifies them while preserving usable content and navigation.

6. Fix 5 Bugs: Memory leaks array remove, Lenis cancelled, gsap.context, resize 768px, Link.

7. Config: next.config.js images unoptimized true, ensure public/images 16+ webp git add.

OUTPUT: page.tsx with transparent nav white over hero turning cream on scroll, headers Instrument Serif body Poppins, travel 12 cards total no 404, no Day 1-7 no pricing, animations working, working inquiry path for "Let's talk" to #contact form with fallback. components/SmoothScroll.tsx bulletproof. explicit reduced-motion pass/fail test covers media-query behavior. Build passes.

DO NOT: Use Sora/Poppins for headers, reference non-existent files, add Day 1-7, add pricing, use <a> for hashes.

Start: list public/images confirm 16+, then fonts, then nav, then travel grid.
