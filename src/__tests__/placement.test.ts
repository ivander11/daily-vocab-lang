import { describe, expect, it } from 'vitest';
import { buildPlacementQuestions, scorePlacement } from '../lib/placement';
import type { VocabularyEntry } from '../types';

const words: VocabularyEntry[] = [
  {
    id: 'b1',
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term: 'brave',
    simplified: '勇敢的',
    traditional: '勇敢的',
    pinyin: 'yǒng gǎn de',
    exampleEn: 'She made a brave choice.',
    exampleZhSimplified: '她做了一个勇敢的选择。',
    exampleZhTraditional: '她做了一個勇敢的選擇。',
    difficulty: 'beginner',
    tags: ['character']
  },
  {
    id: 'i1',
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term: 'resilient',
    simplified: '有韧性的',
    traditional: '有韌性的',
    pinyin: 'yǒu rèn xìng de',
    exampleEn: 'The team stayed resilient.',
    exampleZhSimplified: '这个团队保持韧性。',
    exampleZhTraditional: '這個團隊保持韌性。',
    difficulty: 'intermediate',
    tags: ['character']
  },
  {
    id: 'a1',
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term: 'ambiguous',
    simplified: '模棱两可的',
    traditional: '模稜兩可的',
    pinyin: 'mó léng liǎng kě de',
    exampleEn: 'The answer was ambiguous.',
    exampleZhSimplified: '答案是模棱两可的。',
    exampleZhTraditional: '答案是模稜兩可的。',
    difficulty: 'advanced',
    tags: ['communication']
  }
];

describe('scorePlacement', () => {
  it('maps low scores to beginner', () => {
    expect(scorePlacement(2, 10)).toBe('beginner');
  });

  it('maps middle scores to intermediate', () => {
    expect(scorePlacement(6, 10)).toBe('intermediate');
  });

  it('maps high scores to advanced', () => {
    expect(scorePlacement(9, 10)).toBe('advanced');
  });
});

describe('buildPlacementQuestions', () => {
  it('builds multiple choice questions across available levels', () => {
    const questions = buildPlacementQuestions(words, 3);

    expect(questions).toHaveLength(3);
    expect(questions.map((question) => question.word.difficulty)).toEqual([
      'beginner',
      'intermediate',
      'advanced'
    ]);
    expect(questions.every((question) => question.choices.length === 3)).toBe(true);
    expect(
      questions.every((question) =>
        question.choices.some((choice) => choice.vocabularyId === question.word.id)
      )
    ).toBe(true);
    expect(questions[0].choices.find((choice) => choice.vocabularyId === 'b1')?.label).toBe(
      'brave'
    );
  });
});
