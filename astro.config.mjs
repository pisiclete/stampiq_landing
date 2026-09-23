import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { liveBlogLangs, redirectPaths } from './src/lib/blog-files.mjs';
import { PAGE_LANGS, PREFIX_GROUP } from './src/i18n/langs.mjs';

const blogRedirects = new Set(redirectPaths().map((p) => `https://stampiq.io${p}`));

export default defineConfig({
  site: 'https://stampiq.io',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: Object.fromEntries(PAGE_LANGS.map((lang) => [lang, lang])),
      },
      // We use build.format: 'preserve', so legal pages serve at /privacy.html
      // (not /privacy) and language roots serve at /de/ (with trailing slash).
      // Astro's sitemap defaults to clean URLs — fix each entry to match the
      // actual served URL.
      filter: (page) => !blogRedirects.has(page.endsWith('/') ? page : `${page}/`),
      serialize(item) {
        let url = item.url;
        if (/\/(privacy|terms|delete-account)$/.test(url)) {
          url = url + '.html';
        } else if (new RegExp(`/(${PREFIX_GROUP})$`).test(url) || /\/blog(\/[a-z0-9-]+)?$/.test(url)) {
          url = url + '/';
        }
        return { ...item, url };
      },
    }),
  ],
  build: {
    // 'preserve' keeps named pages as .html (so /privacy.html stays canonical
    // for app/store deep-links), while index.astro inside a directory still
    // serves as a clean trailing-slash URL (/, /de/, /fr/, ...).
    format: 'preserve',
  },
  vite: {
    define: {
      __BLOG_LANGS_LIVE__: JSON.stringify(liveBlogLangs()),
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
});
