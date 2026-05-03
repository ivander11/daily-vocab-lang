import type { DisplayMode, Level, Profile, UserWordProgress, WordStatus } from '../types';

const profileKey = 'daily-vocab-profile';
const progressKey = 'daily-vocab-progress';

export function createDemoProfile(email: string): Profile {
  return {
    id: email.trim().toLowerCase() || 'demo-user',
    displayName: email.trim().toLowerCase() || 'demo learner',
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    chineseDisplayMode: 'both',
    estimatedLevel: 'beginner',
    placementCompletedAt: null
  };
}

export function loadProfile(): Profile | null {
  const raw = localStorage.getItem(profileKey);
  return raw ? (JSON.parse(raw) as Profile) : null;
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(profileKey, JSON.stringify(profile));
}

export function loadProgress(): UserWordProgress[] {
  const raw = localStorage.getItem(progressKey);
  return raw ? (JSON.parse(raw) as UserWordProgress[]) : [];
}

export function saveDisplayMode(mode: DisplayMode) {
  const profile = loadProfile();
  if (profile) saveProfile({ ...profile, chineseDisplayMode: mode });
}

export function completePlacement(level: Level) {
  const profile = loadProfile();
  if (profile) {
    saveProfile({
      ...profile,
      estimatedLevel: level,
      placementCompletedAt: new Date().toISOString()
    });
  }
}

export function recordWordStatus(userId: string, vocabularyId: string, status: WordStatus) {
  const now = new Date().toISOString();
  const progress = loadProgress();
  const existing = progress.find((item) => item.vocabularyId === vocabularyId);

  if (existing) {
    existing.status = status;
    existing.timesSeen += 1;
    existing.timesMarkedKnown += status === 'known' ? 1 : 0;
    existing.timesMarkedLearning += status === 'learning' ? 1 : 0;
    existing.timesMarkedNew += status === 'new' ? 1 : 0;
    existing.lastSeenAt = now;
    existing.updatedAt = now;
  } else {
    progress.push({
      userId,
      vocabularyId,
      status,
      timesSeen: 1,
      timesMarkedKnown: status === 'known' ? 1 : 0,
      timesMarkedLearning: status === 'learning' ? 1 : 0,
      timesMarkedNew: status === 'new' ? 1 : 0,
      lastSeenAt: now,
      updatedAt: now
    });
  }

  localStorage.setItem(progressKey, JSON.stringify(progress));
}

export function signOutLocal() {
  localStorage.removeItem(profileKey);
  localStorage.removeItem(progressKey);
}
