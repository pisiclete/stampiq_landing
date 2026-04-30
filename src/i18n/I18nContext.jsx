import React, { createContext, useContext } from 'react';
import mainTranslations from './translations.json';
import legalTranslations from './translations-legal.json';

export const SUPPORTED_LANGS = ['en', 'de', 'nl', 'pl', 'fr', 'it'];

const dict = {};
for (const item of [...mainTranslations, ...legalTranslations]) {
  if (!item.key) continue;
  dict[item.key] = {};
  for (const lang of SUPPORTED_LANGS) {
    dict[item.key][lang] = item[lang];
  }
}

const I18nContext = createContext({ lang: 'en', dict });

export const I18nProvider = ({ lang, children }) => (
  <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>
);

export const useLang = () => useContext(I18nContext).lang;

// Translations contain raw HTML with inline `<a href="../privacy.html">` etc.
// Rewrite those to the right per-language path: /privacy.html for en,
// /de/privacy.html for de, etc.
const withLang = (html, lang) => {
  const root = lang === 'en' ? '' : `/${lang}`;
  return html.replace(
    /(href=["'])(?:\.\.\/|\/)?((?:privacy|terms|delete-account)\.html)(?:\?lang=[a-z]+)?(["'])/g,
    `$1${root}/$2$3`
  );
};

export const useT = () => {
  const { lang, dict } = useContext(I18nContext);
  return (key) => {
    const entry = dict[key];
    if (!entry) return '';
    const value = entry[lang] ?? entry.en ?? '';
    return withLang(value, lang);
  };
};
