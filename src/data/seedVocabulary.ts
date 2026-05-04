import type { VocabularyEntry } from '../types';

export const seedVocabulary: VocabularyEntry[] = [
  word('brave', '勇敢的', '勇敢的', 'yǒng gǎn de', 'She made a brave choice.', '她做了一个勇敢的选择。', '她做了一個勇敢的選擇。', 'beginner', ['character']),
  word('calm', '冷静的', '冷靜的', 'lěng jìng de', 'Stay calm during the test.', '考试时保持冷静。', '考試時保持冷靜。', 'beginner', ['emotion']),
  word('curious', '好奇的', '好奇的', 'hào qí de', 'The child is curious about stars.', '这个孩子对星星很好奇。', '這個孩子對星星很好奇。', 'beginner', ['character']),
  word('daily', '每日的', '每日的', 'měi rì de', 'This is my daily habit.', '这是我的每日习惯。', '這是我的每日習慣。', 'beginner', ['routine']),
  word('easy', '容易的', '容易的', 'róng yì de', 'The first lesson is easy.', '第一课很容易。', '第一課很容易。', 'beginner', ['study']),
  word('focus', '专注', '專注', 'zhuān zhù', 'Focus on one word at a time.', '一次专注一个单词。', '一次專注一個單詞。', 'beginner', ['study']),
  word('happy', '开心的', '開心的', 'kāi xīn de', 'I feel happy today.', '我今天很开心。', '我今天很開心。', 'beginner', ['emotion']),
  word('learn', '学习', '學習', 'xué xí', 'We learn a new word.', '我们学习一个新单词。', '我們學習一個新單詞。', 'beginner', ['study']),
  word('simple', '简单的', '簡單的', 'jiǎn dān de', 'Use a simple sentence.', '使用一个简单的句子。', '使用一個簡單的句子。', 'beginner', ['communication']),
  word('travel', '旅行', '旅行', 'lǚ xíng', 'Travel helps me learn.', '旅行帮助我学习。', '旅行幫助我學習。', 'beginner', ['travel']),
  word('adapt', '适应', '適應', 'shì yìng', 'The app adapts to your level.', '这个应用会适应你的水平。', '這個應用會適應你的水平。', 'intermediate', ['learning']),
  word('confident', '有信心的', '有信心的', 'yǒu xìn xīn de', 'She feels confident speaking Chinese.', '她说中文很有信心。', '她說中文很有信心。', 'intermediate', ['emotion']),
  word('consistent', '一致的', '一致的', 'yí zhì de', 'Consistent practice matters.', '一致的练习很重要。', '一致的練習很重要。', 'intermediate', ['study']),
  word('context', '语境', '語境', 'yǔ jìng', 'Context makes the word clear.', '语境让这个词更清楚。', '語境讓這個詞更清楚。', 'intermediate', ['communication']),
  word('improve', '改进', '改進', 'gǎi jìn', 'I want to improve my vocabulary.', '我想改进我的词汇量。', '我想改進我的詞彙量。', 'intermediate', ['study']),
  word('patient', '有耐心的', '有耐心的', 'yǒu nài xīn de', 'A patient teacher helps beginners.', '有耐心的老师会帮助初学者。', '有耐心的老師會幫助初學者。', 'intermediate', ['character']),
  word('practice', '练习', '練習', 'liàn xí', 'Practice a little every day.', '每天练习一点。', '每天練習一點。', 'intermediate', ['study']),
  word('resilient', '有韧性的', '有韌性的', 'yǒu rèn xìng de', 'The team stayed resilient.', '这个团队保持韧性。', '這個團隊保持韌性。', 'intermediate', ['character']),
  word('specific', '具体的', '具體的', 'jù tǐ de', 'Use a specific example.', '使用一个具体的例子。', '使用一個具體的例子。', 'intermediate', ['communication']),
  word('strategy', '策略', '策略', 'cè lüè', 'A good strategy saves time.', '好的策略会节省时间。', '好的策略會節省時間。', 'intermediate', ['work']),
  word('ambiguous', '模棱两可的', '模稜兩可的', 'mó léng liǎng kě de', 'The answer was ambiguous.', '答案是模棱两可的。', '答案是模稜兩可的。', 'advanced', ['communication']),
  word('comprehensive', '全面的', '全面的', 'quán miàn de', 'The course is comprehensive.', '这门课程很全面。', '這門課程很全面。', 'advanced', ['study']),
  word('deliberate', '有意识的', '有意識的', 'yǒu yì shí de', 'Deliberate practice improves memory.', '有意识的练习会提升记忆。', '有意識的練習會提升記憶。', 'advanced', ['study']),
  word('efficient', '高效的', '高效的', 'gāo xiào de', 'An efficient method helps busy people.', '高效的方法帮助忙碌的人。', '高效的方法幫助忙碌的人。', 'advanced', ['work']),
  word('interpret', '解释', '解釋', 'jiě shì', 'Can you interpret this sentence?', '你能解释这个句子吗？', '你能解釋這個句子嗎？', 'advanced', ['communication']),
  word('nuance', '细微差别', '細微差別', 'xì wēi chā bié', 'This word has a subtle nuance.', '这个词有细微差别。', '這個詞有細微差別。', 'advanced', ['communication']),
  word('prioritize', '优先处理', '優先處理', 'yōu xiān chǔ lǐ', 'Prioritize the most useful words.', '优先处理最有用的单词。', '優先處理最有用的單詞。', 'advanced', ['work']),
  word('retain', '保留', '保留', 'bǎo liú', 'Review helps you retain words.', '复习帮助你保留词汇记忆。', '複習幫助你保留詞彙記憶。', 'advanced', ['study']),
  word('sophisticated', '复杂精致的', '複雜精緻的', 'fù zá jīng zhì de', 'The design feels sophisticated.', '这个设计感觉复杂而精致。', '這個設計感覺複雜而精緻。', 'advanced', ['design']),
  word('transparent', '透明的', '透明的', 'tòu míng de', 'Transparent feedback builds trust.', '透明的反馈建立信任。', '透明的回饋建立信任。', 'advanced', ['work'])
];

function word(
  term: string,
  simplified: string,
  traditional: string,
  pinyin: string,
  exampleEn: string,
  exampleZhSimplified: string,
  exampleZhTraditional: string,
  difficulty: VocabularyEntry['difficulty'],
  tags: string[]
): VocabularyEntry {
  return {
    id: term.toLowerCase().replace(/\s+/g, '-'),
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    term,
    simplified,
    traditional,
    pinyin,
    exampleEn,
    exampleZhSimplified,
    exampleZhTraditional,
    difficulty,
    tags
  };
}
