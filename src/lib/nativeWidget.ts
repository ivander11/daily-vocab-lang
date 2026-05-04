import { registerPlugin } from '@capacitor/core';

export interface VocabularyWidgetPayload {
  chinese: string;
  pinyin: string;
  meaning: string;
  exampleChinese: string;
  exampleEnglish: string;
}

interface VocabularyWidgetPlugin {
  update(options: VocabularyWidgetPayload): Promise<void>;
}

const VocabularyWidget = registerPlugin<VocabularyWidgetPlugin>('VocabularyWidget', {
  web: () => ({
    async update() {
      return undefined;
    }
  })
});

export async function updateNativeWidget(payload: VocabularyWidgetPayload) {
  try {
    await VocabularyWidget.update(payload);
  } catch {
    // Browser/demo mode has no native widget host.
  }
}

