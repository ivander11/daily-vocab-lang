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
npm run android:sync
```

## Android

This project includes a Capacitor Android app in `android/`.

To run it on Android:

1. Install Android Studio.
2. Install an Android SDK through Android Studio's SDK Manager.
3. Set `ANDROID_HOME`, or create `android/local.properties` with your SDK path:

```properties
sdk.dir=/home/YOUR_USER/Android/Sdk
```

4. Sync the web app into Android:

```bash
npm run android:sync
```

5. Open the native project:

```bash
npm run android:open
```

6. Build/run from Android Studio, or run:

```bash
cd android
./gradlew assembleDebug
```

The Android project includes a home-screen widget provider. Android lock-screen widget support depends on Android version and device support; on unsupported devices the widget is available as a normal home-screen widget.

## Product Scope

- Chinese to English first.
- Simplified or Traditional display modes.
- Placement quiz for starting level.
- Quick status buttons: Know, Learning, New.
- Recommendation logic that favors unseen and learning words near the user's level.
