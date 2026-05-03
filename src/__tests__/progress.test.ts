import { describe, expect, it } from 'vitest';
import { summarizeProgress } from '../lib/progress';
import type { UserWordProgress, VocabularyEntry } from '../types';

const vocabulary: VocabularyEntry[] = [
  makeWord('known-word'),
  makeWord('learning-word'),
  makeWord('new-word'),
  makeWord('unseen-word')
];

describe('summarizeProgress', () => {
  it('counts known, learning, new, and unseen words', () => {
    const progress: UserWordProgress[] = [
      makeProgress('known-word', 'known'),
      makeProgress('learning-word', 'learning'),
      makeProgress('new-word', 'new')
    ];

    expect(summarizeProgress(vocabulary, progress)).toEqual({
      known: 1,
      learning: 1,
      new: 1,
      unseen: 1,
      total: 4
    });
  });
});

function makeWord(id: string): VocabularyEntry {
  return {
    id,
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term: id,
    simplified: id,
    traditional: id,
    pinyin: id,
    exampleEn: id,
    exampleZhSimplified: id,
    exampleZhTraditional: id,
    difficulty: 'beginner',
    tags: ['test']
  };
}

function makeProgress(
  vocabularyId: string,
  status: UserWordProgress['status']
): UserWordProgress {
  return {
    userId: 'user-1',
    vocabularyId,
    status,
    timesSeen: 1,
    timesMarkedKnown: status === 'known' ? 1 : 0,
    timesMarkedLearning: status === 'learning' ? 1 : 0,
    timesMarkedNew: status === 'new' ? 1 : 0,
    lastSeenAt: '2026-05-03T00:00:00.000Z',
    updatedAt: '2026-05-03T00:00:00.000Z'
  };
}
