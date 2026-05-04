export interface TextSegment {
  text: string;
  highlighted: boolean;
}

export function splitHighlightedText(text: string, phrase: string): TextSegment[] {
  if (!phrase) return [{ text, highlighted: false }];

  const index = text.indexOf(phrase);

  if (index === -1) return [{ text, highlighted: false }];

  return [
    { text: text.slice(0, index), highlighted: false },
    { text: phrase, highlighted: true },
    { text: text.slice(index + phrase.length), highlighted: false }
  ].filter((segment) => segment.text.length > 0);
}
