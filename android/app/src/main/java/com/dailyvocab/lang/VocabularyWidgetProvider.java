package com.dailyvocab.lang;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.widget.RemoteViews;

public class VocabularyWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }

    static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName provider = new ComponentName(context, VocabularyWidgetProvider.class);
        int[] widgetIds = manager.getAppWidgetIds(provider);

        for (int widgetId : widgetIds) {
            updateWidget(context, manager, widgetId);
        }
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        SharedPreferences preferences = context.getSharedPreferences(
            VocabularyWidgetPlugin.PREFS_NAME,
            Context.MODE_PRIVATE
        );
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_vocabulary);

        views.setTextViewText(
            R.id.widget_chinese,
            preferences.getString(VocabularyWidgetPlugin.KEY_CHINESE, "筆")
        );
        views.setTextViewText(
            R.id.widget_pinyin,
            preferences.getString(VocabularyWidgetPlugin.KEY_PINYIN, "bǐ")
        );
        views.setTextViewText(
            R.id.widget_meaning,
            preferences.getString(VocabularyWidgetPlugin.KEY_MEANING, "pen")
        );
        views.setTextViewText(
            R.id.widget_example_chinese,
            preferences.getString(VocabularyWidgetPlugin.KEY_EXAMPLE_CHINESE, "這是你的筆嗎？")
        );
        views.setTextViewText(
            R.id.widget_example_english,
            preferences.getString(VocabularyWidgetPlugin.KEY_EXAMPLE_ENGLISH, "Is this your pen?")
        );

        Intent launchIntent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            0,
            launchIntent,
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                ? PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT
                : PendingIntent.FLAG_UPDATE_CURRENT
        );
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);

        manager.updateAppWidget(widgetId, views);
    }
}

