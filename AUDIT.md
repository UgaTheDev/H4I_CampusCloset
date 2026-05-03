# Campus Closet — Production Audit

**Date:** 2026-05-03
**Audited by:** Dev D (Lead)
**Build status:** Passes (all 30 pages compiled, 0 errors)

---

## Table of Contents

1. [Critical Issues](#1-critical-issues)
2. [API Consistency](#2-api-consistency)
3. [Backend Patterns](#3-backend-patterns)
4. [Frontend / UI Consistency](#4-frontend--ui-consistency)
5. [Hardcoded Content](#5-hardcoded-content)
6. [Admin Portal Gaps](#6-admin-portal-gaps)
7. [Seed & Placeholder Data](#7-seed--placeholder-data)
8. [SEO & Metadata](#8-seo--metadata)
9. [Accessibility](#9-accessibility)
10. [Dependencies & Config](#10-dependencies--config)
11. [Link Integrity](#11-link-integrity)

---

## 1. Critical Issues

These must be resolved before client handover.

| # | Issue | File(s) | Owner |
|---|-------|---------|-------|
| 1 | `/contact` page is a stub — renders `<div>ContactPage</div>` to public visitors. 4 links across the site point to it. | `src/app/(public)/contact/page.tsx` | Dev B |
| 2 | `/admin/contact` is a stub — contact requests accumulate in DB with no admin UI | `src/app/admin/contact/page.tsx` | Dev B |
| 3 | `/admin/events` is a stub — no admin UI for event CRUD | `src/app/admin/events/page.tsx` | Dev A |
| 4 | `/admin/impact` is a stub — no admin UI for impact data entry; no PATCH/DELETE routes exist | `src/app/admin/impact/page.tsx`, `src/app/api/impact/` | Dev A |
| 5 | `placehold.co` gallery images in prod DB — visitors see broken/placeholder images | `prisma/seed.ts:181-188` | Dev D |
| 6 | "15+ events hosted this semester" is hardcoded — will be stale | `src/app/(public)/events/EventsPageClient.tsx:70` | Dev A |

---

## 2. API Consistency

### Auth method inconsistency

Routes should use `import { requireAdmin } from '@/lib/admin-guard'`. These files inline the auth check instead:

| File | Lines |
|------|-------|
| `src/app/api/contact/route.ts` | 19-29 |
| `src/app/api/contact/[id]/route.ts` | 23-31 |
| `src/app/api/donations/bins/route.ts` | 29-38 |
| `src/app/api/donations/bins/[id]/route.ts` | 15-29 (local copy of `requireAdmin`) |
| `src/app/api/admin/check/route.ts` | 8-18 |

### Missing try/catch on GET handlers

These public GET routes have no error handling — a DB failure returns an unhandled 500 with HTML instead of JSON:

| Route | File |
|-------|------|
| `GET /api/faq` | `src/app/api/faq/route.ts:6` |
| `GET /api/faq/[id]` | `src/app/api/faq/[id]/route.ts:10` |
| `GET /api/team` | `src/app/api/team/route.ts:6` |
| `GET /api/team/[id]` | `src/app/api/team/[id]/route.ts:10` |
| `GET /api/photos` | `src/app/api/photos/route.ts:9` |
| `GET /api/photos/[id]` | `src/app/api/photos/[id]/route.ts:10` |
| `POST /api/upload` | `src/app/api/upload/route.ts` |
| `DELETE /api/upload` | `src/app/api/upload/route.ts` |

### Inconsistent DELETE response shape

- `bins/[id]` and `events/[id]` return `{ message: 'Deleted' }`
- `faq/[id]`, `photos/[id]`, `team/[id]` return `{ ok: true }`

Should unify to one shape.

### Other API issues

| Issue | File | Line |
|-------|------|------|
| `PUT /api/events/[id]` error says "Failed to get event" (copy-paste) | `events/[id]/route.ts` | 60 |
| `PUT /api/events/[id]` has no field validation on body | `events/[id]/route.ts` | 62 |
| `GET /api/impact` has dead P2025 check (aggregate never throws P2025) | `impact/route.ts` | 34 |
| `POST /api/upload` response is `{ url }` not `{ data: { url } }` | `upload/route.ts` | — |

---

## 3. Backend Patterns

| Issue | File | Line(s) |
|-------|------|---------|
| Middleware only checks Supabase session, not AdminUser table | `src/middleware.ts` | 30-33 |
| Auth callback silently redirects to `/admin` if no `code` param present | `src/app/auth/callback/route.ts` | 15-23 |
| `FaqItem` model missing RLS comment present on all other models | `prisma/schema.prisma` | 89 |
| `Event.isPast` is manual boolean — stale by design | `prisma/schema.prisma` | 19 |
| `ContactRequest.preferredDate` is `String?` not `DateTime?` | `prisma/schema.prisma` | — |
| `Event.type` is unvalidated `String` (no Prisma enum) | `prisma/schema.prisma` | 14 |

---

## 4. Frontend / UI Consistency

### `text-red-*` instead of `text-brand-terra`

| File | Line |
|------|------|
| `src/app/admin/bins/page.tsx` | 189 |
| `src/app/admin/bins/page.tsx` | 302 |
| `src/app/(public)/donate/PickupForm.tsx` | 147 |

### Template literal className instead of `cn()`

| File | Lines |
|------|-------|
| `src/app/(public)/donate/page.tsx` | 94, 110, 119, 185, 224 |
| `src/components/about/MissionSection.tsx` | 66 |

### `text-gray-*` instead of `text-brand-text`

| File | Lines |
|------|-------|
| `src/components/events/EventCard.tsx` | 46, 54, 59 |
| `src/components/impact/ImpactCharts.tsx` | 48, 49, 57, 58, 66, 67 |

### `console.error` in public-facing code

| File | Lines |
|------|-------|
| `src/app/(public)/events/EventsPageClient.tsx` | 36, 44 |

---

## 5. Hardcoded Content

Content that is publicly visible but not admin-editable.

### MUST FIX — Will go stale

| Content | File | Line |
|---------|------|------|
| "15+ events hosted this semester" badge | `EventsPageClient.tsx` | 70 |
| Footer email `campuscloset@bu.edu` | `Footer.tsx` | 68 |
| Footer Instagram URL | `Footer.tsx` | 56 |
| Mission section photo (`/mission.png`) | `MissionSection.tsx` | 27 |

### SHOULD FIX — Client may want to change

| Content | File |
|---------|------|
| Hero headline + subtitle | `Hero.tsx` |
| "What is Campus Closet?" pillar cards (3) | `WhatIsCampusCloset.tsx` |
| "How it Works" steps (3) | `HowItWorks.tsx` |
| "How Can You Get Involved?" action cards (3) | `GetInvolved.tsx` |
| "Ready to Make a Difference?" CTA copy | `FooterCta.tsx` |
| Mission body text + pillar descriptions | `MissionSection.tsx` |
| About page tagline ("Est. 2021...") | `about/page.tsx` |
| "What We Accept" / "What We Don't Accept" lists | `donate/page.tsx` |
| "How to Donate" steps | `donate/page.tsx` |
| Swap vs. Drive explainer + guidelines | `SwapVsDrive.tsx` |
| "...within 24 hours" response time claim | `FaqContactForm.tsx`, `faq/page.tsx` |
| Impact equivalency factors (suitcase/tree/water) | `ImpactCharts.tsx` |

---

## 6. Admin Portal Gaps

### Stub pages (no UI)

| Page | API exists? | Owner |
|------|-------------|-------|
| `/admin/events` | Yes (GET/POST/PUT/DELETE) | Dev A |
| `/admin/impact` | Partial (GET/POST only, no PATCH/DELETE) | Dev A |
| `/admin/contact` | Yes (GET/PATCH) | Dev B |

### Content with NO admin management path

All landing page text, donate page policy lists, event guidelines, footer contact info, mission section copy — none of these are editable via the admin portal. They require code changes to update.

### Silent failures in implemented admin pages

| Issue | File |
|-------|------|
| `EditMemberModal` closes on error with no feedback | `admin/team/page.tsx:243-270` |
| `EditPhotoModal` closes on error with no feedback | `admin/photos/page.tsx:286-329` |
| `handleUpdate` in photos has no try/catch | `admin/photos/page.tsx:105-113` |

---

## 7. Seed & Placeholder Data

| Issue | File | Severity |
|-------|------|----------|
| 8 gallery photos use `placehold.co` URLs — broken on live site | `seed.ts:181-188` | Critical |
| 2 events have past dates but `isPast: false` | `seed.ts:54-70` | High |
| Internal "E-board Planning Meeting" visible as public event | `seed.ts:61-69` | Medium |
| 3 fake contact requests in admin inbox | `seed.ts:174-177` | Low |

---

## 8. SEO & Metadata

### Pages missing metadata

| Page | Has metadata? | Has revalidate? |
|------|---------------|-----------------|
| `/` | Yes | Yes (60s) |
| `/about` | Yes | Yes (60s) |
| `/faq` | Yes | Yes (60s) |
| `/events` | Yes | **No** |
| `/donate` | Yes (thin description) | **No** |
| `/contact` | **No** (stub) | No |
| All `/admin/*` | **No** | N/A |

### Missing SEO infrastructure

- No `robots.ts` — admin routes are crawlable
- No `sitemap.ts` — no structured page map for search engines
- No OpenGraph image (`opengraph-image.png`)
- `twitter.card` is `summary` not `summary_large_image`
- No `loading.tsx` files anywhere (no skeleton UI during data fetching)
- Favicon is `.jpg` format (`.ico` or `.png` preferred)

### Heading hierarchy issues

- Events page: `<p>` used for page title "Events" instead of `<h1>`; `<h1>` used for "Upcoming Swaps" subsection
- EventCalendar: `<h1>` nested inside a component that's already within an `<h1>` page

---

## 9. Accessibility

### Critical (public-facing)

| Issue | File | Line(s) |
|-------|------|---------|
| Accordion component missing `aria-controls` on toggle buttons | `Accordion.tsx` | 34-39 |
| Emoji icons (🎒💧🌱) missing `aria-hidden` | `ImpactCharts.tsx` | 47, 56, 65 |
| PickupForm error message missing `role="alert"` | `PickupForm.tsx` | 147 |
| Leaflet map has no accessible label or text fallback | `DonationMap.tsx` | 43 |
| Events page heading hierarchy broken (`<p>` as title, nested `<h1>`s) | `EventsPageClient.tsx`, `EventCalendar.tsx` | 65, 80 |

### High

| Issue | File | Line(s) |
|-------|------|---------|
| Decorative SVGs missing `aria-hidden` | `EventCard.tsx`, `SwapVsDrive.tsx` | 60-64, 72-79 |
| Modal doesn't manage focus on open/close | `Modal.tsx` | 14-56 |
| Mobile nav doesn't move focus on open | `Navbar.tsx` | 66-86 |
| `<select>` elements not associated with `<label>` via htmlFor/id | `admin/faq/page.tsx`, `admin/photos/page.tsx` | Multiple |
| Admin sidebar `<nav>` missing `aria-label` | `AdminSidebar.tsx` | 35 |

### Medium — Color contrast concerns

- `text-brand-text/60` on white/cream backgrounds: ~3.8:1 ratio (fails WCAG AA for small text)
- `text-brand-text/50`: ~3.5:1 (fails AA)
- `text-white/85` on `bg-brand-olive`: ~4.1:1 (borderline)

---

## 10. Dependencies & Config

| Issue | File |
|-------|------|
| `date-fns` v4 may be incompatible with `react-big-calendar` (designed for v2/v3) | `package.json` |
| 4 undocumented Tailwind tokens (`brand-stat-green/tan/terra`, `brand-faq-active`) not in CLAUDE.md | `tailwind.config.ts` |
| `ContactRequest.preferredDate` is `String?` not `DateTime?` — no DB-level date validation | `schema.prisma` |
| `Event.type` is unvalidated `String` — should be Prisma enum | `schema.prisma` |
| 5 stale remote branches should be pruned | Git |

---

## 11. Link Integrity

### Broken / stub links from public pages

| Source | Target | Status |
|--------|--------|--------|
| Navbar + Footer (all pages) | `/contact` | **Stub** |
| `FooterCta.tsx:22` | `/contact` | **Stub** |
| `donate/page.tsx:233` | `/contact` | **Stub** |
| `about/page.tsx:71` | `/contact` | **Stub** |
| Navbar + Footer (all pages) | `/admin` | **Inappropriate** — public visitors see admin link |

### All other links verified working

`/events`, `/donate`, `/about`, `/faq`, `/` — all resolve to implemented pages. External links (Instagram, mailto, Hack4Impact) are correctly formed.

---

## Summary by Priority

### Blockers (fix before launch)
1. Build and deploy `/contact` page (Dev B's PR #5 merged the API but the page is still a stub)
2. Build `/admin/contact`, `/admin/events`, `/admin/impact` pages
3. Delete `placehold.co` gallery photos from prod DB
4. Make "15+ events" badge dynamic

### High Priority
5. Add try/catch to all GET API handlers
6. Unify auth pattern (use `requireAdmin` everywhere)
7. Fix heading hierarchy on events page
8. Add `robots.ts` to block admin from crawlers
9. Fix accessibility: Accordion `aria-controls`, Modal focus management, map label

### Medium Priority
10. Replace `text-red-*` with `text-brand-terra` (3 files)
11. Replace template literals with `cn()` (2 files)
12. Add page metadata to `/events` and `/donate` (revalidate)
13. Add `sitemap.ts` and OG image
14. Fix color contrast on `/60` and `/50` opacity text
15. Associate all `<select>` elements with labels via htmlFor
