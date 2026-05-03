# Vocabulary Language Learning App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Supabase-backed PWA for English to Chinese vocabulary learning with placement quiz, personalized word cards, account login, and display settings.

**Architecture:** The app is a React/TypeScript PWA. Pure domain modules handle placement scoring, recommendation, vocabulary seed data, and progress summaries; React screens handle auth, onboarding, cards, and settings; Supabase is isolated behind a small client/data access layer.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, Supabase JS, CSS modules through plain CSS.

---

## File Structure

- `package.json`: scripts and dependencies.
- `vite.config.ts`: Vite and Vitest configuration.
- `tsconfig*.json`: TypeScript configuration.
- `index.html`: app shell.
- `src/main.tsx`: React entrypoint.
- `src/App.tsx`: auth/session routing and top-level layout.
- `src/styles.css`: mobile-first app styling.
- `src/types.ts`: shared domain types.
- `src/data/seedVocabulary.ts`: starter English to Chinese vocabulary.
- `src/lib/placement.ts`: placement scoring.
- `src/lib/recommendation.ts`: next-word selection.
- `src/lib/progress.ts`: progress summary helpers.
- `src/lib/supabase.ts`: Supabase client setup.
- `src/lib/storage.ts`: local fallback/demo persistence and Supabase-shaped data helpers.
- `src/components/LoginScreen.tsx`: magic-link/email-code login UI.
- `src/components/PlacementQuiz.tsx`: placement quiz UI.
- `src/components/VocabularyCard.tsx`: main word card and status buttons.
- `src/components/SettingsScreen.tsx`: display mode and progress.
- `src/components/AppShell.tsx`: mobile shell and tabs.
- `src/__tests__/placement.test.ts`: placement scoring tests.
- `src/__tests__/recommendation.test.ts`: recommendation tests.
- `src/__tests__/progress.test.ts`: progress summary tests.
- `supabase/schema.sql`: database schema, policies, and seed table shape.
- `README.md`: local setup and Supabase environment variables.

## Tasks

### Task 1: Scaffold Tooling

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`

- [ ] **Step 1: Create project configuration**

Create a Vite React TypeScript project with test scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

- [ ] **Step 3: Verify empty app toolchain**

Run: `npm run build`

Expected: TypeScript and Vite complete without errors once source files are added in later tasks.

### Task 2: Domain Types And Seed Vocabulary

**Files:**
- Create: `src/types.ts`
- Create: `src/data/seedVocabulary.ts`

- [ ] **Step 1: Define shared types**

Create types for `DisplayMode`, `Level`, `WordStatus`, `VocabularyEntry`, `UserWordProgress`, and `Profile`.

- [ ] **Step 2: Add seed vocabulary**

Add at least 30 English to Chinese vocabulary entries with Simplified, Traditional, pinyin, examples, difficulty, and tags.

### Task 3: Placement Scoring With TDD

**Files:**
- Create: `src/__tests__/placement.test.ts`
- Create: `src/lib/placement.ts`

- [ ] **Step 1: Write failing placement tests**

Tests must prove low scores map to beginner, middle scores map to intermediate, high scores map to advanced, and quiz questions are selected across levels.

- [ ] **Step 2: Run red test**

Run: `npm test -- src/__tests__/placement.test.ts`

Expected: fail because `src/lib/placement.ts` does not exist.

- [ ] **Step 3: Implement placement module**

Implement `scorePlacement(correct, total)` and `buildPlacementQuestions(vocabulary, count)`.

- [ ] **Step 4: Run green test**

Run: `npm test -- src/__tests__/placement.test.ts`

Expected: pass.

### Task 4: Recommendation Logic With TDD

**Files:**
- Create: `src/__tests__/recommendation.test.ts`
- Create: `src/lib/recommendation.ts`

- [ ] **Step 1: Write failing recommendation tests**

Tests must prove unseen words near the profile level are preferred, learning words stay in rotation, known words are deprioritized, and fallback works when every word is known.

- [ ] **Step 2: Run red test**

Run: `npm test -- src/__tests__/recommendation.test.ts`

Expected: fail because `src/lib/recommendation.ts` does not exist.

- [ ] **Step 3: Implement recommendation module**

Implement `selectNextWord(vocabulary, progress, profile, now)`.

- [ ] **Step 4: Run green test**

Run: `npm test -- src/__tests__/recommendation.test.ts`

Expected: pass.

### Task 5: Progress Summary With TDD

**Files:**
- Create: `src/__tests__/progress.test.ts`
- Create: `src/lib/progress.ts`

- [ ] **Step 1: Write failing progress tests**

Tests must prove known, learning, new, and unseen counts are calculated correctly.

- [ ] **Step 2: Run red test**

Run: `npm test -- src/__tests__/progress.test.ts`

Expected: fail because `src/lib/progress.ts` does not exist.

- [ ] **Step 3: Implement progress module**

Implement `summarizeProgress(vocabulary, progress)`.

- [ ] **Step 4: Run green test**

Run: `npm test -- src/__tests__/progress.test.ts`

Expected: pass.

### Task 6: Supabase And Persistence Layer

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/lib/storage.ts`
- Create: `supabase/schema.sql`

- [ ] **Step 1: Add Supabase client**

Read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. If either is missing, expose demo-mode behavior instead of crashing.

- [ ] **Step 2: Add storage helpers**

Implement profile/progress helpers that use local storage in demo mode and are shaped so Supabase calls can replace them cleanly.

- [ ] **Step 3: Add schema**

Create SQL for `profiles`, `vocabulary`, `user_word_progress`, and `placement_attempts` with row-level security.

### Task 7: React Screens

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/components/LoginScreen.tsx`
- Create: `src/components/PlacementQuiz.tsx`
- Create: `src/components/VocabularyCard.tsx`
- Create: `src/components/SettingsScreen.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Build login UI**

Use Supabase magic-link/email-code flow when configured; allow demo entry when env vars are absent.

- [ ] **Step 2: Build placement quiz**

Ask 8 to 12 multiple-choice questions and save estimated level.

- [ ] **Step 3: Build vocabulary card**

Show the recommended word and status buttons. Save progress and load the next word after each response.

- [ ] **Step 4: Build settings/progress**

Let the user choose Simplified, Traditional, or Both. Show progress counts and current level.

### Task 8: Documentation And Verification

**Files:**
- Create: `README.md`
- Modify: `.gitignore`

- [ ] **Step 1: Document setup**

Include install, dev, build, test, and Supabase env setup.

- [ ] **Step 2: Run full verification**

Run: `npm test`

Expected: all tests pass.

Run: `npm run build`

Expected: TypeScript and Vite build pass.

- [ ] **Step 3: Commit implementation**

Run:

```bash
git add .
git commit -m "Build vocabulary learning PWA"
```

