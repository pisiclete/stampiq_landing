// Market code helpers, kept out of blog.js so a client component can import
// them: blog.js imports astro:content and is server-only.

// UK is the code the catalog uses; the flag and the region name need GB.
const region = (code) => (code === 'UK' ? 'GB' : code);

export const marketFlag = (code) =>
  String.fromCodePoint(...[...region(code)].map((c) => 0x1f1a5 + c.charCodeAt(0)));

export function marketName(code, lang) {
  return new Intl.DisplayNames([lang], { type: 'region' }).of(region(code)) ?? code;
}
