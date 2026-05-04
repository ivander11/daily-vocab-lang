import { describe, expect, it } from 'vitest';
import { splitHighlightedText } from '../lib/highlight';

describe('splitHighlightedText', () => {
  it('splits text around the vocabulary phrase', () => {
    expect(splitHighlightedText('這是我的筆嗎？', '筆')).toEqual([
      { text: '這是我的', highlighted: false },
      { text: '筆', highlighted: true },
      { text: '嗎？', highlighted: false }
    ]);
  });

  it('returns the full text when the phrase is not present', () => {
    expect(splitHighlightedText('這是我的書嗎？', '筆')).toEqual([
      { text: '這是我的書嗎？', highlighted: false }
    ]);
  });
});
