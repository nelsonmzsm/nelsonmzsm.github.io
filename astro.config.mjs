// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 独自ドメイン取得後はこの site を差し替える（sitemap・OGP・canonical に反映される）
// 現在は GitHub Pages（nelsonmzsm.github.io、ユーザーサイトのためbase不要）で公開中
export default defineConfig({
  site: 'https://nelsonmzsm.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
