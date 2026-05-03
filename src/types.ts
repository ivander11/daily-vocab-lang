export type DisplayMode = 'simplified' | 'traditional' | 'both';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type WordStatus = 'new' | 'learning' | 'known';

export interface VocabularyEntry {
  id: string;
  sourceLanguage: 'en' | string;
  targetLanguage: 'zh' | string;
  term: string;
  simplified: string;
  traditional: string;
  pinyin: string;
  exampleEn: string;
  exampleZhSimplified: string;
  exampleZhTraditional: string;
  difficulty: Level;
  tags: string[];
}

export interface UserWordProgress {
  userId: string;
  vocabularyId: string;
  status: WordStatus;
  timesSeen: number;
  timesMarkedKnown: number;
  timesMarkedLearning: number;
  timesMarkedNew: number;
  lastSeenAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  displayName?: string;
  sourceLanguage: string;
  targetLanguage: string;
  chineseDisplayMode: DisplayMode;
  estimatedLevel: Level;
  placementCompletedAt: string | null;
}

export interface PlacementChoice {
  vocabularyId: string;
  label: string;
}

export interface PlacementQuestion {
  word: VocabularyEntry;
  choices: PlacementChoice[];
}

export interface ProgressSummary {
  known: number;
  learning: number;
  new: number;
  unseen: number;
  total: number;
}

