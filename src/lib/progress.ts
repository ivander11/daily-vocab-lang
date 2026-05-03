import type { ProgressSummary, UserWordProgress, VocabularyEntry } from '../types';

export function summarizeProgress(
  vocabulary: VocabularyEntry[],
  progress: UserWordProgress[]
): ProgressSummary {
  const progressByWord = new Map(progress.map((item) => [item.vocabularyId, item]));
  const summary: ProgressSummary = {
    known: 0,
    learning: 0,
    new: 0,
    unseen: 0,
    total: vocabulary.length
  };

  for (const word of vocabulary) {
    const item = progressByWord.get(word.id);

    if (!item) {
      summary.unseen += 1;
    } else {
      summary[item.status] += 1;
    }
  }

  return summary;
}
