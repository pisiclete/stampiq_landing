import { getCollection } from 'astro:content';
import { Marked } from 'marked';
import { BLOG_LANGS, blogRoot, showDrafts } from './blog-files.mjs';
import { tFor } from '../i18n/lookup.js';

export { BLOG_LANGS, blogRoot, showDrafts };

export const ORIGIN = 'https://stampiq.io';
const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.stampiq.io';

export const postPath = (post, lang) => `${blogRoot(lang)}${post.data.languages[lang].slug}/`;
export const categoryPath = (category, lang) => `${blogRoot(lang)}${category.data.languages[lang].slug}/`;

export async function loadBlog() {
  const categories = (await getCollection('categories')).sort((a, b) => a.data.position - b.data.position);
  const posts = (await getCollection('posts', (p) => showDrafts || !p.data.draft)).sort((a, b) =>
    b.data.published_at.localeCompare(a.data.published_at),
  );
  const byId = new Map(categories.map((c) => [c.id, c]));
  for (const post of posts) {
    if (!byId.has(post.data.category)) {
      throw new Error(`Blog post ${post.id} names category "${post.data.category}", which categories.json does not list.`);
    }
  }
  return { posts, categories: categories.filter((c) => posts.some((p) => p.data.category === c.id)), categoryById: byId };
}

// One route file per language prefix calls this. Every URL under /blog/ for a
// language is a post, a category or a redirect from a post's earlier slug, so a
// collision between them has to fail the build.
export async function blogPaths(langs) {
  const { posts, categories } = await loadBlog();
  if (posts.length === 0) return [];
  const paths = [];
  for (const lang of langs) {
    const params = (path) => (lang === 'en' ? { path } : { lang, path });
    const seen = new Map();
    const claim = (slug, what) => {
      if (seen.has(slug)) throw new Error(`${blogRoot(lang)}${slug}/ is claimed by ${seen.get(slug)} and ${what}.`);
      seen.set(slug, what);
    };
    paths.push({ params: params(undefined), props: { kind: 'index', lang } });
    for (const category of categories) {
      const slug = category.data.languages[lang].slug;
      claim(slug, `category ${category.id}`);
      paths.push({ params: params(slug), props: { kind: 'category', lang, categoryId: category.id } });
    }
    for (const post of posts) {
      const { slug, previous_slugs = [] } = post.data.languages[lang];
      claim(slug, `post ${post.id}`);
      paths.push({ params: params(slug), props: { kind: 'post', lang, postId: post.id } });
      for (const old of previous_slugs) {
        claim(old, `an earlier slug of post ${post.id}`);
        paths.push({ params: params(old), props: { kind: 'redirect', lang, to: postPath(post, lang) } });
      }
    }
  }
  return paths;
}

export function alternatesFor(pathFor) {
  return Object.fromEntries(BLOG_LANGS.map((l) => [l, pathFor(l)]));
}

export const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : lang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Zurich',
  }).format(new Date(iso));

export function formatDayRange(start, end, lang) {
  const fmt = new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' });
  const a = new Date(`${start}T00:00:00Z`);
  if (!end || end === start) return fmt.format(a);
  return fmt.formatRange(a, new Date(`${end}T00:00:00Z`));
}

export const marketFlag = (code) =>
  String.fromCodePoint(...[...(code === 'UK' ? 'GB' : code)].map((c) => 0x1f1a5 + c.charCodeAt(0)));

export function marketName(code, lang) {
  const region = code === 'UK' ? 'GB' : code;
  return new Intl.DisplayNames([lang], { type: 'region' }).of(region) ?? code;
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const markdown = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    heading({ tokens, depth }) {
      const level = depth <= 2 ? 2 : depth === 3 ? 3 : 4;
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
    },
    image({ text }) {
      return escapeHtml(text);
    },
    link({ href, title, tokens }) {
      const external = /^https?:\/\//.test(href) && !href.startsWith(ORIGIN);
      const t = title ? ` title="${escapeHtml(title)}"` : '';
      const rel = external ? ' rel="noopener"' : '';
      return `<a href="${escapeHtml(href)}"${t}${rel}>${this.parser.parseInline(tokens)}</a>`;
    },
  },
});

export const renderMarkdown = (text) => markdown.parseInline(text);

export const srcset = (image) =>
  image.variants?.length ? image.variants.map((v) => `${v.src} ${v.width}w`).join(', ') : undefined;

export async function feedPaths(langs) {
  const { posts } = await loadBlog();
  if (posts.length === 0) return [];
  return langs.map((lang) => ({ params: lang === 'en' ? { feed: 'rss' } : { lang, feed: 'rss' }, props: { lang } }));
}

export async function feedResponse(lang) {
  const { posts } = await loadBlog();
  const items = posts
    .slice(0, 30)
    .map((post) => {
      const { title, description } = post.data.languages[lang];
      const url = `${ORIGIN}${postPath(post, lang)}`;
      return [
        '<item>',
        `<title>${escapeHtml(title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="false">${post.id}-${lang}</guid>`,
        `<pubDate>${new Date(post.data.published_at).toUTCString()}</pubDate>`,
        `<description>${escapeHtml(description)}</description>`,
        '</item>',
      ].join('');
    })
    .join('\n');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>',
    `<title>${escapeHtml(tFor(lang, 'blog.meta_title'))}</title>`,
    `<link>${ORIGIN}${blogRoot(lang)}</link>`,
    `<atom:link href="${ORIGIN}${blogRoot(lang)}rss.xml" rel="self" type="application/rss+xml"/>`,
    `<description>${escapeHtml(tFor(lang, 'blog.meta_description'))}</description>`,
    `<language>${lang}</language>`,
    items,
    '</channel></rss>',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
