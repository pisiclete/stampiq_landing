// StampIQ — the linkable waitlist page, for the blog, social and the footer to
// point at. /unavailable carries the same form for a geo-blocked visitor.
import React from 'react';
import { I18nProvider, useT } from '../i18n/I18nContext';
import { Logo } from './components';
import WaitlistForm from './WaitlistForm.jsx';
import { SIQ } from '../lib/tokens';

function Content() {
  const t = useT();
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24, background: SIQ.bg,
    }}>
      <div style={{
        maxWidth: 540, width: '100%', background: 'white',
        borderRadius: 24, boxShadow: SIQ.shadow.card, padding: '56px 32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Logo height={36}/>
        </div>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 800, color: SIQ.fg,
          lineHeight: 1.25, margin: '0 0 16px', textAlign: 'center',
        }}>{t('waitlist.title')}</h1>
        <WaitlistForm/>
      </div>
    </main>
  );
}

export default function WaitlistPage({ lang = 'en' }) {
  return (
    <I18nProvider lang={lang}>
      <Content/>
    </I18nProvider>
  );
}
