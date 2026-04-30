// Build-time translation lookup for use in Astro frontmatter (where useT()
// can't be called because it's a React hook).
import main from './translations.json';
import legal from './translations-legal.json';

const all = [...main, ...legal];

export function tFor(lang, key) {
  const e = all.find(x => x.key === key);
  return e?.[lang] ?? e?.en ?? '';
}
