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

## HeritageStory — v1 (rejected)
**What:** First redesign of `HeritageStory.astro`. Full-viewport editorial split, cream background, full-height image panel bleeding from left edge. CTA used `Read our story →` — identical treatment to nav's "Book a Consultation →".
**Why rejected:** Cream background broke the dark-green flow that was established. Full-height image panel felt too similar to the hero (which already owns that cinematic full-bleed moment). CTA was visually identical to the nav CTA — no differentiation.

---

## HeritageStory — v2 (current)
**What:** Complete second redesign. Background: deep forest green `bg-primary` (`#2E4628`) — intentional dark-on-dark contrast after the cream hero landing.

**Layout — two zones within `max-w-container`:**
- Zone 1 (top, full-width): Eyebrow + large headline. `mb-14 lg:mb-20`.
- Thin separator rule: `h-px bg-white/15 mb-14 lg:mb-20`
- Zone 2 (bottom): `flex-col-reverse lg:flex-row`, `items-start`, `gap-12 lg:gap-16 xl:gap-20`
  - Left (`flex-1`): 3 body paragraphs + CTA
  - Right (`lg:w-[42%] xl:w-[38%]`): 4:5 aspect-ratio contained portrait of img_23. NOT full-height — image sits within layout like a photograph placed on a page, not a background panel.

**Typography on dark green:**
- Eyebrow: Fraunces italic, `text-secondary` (sage #838D6A), `text-[0.9rem]`, `lang="it"`
- Headline: Fraunces, `clamp(2.8rem, 4.5vw, 4.25rem)`, weight 400, `text-surface` (cream), `leading-[1.06]`, `max-width: 14ch`
- Body: Mulish `1.0625rem`, `leading-[1.75]`, `text-surface/70` (70% opacity cream)
- *Olio Qucco*: `font-display italic text-surface/90`

**CTA — "Read our story" + extending horizontal rule:**
- Deliberately different from nav's "Book a Consultation →" (which uses unicode arrow + scaleX underline below text)
- Here: cream text at 65% opacity → full opacity on hover + a `1px` cream rule beside the text that widens from `w-8` → `w-20` via `transition-[width] duration-700`
- Uses Tailwind named group `group/story` + `group-hover/story:w-20` on the rule `<span>`
- No arrow character. No underline. The extending rule IS the directional signal.
- Colour: `text-surface/65 hover:text-surface` (cream, NOT terracotta — explicit user preference)

**Animation:** IntersectionObserver adds `.heritage-visible` to `<section>` at `threshold: 0.1`. CSS `--stagger` custom property drives staggered transitions:
- Eyebrow 0ms → Headline 100ms → Rule 200ms → Para 1 280ms → Para 2 360ms → Para 3 440ms → CTA 520ms
- Image: separate `.heritage-img` class, `opacity 800ms ease-out 150ms, transform: scale(0.97) → scale(1)`
- One-shot observer (disconnects after firing). Reduced motion: all set visible immediately, no transitions.

**Mobile:** `flex-col-reverse` — image appears below text on small screens.

**Image:** `img_23.jpg`, `width={800}`, `height={1000}`, `quality={88}`, `densities={[1,2]}`, `loading="lazy"`. No border-radius, no shadow, no border.

**What changed from v1:** Dark green bg restored (cream was wrong for this position in page flow). Image contained at 4:5 ratio instead of full-height bleed. CTA completely differentiated from nav using extending rule instead of arrow + underline. Mobile order corrected to image-below-text.

---

## HeritageStory — v3 "The Sicilian Light" (current)
**What:** Complete third redesign. Full-bleed editorial layout that breaks out of max-w-container. Biggest departure from previous versions.

**Background: cream (`bg-background`)** — User wanted breathing room and a section that flows naturally from the hero. The hero ends dark (forest-green image overlay); cream is the natural exhale. Green typography on cream achieves maximum contrast and feels more editorial than white-on-green.

**Breathing room:** `pt-32 lg:pt-48 xl:pt-56` of pure cream before the content grid. The IntersectionObserver fires on `#heritage-content` (the grid), NOT on the `<section>` top — so animation triggers only when the photograph genuinely enters the viewport, giving the user the cream pause first.

**Layout — full-width CSS Grid, NO max-w-container:**
- `grid-cols-[45fr_55fr]` on desktop, `grid-cols-1` on mobile
- `lg:min-h-[85vh]` ensures the image has generous vertical presence
- LEFT: img_23 (Leonardo portrait) `absolute inset-0 w-full h-full object-cover object-[center_top]` — bleeds to the viewport left edge, no border-radius, no shadow. Right-edge gradient (`bg-gradient-to-r from-transparent to-background`) softens the photo-to-cream seam (desktop only, hidden on mobile)
- RIGHT: text content internally padded (`px-8 lg:px-16 xl:px-24`), `flex-col justify-center`

**Typography on cream:**
- Eyebrow: Mulish 13px, uppercase, `text-text-muted`
- Italic phrase: Fraunces italic, `text-[1.4rem]`, `text-secondary`
- Headline: Fraunces `clamp(3.5rem, 5.5vw, 5.5rem)` (larger than v2's 2.8→4.25rem), `text-primary` (forest-green)
- Body: Mulish `1.0625rem`, `text-text-base`, `max-w-[56ch]`

**New element — img_24 (hands in soil):** Small `w-28 lg:w-32 aspect-square` accent image, right-aligned via `flex justify-end`, positioned between para 3 and the CTA. Tactile counterpoint to the formal portrait. `aria-hidden`, no alt text (decorative), no border-radius, no shadow.

**CTA — terracotta:** `text-accent hover:text-accent-600` with extending rule `bg-current`. Correct for cream background (v2 used `text-surface/65` because it was on forest-green).

**Animation:**
- Main portrait: `opacity: 0 → 1`, `900ms ease-out 0ms` — opacity-only (no scale to avoid overflow-hidden halo artefact)
- Text elements: same `--stagger` custom property pattern, but longer delays (0→640ms)
- img_24: `opacity 0→1, scale 0.92→1`, `650ms ease-out 580ms`
- Observer on `#heritage-content` not `#heritage`, threshold 0.10

**Mobile:** image stacks ABOVE text (`aspect-[4/5] lg:aspect-auto`), natural portrait crop.

**What changed from v2:** Background changed cream (was forest-green). Image changes from contained 4:5 box to full-bleed left column. Headline is noticeably larger. CTA colour changes to terracotta (was cream/65%). img_24 accent added. Breathing room spacer added before grid.

---

## HeritageStory — v4 (current)
**User feedback on v3:** "I don't want a huge photo. I want a well crafted section with real spacing and with intent. I want to keep the green background. I want things to feel free and relaxed, not strict template sections that are split into boxes."

**What changed:** Reverted to `bg-primary` (forest-green). Completely abandoned the full-bleed two-column template structure.

**Core design shift:** Text is PRIMARY. Photograph is a CONSIDERED ACCENT.
- `max-w-[62rem]` content container (narrower than full container — green breathes on both sides at wide viewports)
- Breathing room: `pt-40 lg:pt-60 xl:pt-72` baked into the section itself (not a separate spacer div). 240px of pure green before content appears on desktop.
- IntersectionObserver on `#heritage-content` (inner div), NOT the section — ensures animations fire when the actual text/photo enter the viewport, not when the green breathing room does.

**Layout:**
- TOP ZONE: eyebrow → Fraunces italic phrase → large headline (clamp 3rem–4.75rem) → `bg-white/15` hairline rule
- BODY ZONE: `grid-cols-[minmax(0,1fr)_240px]` gap-16 items-start
  - Left: 3 paragraphs `max-w-[52ch]` + "Read our story ——" CTA
  - Right: img_23 portrait, `hidden lg:block`, `lg:pt-8 xl:pt-12` offset DOWN so green shows above it. Fixed 240px column width. Modest: 240×320px rendered. `aspect-ratio: 3/4`, `object-[center_top]`. NOT column-filling.

**What makes it feel free:** Green breathes above the portrait within the right column. The image doesn't fill a rigid container. The text column takes all natural space. Nothing is pinned to a grid edge.

**img_24 removed** — one element too many with the existing portrait. Layout reads cleaner without it.

**Mobile:** portrait `hidden`. Single text column — clean without the image.

---

## HeritageStory — v5 "The Olive Grove" (current)
**User feedback on v4:** "Still too generic and too boxed in. I want something professional, minimalist, with quality that doesn't feel strained. I want free flow — references Flamingo Estate and Heckfield Place. Not bounded by boxes. Keep the green background. Add img_17."

**Design shift — three vertical moments, each with its own horizontal logic:**

1. **DECLARATION** — typography only. Headline at `clamp(4.5rem, 8vw, 7rem)` does the heavy lifting before any photograph arrives. No competing image in this zone. Green breathes around pure type.

2. **THE GROVE (img_17)** — the olive-tree pruning image lives freely. Positioned with `margin-left: clamp(5%, 17vw, 22%)` — green breathes on the left, image bleeds right. `height: clamp(320px, 58vh, 620px)` — controlled presence, not a wall. Not column-contained. Not full-bleed. Just placed.

3. **THE STORY** — text paragraphs on the left (max-w-[52ch], flex-1). img_23 on the right at 165-190px wide with `-mt-28 xl:-mt-36` — this negative margin pulls the portrait UP so it bridges visually between img_17 above and the text below. Two photographs at different scales in quiet dialogue. img_23 hidden on mobile.

**Animation:**
- img_17: slow cinematic zoom-out `scale(1.04) → scale(1)` + opacity, `1200ms ease-out 200ms`. The image arrives unhurried, after the headline lands.
- img_23: opacity only, `900ms ease-out 600ms` — last to appear, quietly.
- Text: staggered fade-up 0–580ms.

**No separator rule** — spacing IS the separator. The generous margins between zones read as intentional negative space, not empty gaps.

---

## HeritageStory — v6 "The Typographer" (current)
**User feedback on v5:** "This is not good at all." Presented three concepts (A: The Chapter, B: The Emergence, C: The Typographer). User chose C with refinements: both images should be balanced/meaningful presence (not tiny), both images are portrait/vertical (no wide framing), cohesiveness without overcrowding.

**Core design shift:** The typographic headline IS the section's art. Three spans at dramatically different scales create a cascade of size — a typographic sculpture, not uniform text.

**Two compositional zones within max-w-container:**

**ZONE 1 — THE DECLARATION:**
- CSS Grid: `grid-cols-1 lg:grid-cols-[1fr_clamp(220px,22vw,275px)]`
- LEFT: Eyebrow → Fraunces italic phrase → three-scale h2:
  - "Four" at `clamp(5rem, 8vw, 7.5rem)` — cream, full opacity, commanding
  - "generations" at `clamp(2.6rem, 4vw, 3.75rem)` — cream/55% opacity, indented `0.5ch` — visual recession, a breath
  - "of craft." at `clamp(3.75rem, 6vw, 5.75rem)` — cream, full opacity, closes the rhythm
- RIGHT: img_17 portrait (`aspect-ratio: 2/3`, `object-cover`). `pt-20 lg:pt-24` offsets it downward — green breathes above it within the column. Floats rather than pinning to grid top. Hidden on mobile.

**ZONE 2 — THE STORY:**
- `flex flex-col lg:flex-row items-start gap-12 lg:gap-20 xl:gap-28`
- LEFT: 3 paragraphs `max-w-[52ch]` + CTA
- RIGHT: img_23 portrait (`aspect-ratio: 3/4`, `clamp(180px, 18vw, 230px)` wide). `-mt-20 xl:-mt-28` bridges it upward into Zone 1's space. Two photographs in quiet dialogue across the green field between zones. Hidden on mobile.

**Separation between zones:** `mb-16 lg:mb-20 xl:mb-28` — spacing is the separator, no hairline rule.

**Mobile:** Both images hidden. Pure typographic + text section — the three-scale headline at full column width is the experience.

**Animation unchanged from v5 pattern:** img_17 zoom-out 1100ms ease-out 200ms; img_23 opacity 900ms ease-out 600ms; text staggered 0–720ms.

---

## HeritageStory — v7 "The Witness" (current)
**User feedback on v6:** Images felt badly placed and too small. Paragraphs felt too generic. New vision: each image on one side at different vertical positions, text in the middle, scroll parallax on images. Both images are portrait/vertical — no wide framing allowed. Organic, not matched.

**Two zones:**

**ZONE 1 — THE DECLARATION (unchanged from v6 concept, image removed):**
- Pure typographic sculpture — no photograph. Three-scale h2 spans stand alone on forest-green.
- IntersectionObserver on `#heritage-content`, threshold 0.08.

**ZONE 2 — THE WITNESS:**
- Three-column CSS grid: `grid-cols-[clamp(190px,19vw,255px)_1fr_clamp(155px,16vw,210px)]`
- LEFT: img_17, `aspect-ratio: 3/4`, `self-start`, no top offset — appears near zone top
- CENTER: `lg:px-6 xl:px-10` internal padding. Fraunces italic pull phrase at top: *"Tended the way a family tends a name."* — `clamp(1.4rem, 2vw, 1.75rem)`, `text-surface/80`. Then 3 body paragraphs + extending-rule CTA.
- RIGHT: img_23, `aspect-ratio: 2/3`, `self-start`, `mt-24 xl:mt-32` — pushed down so green breathes above it. Different ratio and width to img_17 — organic asymmetry.
- Both images hidden on mobile.
- Separate IntersectionObserver on `#heritage-story-zone` for Zone 2 text + image opacity. Threshold 0.06.

**Pull phrase:** Not in quotation marks. Fraunces italic display — extracted from prose body. Gives the center column a typographic voice before the paragraphs begin. This is what prevents the text from reading as generic stacked paragraphs.

**Scroll parallax (vanilla JS, rAF-throttled):**
- Progress computed: `(viewH - rect.top) / (viewH + rect.height)`, clamped 0–1
- img_17 (left): `translateY((0.5 - progress) * 30px)` — rises 30px total through viewport
- img_23 (right): `translateY((progress - 0.5) * 40px)` — descends 40px — opposing motion
- CSS manages opacity; JS manages transform — no property conflicts.
- `will-change: transform` on both wrappers for GPU compositing.

---
