// The cockpit (ops.stampiq.io) writes these files when a post is published.
// A file that does not match the schema fails the build, so the deploy stops
// and the live site keeps the previous version.
import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { showFixtures } from './lib/blog-files.mjs';

// Must match BLOG_LANGS in src/i18n/langs.mjs and LANGS in
// stampiq_cockpit/backend/blog/constants.py.
const LANGS = ['en', 'de', 'fr', 'it', 'nl', 'pl', 'cs', 'sk', 'ro', 'hu', 'da'] as const;

const localized = z.object(
  Object.fromEntries(LANGS.map((l) => [l, z.string()])) as Record<(typeof LANGS)[number], z.ZodString>,
);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const market = z.string().regex(/^[A-Z]{2}$/);
const src = z.string().regex(/^(https:\/\/|\/|img\/)/);
const url = z.string().url();

const image = z.object({
  src,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  variants: z.array(z.object({ src, width: z.number().int().positive() })).optional(),
});

// Photos taken from outside sources carry their credit; our own screenshots do not.
const credited = image.extend({
  caption: localized.optional(),
  credit: z.string().optional(),
  source_url: url.optional(),
});

const button = z.object({ label: localized, href: z.string().min(1), primary: z.boolean().optional() });
const side = z.enum(['left', 'right']).optional();
const background = z.enum(['white', 'grey']).optional();

const SIGI_POSES = ['waving', 'magnifying', 'thinking', 'thumbs-up', 'celebrating', 'stamp'] as const;

const stamp = z.object({
  stamp_id: z.string().min(1),
  image,
  name: localized,
  country: market,
  year: z.number().int().optional(),
});

// A GIF uploaded in the cockpit is converted to a silent looping video, which is
// far smaller; a small GIF can also be used as a plain photo.
const animation = z.object({
  src: z.string().regex(/^(https:\/\/|\/).+\.(mp4|webm)$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  poster: src.optional(),
  caption: localized.optional(),
  credit: z.string().optional(),
  source_url: url.optional(),
});

// A phone frame holds either a screenshot or a silent looping recording of the
// app. The cockpit refuses a phone visual that carries neither or both.
const phoneVisual = z.object({
  type: z.literal('phone'),
  image: image.optional(),
  animation: animation.optional(),
  sigi: z.enum(SIGI_POSES).optional(),
});

const visual = z.discriminatedUnion('type', [
  z.object({ type: z.literal('photo'), image: credited }),
  z.object({ type: z.literal('animation'), animation }),
  phoneVisual,
  z.object({ type: z.literal('map'), image: credited, query: z.string().min(1), link: url.optional() }),
  z.object({ type: z.literal('stamp'), stamp }),
]);

const block = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('text'),
    label: localized,
    title: localized,
    paragraphs: z.array(localized),
    address: z.string().optional(),
    buttons: z.array(button).optional(),
    visual: visual.optional(),
    side,
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('steps'),
    label: localized,
    title: localized,
    intro: localized.optional(),
    steps: z.array(localized).max(5),
    visual: visual.optional(),
    side,
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('checklist'),
    label: localized,
    title: localized,
    items: z.array(localized).max(8),
    columns: z.union([z.literal(1), z.literal(2)]).optional(),
    background,
  }),
  z.object({ id: z.string(), type: z.literal('wide-photo'), image: credited, background }),
  z.object({ id: z.string(), type: z.literal('wide-animation'), animation, background }),
  z.object({
    id: z.string(),
    type: z.literal('comparison'),
    label: localized,
    title: localized,
    intro: localized.optional(),
    left: z.object({ image, label: localized, note: localized }),
    right: z.object({ image, label: localized, note: localized }),
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('tiles'),
    label: localized,
    title: localized,
    tiles: z
      .array(z.object({ icon: z.string(), title: localized, text: localized }))
      .max(4),
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('numbers'),
    label: localized,
    title: localized,
    numbers: z
      .array(z.object({ value: z.string(), title: localized, text: localized }))
      .max(4),
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('specs'),
    label: localized,
    title: localized,
    rows: z.array(z.object({ label: localized, value: localized })).max(12),
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('issue'),
    date: localized,
    title: localized,
    paragraphs: z.array(localized),
    stamp,
    formats: z
      .array(z.object({ format: localized, value: z.string(), number: z.string() })),
    side,
    background,
  }),
  z.object({
    id: z.string(),
    type: z.literal('video'),
    label: localized,
    title: localized,
    intro: localized.optional(),
    video_url: url,
    thumbnail: image,
    platform: z.enum(['YouTube', 'Instagram', 'Facebook']),
    background,
  }),
  z.object({ id: z.string(), type: z.literal('note'), text: localized, background }),
  z.object({ id: z.string(), type: z.literal('quote'), text: localized, byline: z.string(), background }),
]);

const header = z.object({
  lead: localized,
  date_label: localized.optional(),
  location: z.string().optional(),
  visual: z.discriminatedUnion('type', [
    z.object({ type: z.literal('stamp'), stamp }),
    z.object({ type: z.literal('stamp-fan'), stamps: z.array(stamp).max(4) }),
    phoneVisual,
    z.object({ type: z.literal('poster'), image }),
    z.object({ type: z.literal('sigi'), pose: z.enum(SIGI_POSES) }),
  ]),
  buttons: z.array(button).optional(),
});

// Fixture posts render the block library for design work. They are not committed
// and never appear in a production build.
const postPattern = showFixtures ? ['posts/*.json', 'fixtures/*.json'] : ['posts/*.json'];

const posts = defineCollection({
  loader: glob({ pattern: postPattern, base: './src/content/blog' }),
  schema: z.object({
    category: z.string(),
    markets: z.array(market),
    published_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }).optional(),
    draft: z.boolean().optional(),
    thumbnail: image,
    languages: z.object(
      Object.fromEntries(
        LANGS.map((l) => [
          l,
          z.object({
            slug,
            title: z.string().max(100),
            description: z.string().max(200),
            previous_slugs: z.array(slug).optional(),
          }),
        ]),
      ) as Record<(typeof LANGS)[number], z.ZodTypeAny>,
    ),
    related_title: localized.optional(),
    header,
    blocks: z.array(block),
  }),
});

const categories = defineCollection({
  loader: file('src/content/blog/categories.json'),
  schema: z.object({
    position: z.number().int(),
    languages: z.object(
      Object.fromEntries(
        LANGS.map((l) => [l, z.object({ name: z.string().min(1), slug, description: z.string().min(1).max(200) })]),
      ) as Record<(typeof LANGS)[number], z.ZodTypeAny>,
    ),
  }),
});

export const collections = { posts, categories };
