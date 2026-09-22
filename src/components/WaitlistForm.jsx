// StampIQ — waitlist form. Posts to the public waitlist API, which stores the
// address unconfirmed and sends a confirmation mail.
import React, { useEffect, useState } from 'react';
import { useT, useLang } from '../i18n/I18nContext';
import { PAGE_LANGS } from '../i18n/langs.mjs';
import { marketFlag, marketName } from '../lib/markets.mjs';
import { SIQ } from '../lib/tokens';

const API = 'https://api.stampiq.io/api/v1/waitlist/';

// The markets the app is not sold in. LIVE markets are left out on purpose:
// someone there can already download the app. Must match MARKETS in
// stampiq_backend/api/v1/waitlist/constants.py.
const PROSPECT_MARKETS = ['CZ', 'SK', 'HU', 'RO', 'DK', 'FR', 'IT', 'BE', 'LU', 'UK', 'VA'];
const OTHER = 'XX';

// Which market a page language points at, for the preselection when Cloudflare
// gives no country. A language is a weaker signal than the IP, so the IP wins.
const MARKET_FOR_LANG = { cs: 'CZ', sk: 'SK', hu: 'HU', ro: 'RO', da: 'DK', fr: 'FR', it: 'IT' };

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
        body: JSON.stringify({
          email: email.trim(),
          countries,
          language,
          source: `web:${lang}`,
        }),
      });
      setStatus(response.ok ? 'success' : 'error');
      if (!response.ok) setError(t('waitlist.error'));
    } catch {
      setStatus('error');
      setError(t('waitlist.error'));
    }
  }

  if (status === 'success') {
    return (
      <p style={{ margin: 0, padding: '16px 18px', borderRadius: 12, background: '#F0FBE6', color: SIQ.fg, fontSize: 15, lineHeight: 1.6 }}>
        {t('waitlist.success')}
      </p>
    );
  }

  const chip = (selected) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 999,
    border: `1px solid ${selected ? SIQ.fg : SIQ.border}`,
    background: selected ? SIQ.fg : 'white',
    color: selected ? 'white' : SIQ.fg,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  });

  const field = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: `1px solid ${SIQ.border}`,
    fontSize: 15,
    fontFamily: 'inherit',
    background: 'white',
    color: SIQ.fg,
  };

  return (
    <form onSubmit={onSubmit} style={{ textAlign: 'left', marginTop: 28 }}>
      <p style={{ fontSize: 15, color: SIQ.fgSubtle, lineHeight: 1.6, margin: '0 0 20px' }}>{t('waitlist.intro')}</p>

      <label htmlFor="waitlist-email" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
        {t('waitlist.email_label')}
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
        style={field}
      />

      <fieldset style={{ border: 0, padding: 0, margin: '20px 0 0' }}>
        <legend style={{ fontSize: 14, fontWeight: 600, padding: 0, marginBottom: 2 }}>
          {t('waitlist.countries_label')}
        </legend>
        <p style={{ fontSize: 13, color: SIQ.fgSubtle, margin: '0 0 10px' }}>{t('waitlist.countries_hint')}</p>
        <div>
          {PROSPECT_MARKETS.map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={countries.includes(code)}
              onClick={() => toggle(code)}
              style={chip(countries.includes(code))}
            >
              <span aria-hidden="true">{marketFlag(code)}</span>
              {marketName(code, lang)}
            </button>
          ))}
          <button
            key={OTHER}
            type="button"
            aria-pressed={countries.includes(OTHER)}
            onClick={() => toggle(OTHER)}
            style={chip(countries.includes(OTHER))}
          >
            {t('waitlist.country_other')}
          </button>
        </div>
      </fieldset>

      <label htmlFor="waitlist-language" style={{ display: 'block', fontSize: 14, fontWeight: 600, margin: '20px 0 6px' }}>
        {t('waitlist.language_label')}
      </label>
      <select
        id="waitlist-language"
        name="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        disabled={status === 'submitting'}
        style={field}
      >
        {PAGE_LANGS.map((code) => (
          <option key={code} value={code}>
            {marketLanguageName(code)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={status === 'submitting' || !email.trim()}
        style={{
          width: '100%',
          marginTop: 24,
          padding: '14px 20px',
          borderRadius: 999,
          border: 0,
          background: SIQ.green,
          color: '#1a1a1a',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: status === 'submitting' ? 'default' : 'pointer',
          opacity: status === 'submitting' || !email.trim() ? 0.6 : 1,
        }}
      >
        {status === 'submitting' ? t('waitlist.submitting') : t('waitlist.submit')}
      </button>

      {error && <p style={{ color: '#C0392B', fontSize: 14, margin: '12px 0 0' }}>{error}</p>}

      <p style={{ fontSize: 13, color: SIQ.fgSubtle, lineHeight: 1.6, margin: '16px 0 0' }}>
        {t('waitlist.privacy_note')}
      </p>
    </form>
  );
}

function marketLanguageName(code) {
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}
