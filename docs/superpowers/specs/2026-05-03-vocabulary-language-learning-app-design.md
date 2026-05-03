# Vocabulary Language Learning App Design

## Overview

Build a mobile-first progressive web app for English to Chinese vocabulary learning. The first version should feel like opening a lock-screen vocabulary widget: the user lands directly on one focused word card, gives a quick learning-status response, and immediately receives another word tailored to their level.

The app will start with English to Chinese, while keeping the product and data model flexible enough to support additional language pairs later. Chinese display must support Simplified, Traditional, or both, based on user preference.

## Goals

- Provide a fast vocabulary-learning loop that works well on mobile.
- Use account login so user progress can sync across devices.
- Start each new user with a short placement quiz.
- Tailor vocabulary difficulty based on the placement result and ongoing user feedback.
- Let users mark words as `Know`, `Learning`, or `New`.
- Seed the app with a useful starter English to Chinese vocabulary list.
- Structure the app so future iOS or Android widgets can reuse the same vocabulary and progress data.

## Non-Goals For Version 1

- Native iOS Lock Screen widgets.
- Native Android widgets.
- Full grammar lessons, speaking practice, handwriting, or listening drills.
- Complex spaced-repetition scheduling.
- Multiple learning directions beyond English to Chinese.

## Product Scope

Version 1 is a Supabase-backed PWA. Users sign in with a magic-link or email-code flow. After first login, they complete a placement quiz. The app then routes them to the main vocabulary card experience.

Each vocabulary card shows:

- English word.
- Simplified Chinese translation.
- Traditional Chinese translation.
- Pinyin.
- Short example sentence.
- Quick status buttons: `Know`, `Learning`, `New`.

After the user taps a status, the app records the response and shows the next word.

## Main Screens

### Login

The login screen contains an email field and a magic-link or email-code submission flow powered by Supabase Auth. After authentication, the app checks the user's profile to decide whether to show onboarding or the main vocabulary card.

### Placement Quiz

New users complete a short placement quiz of about 8 to 12 questions. Each question shows an English word and asks the user to choose the correct Chinese meaning. The quiz result sets the user's initial vocabulary level, such as beginner, intermediate, or advanced.

### Vocabulary Card

The vocabulary card is the main experience. It should be mobile-first, visually compact, and readable at a glance. The screen opens directly to a single word card and the three status actions.

The card flow is:

1. Load the next recommended word.
2. Show English, Chinese translations, pinyin, and example.
3. User taps `Know`, `Learning`, or `New`.
4. Save progress.
5. Move to the next recommended word.

### Progress And Settings

The settings screen lets users choose Chinese display mode:

- Simplified.
- Traditional.
- Both.

It also shows basic progress:

- Known word count.
- Learning word count.
- New or unseen word count.
- Current estimated level.

## Data Model

Supabase will store application data in relational tables.

### `profiles`

Stores user-level settings and personalization state.

- `id`: Supabase auth user ID.
- `display_name`: optional user display name.
- `source_language`: default `en`.
- `target_language`: default `zh`.
- `chinese_display_mode`: `simplified`, `traditional`, or `both`.
- `estimated_level`: `beginner`, `intermediate`, or `advanced`.
- `placement_completed_at`: timestamp.
- `created_at`: timestamp.
- `updated_at`: timestamp.

### `vocabulary`

Stores reusable vocabulary entries.

- `id`: unique word ID.
- `source_language`: default `en`.
- `target_language`: default `zh`.
- `term`: English word.
- `simplified`: Simplified Chinese translation.
- `traditional`: Traditional Chinese translation.
- `pinyin`: pronunciation.
- `example_en`: English example sentence.
- `example_zh_simplified`: Simplified Chinese example sentence.
- `example_zh_traditional`: Traditional Chinese example sentence.
- `difficulty`: beginner, intermediate, or advanced.
- `tags`: topic tags such as travel, work, emotions, food.
- `created_at`: timestamp.

### `user_word_progress`

Stores each user's relationship to each word.

- `user_id`: profile ID.
- `vocabulary_id`: vocabulary ID.
- `status`: `new`, `learning`, or `known`.
- `times_seen`: number.
- `times_marked_known`: number.
- `times_marked_learning`: number.
- `times_marked_new`: number.
- `last_seen_at`: timestamp.
- `updated_at`: timestamp.

### `placement_attempts`

Stores placement quiz history.

- `id`: unique attempt ID.
- `user_id`: profile ID.
- `score`: number.
- `estimated_level`: result level.
- `completed_at`: timestamp.

## Personalization Logic

Version 1 uses simple adaptive selection rather than a full spaced-repetition system.

The placement quiz sets the user's starting level. The recommendation module chooses words near that level, preferring words that are unseen or still marked `learning`.

Status behavior:

- `Know`: mark the word known, lower its future priority, and gradually allow harder words.
- `Learning`: keep the word in active rotation.
- `New`: keep the word available for review and bias future selections toward easier words or similar beginner-level words.

The first version should avoid repeatedly showing words marked known unless there are not enough available words at the user's level.

## Architecture

Use a React and TypeScript PWA with Supabase.

Frontend modules:

- Routing and auth session handling.
- Login screen.
- Placement quiz screen.
- Vocabulary card screen.
- Progress and settings screen.
- Supabase client wrapper.
- Recommendation module.
- Vocabulary seed data.

Supabase responsibilities:

- Authentication through magic link or email code.
- Database storage for profiles, vocabulary, placement attempts, and user word progress.
- Row-level security so users can only read and write their own progress and profile.

## Testing

Testing should focus on behavior with product risk:

- Recommendation module selects appropriate next words.
- Placement quiz maps scores to levels correctly.
- Status-button actions update user progress correctly.
- Auth routing sends new users to placement and returning users to the vocabulary card.
- Display settings correctly show Simplified, Traditional, or both.

## Delivery

The local project should be initialized as a Git repository. After implementation is complete and verified, create a GitHub repository and push the app there. The repository should include setup instructions for local development and required Supabase environment variables.

