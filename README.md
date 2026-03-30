# Campus Closet

A sustainability-focused clothing swap website for Boston University, built by Hack4Impact BU. Features a public site for students and a custom admin portal for non-technical eboard members to manage events, impact data, FAQ, team bios, photos, donation bins, and contact requests.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom brand palette
- **ORM:** Prisma with PostgreSQL
- **Backend:** Supabase (Auth via `@supabase/ssr`, Storage, Database)
- **Hosting:** Vercel

## Prerequisites

- Node.js 18+
- npm
- Supabase credentials (get from the team lead — database is already provisioned)

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url> && cd campus-closet

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Paste in the shared Supabase credentials (get from team lead)

# 4. Start the dev server
npm run dev
```

> **Note:** The database is already migrated and seeded on the shared Supabase instance.
> Only run `npx prisma migrate dev` if you are making schema changes.
> Only run `npm run db:seed` if you need to reset sample data.

## Project Structure

```text
src/
├── app/
│   ├── (public)/         # Public pages (wrapped in Navbar + Footer)
│   │   ├── page.tsx      # Landing page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── donate/
│   │   ├── events/
│   │   └── faq/
│   ├── admin/            # Admin portal (own layout with sidebar, no Navbar/Footer)
│   │   ├── login/
│   │   └── [sections]/   # events, impact, bins, contact, team, faq, photos
│   ├── api/              # REST API endpoints
│   └── auth/callback/    # OAuth callback route
├── components/
│   ├── ui/               # Shared primitives (Button, Card, Input, Modal, Accordion, Badge, Textarea)
│   ├── layout/           # Navbar, Footer, AdminSidebar
│   ├── landing/          # Landing page sections
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── supabase.ts       # Browser Supabase client
│   ├── supabase-server.ts # Server Supabase client (Route Handlers, middleware)
│   ├── auth.ts           # signInWithGoogle(), signOut()
│   ├── prisma.ts         # Prisma singleton
│   ├── cn.ts             # Tailwind class merge utility
│   └── constants.ts      # NAV_LINKS, IMPACT_FACTORS, SITE_METADATA
└── types/                # Shared TypeScript types
prisma/
├── schema.prisma         # Database schema (8 models)
└── seed.ts               # Sample data seeder
```

## Available Scripts

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run dev`        | Start development server       |
| `npm run build`      | Production build               |
| `npm run lint`       | Run ESLint                     |
| `npm run db:migrate` | Run Prisma migrations          |
| `npm run db:seed`    | Seed database with sample data |
| `npm run db:reset`   | Reset database and re-seed     |

## Domain Ownership

Work is divided by data domain. Each developer owns the database tables, API routes, admin forms, and public pages for their domain.

| Domain                    | Owner        | Tables                                  | Routes                            |
| ------------------------- | ------------ | --------------------------------------- | --------------------------------- |
| Platform + Auth + Landing | Dev D (Lead) | admin_users                             | —                                 |
| Events + Impact           | Dev A        | events, impact_stats                    | /api/events, /api/impact          |
| Donations + Contact       | Dev B        | donation_bins, contact_requests         | /api/donations/bins, /api/contact |
| Content + Media           | Dev C        | team_members, faq_items, gallery_photos | /api/team, /api/faq, /api/photos  |

## Deployment

- **App:** [Vercel](https://h4-i-campus-closet.vercel.app/) (auto-deploys on merge to `main`)
- **Database:** Supabase PostgreSQL (connection strings in env vars)

## Contributing

- Branch naming: `feature/{dev-letter}/{feature-name}` (e.g., `feature/A/events-page`)
- All branches cut from `main`
- PRs require 1 review from any other dev
- Squash-merge to keep history clean

## Environment Variables

All required vars are in `.env.example`. Real values go in `.env` (gitignored). Also set in Vercel project settings.

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Pooled connection (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Direct connection (port 5432, for migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `NEXT_PUBLIC_SITE_URL` | Production URL (for OAuth redirects) |
