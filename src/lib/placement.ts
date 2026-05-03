import type { Level, PlacementQuestion, VocabularyEntry } from '../types';

const levelOrder: Level[] = ['beginner', 'intermediate', 'advanced'];

export function scorePlacement(correct: number, total: number): Level {
  if (total <= 0) return 'beginner';

  const ratio = correct / total;

  if (ratio >= 0.8) return 'advanced';
  if (ratio >= 0.5) return 'intermediate';
  return 'beginner';
}

export function buildPlacementQuestions(
  vocabulary: VocabularyEntry[],
  count: number
): PlacementQuestion[] {
  const ordered = [...vocabulary].sort((a, b) => {
    return levelOrder.indexOf(a.difficulty) - levelOrder.indexOf(b.difficulty);
  });
  const selected = ordered.slice(0, count);

  return selected.map((word) => ({
    word,
    choices: buildChoices(word, vocabulary)
  }));
}

function buildChoices(word: VocabularyEntry, vocabulary: VocabularyEntry[]) {
  const distractors = vocabulary
    .filter((candidate) => candidate.id !== word.id)
    .slice(0, 2)
    .map((candidate) => ({
      vocabularyId: candidate.id,
      label: `${candidate.traditional} / ${candidate.simplified}`
    }));

  return [
    {
      vocabularyId: word.id,
      label: `${word.traditional} / ${word.simplified}`
    },
    ...distractors
  ].sort((a, b) => a.label.localeCompare(b.label));
}

