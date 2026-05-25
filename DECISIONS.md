# DECISIONS.md
Internal build log — append after every meaningful action. Read this at the start of each session.

---

## Nav — Logo swap & quality fix
**What:** Replaced rounded `img_2.jpg` with `logo_2.png`. Removed rounding, shadow, ring. Fixed blur on scroll-shrink by switching from CSS `height` transition to `transform: scale(0.7727)` with `will-change: transform`. GPU composites a pre-rendered texture; no resampling at each frame.
**Logo size settled at:** `height: 6rem` (fixed), scales to ~4.64rem when compact.

---

## Nav — Colour inversion removed
**What:** User wanted no colour flip on scroll. Nav stays cream background always. Removed `data-[scrolled=true]:bg-primary-900`, hamburger colour swap, and JS CTA class toggle. `syncScrollState` now only manages shrink/compact state.

---

## HeroSection — Built from scratch
**What:** New `HeroSection.astro` replacing old `Hero.astro`. Scroll-driven clip-path reveal using `framer-motion/dom` `scroll()` API (vanilla DOM, no React). Four animated properties driven by a single rAF callback:
1. `clip-path: inset(25% → 0%)` — image opens from windowed to full-bleed
2. `background-size: 170% → 100%` — subtle zoom-out as clip opens
3. Overlay opacity: `0 → 1` — forest-green gradient for text legibility
4. Text colour: forest-green `#2E4628 → #F7F4EC` cream (lerp over first 55% of scroll)

Staggered entrance animation on load (setTimeout + CSS transition). Negative margin `-mt-[5rem] lg:-mt-[6.5rem]` pulls wrapper behind sticky nav so hero fills 100vh from y=0.
**Verified via Playwright:** all four properties hit targets at progress=1.
**Images:** desktop = `hero.jpg`, mobile = `img_17.jpg`. Passed as `.src` strings from parent.

---

## Nav — Hero-phase transparent mode
**What:** Nav detects when the hero scroll is in progress and switches to a special state:
- Transparent background (overrides cream frosted glass)
- Full-size (no shrink)
- All elements visible (logo, hamburger, CTA)

`heroScrollEnd = heroWrapper.offsetHeight - window.innerHeight` derives the scroll end point automatically from the `scrollHeight` prop — no hardcoding. Uses `requestAnimationFrame` on first call to ensure `offsetHeight` is valid; prevents a stray cream-flash transition on page load. Resize listener recalculates on viewport change.
**After hero:** cream bg fades in via existing `transition-[background-color] duration-500`, normal shrink logic resumes 60px past `heroScrollEnd`.

---

## Nav — Hero-phase initially hid menu/CTA, then reverted
**What:** First tried hiding hamburger and CTA during hero (logo-only mode). User liked the idea briefly then reversed — wanted full nav visible during hero. Removed the opacity:0 hiding rules. Kept transparent background and full-size behaviour.

---

## Hero — CTA button removed
**What:** Removed "Get a free quote" pill button from HeroSection content. The nav's "Book a Consultation" link covers the conversion action. Hero is now cleaner: eyebrow + headline + Italian tagline + scroll cue only.

---

## Nav CTA — Pill → editorial text link
**What:** Replaced ghost pill button with a typographic text link. No border, no background, no padding box. Reads: `Book a Consultation →`. Arrow slides right 3px on hover; 1px underline grows left→right via `scaleX` (GPU-composited); text colour transitions to terracotta on hover. Matched size/weight to Menu label for bookend symmetry.
**Why:** User chose "most minimal" option. Fits the premium editorial aesthetic better than a pill shape competing with the hero.

---

## Nav — Full-width layout + text strengthening
**What:** Removed `max-w-container` constraint from `nav-inner` so hamburger and CTA spread to the full viewport edges (`px-6 sm:px-10 lg:px-14 xl:px-20`). Made both "Menu" and "Book a Consultation →" stronger: `font-medium text-[0.82rem] tracking-[0.04em] text-primary` (full opacity, not muted). Removed `uppercase` from both labels — sentence case throughout.
**Why:** User found items felt too close to logo and text too faint. Full-width nav gives natural breathing room at any viewport size.

---

## Removed components
**What:** Deleted `BrandStrip.astro`, `Faq.astro`, `Testimonials.astro`, `TrustBar.astro`. Removed their imports and JSX from `index.astro`.
**Why:** User decided these sections are not needed for this version of the site.
**Current page order:** Hero → HeritageStory → Services → BeforeAfter → Gallery → Team → ContactCta → Footer.

---

## HeritageStory — Full redesign
**What:** Completely rewrote `HeritageStory.astro`. Moved it to position 2 (immediately after the hero — user's explicit request).

**Layout:** Full-viewport editorial split. NO max-w-container on the section — image bleeds from the absolute left viewport edge. Left ~45% = img_23 (Leonardo under autumn vine foliage), full height, object-fit cover, no border-radius, no shadow. Right = cream text column, flex-1, items-center, generous padding.

**Typography hierarchy:**
- Eyebrow: `Coltivato con cura.` — Fraunces italic, text-secondary, lang="it". Only use of Fraunces italic per brand rules (reserved for Italian/heritage phrases).
- Headline: `Four generations of craft.` — Fraunces, clamp(2.25rem, 3.2vw, 3rem), text-primary
- Body: 3 paragraphs, Mulish 1.0625rem, leading-[1.75], text-text-base. Copy cleaned — removed "living masterpiece" (prohibited phrase), grounded in specifics: Rosario, olive groves, Olio Qucco.
- Rule: 2.5rem, 1px, bg-border
- CTA: `Read our story →` — exact same style as nav "Book a Consultation →". Deliberate continuity: same font, weight, tracking, arrow-slide + scaleX underline on hover.

**Animation:** IntersectionObserver only (no framer-motion — that belongs to the hero). CSS `--stagger` custom property pattern: each `.heritage-line` carries its own `--stagger: Xms` inline style. Image observer threshold 0.12; text observer threshold 0.08 with 150ms setTimeout offset so image settles before text stagger begins. Both observers disconnect after firing.

**What was removed from old version:** Dark green bg (broke cream flow from hero), rounded corners, box shadows, inset floating accent image (cluttered), SVG icon arrow (replaced with unicode →), prohibited copy.

---
