import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // テスト環境（DOM APIを使うため jsdom を指定）
    environment: 'jsdom',

    // グローバル設定（describe, it, expect を import なしで使える）
    globals: true,

    // セットアップファイル（jest-domのマッチャーを読み込む）
    setupFiles: ['./src/test/setup.ts'],
  },
});
