import { useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/AppShell';
import { LoginScreen } from './components/LoginScreen';
import { PlacementQuiz } from './components/PlacementQuiz';
import { SettingsScreen } from './components/SettingsScreen';
import { VocabularyCard } from './components/VocabularyCard';
import { seedVocabulary } from './data/seedVocabulary';
import {
  completePlacement,
  createDemoProfile,
  loadProfile,
  loadProgress,
  recordWordStatus,
  saveDisplayMode,
  saveProfile,
  signOutLocal
} from './lib/storage';
import { summarizeProgress } from './lib/progress';
import type { DisplayMode, Level, Profile, UserWordProgress, WordStatus } from './types';

type View = 'card' | 'settings';

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserWordProgress[]>([]);
  const [view, setView] = useState<View>('card');

  useEffect(() => {
    setProfile(loadProfile());
    setProgress(loadProgress());
  }, []);

  const progressSummary = useMemo(
    () => summarizeProgress(seedVocabulary, progress),
    [progress]
  );

  function handleDemoLogin(email: string) {
    const nextProfile = createDemoProfile(email);
    saveProfile(nextProfile);
    setProfile(nextProfile);
  }

  function handlePlacementComplete(level: Level) {
    completePlacement(level);
    const nextProfile = loadProfile();
    setProfile(nextProfile);
  }

  function handleStatus(vocabularyId: string, status: WordStatus) {
    if (!profile) return;
    recordWordStatus(profile.id, vocabularyId, status);
    setProgress(loadProgress());
  }

  function handleDisplayMode(mode: DisplayMode) {
    saveDisplayMode(mode);
    setProfile(loadProfile());
  }

  function handleSignOut() {
    signOutLocal();
    setProfile(null);
    setProgress([]);
  }

  if (!profile) {
    return <LoginScreen onDemoLogin={handleDemoLogin} />;
  }

  if (!profile.placementCompletedAt) {
    return (
      <PlacementQuiz
        vocabulary={seedVocabulary}
        onComplete={handlePlacementComplete}
      />
    );
  }

  return (
    <AppShell activeView={view} onChangeView={setView}>
      {view === 'card' ? (
        <VocabularyCard
          vocabulary={seedVocabulary}
          progress={progress}
          profile={profile}
          onStatus={handleStatus}
        />
      ) : (
        <SettingsScreen
          profile={profile}
          summary={progressSummary}
          onDisplayModeChange={handleDisplayMode}
          onSignOut={handleSignOut}
        />
      )}
    </AppShell>
  );
}

