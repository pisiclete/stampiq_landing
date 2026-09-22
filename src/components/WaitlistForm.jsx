// StampIQ — waitlist form. Posts to the public waitlist API, which stores the
// address unconfirmed and sends a confirmation mail.
import React, { useEffect, useState } from 'react';
import { useT, useLang } from '../i18n/I18nContext';
import { PAGE_LANGS } from '../i18n/langs.mjs';
import { marketFlag, marketName } from '../lib/markets.mjs';
import '../styles/waitlist.css';

const API = 'https://api.stampiq.io/api/v1/waitlist/';

// The markets the app is not sold in. LIVE markets are left out on purpose:
// someone there can already download the app. Must match MARKETS in
// stampiq_backend/api/v1/waitlist/constants.py.
const PROSPECT_MARKETS = ['CZ', 'SK', 'HU', 'RO', 'DK', 'FR', 'IT', 'BE', 'LU', 'UK', 'VA'];
const OTHER = 'XX';

// Which market a page language points at, for the preselection while the
// country lookup is in flight. A language is a weaker signal than the IP.
const MARKET_FOR_LANG = { cs: 'CZ', sk: 'SK', hu: 'HU', ro: 'RO', da: 'DK', fr: 'FR', it: 'IT' };

// Each language's own name for itself. Written out rather than taken from
// Intl.DisplayNames, which follows each language's own capitalisation rule
// (français, polski, dansk are lowercase) and differs between browsers.
const LANGUAGE_NAMES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
  cs: 'Čeština',
  sk: 'Slovenčina',
  ro: 'Română',
  hu: 'Magyar',
  da: 'Dansk',
};

export default function WaitlistForm() {
  const t = useT();
  const lang = useLang();
  const [email, setEmail] = useState('');
  const [countries, setCountries] = useState(() => (MARKET_FOR_LANG[lang] ? [MARKET_FOR_LANG[lang]] : []));
  const [language, setLanguage] = useState(lang);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(API)
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => {
        if (cancelled || !body || !body.country) return;
        setCountries((current) => (current.includes(body.country) ? current : [...current, body.country]));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = (code) =>
    setCountries((current) =>
      current.includes(code) ? current.filter((c) => c !== code) : [...current, code]
    );

  async function onSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    if (countries.length === 0) {
      setError(t('waitlist.error_countries'));
      return;
    }
    setError('');
    setStatus('submitting');
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), countries, language, source: `web:${lang}` }),
      });
      setStatus(response.ok ? 'success' : 'error');
      if (!response.ok) setError(t('waitlist.error'));
    } catch {
      setStatus('error');
      setError(t('waitlist.error'));
    }
  }

  if (status === 'success') {
    return <p className="siq-waitlist-done">{t('waitlist.success')}</p>;
  }

  const busy = status === 'submitting';

  return (
    <form className="siq-waitlist" onSubmit={onSubmit}>
      <p className="siq-waitlist-intro">{t('waitlist.intro')}</p>

      <label htmlFor="waitlist-email">{t('waitlist.email_label')}</label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={busy}
        className="siq-input siq-waitlist-field"
      />

      <fieldset className="siq-waitlist-group">
        <legend>{t('waitlist.countries_label')}</legend>
        <p className="siq-waitlist-hint">{t('waitlist.countries_hint')}</p>
        <div className="siq-waitlist-chips">
          {PROSPECT_MARKETS.map((code) => (
            <button
              key={code}
              type="button"
              className="siq-waitlist-chip"
              aria-pressed={countries.includes(code)}
              onClick={() => toggle(code)}
            >
              <span className="flag" aria-hidden="true">{marketFlag(code)}</span>
              {marketName(code, lang)}
            </button>
          ))}
          <button
            type="button"
            className="siq-waitlist-chip"
            aria-pressed={countries.includes(OTHER)}
            onClick={() => toggle(OTHER)}
          >
            {t('waitlist.country_other')}
          </button>
        </div>
      </fieldset>

      <div className="siq-waitlist-group">
        <label htmlFor="waitlist-language">{t('waitlist.language_label')}</label>
        <select
          id="waitlist-language"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={busy}
          className="siq-input siq-waitlist-field siq-waitlist-select"
        >
          {PAGE_LANGS.map((code) => (
            <option key={code} value={code}>{LANGUAGE_NAMES[code] ?? code}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="siq-waitlist-submit" disabled={busy || !email.trim()}>
        {busy ? t('waitlist.submitting') : t('waitlist.submit')}
      </button>

      {error && <p className="siq-waitlist-error">{error}</p>}

      <p className="siq-waitlist-note">{t('waitlist.privacy_note')}</p>
    </form>
  );
}
