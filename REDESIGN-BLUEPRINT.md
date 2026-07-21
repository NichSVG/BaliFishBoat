# BaliFishBoat — Complete UI/UX Redesign Blueprint

**Prepared for:** balifishboat.com ("Bali Fishing Trips")
**Prepared by:** Lead Product Design / Creative Direction / CRO / Frontend Architecture
**Purpose:** Implementation-ready UI/UX redesign specification. Every recommendation is concrete and buildable in the existing codebase with **zero backend, CMS, booking-flow, or functionality changes**.

---

# 0. EXECUTIVE SUMMARY & CURRENT-STATE INVENTORY

## 0.1 Scope Guardrails (READ FIRST — non-negotiable)

This is a **UI/UX redesign only**. The implementing agent MUST NOT:

- Change the booking workflow (inquiry form → WhatsApp + email stays exactly as-is)
- Add payment gateways, online payments, deposits, Stripe/PayPal/Midtrans
- Add customer accounts, dashboards, login, or availability calendars backed by a database
- Change Sanity schemas, API routes, or the inquiry endpoint
- Change pricing, package structure, or business logic
- Add features requiring server-side development

Everything below is achievable with **front-end changes only**: layout, typography, color, spacing, imagery, components, animations, and client-side UI state. Sanity data is consumed exactly as today. Any *new* display data (e.g., per-trip card images, gallery categories) is hardcoded in front-end constants — the same pattern the codebase already uses (`galleryData.ts`, `constants.ts`).

## 0.2 Verified Current-State Inventory

**Stack:** Next.js 15.5.20 (App Router, RSC), React 19, **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens live in `@theme` inside `globals.css`), Sanity CMS (read-only consumption), `lucide-react` icons, `react-hook-form` + `zod`, Resend (email). Font: **Inter only** via `next/font/google`. No animation library.

**Routes:** `/` (home), `/trips`, `/trips/[slug]` (7 trips), `/gallery`, `/blog`, `/blog/[slug]`, `/contact`, `/studio` (Sanity — ignore).

**Design tokens in use today:**
- Colors: stock Tailwind `blue-600 #2563eb`, `blue-900 #1e3a8a`, `slate-*`, `green-600` (WhatsApp), `amber-*` (badges/stars). Body: `bg-slate-50 text-slate-900`.
- Radius: `rounded-xl`/`rounded-2xl`. Buttons: `rounded-full`.
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8`. Section padding: `py-16`.
- Animations: 3 marquee "wave" keyframes in hero, `hover:scale-105`, `hover:shadow-md`, `transition-colors`.

**Component inventory (current):**
| File | Renders |
|---|---|
| `layout/Header.tsx` | Sticky white header, Lucide `Fish` logo, 5 links, green WhatsApp pill, mobile slide-down menu |
| `layout/Footer.tsx` | 3-col slate-900 footer, quick links, WhatsApp + Inquiry CTAs |
| `Hero.tsx` | 600px hero, CSS background image, dark gradient, 3 wave SVGs, H1 = brand name, 3 CTAs |
| `TripCard.tsx` | Text-only card: name, Shared/Private badge, 2-line description, 3 icon meta, price, "View details →" |
| `TripPackageList.tsx` | 3-col grid of TripCards |
| `HomepagePics.tsx` | 2 large images + "See the full gallery →" |
| `ReviewBadges.tsx` | 6 percentage tiles (96% Friendly Captain … 73% Caught Fish) |
| `Testimonials.tsx` | 5 plain quote cards (stars, quote, name · country · trip) |
| `FAQAccordion.tsx` | 6-item accordion, all closed by default |
| `LocationMap.tsx` | Google Maps iframe embed + address bar |
| `Gallery.tsx` | 3-col grid, 9 photos + 2 videos interleaved, custom lightbox |
| `BookingInquiryForm.tsx` | 7-field form; submit opens WhatsApp + POSTs `/api/inquiry` |
| `WhatsAppButton.tsx` | Fixed bottom-right green pill (safe-area aware) |
| `ScrollProgress.tsx` / `ScrollToTop.tsx` | Top progress bar, back-to-top |

**Content inventory (from `charter-seed-data.json` + live site):**
- 7 packages: Sharing $200pp · Sunset $270pp (min 2) · Half Day Private $550 · 3/4 Day $650 · 6h Jigging & Casting $650 · Full Day $750 · Full Day Jigging & Popping $800. Private = per boat, +$50/extra guest after 4, max 8.
- Rating: **4.4/5, 126 reviews** (FishingBooker). Sub-scores: Boat 4.2 · Crew 4.7 · Experience 4.4. Distribution: 5★×82, 4★×23, 3★×14, 2★×4, 1★×1.
- Review themes: 96% friendly captain · 88% good boat · 84% family friendly · 83% great experience · 86% recommended · 73% caught fish.
- Boat: 36ft GT 70 cruiser (2014), 8 guests, 2× Yamaha 115HP, private toilet, shaded seating, trolling outriggers.
- 6 inclusions, 6 species, 5 techniques, 6 FAQs, 5 testimonials.
- Media: `hero-bg.jpg` (103KB), 11 gallery JPGs (82–400KB), **2 MP4s (19MB + 46MB — problem)**.
- Crew names appear in real reviews: **Dedik** (owner/captain), Warsan, Lilong, Beton.

**SEO already in place (good, keep):** per-page metadata + canonical + OG, `LocalBusiness` + `FAQPage` + `Product` + `Breadcrumb` JSON-LD, `sitemap.ts`, `robots.ts`, skip-to-content link, semantic headings.

## 0.3 The Core Diagnosis (one paragraph)

The site is **functionally complete and informationally honest, but visually generic**. It looks like a default Tailwind template: stock `blue-600`, one font weight story, text-only package cards, a hero whose H1 is the brand name instead of a promise, and trust data (4.4★/126 reviews, 96% friendly captain) rendered as flat tiles instead of persuasive proof. Meanwhile its own FishingBooker listing converts better than the website does — because that listing shows a review distribution, verified reviewer identities, a photo gallery, a boat spec sheet, and "what anglers say" in a structured way. Every gap identified below is fixable with pure front-end work. The redesign direction: **"Premium Tropical Marine"** — deep ocean navy + sea-glass teal + warm sand + gold accents, a serif display face (Fraunces) paired with Inter, photography-led cards, and WhatsApp-green reserved exclusively for conversion actions.

## 0.4 Redesign Goals & Measurable Targets

| Metric | Current (est.) | Target |
|---|---|---|
| WhatsApp/inquiry click-through on trip pages | baseline | +40–80% |
| Homepage scroll depth to packages | ~35% | 60%+ |
| LCP (hero) | ~2.5–4s (CSS bg, no preload) | <2.0s |
| CLS | low | keep <0.05 |
| Mobile booking taps to WhatsApp | 2–3 | 1 (sticky bar) |
| Perceived "premium" (5-sec test) | "a template" | "a real charter company" |

---

# 1. OVERALL DESIGN AUDIT (scored 1–10)

| Category | Score | Verdict |
|---|---|---|
| First impression | 5 | Clean but generic; H1 is the brand name, no value proposition, no photography of people |
| Premium appearance | 4 | Stock blue + slate, uniform `py-16`, text-only cards — reads as template |
| Professionalism | 6 | Consistent and tidy; undermined by Lucide-icon logo and flat trust data |
| Branding consistency | 5 | One brand color used for everything incl. non-brand elements; green clashes ad-hoc |
| Color palette | 5 | Safe, unspecific to "ocean/Bali"; no accent system, no dark sections except footer/CTA |
| Typography | 5 | Inter only, 3 weights; no display face, weak hierarchy (h2 `text-3xl` everywhere) |
| Icons | 6 | Lucide is consistent, but generic (Anchor for "departure time", Waves for techniques) |
| Layout consistency | 7 | Predictable rhythm; alternating white/slate bands work but are monotonous |
| White space | 6 | Adequate padding, cramped interiors (cards `p-6` with dense meta rows) |
| Visual hierarchy | 5 | Three equal-weight hero CTAs; price and CTA compete; section titles all identical |
| Card design | 5 | Honest but flat: 1px border + `shadow-sm`, no media, no hierarchy inside |
| Button styles | 5 | Pill buttons fine; hierarchy unclear (white/outline/green all same size in hero) |
| Animations | 4 | Wave marquee is the only signature motion; otherwise just `hover:scale-105` |
| Micro-interactions | 4 | Accordion has no height animation; lightbox is abrupt; no reveal-on-scroll |
| Accessibility | 7 | Skip link, aria labels, focus rings present; contrast of `text-slate-400/500` on white is borderline; lightbox lacks focus trap |
| Responsive design | 6 | Works, but mobile has no sticky booking path and cards collapse to long text lists |

**Overall design score: 5.3 / 10** — "solid template", far from "premium charter".

### Issue 1-A — Stock Tailwind identity
- **Issue:** The site uses unmodified stock `blue-600/slate` palette and Inter throughout; nothing is ownable.
- **Why it's a problem:** Premium positioning requires a distinctive, repeatable visual identity. Stock blue is the #1 "template tell" for savvy users comparing 5 charters in 5 tabs.
- **Why it hurts conversions:** Tourists booking a $550–$800 private charter subconsciously equate visual polish with operational polish (safety, equipment quality, reliability).
- **Recommendation:** Adopt the custom "Serangan" palette + Fraunces/Inter type system defined in Section 14. One primary hue (deep sea teal), one accent (gold), WhatsApp-green reserved for conversion.
- **Implementation Details:** Define tokens once in `globals.css` `@theme` (Tailwind v4 native); swap classes per Section 15. No config file needed in v4.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** Very High

### Issue 1-B — No photographic proof above the fold
- **Issue:** Hero is a generic seascape background with text; the only human/activity photos sit 4 sections down.
- **Why it's a problem:** Charters sell emotion (the fight, the catch, the grin). FishingBooker, GetMyBoat, Viator all lead with activity photography + face-level proof.
- **Why it hurts conversions:** Users decide in ~3 seconds whether this is "their kind of operation". Text can't do that; a guest holding a Mahi Mahi can.
- **Recommendation:** New hero (Section 4) with action photography, rating proof, and a trust bar; photography injected into trip cards, boat, crew, reviews.
- **Implementation Details:** Reuse existing gallery assets immediately (`big-catch.jpg`, `happy-group.jpg`, `36ft-yacht.jpg`); schedule the shot list in Section 6 for phase 2.
- **Priority:** High · **Difficulty:** Medium · **Expected Impact:** Very High

### Issue 1-C — Trust data rendered flat
- **Issue:** "4.4 / 5 from 126 reviews" is plain text; review themes are 6 identical tiles; testimonials are unverified-looking quote cards.
- **Why it's a problem:** The data is strong (4.4★, 126 reviews, 96% friendly captain) but presentation gives it no weight. No source attribution (FishingBooker), no distribution, no reviewer identity.
- **Why it hurts conversions:** Trust is the primary purchase barrier for a foreign tourist wiring their holiday morning to a stranger's boat.
- **Recommendation:** Build the trust system in Section 11: rating summary panel with distribution bars, verified-style testimonial cards with country flags (emoji) + trip tag, theme badges as progress meters, FishingBooker-source attribution.
- **Implementation Details:** All data already exists in `data.ts`/seed; pure presentational rebuild of `ReviewBadges`/`Testimonials` + new `RatingSummary` component.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** Very High

---

# 2. HOMEPAGE — SECTION-BY-SECTION REDESIGN

**Current order:** Hero → Featured Trips → Why Fish With Us → Included → From the Water → What Guests Say (%) → Testimonials → Species & Techniques → Map → FAQ → CTA.

**New order (conversion-sequenced):**
1. Hero (new — Section 4)
2. Trust Bar (new)
3. Trip Packages (redesigned cards)
4. Why Fish With Us (restyled)
5. The Boat (new)
6. Meet the Crew (new)
7. From the Water (mosaic, restyled)
8. Reviews (merged rating summary + themes + testimonials)
9. How Booking Works (new, 3 steps)
10. Species & Techniques (restyled)
11. Where We Depart (map + pickup, restyled)
12. FAQ (restyled, first item open)
13. Final CTA (dark premium band)

*Rationale for the order:* packages must appear while intent is hot (position 3); boat + crew answer "is this operation legit?" right after price exposure; reviews seal it; "how booking works" removes the last friction (WhatsApp anxiety) before FAQ + final CTA.

---

### 2.1 Hero
See **Section 4** for the full redesign + wireframe.

### 2.2 Trust Bar (NEW)
- **Purpose:** Convert hero attention into immediate credibility; anchor the "verified" feeling before any scroll.
- **What exists now:** Nothing — rating is inside the hero text only.
- **Layout:** A white rounded-2xl card overlapping the hero bottom by `-mt-10` (floating card pattern), `mx-auto max-w-5xl`, internal 4-column grid (2×2 on mobile).
- **Contents (all factual):** ① ★4.4/5 — "126 verified reviews" (star row, gold) ② "Free cancellation — up to 30 days before" (ShieldCheck icon) ③ "You keep your catch" (Fish icon) ④ "Hotel & villa pickup included" (Car icon).
- **Typography:** value `text-base font-semibold text-primary-950`; label `text-xs text-slate-500`.
- **Component:** `TrustBar.tsx`. White bg, `shadow-card`, `border border-slate-100`.
- **Responsive:** 4 cols desktop → 2×2 grid mobile.
- **Animation:** fade-up on load (staggered 80ms per item).
- **Expected conversion improvement:** High — immediate proof, sets "verified" frame.

### 2.3 Trip Packages (Featured 3)
- **What works:** Showing 3 + "View all 7" is correct scope for a homepage.
- **What doesn't:** Text-only cards; price buried at bottom; no imagery; badges generic; no per-person anchoring.
- **Redesign (full card spec in Section 7.3 / 13):** image header (`aspect-[16/10]`, trip-specific photo mapped by slug), floating price chip on image (bottom-left, glass), Shared/Private badge top-right, name (Fraunces `text-xl`), 1-line hook, icon meta row (Clock duration · Sunrise departure · Users guests), divider, price row with per-person anchor, CTA row: "View details →" text-link. Whole card is the existing `<Link>` — no behavior change.
- **Images required:** map slugs to existing gallery photos (front-end constant, Section 15.4).
- **CTA placement:** section header gets "View all 7 packages →" top-right (desktop) + bottom-center button (existing) — both kept.
- **White space:** card `p-0` (image flush), body `p-5`; grid `gap-6 lg:gap-8`.
- **Responsive:** 1-col mobile (image first, tappable), 2-col sm, 3-col lg.
- **Animation:** cards reveal-up staggered; image `group-hover:scale-105` (keep pattern).
- **Expected conversion improvement:** Very High — cards become desirable objects, not rows of text.

### 2.4 Why Fish With Us
- **What works:** 6 reasons, honest copy, scannable.
- **What doesn't:** Icon-in-blue-square repeated 6× = monotony; descriptions `text-sm` low contrast; no visual anchor.
- **Redesign:** keep 3×2 grid (`lg:grid-cols-3`), but each item becomes a soft card: `rounded-2xl bg-white border border-slate-100 p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition`. Icon chip becomes `bg-seafoam` circle with `text-primary-700` icon (`h-12 w-12 rounded-full`). Title `font-semibold text-primary-950`, desc `text-sm text-slate-600 leading-relaxed`.
- **Add:** a left-aligned section header (eyebrow + H2 + supporting line) instead of bare centered H2 — see Section 13 header pattern.
- **Remove:** nothing. **Add content:** none (copy stays).
- **Expected conversion improvement:** Medium.

### 2.5 The Boat (NEW SECTION)
- **Why:** FishingBooker dedicates a whole "What is the boat like?" block (category, capacity, length, year, manufacturer, engine, speed). The boat IS the product for a $750 private charter; currently it gets one bullet ("36ft Yacht") in Why-Us. Top US/AUS charter sites all show a boat spec sheet.
- **Layout:** 2-col split `lg:grid-cols-2 gap-10 items-center`, on `bg-primary-950` dark band (first dark section → rhythm break) OR light `bg-sand-50`. **Decision: light sand band** (save dark for final CTA; two dark bands max).
- **Left:** photo `36ft-yacht.jpg` `rounded-3xl aspect-[4/3] object-cover shadow-lg`, with floating spec chip overlay ("36 ft · 8 guests · GT 70") bottom-left glass chip.
- **Right:** eyebrow "THE BOAT", H2 "A 36ft GT 70 Cruiser, Built for These Waters", supporting line, then spec grid `grid-cols-2 gap-4`: Length 36 ft · Capacity 8 guests · Engines 2× Yamaha 115HP · Built 2014 · Private toilet · Shaded seating · Trolling outriggers · (Max speed: add only after owner confirms — seed flags the figure). Each spec = `bg-white rounded-xl p-4` mini-card with Lucide icon (Ruler, Users, Gauge, Calendar, Bath/Toilet→ use `Wc`? Lucide has no toilet — use `ShieldCheck`? Use `DoorClosed`? Use `Waves`? — final mapping in Section 15.6).
- **CTA:** text link "See the boat in the gallery →" `/gallery`.
- **Expected conversion improvement:** High — answers the #1 rational question for private charters.

### 2.6 Meet the Crew (NEW SECTION)
- **Why:** 96% "Friendly Captain" is the strongest trust stat and it's currently invisible as people. FishingBooker reviews name the crew (Dedik the owner, Warsan, deckhands Lilong & Beton). Human faces = the single biggest trust multiplier for charters; every top US/AUS charter site has "Meet the Captain".
- **Content caution:** Bios are unverified — the seed file flags crew bios as "content needed from client". **Build the component; ship with minimal factual copy** ("Dedik — Owner & Captain"; "Warsan — Captain & Guide"; "Lilong & Beton — Deckhands") sourced from public reviews, no invented history. Owner replaces text later via a front-end constant.
- **Layout:** 3 cards `sm:grid-cols-2 lg:grid-cols-3 gap-6`. Card: portrait `aspect-[4/5] rounded-2xl object-cover` (placeholder: cropped gallery/crew images — `crew/` folder exists but is empty; use `fishing-equipment.jpg`/`happy-group.jpg` crops temporarily, clearly noted), name (Fraunces `text-lg`), role (`text-sm text-primary-600 font-medium`), one-line note.
- **Position:** after The Boat, before Gallery.
- **Expected conversion improvement:** High.

### 2.7 From the Water (gallery teaser)
- **What works:** Exists, links to gallery.
- **What doesn't:** Only 2 images, both video thumbnails, huge 50/50 split, captions generic.
- **Redesign:** asymmetric mosaic: 1 large (`lg:col-span-2 lg:row-span-2 aspect-[4/3]`) + 4 small tiles (`aspect-square`), using `big-catch.jpg`, `happy-customer.jpg`, `many-fishes.jpg`, `showing-off-catches.jpg`, `long-catch.jpg`. Captions on hover (existing pattern), `rounded-2xl`. "See the full gallery →" becomes a ghost button under the grid, plus a heading-row link on desktop.
- **Expected conversion improvement:** Medium (desire-building).

### 2.8 Reviews (MERGED mega-section)
- **What doesn't:** Today it's split into "What Guests Say" (% tiles) and "Guest Testimonials" 100px later — fragmented proof.
- **Redesign — one section, 3 layers:**
  1. **RatingSummary panel** (left col of a `lg:grid-cols-[340px_1fr]` layout): giant `4.4` (Fraunces `text-6xl`), gold star row, "126 verified reviews · FishingBooker", then distribution bars (5★ 82 · 4★ 23 · 3★ 14 · 2★ 4 · 1★ 1) — each row: label, `bg-slate-100` track, `bg-gold-400` fill with width %, count. Below: 3 sub-scores as mini-meters (Crew 4.7 · Experience 4.4 · Boat 4.2).
  2. **Theme meters** (right col top): the 6 existing percentages as horizontal progress bars with icons (not dead tiles) — e.g., "96% said: Friendly Captain".
  3. **Testimonial cards** (right col bottom or full-width below, `md:grid-cols-2 xl:grid-cols-3`): redesigned cards (Section 13) — stars, quote (`line-clamp-5` + expand optional — keep simple, no expander), footer with initial-avatar circle (`bg-primary-100 text-primary-700 font-bold`), name, country flag emoji (🇺🇸🇦🇺🇬🇧), trip tag chip, subtle "Verified review" with `BadgeCheck` icon.
- **Data:** all existing (`ratingSnapshot` in seed, `getReviewThemes()`, Sanity testimonials).
- **Expected conversion improvement:** Very High.

### 2.9 How Booking Works (NEW, 3 steps)
- **Why:** The #1 unspoken objection: "What happens when I WhatsApp a stranger in Bali?" Removing ambiguity lifts inquiry rate. Viator/GetMyBoat both visualize the steps-to-book.
- **Layout:** 3-col cards connected by a dashed line (desktop): ① `MessageCircle` "Message us on WhatsApp — tell us your date, group size and trip." ② `CalendarCheck` "We confirm availability & pickup — fast reply, everything in writing." ③ `Fish` "Show up and fish — hotel pickup, all gear, license included."
- **Footer line:** "No account needed. Free cancellation up to 30 days before your trip."
- **Style:** numbered gold step chips, white cards, `shadow-card`.
- **Expected conversion improvement:** High (friction removal at the exact decision point).

### 2.10 Species & Techniques
- **What doesn't:** Two flat chip grids; fish icons identical; no imagery.
- **Redesign:** Species become **catch cards**: `rounded-xl border` with a small square image (map 3–4 species to existing catch photos where plausible: Mahi Mahi → `big-catch.jpg` (captioned Mahi Mahi already), others → generic crop; keep chip style for the rest) — **simpler accepted variant:** keep chips but upgrade to `bg-white border shadow-card` with `Fish` in gold; techniques as numbered list chips. Choose the chip-upgrade variant for v1 (no species photo library exists yet); note species photography for the shot list.
- **Expected conversion improvement:** Low-Medium (engagement/SEO content).

### 2.11 Where We Depart
- **Redesign:** wrap map in a 2-col layout: left = LocationMap (keep iframe, add `rounded-2xl` + `shadow-card`, keep `loading="lazy"`); right = info card stack: address, "Pickup included from hotel/villa across south Bali", departure time "Trips daily from 07:00", and a WhatsApp CTA "Ask about pickup from your hotel".
- **Expected conversion improvement:** Medium.

### 2.12 FAQ
- **Redesign:** `lg:grid-cols-[1fr_320px]`: left = accordion (first item `defaultOpen`, animated height via CSS grid-rows trick, `divide-y`, chevron rotates 180°, question `text-base font-semibold`); right = sticky "Still deciding?" card with WhatsApp CTA + response-time line ("We usually reply within the hour during daytime"). 
- **Copy addition (display-only):** add 2 FAQs already answered elsewhere: "Do I need to pay online?" → "No — book via WhatsApp or the inquiry form; we confirm everything by message." (factual: no payment system exists) and "Is the trip private?" → covered by packages; **only add if owner approves** — v1 ships the existing 6.
- **Expected conversion improvement:** Medium-High.

### 2.13 Final CTA
- **Redesign:** dark `bg-primary-950` band with subtle wave SVG divider on top (reuse existing wave motif as a **section divider**, not only hero), gold eyebrow "READY TO FISH?", Fraunces H2, supporting line, two CTAs: **WhatsApp (green, primary)** + "Compare trip packages" (ghost white). Add trust microline under buttons: "4.4★ · 126 reviews · Free cancellation up to 30 days".
- **Change vs today:** primary CTA becomes WhatsApp (today: "Make an Inquiry" white button). WhatsApp is the stated primary booking method — the final CTA must reflect it.
- **Expected conversion improvement:** High.

---

# 3. NAVIGATION

## 3.1 Desktop header
**Current:** sticky white, Fish icon + "Bali Fishing Trips", 5 links (Home/Trips/Gallery/Blog/Contact), green WhatsApp pill. Works; generic.

**Redesign:**
- **Logo:** replace `Fish` lucide with a proper lockup: custom inline SVG mark (simple wave+fish monogram in `primary-700` circle) + wordmark two-line: "BALI FISHING TRIPS" (`font-bold tracking-tight text-primary-950`) over "SERANGAN · BALI" (`text-[10px] tracking-[0.2em] text-slate-500`). (SVG provided conceptually: circle badge with wave path; implementer draws minimal geometric mark — no external assets needed.)
- **Links:** drop "Home" (logo covers it) → **Trips · Gallery · Blog · Contact** + optional anchor "Reviews" (`/#reviews`). Active state: `text-primary-700` + 2px gold underline (currently blue underline — restyle).
- **Right cluster:** phone-style WhatsApp button `bg-whatsapp` with `MessageCircle` icon + "WhatsApp Us" → becomes the **only** colored element in header. Add subtle top announcement bar (optional, `bg-primary-950 text-white text-xs py-1.5 text-center`): "4.4★ from 126 reviews · Free cancellation up to 30 days" — dismissible not required (static).
- **Scroll behavior (keep + polish):** at `scrollY>10` add `shadow-sm`; also shrink height `h-16 → h-14` transition. Keep backdrop-blur.
- **Height/spacing:** `h-16 lg:h-18` (`72px`), links `gap-7`.

## 3.2 Mobile navigation
**Current:** hamburger → slide-down panel, body-scroll-lock, backdrop. Functional.
**Redesign:**
- Full-screen overlay (`fixed inset-0 bg-white z-50`) instead of 400px slide-down — premium feel, bigger tap targets: links `text-2xl font-semibold py-4` with index numbers (01 Trips, 02 Gallery…), staggered fade-in.
- Bottom of overlay: rating line (★4.4 · 126 reviews) + full-width WhatsApp button + "Make an Inquiry" ghost.
- Close: X top-right, `aria-expanded` kept. Keep body scroll lock + close-on-route-change (already implemented).

## 3.3 Sticky mobile booking bar (NEW — critical)
- **What:** `fixed bottom-0 inset-x-0 z-40 md:hidden` bar, `bg-white/95 backdrop-blur border-t shadow-[0_-4px_16px_rgba(0,0,0,0.08)]`, `pb-[env(safe-area-inset-bottom)]`, two buttons: left "Trips from $200" (ghost, → /trips) · right "WhatsApp" (green, flex-1).
- **On `/trips/[slug]`:** left side shows trip price ("$750 · 8h") instead.
- **Interaction with existing float:** on mobile, **hide** the floating `WhatsAppButton` (bar replaces it) via `hidden md:flex` on the float; desktop keeps float.
- **Padding compensation:** add `pb-20 md:pb-0` on `<main>` so the bar never covers footer content.

## 3.4 Footer
**Redesign:** `bg-primary-950` (replace slate-900 → brand cohesion), 4 columns: ① brand + blurb + rating badge chip ② Explore (links) ③ Trips (top 4 package links — internal linking SEO + discovery) ④ Book (WhatsApp green button + Inquiry ghost + address/pickup note). Bottom bar: © line + "Departures from Serangan Harbor, Bali". Add wave divider on top edge.

## 3.5 Floating WhatsApp button
Keep component; restyle: `bg-whatsapp hover:bg-whatsapp-dark`, add `shadow-cta` green glow, desktop-only (per 3.3), label "WhatsApp" (keep `hidden sm:inline`), add `animate-pulse-soft` ring for first 8s after load (CSS only, then stops — no infinite pulsing).

## 3.6 Navigation issues log

**Issue 3-A — No mobile booking path**
- **Issue:** On mobile, after scrolling past the hero there is no persistent way to inquire except the small float.
- **Why it's a problem:** ~65–75% of this audience is mobile (tourists on phones). Floats get ignored/banner-blindness.
- **Why it hurts conversions:** Every scroll-position without a CTA is leaked intent.
- **Recommendation:** sticky bottom bar (3.3).
- **Implementation:** new `MobileBookBar.tsx`, rendered in root layout; price-aware via `usePathname()` + trip lookup from a front-end constant mirror of packages (slug→price/hours) — pure client, no data changes.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** Very High

**Issue 3-B — Header CTA competes with page CTAs**
- **Issue:** Green WhatsApp pill in header + green hero button + green float = three identical greens.
- **Recommendation:** After redesign there is exactly ONE green element per viewport context (header CTA on desktop; bar on mobile; float suppressed on mobile). Hero primary = green, header stays green (small), that's acceptable — the fix is suppressing the float on mobile and demoting secondary CTAs to ghost styles.
- **Priority:** Medium · **Difficulty:** Easy · **Expected Impact:** Medium

---

# 4. HERO SECTION — FULL REDESIGN

## 4.1 Goals
Communicate in <3s: **what** (private fishing charters), **where** (Serangan, Bali), **why trust** (4.4★/126), **what to do** (WhatsApp / explore trips). Feel: premium, warm, adventurous.

## 4.2 Copy (final — implement verbatim)
- **Eyebrow:** `SERANGAN HARBOR · DENPASAR · BALI` (MapPin icon, `tracking-[0.25em] text-xs font-semibold text-lagoon`)
- **H1 (Fraunces 600):** "Private Fishing Charters in Bali" — with italic accent: `Private Fishing <em class="italic text-gold-300">Charters</em> in Bali`
- **Subhead:** "Target Yellowfin Tuna and Mahi Mahi aboard a 36ft private yacht. Local crew, all-inclusive trips, hotel pickup — you keep the catch."
- **Rating row:** 5 gold stars (4.4 → 4.5 display: 4 full + 1 half via clip) + "**4.4** · 126 verified reviews on FishingBooker"
- **Primary CTA:** `Check Availability on WhatsApp` (green, `MessageCircle` icon) → `WHATSAPP_LINK`
- **Secondary CTA:** `Explore Trips & Prices` (white solid, text-primary-950) → `/trips`
- **Tertiary (text link under buttons):** "or send an inquiry →" → `/contact`
- **Trust bar** overlaps bottom (2.2).

## 4.3 Visual & technical
- **Background:** `next/image` with `priority fill sizes="100vw"` (replaces CSS background → preloaded, responsive srcset, fixes LCP). Source: `hero-bg.jpg` now; replace with action hero per shot list (Section 6) — target: guest fighting a fish, golden light, horizon upper third.
- **Overlay:** `bg-gradient-to-b from-primary-950/70 via-primary-950/40 to-primary-950/80` + subtle left vignette `lg:bg-gradient-to-r lg:from-primary-950/60 lg:to-transparent` for text-side contrast. Never pure black overlays (muddy).
- **Height:** `min-h-[92svh]` mobile / `min-h-[88vh]` desktop, content bottom-weighted (`items-end pb-28`) so the TrustBar overlap works; `svh` fixes iOS chrome jump.
- **Waves:** keep ONE slow wave layer at 20% opacity (brand motif), drop the other two (perf + noise).
- **Optional v2:** muted autoplay loop of `VID-20260711-WA0020.mp4` **only after** compression to <6MB 1080p + poster; `prefers-reduced-motion` → static image fallback. Ship v1 with image.

## 4.4 ASCII wireframe — hero (desktop)

```
┌────────────────────────────────────────────────────────────────────┐
│ [wave+fish logo] BALI FISHING TRIPS      Trips Gallery Blog Contact│
│                    SERANGAN · BALI                      [WhatsApp] │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   (full-bleed action photo: angler fighting mahi mahi, boat wake)  │
│   gradient: deep-navy 70% top → 40% mid → 80% bottom               │
│                                                                    │
│   📍 SERANGAN HARBOR · DENPASAR · BALI                             │
│                                                                    │
│   Private Fishing Charters in Bali          (Fraunces, 72px)       │
│   Target Yellowfin Tuna and Mahi Mahi aboard a 36ft private        │
│   yacht. Local crew, all-inclusive, hotel pickup included.         │
│                                                                    │
│   ★★★★★  4.4 · 126 verified reviews on FishingBooker               │
│                                                                    │
│   [ 💬 Check Availability on WhatsApp ] [ Explore Trips & Prices ] │
│      or send an inquiry →                                          │
│                                                                    │
│ ┌────────────────── TRUST BAR (overlapping card) ────────────────┐ │
│ │ ★4.4/5          │ 🛡 Free        │ 🐟 You keep   │ 🚗 Hotel     │ │
│ │ 126 reviews     │ cancellation   │ your catch    │ pickup incl. │ │
│ └────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

## 4.5 Tablet / mobile behavior
- **Tablet (md):** same layout, H1 `text-5xl`, CTAs side-by-side, trust bar 2×2.
- **Mobile:** H1 `text-[2.6rem] leading-[1.05]`, subhead `text-base`, CTAs **stacked full-width** (WhatsApp first), rating row above CTAs, trust bar 2×2 with `text-xs`. Eyebrow `tracking-[0.2em]`. Background `object-position: 65% center` (keep subject right-of-center out from under text).
- Mobile sticky bar appears only after scrolling past hero? **No — always visible** (it IS the booking path); hero CTAs remain for immediacy.

## 4.6 Hero issues log

**Issue 4-A — H1 is the brand name**
- **Issue:** "Bali Fishing Trips" as H1 wastes the single most valuable pixel real estate.
- **Why it's a problem:** Users already see the brand in the header/tab; the H1 must sell the outcome + keyword-match for SEO ("private fishing charters in Bali" is the money query).
- **Why it hurts conversions:** No promise = no emotional hook = bounce.
- **Recommendation:** copy per 4.2; brand moves to eyebrow/logo.
- **Implementation:** `Hero.tsx` rewrite; keep props (`overallRating`, `reviewCount`).
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** Very High

**Issue 4-B — Three co-equal CTAs**
- **Issue:** "View Trip Packages" (white) / "Book Now" (outline) / "WhatsApp Us" (green) — same size, competing.
- **Why it hurts conversions:** Choice paralysis; the money action (WhatsApp) isn't visually dominant.
- **Recommendation:** hierarchy: 1 primary (WhatsApp, large, icon), 1 secondary (white), 1 tertiary (text link). Primary `px-8 py-4 text-base`, secondary `px-7 py-3.5 text-sm`.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** High

**Issue 4-C — CSS background image**
- **Issue:** `style={{backgroundImage}}` — no preload, no responsive sizes, hurts LCP.
- **Recommendation:** `next/image priority fill` per 4.3.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** High (perf + SEO)

---

# 5. CONTENT (copy, readability, SEO content, hierarchy)

## 5.1 What works
- Honest, non-hyperbolic tone ("a good fit if you want to fish without booking the whole vessel") — keep this voice.
- Clear per-trip descriptions; transparent extra-guest pricing; real inclusions.
- FAQ answers the right practical questions.

## 5.2 Issues & redesign

**Issue 5-A — Section headlines are generic labels**
- **Issue:** "Our Trip Packages", "What Guests Say", "Where We Depart" — descriptive, not persuasive.
- **Why it's a problem:** Headlines are the most-scanned elements; labels add no momentum.
- **Why it hurts conversions:** Scanners (90% of users) get no story from headlines alone.
- **Recommendation:** adopt eyebrow + benefit-led H2 + one-line support pattern everywhere:
  - Packages → eyebrow `TRIP PACKAGES` · H2 "Pick Your Day on the Water" · support "Half-day to full-day, shared or fully private — every trip is all-inclusive."
  - Why us → eyebrow `WHY US` · H2 "Why Anglers Fish With Us"
  - Boat → eyebrow `THE BOAT` · H2 "A 36ft GT 70 Cruiser, Built for These Waters"
  - Crew → eyebrow `THE CREW` · H2 "Local Captains Who Know Where the Fish Are"
  - Gallery → eyebrow `FROM THE WATER` · H2 "What a Day Out Actually Looks Like"
  - Reviews → eyebrow `REVIEWS` · H2 "Rated 4.4/5 by 126 Anglers"
  - Booking steps → eyebrow `BOOKING` · H2 "Booked in Three Messages"
  - Species → eyebrow `THE FISHING` · H2 "What's Biting Around Serangan"
  - Location → eyebrow `DEPARTURE` · H2 "Easy to Reach, Hard to Leave"
  - FAQ → eyebrow `FAQ` · H2 "Good Questions, Straight Answers"
  - CTA → H2 "Ready to Fish?"
- **Implementation:** new `SectionHeader.tsx` (props: eyebrow, title, support, align).
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** High

**Issue 5-B — Body text contrast & measure**
- **Issue:** Descriptions in `text-sm text-slate-600` (14px, ~4.5:1 on slate-50); cards dense.
- **Recommendation:** body minimum `text-[15px]` (`text-sm` reserved for meta), `text-slate-600`→`text-slate-700` on light gray backgrounds; paragraphs `leading-relaxed max-w-prose` (65ch).
- **Priority:** Medium · **Difficulty:** Easy · **Expected Impact:** Medium

**Issue 5-C — Storytelling gap**
- **Issue:** Nowhere does the site say *who* runs this boat or why it's special; homepage is a feature list.
- **Recommendation:** Crew section (2.6) + one-sentence founder line in the Boat section: "Owner-operated out of Serangan — Captain Dedik and his crew have fished these waters their whole lives." **(flag: verify with owner; ship only if approved, otherwise omit the sentence, keep section).**
- **Priority:** Medium · **Difficulty:** Easy · **Expected Impact:** High

**Issue 5-D — Blog cards lack visual appeal**
- **Issue:** Blog index cards = fish icon + keyword + title + meta text. No images, no reading time, no date prominence.
- **Recommendation:** add a colored cover band per card (gradient `from-primary-800 to-primary-600` with large serif initial of the primary keyword or a fish silhouette SVG — no photo library needed), reading-time chip (derive from body word count at render: `Math.ceil(words/200)`), keep keyword chip (gold). Layout: 3-col grid `gap-8`; hover lift.
- **Blog post page:** constrain to `max-w-3xl`, H1 Fraunces `text-4xl`, meta row (date · read time), prose via `@tailwindcss/typography` (already installed at workspace root — add to app), `prose-lg prose-slate`, end-of-post CTA card ("Fish these waters yourself → /trips") + 2 related-post cards.
- **Priority:** Medium · **Difficulty:** Easy · **Expected Impact:** Medium (SEO engagement)

**Issue 5-E — Information hierarchy on trip detail**
- Covered in Section 7 — description is one flat paragraph; needs scannable "at a glance" block.

**SEO content notes (front-end only):**
- H1 per page must be unique and query-targeted: Home "Private Fishing Charters in Bali"; Trips "Bali Fishing Trip Packages & Prices"; trip pages "{Trip Name} — Private Charter from Serangan"; Gallery "Bali Fishing Charter Photo Gallery"; Contact "Book a Bali Fishing Charter".
- Add FAQ accordion (the existing 6) also to the bottom of `/trips` and keep `FAQPage` schema — visibility + rich results.
- Internal links: packages section links, footer trip links (3.4), blog end-CTA, breadcrumb UI (Section 15) — all crawlable `<Link>`.
- Alt text: rewrite per Section 6.5.

---

# 6. IMAGES & MEDIA

## 6.1 Current asset audit
| Asset | Size | Verdict |
|---|---|---|
| `hero-bg.jpg` | 103KB | OK weight; content unknown-to-audit = likely generic seascape. Replace with action shot. |
| 11 gallery JPGs | 82–400KB | Acceptable; `IMG-20260711-WA0019.jpg` 400KB → recompress ≤180KB. |
| `VID-20260711-WA0020.mp4` | **19MB** | Too heavy — compress to ≤6MB (1080p H.264 CRF 26) or 720p ≤3.5MB. |
| `VID-20260711-WA0021.mp4` | **46MB** | Critical — compress to ≤8MB. Add `preload="none"` + poster (thumbnail already exists). |
| `public/images/crew/` | empty | Needs crew portraits. |
| `public/images/boat/` | empty | Needs dedicated boat set. |

File naming: rename `IMG-20260711-WA00xx.jpg` → semantic (`mahi-mahi-catch-serangan.jpg`) for image SEO; update `galleryData.ts`/`Gallery.tsx`/`HomepagePics.tsx` references (front-end constants — safe).

## 6.2 Shot list (commission — Phase 2, highest ROI marketing spend)
1. **Hero action shot:** guest mid-fight, bent rod, spray, golden hour — 16:9, 2400px wide, subject right-of-center (text left).
2. **Drone:** boat alone on glassy water, Serangan coastline behind; 1 wide + 1 top-down of deck layout (doubles as "boat tour").
3. **Boat set (6):** exterior profile, stern fishing station with outriggers up, shaded seating, toilet, console/electronics, boarding ladder.
4. **Crew portraits (4):** Dedik, Warsan, Lilong, Beton — waist-up, on boat, natural smile, 4:5.
5. **Catch set (6):** one hero shot per species (Mahi, Yellowfin, Skipjack, Snapper, Grouper, Mackerel) — guest holding fish, sea background, consistent framing for the species cards.
6. **Lifestyle (4):** pickup van arrival, breakfast/coffee on board, BBQ dinner sunset (Sunset Trip card!), group cheers with catch.
7. **Action (4):** jigging, popping cast, trolling spread, deckhand gaffing.
Rule: real guests, real light, no stock. WhatsApp-shot authenticity is fine for gallery; hero/boat/crew must be deliberate.

## 6.3 Placement rules (implementation-ready)
- **Hero:** action shot (1).
- **Trip cards:** per-slug mapping now with existing assets: sharing → `happy-group.jpg`; sunset → `IMG-20260711-WA0019.jpg` (warm) until sunset photo exists; half-day → `showing-off-catches.jpg`; 3/4-day → `many-fishes.jpg`; jigging-6hr → `fishing-equipment.jpg`; full-day → `big-catch.jpg`; full-day-jigging → `big-catch-2.jpg`. Replace as shot list lands (single constant file).
- **Boat section:** `36ft-yacht.jpg` now → drone/exterior later.
- **Crew:** cropped `happy-group.jpg` faces only as temporary placeholder, clearly marked; empty `crew/` dir awaits real portraits.
- **Reviews:** add "Anglers' gallery" strip (FishingBooker pattern) — horizontal scroll-snap row of 6 catch thumbnails above testimonials → links to `/gallery`.
- **Gallery page:** filters (All / Catches / The Boat / Guests / On Board) via new `category` field on each item in `Gallery.tsx` data array (front-end only); masonry feel via 3-col grid with alternating `aspect-[4/3]`/`aspect-[3/4]` spans; keep lightbox, add: image counter ("3 / 11"), caption always visible on mobile (`opacity-100` on mobile, hover on desktop), swipe support optional (skip — keep simple), focus trap + `role="dialog" aria-modal="true"`.
- **Video:** after compression, feature VID-…-0020 as a 16:9 "Watch: a morning on the water" block inside the gallery page top and optionally in trip detail; never autoplay with sound; hero video = v2 only.

## 6.4 Technical media rules
- All images through `next/image` with explicit `sizes`; hero `priority`; everything else lazy.
- Add `blurDataURL` (tiny 8px base64) for hero + trip card images to kill pop-in.
- Videos: `preload="none"`, poster set, compress as 6.1; gallery lightbox video keeps `controls autoPlay` (user-initiated).
- OG images: per-trip OG = trip card image (add to `generateMetadata` image field — front-end metadata only).

## 6.5 Alt text standard
Pattern: `{subject} — {context} Bali fishing charter`. Examples: "Guest holding a Mahi Mahi on a Bali fishing charter from Serangan", "36ft GT 70 fishing yacht anchored off Serangan, Bali". Replace current alts where thin.

---

# 7. BOOKING EXPERIENCE (UI ONLY — workflow untouched)

*The flow stays: browse → trip detail → "Book This Trip" → `/contact?package=slug` → form → WhatsApp + email. We only redesign presentation.*

## 7.1 `/trips` listing page
- **Header:** `SectionHeader` + rating microline ("★4.4 · 126 reviews · Free cancellation up to 30 days") directly under the intro — trust at the moment of price exposure.
- **Cards:** redesigned `TripCard` (7.3).
- **Segment chips (optional v1.1):** All / Private / Shared — client-side filter on `bookingType`; zero data change. Ship only if trivial; low priority.
- **Below grid:** **Compare all trips** table (7.4) + FAQ + cross-CTA.

## 7.2 `/trips/[slug]` detail page — the conversion engine (full rebuild of layout)
**Current:** single `max-w-4xl` white card; description paragraph; 4-stat strip; includes; one button. No photos, no reviews, no cross-sell, no sticky anything.

**New layout:**
```
lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12
```
**Left column:**
1. Breadcrumb UI (Home / Trips / {name}) — matches existing Breadcrumb JSON-LD.
2. H1 + badge row (Private/Shared chip · "Free cancellation" gold chip with ShieldCheck).
3. Rating row: ★4.4 · 126 reviews · "Crew rated 4.7/5".
4. **Media strip:** 1 large image (`aspect-[16/9] rounded-2xl`) + 3-thumb row (from the per-slug image map + gallery) → each opens `/gallery` (no new lightbox logic; keep simple) *or* reuse Gallery lightbox component — decision: simple links to `/gallery` v1.
5. Description (existing) + "At a glance" stat row (restyle existing 4 stats into 4 mini-cards with icons — same data).
6. What's Included — existing list as 2-col check grid (keep) inside a `bg-seafoam-50 rounded-2xl p-6` panel.
7. "Your day at a glance" timeline (derived from existing fields only): Hotel pickup (before departure) → Depart Serangan {startTime} → Fishing grounds ({techniques} when present) → Return ≈ {startTime + durationHours}h → (Sunset trip: BBQ dinner on board). Vertical timeline, gold dots. Pure arithmetic on existing data.
8. Target species + techniques chips (shared component from homepage).
9. Mini-FAQ (the same 6-item accordion component reused).

**Right column — sticky booking card** (`lg:sticky lg:top-24`):
- Price block: `{price}` Fraunces `text-4xl` + unit ("per boat, up to 4 guests" / "per person"); per-person anchor when `pricingUnit==="per boat"`: "≈ ${price/4|0} per person at 4 guests" (`text-sm text-slate-500`); extra-guest line when present.
- Inclusion highlights: 4 check rows (License & gear · Drinks & snacks · Hotel pickup · Keep your catch).
- Cancellation badge: gold chip "Free cancellation up to 30 days".
- **Primary CTA:** full-width green "Check Availability on WhatsApp" → `WHATSAPP_LINK` (prefill message stays the generic one — no logic change; optional: reuse same link).
- **Secondary:** full-width ghost "Book This Trip (inquiry form)" → existing `/contact?package={slug}`.
- Microline: "Replies fast during daytime · No account needed".
- Small print: exact existing extra-guest/cancellation facts.

**Below grid:** "Other trips" — 3 TripCards (exclude current, pick by price proximity — simple `.filter().slice(0,3)`).

**Mobile:** booking card renders as normal block after H1/rating (before description) + the **sticky bottom bar** shows `"{price} · {duration}h"` left, green "WhatsApp" right. One-tap conversion from anywhere on the page.

## 7.3 TripCard (redesign spec)
```
<Link class="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-card
             hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
  <div class="relative aspect-[16/10] overflow-hidden">
    <Image fill class="object-cover group-hover:scale-105 transition-transform duration-500"/>
    <span badge top-right>Private|Shared</span>
    <span glass chip bottom-left>${price} {unit-short}</span>
  </div>
  <div class="p-5 flex flex-col gap-3 grow">
    <h3 Fraunces text-xl text-primary-950 group-hover:text-primary-600/>
    <p text-sm text-slate-600 line-clamp-2/>
    <meta row: Clock {h}h · Sunrise {startTime} · Users up to {n}/>
    <div class="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
      <price block + per-person anchor + extra-guest note/>
      <span text-sm font-semibold text-primary-600>Details →</span>
    </div>
  </div>
</Link>
```
Badges: Private = `bg-primary-950/85 text-white backdrop-blur`; Shared = `bg-gold-400 text-primary-950`.

## 7.4 Package comparison table (`/trips`, below grid)
Desktop table / mobile horizontal scroll (`overflow-x-auto`, sticky first column):
| Trip | Type | Hours | Departs | Guests incl. | Price | (per-person anchor) |
Rows = 7 packages from existing data; highlight "Most popular" (Full Day) with `bg-seafoam-50` row + gold chip — *label choice is editorial/display, not a claim of sales data; acceptable alternatives: "Best value" on Half Day*. Ship with "Most popular" on Full Day (8h flagship is the standard industry anchor).
Row click → trip detail (whole row wrapped in Link via `position:relative` trick or onClick router push — client component, UI only).

## 7.5 Contact page (UI polish only)
- Header: `SectionHeader` + rating microline.
- Layout: keep `lg:grid-cols-3`; form card `lg:col-span-2`.
- Form UI: labels `text-sm font-medium text-slate-700`; inputs `h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100`; package select shows prices (already does — keep); submit button = green full-width `h-12` "Send Inquiry via WhatsApp & Email" (copy unchanged — it accurately describes behavior).
- Right rail order: ① "Fastest: WhatsApp" green card (move ABOVE form on mobile via `order-first lg:order-none`) ② What happens next (3 mini-steps echoing 2.9) ③ Departure point card ④ map. Trust line under form: "Free cancellation up to 30 days · You keep your catch".
- Success state: keep logic; restyle panel with big `CheckCircle2`, next-steps copy, link to /trips.

## 7.6 Booking issues log

**Issue 7-A — Trip detail page has no persuasive architecture**
- **Issue:** No images, no reviews, no sticky CTA, one small button at the very bottom.
- **Why it hurts conversions:** This is the page where $550–$800 decisions happen; it currently persuades less than the homepage.
- **Recommendation:** full layout per 7.2.
- **Priority:** High · **Difficulty:** Medium · **Expected Impact:** Very High

**Issue 7-B — Price presentation lacks anchoring**
- **Issue:** "$550 USD" per boat is sticker shock without context.
- **Recommendation:** per-person anchor ("≈ $137/person at 4 guests") + "all-inclusive" reminders adjacent to every price. Derived arithmetic only — no pricing change.
- **Priority:** High · **Difficulty:** Easy · **Expected Impact:** High

**Issue 7-C — WhatsApp CTA doesn't pre-select context**
- Note: inquiry form deep-links via `?package=slug` (keep). WhatsApp generic message stays unchanged (functionality freeze). Improvement is visual only: WhatsApp button on trip pages labeled "Check Availability on WhatsApp" with trip name in the visible sublabel ("Full Day Trip · 8h").
- **Priority:** Medium · **Difficulty:** Easy · **Expected Impact:** Medium

---

# 8. MOBILE EXPERIENCE (iPhone / Android)

Simulated on 390×844 (iPhone 14) & 360×800 (Android):

**Findings & fixes:**
1. **No persistent booking CTA** → sticky bottom bar (3.3). *Critical fix.*
2. **Hero:** 600px min-height + 3 stacked CTAs = CTA below fold on small screens → new hero `min-h-[92svh]` with stacked CTAs visible; use `svh` units (iOS Safari chrome).
3. **Trip cards** become tall text blocks → image-first cards give visual rest; meta row wraps to 2 lines gracefully (`flex-wrap`).
4. **Review badges** 2-col tiles fine; new meters full-width stack.
5. **Comparison table** → `overflow-x-auto` + `min-w-[640px]` + sticky first col (`sticky left-0 bg-white`).
6. **FAQ** tap targets `py-4 px-5` (≥48px) — already OK; add `text-base` questions.
7. **Gallery** 1-col → change to 2-col thumbs on mobile (`grid-cols-2`) for density; lightbox arrows enlarged to 44px hit areas; caption always visible.
8. **Float button overlaps content** — replaced on mobile by bar (3.3); ensure `pb-20` on main.
9. **Form inputs** `py-2.5` (~40px) → `h-12` (48px) for thumb comfort; `inputmode`/`type=email` already correct; date input fine.
10. **Header mobile menu** → full-screen overlay (3.2).
11. **Safe areas:** bar + float use `env(safe-area-inset-bottom)` (float already does; replicate in bar).
12. **Tap highlight:** add `-webkit-tap-highlight-color: transparent` globally.
13. **Horizontal rhythm:** keep `px-4` gutters; cards `rounded-2xl` maintained edge-to-edge within gutter.
14. **Font sizing floor:** nothing below `text-xs` (12px) except badges (10px uppercase OK).
15. **ScrollToTop** button position conflicts with bar → hide it on mobile (`hidden md:flex`) — bar already provides utility.

**Tablet (768–1024):** 2-col card grids, hero side-by-side CTAs, trip detail stacks (sticky panel disabled below `lg`).

---

# 9. DESKTOP EXPERIENCE

1. **Grid:** keep `max-w-7xl`; text-heavy sections (FAQ, blog post, trip description) use `max-w-3xl/4xl` or the 2-col asymmetric layouts defined — no full-width paragraphs.
2. **Reading width:** paragraphs `max-w-prose`.
3. **Section rhythm:** vertical cadence `py-20 lg:py-28` (upgrade from uniform `py-16`); alternate surfaces: white → `sand-50` → white → `seafoam-50` (boat) → white → `sand-50` (reviews) → white → white → white → white → `primary-950` CTA. Max 2 dark bands (hero + final CTA) + footer.
4. **Section transitions:** wave SVG divider only at hero→trustbar and before final CTA (2 uses total — restraint = premium).
5. **Hover effects (desktop-only via `hover:` — already mobile-safe):** cards lift (`-translate-y-1 + shadow-card-hover`), images scale-105, links color-shift + underline offset animate, buttons `active:scale-[0.98]`, table rows `hover:bg-seafoam-50`.
6. **Reveal-on-scroll:** `Reveal` component (Section 14.8) on every section wrapper: fade + 24px rise, 700ms, ease-out-expo, stagger children 80ms, `once: true`, disabled under `prefers-reduced-motion`. Nothing animates above the fold except hero content (staggered on load).
7. **Scrolling experience:** progress bar kept, restyled `bg-gradient-to-r from-primary-500 to-lagoon-400 h-[3px]`.
8. **Cursor states:** all cards/links `cursor-pointer` implicit via `<Link>`; lightbox nav enlarged.
9. **Alignment audit:** all section headers use the same `SectionHeader` (left-aligned with optional center variant) — fixes current "everything centered" monotony; homepage alternates left/center by section for rhythm.
10. **Max content line:** asymmetric 2-col sections (boat, location) `items-center gap-12 lg:gap-16`.

---

# 10. PERFORMANCE (front-end only)

| # | Finding | Fix | Impact |
|---|---|---|---|
| 1 | Hero is a CSS background (no preload/srcset) | `next/image priority fill sizes=100vw` + blur placeholder | LCP −0.8–1.5s |
| 2 | Videos 19MB + 46MB in repo | Compress (H.264 CRF 26, 1080p→≤6MB / ≤8MB); `preload="none"`; posters exist | Massive bandwidth savings |
| 3 | `IMG-20260711-WA0019.jpg` 400KB | Recompress ≤180KB q75 | Gallery LCP |
| 4 | 3 simultaneous wave marquee animations | Keep 1 layer; `transform: translate3d` (GPU); add `prefers-reduced-motion` kill | INP/battery |
| 5 | Google Maps iframe on homepage + contact | Keep `loading="lazy"` (present); optional facade v2 | Third-party cost |
| 6 | No `font-display` control beyond next/font defaults | Keep `next/font` (self-hosted, swap default) — fine | — |
| 7 | Lightbox loads full-res immediately | Keep (user intent); ensure `sizes="90vw"` | — |
| 8 | Reveal animations | IntersectionObserver + CSS transitions only; no JS animation libs; `content-visibility: auto` on below-fold sections via utility class where safe | INP |
| 9 | Accessibility | Lightbox focus trap + `aria-modal`; accordion `aria-expanded`; color contrast: `text-slate-400` → `text-slate-500` minimum on white; focus rings retained; tap targets ≥44px | a11y + SEO |
| 10 | SEO | Per-trip OG images; semantic alt text (6.5); breadcrumb UI matching Breadcrumb JSON-LD; keep schema exactly as-is | CTR from SERP |

Core Web Vitals targets after redesign: **LCP < 2.0s (4G), CLS < 0.05, INP < 200ms.**

---

# 11. TRUST & CREDIBILITY SYSTEM

**Principle:** every trust claim on the site must be traceable to existing data (rating snapshot, review themes, inclusions, cancellation policy). No invented awards, no fake badges.

| Element | Where | Spec |
|---|---|---|
| Rating summary panel | Home reviews, trip detail sidebar | Big 4.4 (Fraunces), 5-star row (4 full + 0.4 partial via gradient clip), "126 verified reviews · FishingBooker" attribution line with external link `https://www.fishingbooker.com/charters/view/17292` (`target="_blank" rel="noopener"`) |
| Distribution bars | Rating panel | 5 rows, `bg-gold-400` fills, counts at right |
| Sub-score meters | Rating panel | Crew 4.7 · Experience 4.4 · Boat 4.2 (`text-sm`, thin meters) |
| Theme meters | Reviews section | 6 progress bars w/ icons: 96 Friendly Captain · 88 Good Boat · 86 Recommended · 84 Family Friendly · 83 Great Experience · 73 Caught Fish |
| Testimonial cards | Reviews section | Initial avatar, name, flag emoji, trip chip, stars, `BadgeCheck` "Verified review" (source: FishingBooker import — owner-approved quotes already in Sanity) |
| Anglers' strip | Reviews section | 6-thumb scroll-snap row → /gallery |
| Boat spec sheet | Boat section | 8 spec mini-cards (7.2 left-col pattern) |
| Crew cards | Crew section | Portrait, name, role (copy locked to review-sourced facts) |
| Assurance chips | Hero trust bar, booking card, contact rail | Free cancellation 30d · Keep your catch · Hotel pickup · All-inclusive |
| Stats counters | Boat or reviews section | 126+ reviews · 4.4★ rating · 8 guests max · 36 ft yacht (count-up on view, 1.2s, respects reduced-motion) |
| "As seen on" | Reviews section header row | Text-only source line: "Reviewed on FishingBooker" (logo use requires permission — text only) |
| Safety/equipment note | Boat section footer line | "Licensed fishing, quality rods & reels, shaded seating and private toilet on board" (all existing facts) |

**Explicitly NOT included (would require backend/new data):** live availability, "X people viewing", countdown urgency, payment-security badges, insurance claims, years-in-business claims (unverified).

---

# 12. CONVERSION RATE OPTIMIZATION

**Primary conversion = WhatsApp tap. Secondary = inquiry form submit.**

1. **CTA hierarchy law:** per viewport there is exactly one green element. WhatsApp = green; everything else = primary-dark or ghost. (Currently green appears 3× per screen.)
2. **CTA copy:** action + channel: "Check Availability on WhatsApp" beats "WhatsApp Us" (sets expectation of the reply). Inquiry form keeps its accurate label.
3. **Placement map (every page):**
   - Home: hero primary → packages section header link → after testimonials (inline CTA band) → final CTA + mobile bar (always).
   - Trips: page header microline → each card (Details) → comparison table rows → bottom CTA band + mobile bar.
   - Trip detail: sticky card (desktop) + sticky bottom bar (mobile) + end-of-page.
   - Gallery: mid-grid CTA card ("Want this to be you? → WhatsApp") as the 5th tile + bottom band.
   - Blog post: end-of-post CTA card.
   - Contact: form + right rail + mobile bar suppressed (page IS the conversion point — avoid duplicate green; keep bar but only WhatsApp button? **Decision: keep the bar — consistency beats purity.**)
4. **Friction reducers:** How-it-works (2.9), "No account needed", response-time line, free-cancellation chip adjacent to every CTA.
5. **Price anchoring:** per-person math next to per-boat prices; "Most popular" chip on Full Day; packages sorted low→high (existing).
6. **Loss aversion (honest only):** "Trips daily from 07:00 — sunrise slots fill first in high season" *(display copy; ship only if owner confirms seasonality — otherwise omit)*. Default: omit.
7. **Testimonial proximity:** one short testimonial quote inside the trip-detail sticky card? No — keep card clean; instead rating row near every price (7.2).
8. **Exit-intent / popups:** none. Premium brands don't beg.
9. **Measurement (front-end only, optional):** `data-cta="whatsapp"` attributes on all WhatsApp links so the owner can later wire analytics without markup changes.

---

# 13. DESIGN IMPROVEMENTS (component-level)

- **Cards:** `rounded-2xl bg-white border border-slate-100 shadow-card`; hover `-translate-y-1 shadow-card-hover`; media flush-top (`overflow-hidden rounded-t-2xl` implicit); interior `p-5 lg:p-6`.
- **Buttons (5 variants — see 14.3):** consistent `h-12` lg touch, `rounded-full`, `font-semibold`, icon `h-4 w-4` left, `transition-all duration-200 active:scale-[0.98]`.
- **Icons:** Lucide everywhere; consistent 1.5px stroke; semantic upgrades: `Sunrise` for departure time (was Anchor), `Ruler` length, `Gauge` engine, `Bath`→ use `Waves`? — final icon map in 15.6.
- **Typography:** Fraunces for display/H1–H3 + big numerals (price, 4.4); Inter for everything else; numerals use `tabular-nums` in stats/prices.
- **White space:** section `py-20 lg:py-28`; card interior ≥ `p-5`; grid `gap-6 lg:gap-8`; header rows `mb-10 lg:mb-14`.
- **Shadows:** 3-level system (14.5) tinted with brand navy (`rgba(8,40,53,*)`) — never pure black shadows.
- **Border radius:** 12px inputs / 16px cards / 24px feature media / full pills & badges — 4-step scale only.
- **Color usage:** primary-950 for headings & dark bands; primary-600/700 for links & icon accents; gold-400/500 exclusively for stars, "most popular", step numbers; green exclusively WhatsApp; sand/seafoam as section surfaces.
- **Gradients:** only (a) hero overlays, (b) subtle `from-primary-950 to-primary-900` on final CTA, (c) blog cover bands, (d) progress bar. No rainbow gradients.
- **Hover effects:** defined per component in Section 15; global rule — hover states complete in 200–300ms, use transform+shadow+color, never layout-shifting properties.
- **Animations:** load-stagger on hero (translate+opacity, 600ms, 80ms stagger); Reveal on scroll (14.8); count-up stats; accordion height via CSS `grid-template-rows: 0fr→1fr` (no JS measurement); lightbox fade+scale 200ms.
- **Section dividers:** wave SVG only at hero-bottom and pre-final-CTA; elsewhere use surface color changes, not lines.
- **Visual rhythm:** alternating section surfaces per 9.3; repeated card geometry (16px radius, same shadow) across trips/reviews/crew/boat specs for cohesion.

---

# 14. DESIGN SYSTEM — "SERANGAN"

## 14.1 Color tokens (Tailwind v4 — paste into `@theme` in `globals.css`)

```css
@theme {
  /* Primary — deep sea teal-navy */
  --color-primary-50:  #EFF7F9;
  --color-primary-100: #D9EDF1;
  --color-primary-200: #B4DCE4;
  --color-primary-300: #84C3D1;
  --color-primary-400: #4CA4B8;
  --color-primary-500: #2C869C;
  --color-primary-600: #1F6C83;
  --color-primary-700: #1A586C;
  --color-primary-800: #154757;
  --color-primary-900: #103A48;
  --color-primary-950: #082834;  /* dark bands, footer, headings on light */

  /* Lagoon — bright sea accent (sparingly: links on dark, highlights) */
  --color-lagoon-300: #7FD8DE;
  --color-lagoon-400: #4CC2CC;

  /* Sand & seafoam — light section surfaces */
  --color-sand-50:    #FAF7F1;
  --color-sand-100:   #F2ECDF;
  --color-seafoam-50: #F0F8F6;
  --color-seafoam-100:#E0F0EC;

  /* Gold — ratings, accents, "most popular" */
  --color-gold-300: #E9CC82;
  --color-gold-400: #DCB458;
  --color-gold-500: #C99A3C;
  --color-gold-600: #A87E2C;

  /* WhatsApp — conversion only */
  --color-whatsapp:       #25D366;
  --color-whatsapp-dark:  #1DA851;

  /* Neutrals: keep Tailwind slate (body text, borders) */

  /* Fonts */
  --font-display: "Fraunces", Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Animations (existing waves kept; add soft pulse) */
  --animate-wave-slow: wave-slow 18s linear infinite;
  --animate-pulse-soft: pulse-soft 2.4s ease-in-out 3;
}
@keyframes pulse-soft {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
  50%      { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
}
```

Usage law: `primary-950` headings/dark bg · `primary-600/700` links/icons · `gold` stars+accents · `whatsapp` conversion only · `sand-50`/`seafoam-50` section surfaces · slate for body/borders.

## 14.2 Typography scale

Font loading (`layout.tsx`): add Fraunces via `next/font/google` (`subsets:["latin"]`, `axes:["opsz","wght"]` or static weights 500/600/700, `variable:"--font-fraunces"`), Inter stays, `variable:"--font-inter"`; body uses `font-sans`.

| Token | Spec | Tailwind |
|---|---|---|
| Display (hero H1) | Fraunces 600, tight | `font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl tracking-tight` |
| H2 | Fraunces 600 | `font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-primary-950` |
| H3 (card titles) | Fraunces 600 | `font-display text-xl text-primary-950` |
| Eyebrow | Inter 600 caps | `text-xs font-semibold uppercase tracking-[0.22em] text-primary-600` (on dark: `text-lagoon-300`) |
| Body-L | Inter 400 | `text-lg text-slate-600 leading-relaxed` (section support lines) |
| Body | Inter 400 | `text-[15px] text-slate-700 leading-relaxed` |
| Meta | Inter 500 | `text-sm text-slate-500` |
| Numerals (price/rating) | Fraunces 600 | `font-display tabular-nums` |
| Button | Inter 600 | `text-sm font-semibold` (primary lg: `text-base`) |

## 14.3 Buttons (component spec)

| Variant | Classes | Use |
|---|---|---|
| `btn-whatsapp` (Primary) | `inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-base font-semibold text-white shadow-cta hover:bg-whatsapp-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200` + `MessageCircle h-5 w-5` | WhatsApp actions only |
| `btn-primary` | same geometry, `bg-primary-700 text-white hover:bg-primary-800 shadow-md` | non-WhatsApp primary (rare) |
| `btn-white` | `bg-white text-primary-950 hover:bg-sand-100 shadow-lg` | on dark/hero |
| `btn-ghost` | `border-2 border-primary-200 text-primary-700 hover:border-primary-400 hover:bg-primary-50` (on dark: `border-white/40 text-white hover:bg-white/10`) | secondary |
| `btn-link` | `text-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline` | tertiary |

Sizes: `sm: px-5 py-2.5 text-sm` · default above · icon-only floats `p-3.5`.

## 14.4 Cards (recipes)

- **Surface card:** `rounded-2xl bg-white border border-slate-100 shadow-card`
- **Interactive card:** surface + `hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`
- **Media card:** surface + `overflow-hidden`, image `aspect-[16/10] object-cover`
- **Dark feature card:** `rounded-2xl bg-primary-950 text-white`
- **Glass chip (on images):** `rounded-full bg-primary-950/70 backdrop-blur px-3.5 py-1.5 text-sm font-semibold text-white`
- **Badge chips:** Private `bg-primary-950/85 text-white backdrop-blur` · Shared `bg-gold-400 text-primary-950` · Cancellation `bg-seafoam-100 text-primary-800 border border-primary-200` · Verified `text-primary-600` + `BadgeCheck h-3.5 w-3.5`

## 14.5 Shadows & radii

```css
/* register in @theme as --shadow-* so classes shadow-card etc. exist */
--shadow-card: 0 1px 2px rgba(8,40,53,.05), 0 8px 24px -8px rgba(8,40,53,.10);
--shadow-card-hover: 0 2px 4px rgba(8,40,53,.06), 0 20px 44px -14px rgba(8,40,53,.22);
--shadow-cta: 0 8px 24px -6px rgba(37,211,102,.45);
--shadow-bar: 0 -4px 16px rgba(8,40,53,.08);
```
Radii: inputs 12 (`rounded-xl`), cards 16 (`rounded-2xl`), feature media 24 (`rounded-3xl`), pills full.

## 14.6 Spacing system
Section `py-20 lg:py-28`; container unchanged (`max-w-7xl px-4 sm:px-6 lg:px-8`); narrow `max-w-3xl`; grid `gap-6 lg:gap-8`; header block `mb-10 lg:mb-14`; card stacks `space-y-6`. 8pt base.

## 14.7 Forms
Label `text-sm font-medium text-slate-700 mb-1.5`; input/select/textarea `w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition` (textarea `h-auto`); error `text-red-600 text-xs mt-1`; required asterisk `text-gold-600`.

## 14.8 Motion guidelines
- Ease: `cubic-bezier(.22,1,.36,1)` (register `--ease-out-expo` in @theme → `ease-out-expo`).
- Durations: hover 200ms · cards 300ms · reveals 700ms · lightbox 200ms.
- `Reveal.tsx` (client): IntersectionObserver (threshold 0.15, once), initial `opacity-0 translate-y-6`, in-view → `opacity-100 translate-y-0 transition-all duration-700 ease-out-expo`, optional `delay` prop (stagger 80ms), wraps `prefers-reduced-motion` → renders visible instantly.
- Count-up stats: same observer, `requestAnimationFrame` 1.2s, `tabular-nums`, reduced-motion → final value.
- Respect `prefers-reduced-motion` globally: add to globals `@media (prefers-reduced-motion: reduce){ .animate-wave-slow{animation:none} }` and skip JS motion.

---

# 15. IMPLEMENTATION BLUEPRINT (build-ready, file by file)

**Golden rules for the implementer:**
1. Do not touch: `src/app/api/**`, `src/sanity/**`, `src/lib/validations.ts`, form submission logic, WhatsApp link generation, schema/JSON-LD generation functions, all Sanity queries.
2. All new display data goes in front-end constants (`src/lib/ui-data.ts` — NEW file allowed since it's pure presentation, same pattern as `galleryData.ts`).
3. Zero new runtime dependencies required. Fraunces comes from `next/font/google` (built-in). `@tailwindcss/typography` is already in workspace root `package.json` — move/add it to the app for blog prose (devDependency, build-time only).
4. Run `npm run lint` and `npx tsc --noEmit` after each phase; `npm run build` must pass.

## 15.1 New/changed file map

| File | Action | Purpose |
|---|---|---|
| `src/app/globals.css` | EDIT | Tokens (14.1), shadows, easings, reduced-motion, reveal base classes |
| `src/app/layout.tsx` | EDIT | Add Fraunces variable font; add `<MobileBookBar/>`; `pb-20 md:pb-0` on main |
| `src/lib/ui-data.ts` | NEW | Trip→image map, crew array, stats array, boat specs array, gallery categories |
| `src/components/SectionHeader.tsx` | NEW | Eyebrow + H2 + support line, `align` prop |
| `src/components/Reveal.tsx` | NEW | Scroll-reveal wrapper (14.8) |
| `src/components/TrustBar.tsx` | NEW | Hero-overlap 4-item assurance card |
| `src/components/RatingSummary.tsx` | NEW | 4.4 panel + distribution + sub-scores |
| `src/components/ThemeMeters.tsx` | REPLACES `ReviewBadges.tsx` usage | 6 progress bars (keep old file or refactor in place — refactor in place, keep filename to minimize churn) |
| `src/components/Testimonials.tsx` | EDIT | New card design |
| `src/components/TripCard.tsx` | EDIT | Media card per 7.3 |
| `src/components/TripCompareTable.tsx` | NEW | Comparison table (/trips) |
| `src/components/BoatSection.tsx` | NEW | Boat showcase |
| `src/components/CrewSection.tsx` | NEW | Crew cards |
| `src/components/HowItWorks.tsx` | NEW | 3-step booking |
| `src/components/StatsCounter.tsx` | NEW | Count-up stats (client) |
| `src/components/MobileBookBar.tsx` | NEW | Sticky mobile bottom bar (client) |
| `src/components/Hero.tsx` | EDIT | Full redesign per §4 |
| `src/components/layout/Header.tsx` | EDIT | Logo lockup, gold active underline, announcement bar (optional), full-screen mobile menu |
| `src/components/layout/Footer.tsx` | EDIT | primary-950, 4 cols, trips links |
| `src/components/WhatsAppButton.tsx` | EDIT | Desktop-only, pulse-soft, shadow-cta |
| `src/components/FAQAccordion.tsx` | EDIT | First-open, animated height, aria |
| `src/components/Gallery.tsx` | EDIT | Filters, categories, lightbox a11y, 2-col mobile |
| `src/components/HomepagePics.tsx` | EDIT | Mosaic layout |
| `src/components/LocationMap.tsx` | EDIT | Keep iframe; wrapper restyle only |
| `src/app/page.tsx` | EDIT | New section order (§2) |
| `src/app/trips/page.tsx` | EDIT | Header microline, compare table, FAQ |
| `src/app/trips/[slug]/page.tsx` | EDIT | 2-col layout + sticky booking card (7.2) |
| `src/app/contact/page.tsx` | EDIT | Rail reorder, trust lines (7.5) |
| `src/components/BookingInquiryForm.tsx` | EDIT | Input styling only (14.7) — logic untouched |
| `src/app/gallery/page.tsx` | EDIT | SectionHeader + CTA tile |
| `src/app/blog/page.tsx` + `[slug]/page.tsx` | EDIT | Card covers, prose, end-CTA |

## 15.2 `ui-data.ts` (exact contents)

```ts
export const TRIP_IMAGES: Record<string, string> = {
  "sharing-trip": "/images/gallery/happy-group.jpg",
  "sunset-trip": "/images/gallery/IMG-20260711-WA0019.jpg",
  "half-day-private": "/images/gallery/showing-off-catches.jpg",
  "three-quarter-day": "/images/gallery/many-fishes.jpg",
  "jigging-casting-6hr": "/images/gallery/fishing-equipment.jpg",
  "full-day": "/images/gallery/big-catch.jpg",
  "full-day-jigging-popping": "/images/gallery/big-catch-2.jpg",
};
export const CREW = [
  { name: "Dedik", role: "Owner & Captain", note: "Owner of the 36ft GT 70 — born and raised on Bali waters.", photo: "/images/crew/dedik.jpg" /* placeholder until shoot; fallback crop handled in component */ },
  { name: "Warsan", role: "Captain & Guide", note: "Puts guests on Yellowfin Tuna — mentioned by name in guest reviews.", photo: "/images/crew/warsan.jpg" },
  { name: "Lilong & Beton", role: "Deckhands", note: "Rigging, jigging and keeping lines in the water all trip long.", photo: "/images/crew/deckhands.jpg" },
];
export const BOAT_SPECS = [
  { icon: "Ruler", label: "Length", value: "36 ft" },
  { icon: "Users", label: "Capacity", value: "8 guests" },
  { icon: "Gauge", label: "Engines", value: "2× Yamaha 115HP" },
  { icon: "Calendar", label: "Year built", value: "2014" },
  { icon: "Ship", label: "Type", value: "GT 70 Cruiser" },
  { icon: "Waves", label: "Comfort", value: "Shaded seating" },
  { icon: "ShieldCheck", label: "Facilities", value: "Private toilet" },
  { icon: "Anchor", label: "Rig", value: "Trolling outriggers" },
];
export const STATS = [
  { value: 126, suffix: "+", label: "verified reviews" },
  { value: 4.4, decimals: 1, suffix: "★", label: "average rating" },
  { value: 36, suffix: " ft", label: "private yacht" },
  { value: 8, suffix: "", label: "guests max" },
];
// Mobile bar price lookup (mirrors public pricing for display only)
export const TRIP_BAR_INFO: Record<string, { price: number; hours: number }> = {
  "sharing-trip": { price: 200, hours: 4 }, "sunset-trip": { price: 270, hours: 3 },
  "half-day-private": { price: 550, hours: 4 }, "three-quarter-day": { price: 650, hours: 6 },
  "jigging-casting-6hr": { price: 650, hours: 6 }, "full-day": { price: 750, hours: 8 },
  "full-day-jigging-popping": { price: 800, hours: 8 },
};
```
*(Crew note copy is sourced from public guest reviews; owner may edit this constant freely — it's display-only.)*

## 15.3 Homepage component tree (`src/app/page.tsx`)

```
<Hero rating count/>                      ← §4
<TrustBar/>                               ← -mt-10 relative z-10
<section Packages (white)>                <SectionHeader eyebrow="TRIP PACKAGES" title="Pick Your Day on the Water" .../>
  grid sm:2 lg:3 gap-8 → <TripCard/> ×3 (featured = first 3, unchanged logic) + View-all row
<section WhyUs (sand-50)>                 6 interactive cards (2.4)
<BoatSection/> (white)                    ← 2.5
<CrewSection/> (sand-50)                  ← 2.6
<HomepagePics/> (white)                   ← mosaic 2.7
<section Reviews (sand-50) id="reviews">  lg:grid-cols-[340px_1fr] → <RatingSummary/> + (<ReviewBadges as meters/> + anglers strip) ; below: <Testimonials/>
<HowItWorks/> (white)                     ← 2.9
<section Species (white → keep inside same as HowItWorks? NO — seafoam-50)> species chips + techniques chips (existing data, upgraded chips)
<section Location (white)>                2-col: <LocationMap/> + info stack + WhatsApp text CTA
<section FAQ (sand-50)>                   lg:grid-cols-[1fr_320px] accordion + sticky help card
<section FinalCTA (primary-950, wave divider top)>  H2 + WhatsApp primary + ghost "Compare Trips" + microline
```
Each section wrapped in `<Reveal>`; section headers left-aligned except Packages/Reviews/FinalCTA (center).

## 15.4 TripCard.tsx (final class spec — implements 7.3 exactly)
Data additions: `const img = TRIP_IMAGES[trip.slug] ?? "/images/gallery/big-catch.jpg"`. Per-person anchor: `trip.pricingUnit === "per boat" && `≈ $${Math.round(trip.priceUsd / trip.maxGuestsIncluded)}/person``. Badge per 14.4. All existing fields render; nothing removed.

## 15.5 Trip detail (`trips/[slug]/page.tsx`) structure
Per 7.2. New sub-components (inline in file is fine, or `components/trip/`): `BookingCard` (sticky, server component — no state), `DayTimeline` (derives times from `startTime`+`durationHours`), `StatGrid` (restyle existing). Mobile order: breadcrumb → H1/badges → rating → **BookingCard (static)** → media → rest. Keep `generateStaticParams`, metadata, schema untouched; add `openGraph.images = [TRIP_IMAGES[slug]]`.

## 15.6 Icon map (Lucide, final)
Departure time `Sunrise` · duration `Clock` · guests `Users` · price `Banknote` (not DollarSign — softer) · length `Ruler` · engines `Gauge` · year `Calendar` · type `Ship` · toilet `ShieldCheck` (amenity check pattern) · shaded seating `Waves` · outriggers `Anchor` · pickup `Car` · cancellation `CalendarCheck2` (or `ShieldCheck` where cancellation-as-assurance) · keep catch `Fish` · license `BadgeCheck` · WhatsApp `MessageCircle` · location `MapPin` · reviews `Star`.

## 15.7 Header.tsx changes
- Logo: inline SVG (32px circle `fill=primary-700`, white wave path + fish silhouette path — draw 2 simple paths) + two-line wordmark; `aria-label` kept.
- Nav links: remove Home; `Trips Gallery Blog Contact`; active → `text-primary-700` + `absolute -bottom-[21px] h-0.5 bg-gold-400` (underline sits on header border).
- Announcement bar (optional flag `SHOW_ANNOUNCEMENT = true` in ui-data): `bg-primary-950 text-sand-100 text-xs` centered "★ 4.4 from 126 reviews · Free cancellation up to 30 days before your trip".
- Mobile menu: full-screen overlay (3.2), links with `font-display text-3xl`, stagger via `transition-delay` inline styles, bottom WhatsApp + rating.
- Keep all existing hooks (scroll, pathname close, body lock).

## 15.8 MobileBookBar.tsx (client, exact behavior)
- Rendered in `layout.tsx` after `<WhatsAppButton/>`.
- `usePathname()`; if path matches `/trips/[slug]` and slug ∈ `TRIP_BAR_INFO` → left shows `$750 · 8h`; else left = ghost link "Trips from $200" → `/trips`.
- Right: `<a href={WHATSAPP_LINK} class="btn-whatsapp flex-1 h-12">WhatsApp</a>`.
- Classes: `fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 shadow-bar px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-3`.
- `WhatsAppButton`: add `hidden md:flex` to its class list.
- `ScrollToTop`: add `hidden md:flex`.

## 15.9 FAQAccordion.tsx changes
- Props `items = FAQS`, `defaultOpen = 0`.
- Animation: wrapper `grid transition-all duration-300 ease-out-expo` with `grid-rows-[0fr]`→`grid-rows-[1fr]`; inner `overflow-hidden`.
- `aria-expanded`, `aria-controls`, panel `role="region"`, button `py-5 px-6`, question `text-base font-semibold text-primary-950`, chevron `text-gold-500` when open.

## 15.10 Gallery.tsx changes
- Add `category: "catches" | "boat" | "guests" | "onboard"` to each item; filter chips row (`rounded-full border` chips, active `bg-primary-950 text-white`); filtering = client `useState` over the static array.
- Grid: `grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4`; tiles alternate `aspect-square`/`aspect-[4/3]`; video badge kept.
- Lightbox: add `role="dialog" aria-modal="true"`, focus the close button on open (ref), return focus on close, counter `{i+1} / {items.length}` top-left, caption bar always visible.
- Insert CTA tile at index 4: `bg-primary-950 rounded-xl flex flex-col items-center justify-center text-white gap-3` → "Want photos like these?" + WhatsApp button.

## 15.11 Contact page changes
- Right rail: WhatsApp card first with `order-first lg:order-none` on mobile; add "What happens next" 3-step mini list (HowItWorks copy, compact); keep LocationMap; add assurance chip row under form.
- Form inputs → 14.7 classes; submit button keeps exact label/behavior; success panel restyle only.

## 15.12 Blog changes
- Index cards: cover band `h-40 bg-gradient-to-br from-primary-800 via-primary-600 to-lagoon-400 relative` + centered fish SVG watermark + keyword chip (gold, on cover); body `p-6`: title (Fraunces `text-xl`), excerpt `line-clamp-3`, footer row: date + read-time (`Math.max(2, Math.ceil(wordCount/200))` — compute from `metaDescription` length? No — word count needs body; index query has no body → use static estimate via `primaryKeyword` length? **Simpler: omit read-time on index; show on post page where `body` exists.**)
- Post page: `max-w-3xl mx-auto`; `prose prose-lg prose-slate prose-headings:font-display prose-a:text-primary-600`; end CTA card + "Explore trip packages" button.
- Add `@tailwindcss/typography` to app deps + plugin in CSS (`@plugin "@tailwindcss/typography";` in globals.css for v4).

## 15.13 globals.css final checklist
`@import "tailwindcss"` → `@plugin typography` → `@theme` tokens (14.1 colors, fonts, shadows, easings, animations) → wave keyframes (existing) → pulse-soft → reveal base (`.reveal` states handled inline by component) → reduced-motion guards → tap-highlight transparent → keep focus-visible ring (change color to primary-500) → keep scrollbar-gutter.

## 15.14 Acceptance criteria (verify after build)
- [ ] `npm run build` passes; `npx tsc --noEmit` clean; `npm run lint` clean.
- [ ] Zero changes in `src/app/api`, `src/sanity`, form logic, WhatsApp link generation.
- [ ] Hero LCP image is `<img>` with `fetchpriority=high` (next/image priority).
- [ ] Mobile: sticky bar visible on all pages; float hidden on mobile; no content hidden behind bar.
- [ ] Trip detail: sticky booking card on lg; WhatsApp button opens same link as before.
- [ ] All 7 trips render images; unknown slug falls back safely.
- [ ] JSON-LD scripts unchanged in view-source.
- [ ] Lighthouse mobile: LCP < 2.5s on throttled 4G (after video compression: homepage has no video anyway).
- [ ] `prefers-reduced-motion`: no waves/reveals/pulse.

---

# 16. WIREFRAMES (low-fidelity ASCII)

## 16.1 Homepage (desktop)
```
┌────────────────────────────────────────────────────────────────────┐
│ ★4.4·126 reviews · Free cancellation up to 30 days  (announce bar) │
│ [logo]              Trips  Gallery  Blog  Contact     [💬WhatsApp] │
├────────────────────────────────────────────────────────────────────┤
│ HERO: eyebrow · serif H1 · sub · ★4.4 · [WhatsApp][Explore Trips]  │
│ ┌─TRUST BAR: 4.4/5 │ Free cancellation │ Keep catch │ Pickup ────┐ │
│ └────────────────────────────────────────────────────────────────┘ │
│ TRIP PACKAGES — Pick Your Day on the Water            View all →  │
│ [img card $200] [img card $270] [img card $550]                    │
│ ── WHY US (sand) — 6 icon cards (3×2) ──                           │
│ ── THE BOAT: [yacht photo] │ 8 spec mini-cards ──                  │
│ ── CREW (sand): [Dedik] [Warsan] [Lilong & Beton] ──               │
│ ── FROM THE WATER: [big photo][4 small]  See gallery → ──          │
│ ── REVIEWS (sand): [4.4 panel+bars] │ [6 theme meters]             │
│                    [testimonial][testimonial][testimonial]         │
│ ── HOW IT WORKS: ① Message → ② Confirm → ③ Fish ──                 │
│ ── SPECIES chips ×6 │ TECHNIQUES chips ×5 ──                       │
│ ── DEPARTURE: [map] │ address · pickup · [WhatsApp] ──             │
│ ── FAQ (sand): [accordion] │ [sticky help card] ──                 │
│ ≈ FINAL CTA (navy): Ready to Fish? [WhatsApp][Compare Trips] ≈     │
│ FOOTER (navy): brand │ Explore │ Trips │ Book                      │
└────────────────────────────────────────────────────────────────────┘
 mobile: same stack, 1-col; sticky bottom bar [$200 trips │ WhatsApp]
```

## 16.2 Trip detail (desktop)
```
 Home / Trips / Full Day Trip
 ┌──────────────────────────────────────┬───────────────────────────┐
 │ Full Day Trip  [Private][Free cancel]│ ┌─ BOOKING CARD (sticky)─┐│
 │ ★4.4 ·126 reviews · Crew 4.7/5       │ │ $750 per boat (≤4)     ││
 │ ┌──────────────────────────────────┐ │ │ ≈$187/person @4 guests ││
 │ │        TRIP PHOTO 16:9           │ │ │ ★4.4 · 126 reviews     ││
 │ └──────────────────────────────────┘ │ │ ✓ license ✓ drinks     ││
 │ [thumb][thumb][thumb]                │ │ ✓ pickup ✓ keep catch  ││
 │ Description paragraph …              │ │ [💬 Check Availability]││
 │ [8h] [07:00] [≤4→8] [$750]  (stats)  │ │ [  Inquiry form  ]     ││
 │ WHAT'S INCLUDED (seafoam panel, 2col)│ │ 🛡 Free cancel 30 days ││
 │ YOUR DAY: pickup→07:00→grounds→15:00 │ └────────────────────────┘│
 │ Species chips · Techniques chips     │                           │
 │ FAQ accordion                        │                           │
 ├──────────────────────────────────────┴───────────────────────────┤
 │ OTHER TRIPS: [card][card][card]                                  │
 └──────────────────────────────────────────────────────────────────┘
 mobile: photo → title → BOOKING CARD → content … bar: [$750·8h│WA]
```

## 16.3 /trips listing
```
 H1 + intro + ★4.4 · 126 · Free cancellation
 [All] [Private] [Shared]        (chips, optional v1.1)
 [img card] [img card] [img card]
 [img card] [img card] [img card]
 [img card]
 COMPARE ALL TRIPS (table → horizontal scroll on mobile)
  Trip │Type│Hrs│Departs│Guests│Price  …rows link to detail
 FAQ accordion
 CTA band
```

## 16.4 Contact
```
 H1 Book Your Trip + rating microline
 ┌────────────────────────────┬─ 💬 FASTEST: WhatsApp ─┐
 │ INQUIRY FORM (7 fields)    │  What happens next 1-3 │
 │ [Send via WhatsApp & Email]│  Departure card · map  │
 └────────────────────────────┴────────────────────────┘
```

## 16.5 Gallery
```
 H1 + filters [All][Catches][Boat][Guests][On board]
 [tile][tile][tile]   (2-col mobile / 3-col desktop, mixed ratios)
 [tile][CTA TILE: Want photos like these? 💬][tile]
 lightbox: ← [img 3/11] →  caption · ✕
```

## 16.6 Blog index / post
```
 index: [cover band + keyword chip] title · excerpt · date
 post:  H1 (serif) · date · ~N min read
        prose (max-w-3xl)
        ┌─ CTA card: Fish these waters → /trips ─┐
```

## 16.7 Mobile chrome
```
┌──────────────────────┐
│ [logo]           ☰   │  ← full-screen overlay menu when open
│                      │
│   (page content)     │
│                      │
├──────────────────────┤
│ [Trips from $200][💬]│  ← sticky bar (always)
└──────────────────────┘
```

---

# 17. ROADMAP (prioritized)

## Phase 0 — Immediate (highest ROI, ~4–6 hrs) 
| Task | Difficulty | Impact |
|---|---|---|
| Design tokens + Fraunces/Inter in globals.css & layout | Easy | Very High |
| Hero rebuild (copy, next/image, CTA hierarchy, trust bar) | Medium | Very High |
| TripCard media redesign + TRIP_IMAGES | Easy | Very High |
| Mobile sticky book bar + float suppression + main padding | Easy | Very High |
| Compress 2 videos, `preload="none"`; recompress 400KB image | Easy | High |
| CTA hierarchy sweep (one green per context; WhatsApp-primary copy) | Easy | High |

## Phase 1 — Short-term (1–2 days)
| Task | Difficulty | Impact |
|---|---|---|
| Trip detail 2-col + sticky booking card + timeline + other-trips | Medium | Very High |
| RatingSummary + theme meters + testimonial cards rebuild | Medium | Very High |
| HowItWorks + SectionHeader + FAQ redesign | Easy | High |
| Boat section + spec cards (ui-data) | Easy | High |
| Header (logo, gold underline, overlay menu) + Footer 4-col | Medium | Medium-High |
| Comparison table on /trips | Medium | Medium |
| HomepagePics mosaic + gallery filters/lightbox a11y | Medium | Medium |

## Phase 2 — Medium-term (1–2 weeks)
| Task | Difficulty | Impact |
|---|---|---|
| Reveal + StatsCounter + load staggers (motion pass) | Medium | Medium-High |
| Crew section (placeholders now; swap real portraits after shoot) | Easy | High |
| Photography shot list execution + asset swap | External | Very High |
| Blog cards + typography plugin + end-CTA | Easy | Medium |
| Contact rail reorder + form styling | Easy | Medium |
| Per-trip OG images; alt-text pass; image renaming | Easy | Medium |
| Announcement bar + gallery CTA tile + anglers strip | Easy | Medium |

## Phase 3 — Long-term polish
| Task | Difficulty | Impact |
|---|---|---|
| Compressed hero video loop (with poster + reduced-motion fallback) | Medium | High |
| Drone footage + boat tour block | External | High |
| Species photo cards (needs catch photography) | Medium | Medium |
| Sunset trip dedicated photography | External | Medium |
| A/B CTA copy via `data-cta` analytics (owner-side) | Medium | Medium |
| Map facade (click-to-load iframe) | Easy | Low-Medium |

---

# 18. FINAL REPORT

## 18.1 Top 30 UI improvements
1. Custom Serangan palette replaces stock blue 2. Fraunces display serif 3. Hero value-prop H1 4. Hero action photography 5. TrustBar overlap card 6. TripCard image headers 7. Sticky booking card on trip detail 8. Mobile sticky book bar 9. Per-person price anchors 10. Full-screen mobile menu 11. Logo lockup replaces Lucide fish 12. Gold active nav underline 13. Section surface rhythm (white/sand/seafoam) 14. SectionHeader eyebrow pattern 15. Benefit-led headlines 16. Reveal-on-scroll system 17. Boat spec sheet 18. Crew cards 19. Gallery mosaic + filters 20. Lightbox counter + captions + focus trap 21. Testimonial cards with avatars/flags/verified 22. Rating distribution bars 23. Theme progress meters 24. Comparison table 25. FAQ animated + first-open + help card 26. Form input system (h-12, seafoam focus) 27. Shadow system (navy-tinted) 28. Radius scale discipline 29. Wave divider restraint (2 uses) 30. Footer 4-col with trip links.

## 18.2 Top 20 design improvements
1. Palette (primary/gold/sand/seafoam/whatsapp) 2. Type pairing Fraunces+Inter 3. Type scale with display sizes 4. Eyebrow caps labels 5. Card geometry unification (16px, shadow-card) 6. Navy-tinted shadows 7. Glass chips on imagery 8. Badge system (Private/Shared/cancellation/verified) 9. Icon semantic remap (Sunrise, Ruler, Gauge…) 10. Gold reserved for stars/accents 11. Green reserved for WhatsApp 12. Dark-band discipline (hero, CTA, footer only) 13. Gradient discipline (4 allowed uses) 14. Asymmetric 2-col features 15. Image ratio system (16/10 cards, 4/3 features, 4/5 portraits) 16. Motion language (out-expo, 200/300/700ms) 17. Load stagger choreography 18. Hover lift system 19. Section transitions via surfaces 20. Blur placeholders on hero images.

## 18.3 Top 20 CRO improvements
1. WhatsApp-primary hero CTA 2. One-green-per-viewport rule 3. Sticky booking card 4. Mobile bottom bar 5. Trip price + duration in mobile bar 6. "Check Availability" CTA copy 7. Per-person anchoring 8. Most-popular chip (Full Day) 9. TrustBar at hero exit 10. Reviews merged into one proof section 11. Rating microline at price points 12. How-it-works removes WhatsApp anxiety 13. Cancellation chip beside every CTA 14. Comparison table reduces choice friction 15. Other-trips cross-sell 16. Gallery CTA tile 17. Blog end-CTA 18. Contact rail WhatsApp-first on mobile 19. Response-time promise line 20. `data-cta` instrumentation for iteration.

## 18.4 Top 20 trust improvements
1. Distribution bars (126 reviews made visible) 2. Sub-score meters (Crew 4.7) 3. FishingBooker attribution + outbound link 4. Verified-style testimonial cards 5. Country flags + trip tags on reviews 6. Theme meters (96% friendly captain) 7. Crew faces & names 8. Boat spec sheet 9. Assurance chips system-wide 10. Count-up stats 11. Anglers' photo strip 12. All-inclusive panel on trip pages 13. Free-cancellation prominence 14. Address + map on homepage 15. Pickup clarification 16. "No account needed" messaging 17. Consistent NAP in footer 18. Honest copy voice preserved 19. Review date/as-of freshness line 20. No fake urgency — trust through restraint.

## 18.5 Top 20 mobile improvements
1. Sticky book bar 2. svh hero units 3. Stacked full-width hero CTAs 4. Float suppression (bar replaces) 5. Full-screen menu 6. 48px form inputs 7. 2-col gallery thumbs 8. Lightbox 44px arrows + always captions 9. Table horizontal scroll + sticky col 10. `pb-20` content compensation 11. Safe-area insets 12. Tap-highlight removal 13. Card image-first layout 14. 2×2 trust bar 15. WhatsApp rail first on contact 16. ScrollToTop hidden on mobile 17. Accordion 48px rows 18. text-xs floor (10px badges only) 19. Reduced-motion support 20. Lazy map/video below fold.

## 18.6 Top 20 SEO improvements
1. Query-targeted H1s 2. next/image hero (LCP) 3. Video compression (page weight) 4. Semantic alt text 5. Image file renaming 6. Breadcrumb UI (matches JSON-LD) 7. Footer trip internal links 8. Per-trip OG images 9. FAQ visible on /trips too 10. Typography plugin → longer blog dwell 11. Blog end-CTA internal links 12. Comparison table = indexable package data 13. Reviews id-anchor (#reviews) for sitelinks 14. Contrast fixes (accessibility=SEO) 15. `blurDataURL` (perceived speed) 16. Lazy map preserved 17. Preload priority on hero only 18. Content hierarchy (one H1/page) 19. Reduced bounce via above-fold CTAs 20. Keep all existing JSON-LD untouched.

## 18.7 Top 10 premium design upgrades
1. Fraunces italic gold accent in H1 2. Glass price chips on card imagery 3. TrustBar floating overlap card 4. Wave-divider dark CTA band 5. Navy-tinted elevation system 6. Count-up stats row 7. Progress-meter review themes 8. Full-screen numbered mobile menu 9. Asymmetric gallery mosaic 10. Pulse-soft WhatsApp float (8s, then still).

## 18.8 Final scores

| Dimension | Current | Post-redesign (projected) |
|---|---|---|
| UI Design | 5/10 | 9/10 |
| UX | 6/10 | 9/10 |
| Conversion | 5/10 | 8.5/10 |
| Trust | 6/10 | 9/10 |
| Mobile Experience | 6/10 | 9/10 |
| Desktop Experience | 6/10 | 8.5/10 |
| SEO | 7/10 | 8.5/10 |
| **Overall** | **5.3/10** | **8.8/10** |

## 18.9 Content dependencies (owner to supply — NOT blockers for Phases 0–1)
- Crew portrait photos + approval of crew one-liners (else section ships with tasteful placeholders or is deferred to Phase 2 — flag in code as `SHOW_CREW` toggle in `ui-data.ts`, default true with placeholders).
- Confirmation of boat max-speed figure (omit row until confirmed — already omitted from BOAT_SPECS).
- Optional: approval for founder sentence (5-C) and high-season urgency line (12.6) — both default OFF.
- New photography per shot list (§6.2) — site ships with current assets mapped; swapping = editing one constants file.

**End of blueprint. Build order: Phase 0 → 1 → 2 → 3. Verify against §15.14 after each phase.**
