// Every language the site is published in, in the order the language selector
// shows them. The blog runs on the shorter BLOG_LANGS in lib/blog-files.mjs,
// because the cockpit writes posts in six languages
// (stampiq_cockpit/backend/blog/constants.py); a language added here that the
// cockpit does not write fails the blog content schema on the next deploy.
export const PAGE_LANGS = ['en', 'de', 'fr', 'it', 'nl', 'pl', 'cs', 'sk', 'ro', 'hu', 'da'];

// English serves at the root, every other language behind its own prefix.
export const PREFIXED_LANGS = PAGE_LANGS.filter((lang) => lang !== 'en');

export const PREFIX_GROUP = PREFIXED_LANGS.join('|');

// The languages the cockpit writes blog posts in. Must match
// stampiq_cockpit/backend/blog/constants.py and LANGS in src/content.config.ts.
export const BLOG_LANGS = ['en', 'de', 'fr', 'it', 'nl', 'pl'];
