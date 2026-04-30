// StampIQ — wrapper for legal pages: shares the marketing Header/Footer and
// the per-language i18n provider. Pass the page body as `children`.
import React from 'react';
import { I18nProvider } from '../../i18n/I18nContext';
import { Header, Footer } from '../chrome';
import '../../styles/legal.css';

export default function LegalPage({ lang = 'en', children }) {
  return (
    <I18nProvider lang={lang}>
      <div style={{ background: 'white', color: '#222222', fontFamily: "'Roboto', -apple-system, sans-serif", lineHeight: 1.6 }}>
        <Header/>
        <section className="legal-content">
          {children}
        </section>
        <Footer/>
      </div>
    </I18nProvider>
  );
}
