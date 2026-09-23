// Read by astro.config.mjs, which cannot import astro:content. The pages read
// the same files through the content collections in src/content.config.ts.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { BLOG_LANGS } from '../i18n/langs.mjs';

export { BLOG_LANGS };

// Drafts show in `astro dev` and in a build run with BLOG_DRAFTS=1, never in the
// build the deploy workflow runs.
export const showDrafts = process.env.BLOG_DRAFTS === '1' || process.argv.includes('dev');

// The cockpit preview builds one real draft and sets BLOG_FIXTURES=0, so a fixture
// cannot claim the same URL as the post being previewed.
export const showFixtures = showDrafts && process.env.BLOG_FIXTURES !== '0';

const POSTS_DIR = fileURLToPath(new URL('../content/blog/posts/', import.meta.url));
const FIXTURES_DIR = fileURLToPath(new URL('../content/blog/fixtures/', import.meta.url));

function readDir(dir) {
  try {
    return readdirSync(dir)
      .filter((n) => n.endsWith('.json'))
      .map((n) => JSON.parse(readFileSync(dir + n, 'utf8')));
  } catch {
    return [];
  }
}

export function visiblePostFiles() {
  const posts = [...readDir(POSTS_DIR), ...(showFixtures ? readDir(FIXTURES_DIR) : [])];
  return posts.filter((p) => showDrafts || !p.draft);
}

export const blogRoot = (lang) => (lang === 'en' ? '/blog/' : `/${lang}/blog/`);

// A post file written before the cockpit recorded its languages is in all of them.
const fileLangs = (post) => post.langs ?? BLOG_LANGS;

// The languages with at least one post; only these get a blog and a blog link.
export const liveBlogLangs = () => {
  const posts = visiblePostFiles();
  return BLOG_LANGS.filter((lang) => posts.some((post) => fileLangs(post).includes(lang)));
};

export function redirectPaths() {
  const paths = [];
  for (const post of visiblePostFiles()) {
    for (const lang of fileLangs(post)) {
      for (const old of post.languages?.[lang]?.previous_slugs ?? []) {
        paths.push(`${blogRoot(lang)}${old}/`);
      }
    }
  }
  return paths;
}
