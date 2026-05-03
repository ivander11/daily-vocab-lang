import { useMemo, useState } from 'react';
import { buildPlacementQuestions, scorePlacement } from '../lib/placement';
import type { Level, VocabularyEntry } from '../types';

interface PlacementQuizProps {
  vocabulary: VocabularyEntry[];
  onComplete: (level: Level) => void;
}

export function PlacementQuiz({ vocabulary, onComplete }: PlacementQuizProps) {
  const questions = useMemo(() => buildPlacementQuestions(vocabulary, 9), [vocabulary]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  const question = questions[index];

  function answer(vocabularyId: string) {
    const nextCorrect = correct + (vocabularyId === question.word.id ? 1 : 0);
    const nextIndex = index + 1;

    if (nextIndex >= questions.length) {
      onComplete(scorePlacement(nextCorrect, questions.length));
      return;
    }

    setCorrect(nextCorrect);
    setIndex(nextIndex);
  }

  return (
    <main className="quiz-screen">
      <section className="quiz-panel">
        <p className="eyebrow">Placement {index + 1} / {questions.length}</p>
        <h1>{question.word.term}</h1>
        <p>Choose the closest Chinese meaning.</p>
        <div className="choice-list">
          {question.choices.map((choice) => (
            <button
              type="button"
              className="choice-button"
              key={choice.vocabularyId}
              onClick={() => answer(choice.vocabularyId)}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

