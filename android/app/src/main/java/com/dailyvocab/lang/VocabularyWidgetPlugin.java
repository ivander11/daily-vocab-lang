package com.dailyvocab.lang;

import android.content.Context;
import android.content.SharedPreferences;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "VocabularyWidget")
public class VocabularyWidgetPlugin extends Plugin {
    static final String PREFS_NAME = "DailyVocabWidget";
    static final String KEY_CHINESE = "chinese";
    static final String KEY_PINYIN = "pinyin";
    static final String KEY_MEANING = "meaning";
    static final String KEY_EXAMPLE_CHINESE = "exampleChinese";
    static final String KEY_EXAMPLE_ENGLISH = "exampleEnglish";

    @PluginMethod
    public void update(PluginCall call) {
        Context context = getContext();
        SharedPreferences preferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        preferences
            .edit()
            .putString(KEY_CHINESE, call.getString(KEY_CHINESE, "筆"))
            .putString(KEY_PINYIN, call.getString(KEY_PINYIN, "bǐ"))
            .putString(KEY_MEANING, call.getString(KEY_MEANING, "pen"))
            .putString(KEY_EXAMPLE_CHINESE, call.getString(KEY_EXAMPLE_CHINESE, "這是你的筆嗎？"))
            .putString(KEY_EXAMPLE_ENGLISH, call.getString(KEY_EXAMPLE_ENGLISH, "Is this your pen?"))
            .apply();

        VocabularyWidgetProvider.updateAll(context);
        call.resolve();
    }
}

