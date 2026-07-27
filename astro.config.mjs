// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 独自ドメイン取得後はこの site を差し替える（sitemap・OGP・canonical に反映される）
export default defineConfig({
  site: 'https://nelson-site.pages.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
