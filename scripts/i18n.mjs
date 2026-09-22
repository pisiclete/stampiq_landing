#!/usr/bin/env node
// Adding a language to src/i18n/langs.mjs leaves its columns empty in the two
// translation files. This prepares the work units for them, merges the finished
// translations back, and checks the result.
//
//   node scripts/i18n.mjs chunk <dir> <lang> [lang...]
//   node scripts/i18n.mjs merge <dir> <lang> [lang...]
//   node scripts/i18n.mjs check [lang...]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_LANGS } from '../src/i18n/langs.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const FILES = {
  ui: path.join(ROOT, 'src/i18n/translations.json'),
  legal: path.join(ROOT, 'src/i18n/translations-legal.json'),
};
const GLOSSARY_DIR = path.join(ROOT, '../stampiq_app/docs/l10n');

// The languages a translator sees beside English, chosen for the closest
// existing rendering of the same copy.
const REFERENCES = {
  cs: ['pl', 'de'],
  sk: ['pl', 'de'],
  ro: ['fr', 'it'],
  hu: ['de', 'pl'],
  da: ['nl', 'de'],
};

const QUOTES = {
  cs: '„ … “', sk: '„ … “', hu: '„ … ”', ro: '„ … ”', da: '» … «',
};

const CHUNK_CHARS = 9000;

const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');

function chunksOf(rows) {
  const out = [];
  let current = [];
  let size = 0;
  for (const row of rows) {
    current.push(row);
    size += row.en.length;
    if (size >= CHUNK_CHARS) {
      out.push(current);
      current = [];
      size = 0;
    }
  }
  if (current.length) out.push(current);
  return out;
}

function glossary(lang) {
  const file = path.join(GLOSSARY_DIR, `glossary_en_${lang}.tsv`);
  if (!fs.existsSync(file)) throw new Error(`No glossary at ${file}`);
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .slice(1)
    .filter((line) => line.includes('\t'))
    .map((line) => line.split('\t'))
    .filter(([a, b]) => a && b)
    .map(([a, b]) => `${a.trim()} = ${b.trim()}`)
    .join('; ');
}

function chunk(dir, langs) {
  fs.mkdirSync(dir, { recursive: true });
  for (const lang of langs) {
    const refs = REFERENCES[lang] ?? ['de'];
    const langDir = path.join(dir, lang);
    fs.mkdirSync(path.join(langDir, 'out'), { recursive: true });
    fs.writeFileSync(path.join(langDir, 'glossary.txt'), glossary(lang) + '\n', 'utf8');
    let total = 0;
    for (const [area, file] of Object.entries(FILES)) {
      const rows = read(file);
      const parts = chunksOf(rows);
      parts.forEach((part, i) => {
        const name = `${area}-${String(i + 1).padStart(2, '0')}`;
        write(path.join(langDir, `${name}.json`), {
          lang,
          chunk: name,
          quotes: QUOTES[lang] ?? null,
          references: refs,
          rows: part.map((r) => {
            const row = { key: r.key, en: r.en };
            if (r['section/location']) row.where = r['section/location'];
            for (const ref of refs) row[ref] = r[ref];
            return row;
          }),
        });
        total += part.length;
      });
    }
    console.log(`${lang}: ${total} strings in ${fs.readdirSync(langDir).filter((f) => f.endsWith('.json')).length} chunks -> ${langDir}`);
  }
}

function merge(dir, langs) {
  for (const lang of langs) {
    const outDir = path.join(dir, lang, 'out');
    const done = {};
    for (const file of fs.existsSync(outDir) ? fs.readdirSync(outDir) : []) {
      if (!file.endsWith('.json')) continue;
      Object.assign(done, read(path.join(outDir, file)));
    }
    for (const [area, file] of Object.entries(FILES)) {
      const rows = read(file);
      const missing = [];
      for (const row of rows) {
        const value = done[row.key];
        if (typeof value === 'string' && value.trim()) row[lang] = value;
        else if (!row[lang]) missing.push(row.key);
      }
      write(file, rows);
      const state = missing.length ? `${missing.length} still missing (first: ${missing.slice(0, 3).join(', ')})` : 'complete';
      console.log(`${lang} ${area}: ${state}`);
    }
  }
}

const TAGS = (value) => (value.match(/<[^>]+>/g) ?? []).map((t) => t.replace(/\s+/g, ' ')).join('');
const PLACEHOLDERS = (value) => (value.match(/\{[^}]*\}/g) ?? []).sort().join(',');
const HREFS = (value) => (value.match(/href="[^"]*"/g) ?? []).sort().join(',');

function check(langs) {
  let problems = 0;
  const note = (msg) => { problems++; console.log(msg); };
  for (const [area, file] of Object.entries(FILES)) {
    for (const row of read(file)) {
      for (const lang of langs) {
        const value = row[lang];
        if (value === undefined) { note(`${area} ${row.key} [${lang}]: column missing`); continue; }
        if (typeof value !== 'string' || !value.trim()) { note(`${area} ${row.key} [${lang}]: empty`); continue; }
        if (TAGS(value) !== TAGS(row.en)) note(`${area} ${row.key} [${lang}]: HTML differs from EN`);
        if (PLACEHOLDERS(value) !== PLACEHOLDERS(row.en)) note(`${area} ${row.key} [${lang}]: placeholders differ from EN`);
        if (HREFS(value) !== HREFS(row.en)) note(`${area} ${row.key} [${lang}]: links differ from EN`);
      }
    }
  }
  const columns = new Set(Object.keys(read(FILES.ui)[0]));
  for (const lang of PAGE_LANGS) if (!columns.has(lang)) note(`translations.json has no column for ${lang}`);
  console.log(problems ? `\n${problems} problem(s)` : '\nno problems');
  process.exitCode = problems ? 1 : 0;
}

function apply(dir, langs) {
  for (const lang of langs) {
    for (const [area, file] of Object.entries(FILES)) {
      const patchPath = path.join(dir, lang, `patch-${area}.json`);
      if (!fs.existsSync(patchPath)) { console.log(`${lang} ${area}: no patch`); continue; }
      const patch = read(patchPath);
      const rows = read(file);
      let applied = 0;
      const unknown = [];
      const byKey = new Map(rows.map((r) => [r.key, r]));
      for (const [key, value] of Object.entries(patch)) {
        const row = byKey.get(key);
        if (!row) { unknown.push(key); continue; }
        row[lang] = value;
        applied++;
      }
      write(file, rows);
      console.log(`${lang} ${area}: ${applied} applied${unknown.length ? `, ${unknown.length} unknown key(s): ${unknown.join(', ')}` : ''}`);
    }
  }
}

const [command, ...rest] = process.argv.slice(2);
if (command === 'apply') apply(rest[0], rest.slice(1));
else if (command === 'chunk') chunk(rest[0], rest.slice(1));
else if (command === 'merge') merge(rest[0], rest.slice(1));
else if (command === 'check') check(rest.length ? rest : PAGE_LANGS);
else {
  console.error('Usage: i18n.mjs chunk <dir> <lang...> | merge <dir> <lang...> | apply <dir> <lang...> | check [lang...]');
  process.exitCode = 1;
}
