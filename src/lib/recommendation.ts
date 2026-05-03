import type { Level, Profile, UserWordProgress, VocabularyEntry } from '../types';

const levelWeights: Record<Level, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2
};

export function selectNextWord(
  vocabulary: VocabularyEntry[],
  progress: UserWordProgress[],
  profile: Profile
): VocabularyEntry | null {
  if (vocabulary.length === 0) return null;

  const progressByWord = new Map(progress.map((item) => [item.vocabularyId, item]));
  const scored = vocabulary
    .map((word, index) => ({
      word,
      index,
      progress: progressByWord.get(word.id),
      score: scoreWord(word, progressByWord.get(word.id), profile)
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (!a.progress && !b.progress) return a.word.term.localeCompare(b.word.term);
      if (a.progress?.status === 'known' && b.progress?.status === 'known') {
        return a.index - b.index;
      }
      return a.index - b.index;
    });

  return scored[0]?.word ?? null;
}

function scoreWord(
  word: VocabularyEntry,
  progress: UserWordProgress | undefined,
  profile: Profile
) {
  const distance = Math.abs(levelWeights[word.difficulty] - levelWeights[profile.estimatedLevel]);
  const isAboveUserLevel = levelWeights[word.difficulty] > levelWeights[profile.estimatedLevel];
  let score = 100 - distance * 25 - (isAboveUserLevel ? 10 : 0);

  if (!progress) score += 30;
  if (progress?.status === 'learning') score += 40;
  if (progress?.status === 'new') score += 10;
  if (progress?.status === 'known') score -= 60 + progress.timesSeen * 2;

  return score;
}
