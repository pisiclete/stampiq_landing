import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://stampiq.io',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
          fr: 'fr',
          it: 'it',
          nl: 'nl',
          pl: 'pl',
        },
      },
      // We use build.format: 'preserve', so legal pages serve at /privacy.html
      // (not /privacy) and language roots serve at /de/ (with trailing slash).
      // Astro's sitemap defaults to clean URLs — fix each entry to match the
      // actual served URL.
      serialize(item) {
        let url = item.url;
        if (/\/(privacy|terms|delete-account)$/.test(url)) {
          url = url + '.html';
        } else if (/\/(de|fr|it|nl|pl)$/.test(url)) {
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
    build: {
      assetsInlineLimit: 0,
    },
  },
});
