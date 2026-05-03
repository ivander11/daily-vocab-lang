import { describe, expect, it } from 'vitest';
import { selectNextWord } from '../lib/recommendation';
import type { Profile, UserWordProgress, VocabularyEntry } from '../types';

const vocabulary: VocabularyEntry[] = [
  makeWord('easy-known', 'calm', 'beginner'),
  makeWord('easy-new', 'brave', 'beginner'),
  makeWord('mid-learning', 'resilient', 'intermediate'),
  makeWord('mid-unseen', 'curious', 'intermediate'),
  makeWord('hard-unseen', 'ambiguous', 'advanced')
];

const profile: Profile = {
  id: 'user-1',
  sourceLanguage: 'zh',
  targetLanguage: 'en',
  chineseDisplayMode: 'both',
  estimatedLevel: 'intermediate',
  placementCompletedAt: '2026-05-03T00:00:00.000Z'
};

describe('selectNextWord', () => {
  it('prefers unseen words near the user level', () => {
    const selected = selectNextWord(vocabulary, [], profile);

    expect(selected?.id).toBe('mid-unseen');
  });

  it('keeps learning words in active rotation before easier known words', () => {
    const progress: UserWordProgress[] = [
      makeProgress('mid-unseen', 'known', 4),
      makeProgress('mid-learning', 'learning', 2),
      makeProgress('easy-new', 'new', 1)
    ];

    const selected = selectNextWord(vocabulary, progress, profile);

    expect(selected?.id).toBe('mid-learning');
  });

  it('deprioritizes known words when other choices exist', () => {
    const progress: UserWordProgress[] = [
      makeProgress('mid-unseen', 'known', 5),
      makeProgress('mid-learning', 'known', 5)
    ];

    const selected = selectNextWord(vocabulary, progress, profile);

    expect(selected?.id).toBe('easy-new');
  });

  it('falls back to a known word when every word has been learned', () => {
    const progress = vocabulary.map((word) => makeProgress(word.id, 'known', 5));

    const selected = selectNextWord(vocabulary, progress, profile);

    expect(selected?.id).toBe('mid-learning');
  });
});

function makeWord(id: string, term: string, difficulty: VocabularyEntry['difficulty']): VocabularyEntry {
  return {
    id,
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term,
    simplified: term,
    traditional: term,
    pinyin: term,
    exampleEn: `Example for ${term}.`,
    exampleZhSimplified: term,
    exampleZhTraditional: term,
    difficulty,
    tags: ['test']
  };
}

function makeProgress(
  vocabularyId: string,
  status: UserWordProgress['status'],
  timesSeen: number
): UserWordProgress {
  return {
    userId: 'user-1',
    vocabularyId,
    status,
    timesSeen,
    timesMarkedKnown: status === 'known' ? 1 : 0,
    timesMarkedLearning: status === 'learning' ? 1 : 0,
    timesMarkedNew: status === 'new' ? 1 : 0,
    lastSeenAt: '2026-05-03T00:00:00.000Z',
    updatedAt: '2026-05-03T00:00:00.000Z'
  };
}
