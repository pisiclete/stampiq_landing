// StampIQ post-launch landing — translation loader
// Mirrors the data-i18n / DOM-walker pattern from the legal pages,
// adapted for React (Babel-in-browser): a MutationObserver re-applies
// translations after React re-renders.

(function () {
  const SUPPORTED = ['en', 'de', 'nl', 'pl', 'fr', 'it'];

  let dict = {};               // { key: { en: '…', de: '…', … } }
  let currentLang = 'en';
  let loaded = false;
  let observer = null;

  function pickLanguage() {
    const url = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('language');
    const browser = (navigator.language || 'en').split('-')[0];
    if (url && SUPPORTED.includes(url)) return url;
    if (saved && SUPPORTED.includes(saved)) return saved;
    if (SUPPORTED.includes(browser)) return browser;
    return 'en';
  }

  function applyOne(el, lang) {
    const key = el.getAttribute('data-i18n');
    const entry = dict[key];
    if (!entry) return;
    // Fall back to English if the requested language is missing/empty for this key
    const value = entry[lang] || entry.en;
    if (!value) return;
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.innerHTML = value;
    }
  }

  function applyAll(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => applyOne(el, lang));
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
  }

  function watchForNewNodes() {
    if (observer) return;
    observer = new MutationObserver(mutations => {
      if (!loaded) return;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.hasAttribute && node.hasAttribute('data-i18n')) applyOne(node, currentLang);
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-i18n]').forEach(el => applyOne(el, currentLang));
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function load() {
    try {
      const res = await fetch('translations.json');
      const list = await res.json();
      dict = {};
      list.forEach(item => {
        if (!item.key) return;
        dict[item.key] = SUPPORTED.reduce((acc, lang) => {
          acc[lang] = item[lang];
          return acc;
        }, {});
      });
      loaded = true;
      currentLang = pickLanguage();
      applyAll(currentLang);
      watchForNewNodes();
    } catch (err) {
      console.error('[i18n] failed to load translations.json:', err);
    }
  }

  // LanguageSelector dispatches this from chrome.jsx when the user picks a language
  window.addEventListener('languagechange', (e) => {
    const lang = e.detail && e.detail.lang;
    if (!lang || !SUPPORTED.includes(lang)) return;
    localStorage.setItem('language', lang);
    if (loaded) applyAll(lang);
    else currentLang = lang; // applied after load resolves
  });

  // Wait for React to mount before first apply — app.jsx renders synchronously
  // after Babel transpiles, so DOMContentLoaded + a microtask is enough.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

  // Expose for debugging
  window.i18n = { applyAll, get currentLang() { return currentLang; }, get dict() { return dict; } };
})();
