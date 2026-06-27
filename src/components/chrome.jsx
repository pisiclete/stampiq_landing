// StampIQ — Header, Footer, LanguageSelector
import React, { useState, useEffect, useRef } from 'react';
import { SIQ } from '../lib/tokens';
import { useT, useLang } from '../i18n/I18nContext';
import { Logo, Pill, Icons, SigiSilhouette } from './components';

const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'nl', label: 'NL', flag: '🇳🇱' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

// Language switching navigates between /, /de/, /fr/, etc. Each is its own
// statically-rendered HTML page — no client-side state, no hydration cost.
const langHref = (code) => (code === 'en' ? '/' : `/${code}/`);

// Web app sign-in. Pass the page language through so the app opens in the same
// language (it reads ?lang=) — important for a new account, whose language and
// localized emails are set from this at signup.
const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.stampiq.io';
const signInHref = (lang) => `${APP_URL}/?lang=${lang}`;

const LanguageSelector = () => {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const current = SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: open ? '#F2F2F2' : 'transparent',
          border: `1px solid ${SIQ.border}`,
          borderRadius: 999, padding: '6px 12px',
          fontSize: 13, fontWeight: 600, color: SIQ.fg,
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'white', border: `1px solid ${SIQ.border}`,
          borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          padding: 6, minWidth: 120, zIndex: 100,
        }}>
          {SUPPORTED_LANGS.map(l => (
            <a key={l.code} href={langHref(l.code)}
              onClick={() => { try { localStorage.setItem('language', l.code); } catch (_) {} }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                background: lang === l.code ? '#F2F2F2' : 'transparent',
                border: 'none', borderRadius: 8, padding: '8px 12px',
                fontSize: 13, fontWeight: 600, color: SIQ.fg,
                textDecoration: 'none', textAlign: 'left',
              }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{l.flag}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header = () => {
  const t = useT();
  const lang = useLang();
  // Anchors are absolute so they work the same way from /, /de/, or any legal
  // page like /de/privacy.html. Clicking "Pricing" from a legal page jumps to
  // the marketing page in the right language.
  const home = lang === 'en' ? '/' : `/${lang}/`;
  const links = [
    { href: `${home}#features`,   key: 'nav.features' },
    { href: `${home}#sigivision`, key: 'nav.sigivision' },
    { href: `${home}#pricing`,    key: 'nav.pricing' },
    { href: `${home}#press`,      key: 'nav.press' },
    { href: `${home}#partner`,    key: 'nav.partners' },
    { href: `${home}#faq`,        key: 'nav.faq' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${SIQ.border}`,
    }}>
      <nav className="siq-nav" style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href={home} style={{ display: 'block' }}><Logo height={30}/></a>
        <div className="siq-nav-links" style={{ display: 'flex', gap: 28, marginLeft: 32 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: SIQ.fg, textDecoration: 'none', fontSize: 14, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: t(l.key) }}/>
          ))}
        </div>
        <div className="siq-nav-pills" style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Pill variant="neutral" className="siq-nav-pill"><Icons.SwissFlag/><span dangerouslySetInnerHTML={{ __html: t('pill.swiss_made') }}/></Pill>
          <LanguageSelector/>
          <a href={signInHref(lang)} style={{
            display: 'inline-flex', alignItems: 'center',
            border: `1px solid ${SIQ.green}`, color: SIQ.greenDarker,
            background: 'white', padding: '6px 18px', borderRadius: 25,
            textDecoration: 'none', fontSize: 13, fontWeight: 600, lineHeight: 1.4,
            whiteSpace: 'nowrap',
          }} dangerouslySetInnerHTML={{ __html: t('nav.signin') }}/>
          <a href={`${home}#download`} style={{
            display: 'inline-flex', alignItems: 'center',
            background: SIQ.green, color: 'white', padding: '6px 20px', borderRadius: 25,
            textDecoration: 'none', fontSize: 13, fontWeight: 600, lineHeight: 1.4,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(102,226,4,0.30)',
          }} dangerouslySetInnerHTML={{ __html: t('nav.download') }}/>
        </div>
      </nav>
    </header>
  );
};

export const Footer = () => {
  const t = useT();
  const lang = useLang();
  // Legal and marketing destinations both live under a per-language prefix
  // (`/` for en, `/de/` for de, etc). Footer links are absolute so they work
  // the same way from any page on the site.
  const home = lang === 'en' ? '/' : `/${lang}/`;
  const legalRoot = lang === 'en' ? '' : `/${lang}`;
  const cols = [
    { titleKey: 'footer.col.product', items: [
      { href: `${home}#features`,   key: 'footer.product.features' },
      { href: `${home}#sigivision`, key: 'footer.product.sigivision' },
      { href: `${home}#pricing`,    key: 'footer.product.pricing' },
      { href: `${home}#faq`,        key: 'footer.product.faq' },
    ]},
    { titleKey: 'footer.col.company', items: [
      { href: `${home}#press`,                key: 'footer.company.press' },
      { href: `${home}#about`,                key: 'footer.company.about' },
      { href: 'mailto:support@stampiq.io',    key: 'footer.company.contact' },
    ]},
    { titleKey: 'footer.col.legal', items: [
      { href: `${legalRoot}/privacy.html`,    key: 'footer.legal.privacy' },
      { href: `${legalRoot}/terms.html`,      key: 'footer.legal.terms' },
    ]},
  ];

  return (
    <footer style={{
      background: SIQ.footer, color: 'rgba(255,255,255,0.78)',
      padding: '90px 0 30px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 18, left: 0, right: 0, height: 60,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        opacity: 0.18, pointerEvents: 'none',
      }}>
        {['waving', 'magnifying', 'thumbsup', 'celebrating', 'thinking', 'stamp', 'waving'].map((p, i) => (
          <SigiSilhouette key={i} pose={p} size={48} color="rgba(102,226,4,0.95)"/>
        ))}
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 80, left: 0, right: 0, height: 1,
        background: 'rgba(255,255,255,0.06)',
      }}/>
      <div className="siq-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div className="siq-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div className="siq-footer-brand">
            <Logo height={28} mono/>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '18px 0 18px', color: 'rgba(255,255,255,0.65)', maxWidth: 280 }} dangerouslySetInnerHTML={{ __html: t('footer.tagline') }}/>
            <Pill variant="neutral" style={{ background: 'rgba(255,255,255,0.10)', color: 'white', border: 'none' }}>
              <Icons.SwissFlag/><span dangerouslySetInnerHTML={{ __html: t('pill.swiss_made') }}/>
            </Pill>
          </div>
          {cols.map(col => (
            <div key={col.titleKey}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: t(col.titleKey) }}/>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.items.map(item => (
                  <li key={item.key} style={{ marginBottom: 10 }}>
                    <a href={item.href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14 }} dangerouslySetInnerHTML={{ __html: t(item.key) }}/>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="siq-footer-copyright" style={{
          paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }} dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}/>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }} dangerouslySetInnerHTML={{ __html: t('footer.supporting') }}/>
        </div>
      </div>
    </footer>
  );
};
