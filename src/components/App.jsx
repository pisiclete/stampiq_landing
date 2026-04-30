// StampIQ — composes the page
import React from 'react';
import { SIQ } from '../lib/tokens';
import { I18nProvider } from '../i18n/I18nContext';
import { Header, Footer } from './chrome';
import { Hero } from './hero';
import { ThreeActs, SigiVision, MeetSigi } from './features';
import { Pricing } from './pricing';
import { Press, Founder } from './social-proof';
import { Partner } from './partner';
import { FAQ, FinalCTA } from './cta';

export default function App({ lang = 'en' }) {
  return (
    <I18nProvider lang={lang}>
      <div style={{ background: 'white', color: SIQ.fg, fontFamily: "'Roboto', -apple-system, sans-serif", lineHeight: 1.6 }}>
        <Header/>
        <Hero/>
        <ThreeActs/>
        <SigiVision/>
        <MeetSigi/>
        <Pricing/>
        <Press/>
        <Partner/>
        <Founder/>
        <FAQ/>
        <FinalCTA/>
        <Footer/>
      </div>
    </I18nProvider>
  );
}
