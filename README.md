# Daily Vocab

Mobile-first Chinese to English vocabulary learning PWA with placement quiz, quick word-status feedback, and Supabase magic-link login.

## Setup

```bash
npm install
npm run dev
```

## Supabase

Create a Supabase project, run `supabase/schema.sql` in the SQL editor, then add these environment variables:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without those variables, the app runs in local demo mode using browser storage.

## Scripts

```bash
npm test
npm run build
npm run dev
```

## Product Scope

- Chinese to English first.
- Simplified, Traditional, or Both display modes.
- Placement quiz for starting level.
- Quick status buttons: Know, Learning, New.
- Recommendation logic that favors unseen and learning words near the user's level.
