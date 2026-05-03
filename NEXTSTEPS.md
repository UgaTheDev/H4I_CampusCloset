# Campus Closet — Next Steps for Launch & Handoff

**Date:** 2026-05-03

---

## Critical for Launch

### 1. Build `/admin/events` page
The API routes exist (GET/POST/PUT/DELETE) but the admin UI is a stub. Admins cannot create, edit, or delete events. This is the most critical gap — the site's primary function is event-driven.
- **Owner:** Dev A
- **Files:** `src/app/admin/events/page.tsx`

### 2. Build `/admin/impact` page + add PATCH/DELETE routes
The POST API exists but there's no UI, and no way to edit or delete impact stats once entered. Wrong numbers are permanent.
- **Owner:** Dev A
- **Files:** `src/app/admin/impact/page.tsx`, `src/app/api/impact/[id]/route.ts` (create)

### 3. Email notifications on contact form submission
When someone submits the contact form or pickup request, the record goes to the database silently. No one is notified. Admins must manually check `/admin/contact`. For a student org, this means missed pickup requests.
- **Solution:** Add email sending in `POST /api/contact` using Resend, SendGrid, or Supabase Edge Functions. Send to a configurable admin email (e.g. `campuscloset@bu.edu`).
- **Files:** `src/app/api/contact/route.ts`

### 4. Add `NEXT_PUBLIC_STADIA_MAPS_API_KEY` to Vercel env vars
The Leaflet map on `/donate` uses Stadia Maps tiles. Without the API key set in Vercel, the tiles return 401 "Invalid Authentication" on production. The key is already in `.env.example` and the code handles it — it just needs to be added to Vercel's environment variables.
- **Get a key from:** https://stadiamaps.com/ (free tier, domain-restricted)
- **Add to Vercel:** Project Settings > Environment Variables > `NEXT_PUBLIC_STADIA_MAPS_API_KEY`

### 5. Delete placeholder gallery photos from production DB
Eight gallery photos with `placehold.co` URLs were seeded. These show as broken images on the landing page and About page. Delete them via `/admin/photos` and upload real photos.

### 6. Clean up stale seed data in production
- 2 events have past dates (May 2025) but are still in the DB
- 3 fake contact requests (`ewatson@bu.edu`, `mlee@bu.edu`, `sramirez@bu.edu`) are in the admin inbox
- Internal "E-board Planning Meeting" is visible as a public event
- Delete these via the admin portal once admin events page is built

---

## Important for Launch

### 7. Rate limiting on public form endpoints
`POST /api/contact` has no rate limiting. A bot can flood the database with thousands of submissions. Use `@upstash/ratelimit` with Vercel KV, or IP-based throttling in middleware.

### 8. Security headers
`next.config.mjs` has no Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy headers. Add via `headers()` in next.config.

### 9. Cascade deletes on Event relations
Deleting an Event leaves orphaned `GalleryPhoto` and `ImpactStats` records with dangling `eventId`. Add `onDelete: Cascade` to the `ImpactStats.event` relation in `schema.prisma`. For photos, `onDelete: SetNull` is likely correct (keep photos, just unlink).

### 10. Delete storage objects when deleting photos/team members
`DELETE /api/photos/[id]` and team member deletion only remove the DB record. The actual image file in Supabase Storage persists forever. Add a `supabaseAdmin.storage.from('photos').remove([path])` call before or after the DB delete.

### 11. Server-side email validation
`POST /api/contact` only checks that email is non-empty. No format validation. Add a basic regex or use a validation library.

### 12. OpenGraph image
No `og:image` is set — social previews (Instagram, Twitter, iMessage) will have no image. Create `src/app/opengraph-image.png` or a dynamic `opengraph-image.tsx`.

### 13. Admin portal mobile responsiveness
The admin sidebar is a fixed `w-64` column with no responsive breakpoints. On tablets or small laptops, the layout overflows. Add a collapsible sidebar or hamburger menu for admin.

### 14. Loading skeletons
No `loading.tsx` files exist anywhere. Add them to `src/app/(public)/loading.tsx` and `src/app/admin/loading.tsx` for route transition feedback.

### 15. Contact info should be in constants, not hardcoded
`campuscloset@bu.edu` and `@bucampuscloset` Instagram handle are hardcoded in Footer.tsx and contact/page.tsx. Move to `src/lib/constants.ts` so they're updated in one place.

---

## Post-Launch Improvements

### 16. Error tracking (Sentry)
No error monitoring exists. If the DB connection drops or an API crashes, no one is notified. Add Sentry free tier or Vercel's error tracking.

### 17. Analytics
No Vercel Analytics, Google Analytics, or Plausible. The org has no way to see traffic, popular pages, or user behavior.

### 18. Admin user management UI
There's no admin page to add/remove admin users. Currently requires a developer to run Prisma queries. Build an `/admin/settings` page with user management.

### 19. Pagination on admin lists
Admin contact inbox, photos, and FAQ pages load ALL records with no pagination. After a semester of use, these will become slow. Add `take`/`skip` or cursor-based pagination.

### 20. Convert `Event.type` to Prisma enum
Currently a free-text `String`. A typo creates a phantom category. Convert to `enum EventType { swap drive meeting }` with a migration.

### 21. Convert `Event.isPast` to date-based queries
Drop the manual `isPast` boolean. All queries should filter by `date: { lt: new Date() }` for past and `date: { gte: new Date() }` for upcoming. Remove the field entirely or keep it only as an explicit "archived" flag.

### 22. `ContactRequest.preferredDate` should be DateTime
Currently `String?` — no date validation or query capability. Migrate to `DateTime?`.

### 23. Privacy policy page
The site collects names and emails via the contact form (no auth required). BU students deserve a privacy policy. Create `/privacy` with basic data handling disclosure.

### 24. Admin user guide
Write a short guide for the eboard: how to add events, enter impact stats, manage bins, handle contact requests, upload team photos. Include screenshots.

---

## Nice to Have

### 25. CI/CD pipeline
No `.github/workflows/`. A PR that breaks TypeScript goes straight to Vercel. Add a GitHub Action that runs `npm run build` and `tsc --noEmit` on PRs.

### 26. Staging environment
No stable staging branch or pre-production deploy. All PRs deploy to production previews. Consider a `staging` branch mapped to a separate Supabase project.

### 27. Social sharing for events
Event cards have no share button. A "Copy link" or pre-filled share URL would help student org social media.

### 28. Favicon format
`icon.jpg` is non-standard. Convert to `.ico` or `.png` for proper browser/bookmark support.

### 29. `date-fns` v4 compatibility
`react-big-calendar` was designed for `date-fns` v2/v3. Pin `date-fns` to `^3.6.0` or verify the calendar renders correctly.

### 30. Content management for static copy
Hero headline, "How It Works" steps, "What We Accept" lists, SwapVsDrive explainer — all require code deploys to change. For a long-lived org site, move this copy to DB or a lightweight CMS.

### 31. Stale branch cleanup
5 merged remote branches should be deleted: `feature/B/bins-admin`, `feature/C/about-page`, `feature/C/faq`, `feature/C/photos-admin`, `feature/D/landing-page`.
