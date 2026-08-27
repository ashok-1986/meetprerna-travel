# Prerna Website — Implementation and QA Checklist

## Release sequence

### 1. Establish the source of truth

Confirm that the attached repository is the exact project deployed to `meetprerna-travel.vercel.app`. Record the commit hash used for the release. Do not validate only the local dev server; every acceptance test must be repeated against the deployed URL.

### 2. Clean and verify assets

Create a manifest of every approved image in `public/images/`. Compare the manifest with every image reference in `src/app/page.tsx`. Fail the build or pre-deploy check if any referenced file is missing. Verify filenames are case-sensitive and that the 16+ approved WebP assets are present in the deployment.

Remove fallback handlers that silently replace a missing image with the hero image. A fallback can make the page look superficially complete while hiding broken asset references. Use a visible development error or build-time validation instead.

### 3. Rebuild the page structure

In `src/app/page.tsx`, implement the IA in this order: hero, audience split, selected work, traveller experience, stay collaboration, About/process, proof, contact, footer. Use stable IDs `travellers`, `stays`, `work`, `about`, and `contact`.

The hero must present two actions. The traveller action should scroll to or route to the traveller content and then open WhatsApp with a traveller-intent message. The property action should do the same for property collaboration. Do not send every action to a generic form without preserving intent.

### 4. Make contact real

Replace `hello@example.com` and `https://wa.me/0000000000` with:

```text
mailto:prerna@meetprerna.com
https://wa.me/917738147935?text=<encoded-intent-message>
```

Choose one contact implementation:

- **Recommended first release:** WhatsApp and email only. This is reliable and requires no backend.
- **Optional later release:** a real form provider or backend with validation, delivery, spam protection, success state, error state, and privacy handling.

Never retain a form whose submit handler only calls `preventDefault()`.

### 5. Implement mobile navigation

The current repository renders desktop navigation with `hidden md:flex` but provides no mobile replacement. Add an accessible menu trigger below the desktop breakpoint. The menu must have a visible open/close state, keyboard support, focus return, and a persistent WhatsApp action.

### 6. Fix the semantic shell

Keep one `<header>`, one `<main>`, and one `<footer>`. Make each major section an appropriately labelled region. Confirm that all visible text is in the logical reading order and that the fixed navigation does not obscure anchor destinations.

### 7. Consolidate typography and motion

Keep Instrument Serif for headings and Poppins for body/UI. Remove unused font imports and verify computed styles in the browser. Keep the grain, progress bar, reveal, and Ken Burns effects only where they improve the editorial story. Disable non-essential animation for reduced-motion users.

GSAP and smooth-scroll cleanup must be verified on route changes and component unmount. Scroll, resize, and observer listeners must be removed. Do not animate width, height, margin, or padding for decorative reveals.

### 8. Fix responsive layout

Test the hero, audience cards, gallery, service cards, contact block, and footer at 320px, 375px, 768px, 1024px, and 1440px. Remove the global reliance on overflow clipping as a fix. Correct the grid or image width that currently extends beyond the desktop viewport. Confirm that no fixed height creates a blank region before lower sections.

### 9. Fix SEO/deployment files

Verify that `src/app/robots.ts` and `src/app/sitemap.ts` are included in the deployed build and are not shadowed by a 404 route. Direct requests must return:

- `/robots.txt`: plain text with allow/disallow rules and a fully qualified sitemap URL.
- `/sitemap.xml`: valid XML with the canonical homepage URL.

Confirm canonical metadata, title, description, Open Graph image, Twitter card, favicon, and homepage indexing behavior. The homepage must not contain a `noindex` directive.

## QA matrix

| Test area | Test | Expected result | Status |
|---|---|---|---|
| Source/deploy parity | Compare deployed build to tested repository commit | Same version and assets | ☐ |
| Assets | Request every image path | HTTP success, correct content type, no 404 | ☐ |
| Navigation | Click every header and footer link | Correct target, no dead anchors | ☐ |
| Hero CTAs | Click traveller and property actions | Correct section and preserved intent | ☐ |
| WhatsApp | Open both intent-specific actions | Correct number `+917738147935`, message prefilled | ☐ |
| Email | Click email fallback | Opens `prerna@meetprerna.com` | ☐ |
| Contact | Submit if form is retained | Real delivery, visible success/error state | ☐ |
| Mobile nav | Open, navigate, close, press Escape | Works by mouse and keyboard; focus returns | ☐ |
| Anchors | Load URL with `#contact` and click CTA | Contact heading is not hidden behind fixed header | ☐ |
| Responsive | Test 320/375/768/1024/1440 widths | No unintended overflow or clipped controls | ☐ |
| Semantics | Inspect landmarks and heading hierarchy | One header/main/footer; logical h1/h2/h3 | ☐ |
| Keyboard | Tab through all controls | Visible focus and logical order | ☐ |
| Alt text | Inspect work images | Descriptive, contextual alt text | ☐ |
| Reduced motion | Enable reduced-motion preference | Non-essential animation disabled | ☐ |
| SEO | Request `/robots.txt` and `/sitemap.xml` | Valid plain text/XML, not HTML 404 | ☐ |
| Metadata | Inspect title, canonical, OG, Twitter, favicon | Complete and accurate values | ☐ |
| Console | Load and scroll full page | No runtime errors, warnings, or image failures | ☐ |
| Content QA | Search for placeholders and draft notes | No example.com, 0000000000, folder/debug language | ☐ |
| Conversion test | Ask 3 users what the site offers and how to contact | Consistent understanding and fast WhatsApp discovery | ☐ |

## Suggested pre-deploy checks

Use a simple script or CI check to validate local image references, placeholder strings, and required contact URLs. The check should fail when it finds `example.com`, `0000000000`, `preventDefault()` on the contact form without a submission call, or image paths not found in the asset directory.

## Release blockers

Do not deploy if the contact CTA is dead, WhatsApp points to the wrong number, the form silently discards data, any image returns 404, the mobile menu is missing, the page has unintended horizontal overflow, crawler endpoints return HTML 404 pages, or the deployed build does not match the tested source.

## Post-launch measurement

Track clicks on traveller CTAs, property CTAs, WhatsApp, email, and any form start/submit events. Review the first 30–50 qualified visits. If users still cannot identify the correct path or no qualified conversations begin, revise the offer and copy before changing the visual styling.
