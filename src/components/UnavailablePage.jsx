// StampIQ — shown when a visitor's country is outside the markets StampIQ
// operates in (Cloudflare redirects app.stampiq.io here for blocked countries).
import React from 'react';
import { I18nProvider, useT } from '../i18n/I18nContext';
import { Logo } from './components';
import { SIQ } from '../lib/tokens';

function Content() {
  const t = useT();
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24, background: SIQ.bg,
    }}>
      <div style={{
        maxWidth: 540, width: '100%', textAlign: 'center', background: 'white',
        borderRadius: 24, boxShadow: SIQ.shadow.card, padding: '56px 32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Logo height={36}/>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 800, color: SIQ.fg, lineHeight: 1.25, margin: '0 0 16px' }}
          dangerouslySetInnerHTML={{ __html: t('unavailable.title') }}/>
        <p style={{ fontSize: 17, color: SIQ.fgSubtle, lineHeight: 1.6, margin: 0 }}
          dangerouslySetInnerHTML={{ __html: t('unavailable.body') }}/>
      </div>
    </main>
  );
}

export default function UnavailablePage({ lang = 'en' }) {
  return (
    <I18nProvider lang={lang}>
      <Content/>
    </I18nProvider>
  );
}
