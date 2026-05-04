import { describe, expect, it } from 'vitest';
import { seedVocabulary } from '../data/seedVocabulary';

const toneMarkPattern = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/i;

describe('seedVocabulary', () => {
  it('uses tone-mark pinyin for every Chinese entry', () => {
    expect(seedVocabulary).toHaveLength(30);
    expect(seedVocabulary.every((word) => toneMarkPattern.test(word.pinyin))).toBe(true);
    expect(seedVocabulary.some((word) => word.pinyin.includes('yong gan'))).toBe(false);
  });
});
