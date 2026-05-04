import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailyvocab.lang',
  appName: 'Daily Vocab',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
