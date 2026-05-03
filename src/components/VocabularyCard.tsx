import { Check, HelpCircle, RotateCcw } from 'lucide-react';
import { useMemo } from 'react';
import { selectNextWord } from '../lib/recommendation';
import type { Profile, UserWordProgress, VocabularyEntry, WordStatus } from '../types';

interface VocabularyCardProps {
  vocabulary: VocabularyEntry[];
  progress: UserWordProgress[];
  profile: Profile;
  onStatus: (vocabularyId: string, status: WordStatus) => void;
}

export function VocabularyCard({ vocabulary, progress, profile, onStatus }: VocabularyCardProps) {
  const word = useMemo(
    () => selectNextWord(vocabulary, progress, profile),
    [vocabulary, progress, profile]
  );

  if (!word) {
    return (
      <section className="empty-state">
        <h1>No words available</h1>
      </section>
    );
  }

  return (
    <section className="word-screen">
      <div className="lock-meta">
        <span>9:41</span>
        <span>{profile.estimatedLevel}</span>
      </div>
      <article className="word-card">
        <p className="eyebrow">Next word</p>
        <h1>{word.term}</h1>
        <ChineseDisplay word={word} mode={profile.chineseDisplayMode} />
        <p className="pinyin">{word.pinyin}</p>
        <div className="example">
          <span>{word.exampleEn}</span>
          <span>
            {profile.chineseDisplayMode === 'simplified'
              ? word.exampleZhSimplified
              : word.exampleZhTraditional}
          </span>
        </div>
      </article>
      <div className="status-grid">
        <button type="button" className="status-button" onClick={() => onStatus(word.id, 'known')}>
          <Check size={20} />
          <span>Know</span>
        </button>
        <button type="button" className="status-button primary" onClick={() => onStatus(word.id, 'learning')}>
          <RotateCcw size={20} />
          <span>Learning</span>
        </button>
        <button type="button" className="status-button" onClick={() => onStatus(word.id, 'new')}>
          <HelpCircle size={20} />
          <span>New</span>
        </button>
      </div>
    </section>
  );
}

function ChineseDisplay({
  word,
  mode
}: {
  word: VocabularyEntry;
  mode: Profile['chineseDisplayMode'];
}) {
  if (mode === 'simplified') return <p className="translation">{word.simplified}</p>;
  if (mode === 'traditional') return <p className="translation">{word.traditional}</p>;

  return (
    <div className="dual-translation">
      <span>{word.traditional}</span>
      <span>{word.simplified}</span>
    </div>
  );
}

