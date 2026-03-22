# Campus Closet

A sustainability-focused clothing swap website for Boston University, built by Hack4Impact BU. Features a public site for students and a custom admin portal for non-technical eboard members to manage events, impact data, FAQ, team bios, photos, donation bins, and contact requests.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom brand palette
- **ORM:** Prisma with PostgreSQL
- **Backend:** Supabase (Auth, Storage, Database)

## Prerequisites

- Node.js 18+
- npm
- A Supabase project (free tier works)

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url> && cd campus-closet

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Seed the database
npm run db:seed

# 6. Start the dev server
npm run dev
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── admin/        # Admin portal (auth-guarded)
│   └── api/          # REST API endpoints
├── components/       # React components organized by feature
│   ├── ui/           # Shared primitives (Button, Card, Input, etc.)
│   ├── layout/       # Navbar, Footer, AdminSidebar
│   ├── landing/      # Landing page sections
│   └── [feature]/    # Feature-specific components
├── lib/              # Utilities, Prisma client, Supabase client, auth helpers
└── types/            # Shared TypeScript types
prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Sample data seeder
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:reset` | Reset database and re-seed |

## Team Ownership

| Area | Owner |
|------|-------|
| Events (pages + API) | Dev A |
| Donations + Contact | Dev B |
| Impact | Dev C |
| About + FAQ | Dev D |

## Deployment

- **App:** Deploy to Vercel (connect repo, set env vars)
- **Database:** Supabase PostgreSQL (use the connection string from Supabase dashboard)

## Contributing

- Branch naming: `feature/page-name` (e.g., `feature/events-page`)
- Create a PR against `main` with a description of changes
- Get at least one review before merging
