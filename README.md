# Shramika Book (శ్రామిక పుస్తకం)

A simple mobile-friendly web app for field labour managers to track labourers,
daily attendance, wages, payments, and field-owner work — in English or Telugu.

## Tech stack

- React + TypeScript (Vite)
- Supabase (Auth + Postgres database)
- React Router
- Plain CSS (no UI framework, kept intentionally simple)

## 1. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase project's URL and anon key
(found in Supabase Dashboard → Project Settings → API):

```
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 2. Database

Your Supabase project should already have the tables listed in
`supabase/schema.sql` along with Row Level Security enabled and policies that
restrict every table to `manager_id = auth.uid()`. That file is provided only
as a reference / safety net (every statement is `IF NOT EXISTS`, so running it
will not touch existing data or disable RLS).

## 3. Install & run locally

```
npm install
npm run dev
```

The app will start at `http://localhost:5173`.

## 4. Login

The app uses Supabase Email + Password authentication. Log in with the
manager account that was already created in your Supabase project
(Authentication → Users). There is no sign-up screen in the app — new manager
accounts should be created directly in the Supabase dashboard.

## 5. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. In Vercel's Project Settings → Environment Variables, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Vercel will detect the Vite project automatically
   (build command `npm run build`, output directory `dist`).

## App structure

```
src/
  components/     Shared UI pieces (layout, bottom nav, modals, forms)
  context/        Auth context (Supabase session)
  hooks/          Data-loading hooks (labourers, field owners)
  i18n/           English & Telugu translations + language context
  lib/            Supabase client, data-access queries, formatting helpers
  pages/          One file per screen (Dashboard, Labourers, Attendance,
                   Payments, Field Owners, Settings, Login)
  types/          TypeScript types matching the database tables
supabase/
  schema.sql      Reference schema + RLS policies (see note above)
```

## How wages are calculated

There is no separate "Wages" page or table. Wages are always computed live
from attendance records:

```
Total Wage = Number of Attendance Days × Daily Wage
Pending    = Total Wage − Paid (sum of payments recorded)
```

## Notes

- Each manager only ever sees their own data — this is enforced both by the
  Supabase RLS policies and by the app always using the logged-in user's ID
  as `manager_id` when saving records.
- Manager IDs are never shown in the UI.
- Field Owners is reachable from the Dashboard's quick actions, not from the
  bottom navigation, as specified.
