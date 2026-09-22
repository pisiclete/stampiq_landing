// StampIQ — the linkable waitlist page, for the blog, social and the footer to
// point at. /unavailable carries the same form for a geo-blocked visitor.
import React from 'react';
import { I18nProvider, useT } from '../i18n/I18nContext';
import { Header, Footer } from './chrome';
import { AnnouncementBar } from './events';
import { SectionEyebrow, GradientHeadline } from './components';
import WaitlistForm from './WaitlistForm.jsx';
import { SIQ } from '../lib/tokens';

function Content() {
  const t = useT();
  return (
    <section className="siq-section" style={{ padding: '90px 0 110px', background: SIQ.bg }}>
      <div className="siq-container" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto 40px', textAlign: 'center' }}>
          <SectionEyebrow>
            <span dangerouslySetInnerHTML={{ __html: t('waitlist.eyebrow') }}/>
          </SectionEyebrow>
          <GradientHeadline className="siq-headline">
            <span dangerouslySetInnerHTML={{ __html: t('waitlist.title') }}/>
          </GradientHeadline>
        </div>
        <WaitlistForm/>
      </div>
    </section>
  );
}

export default function WaitlistPage({ lang = 'en' }) {
  return (
    <I18nProvider lang={lang}>
      <div style={{ background: 'white', color: SIQ.fg, fontFamily: "'Roboto', -apple-system, sans-serif", lineHeight: 1.6 }}>
        <AnnouncementBar/>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    </I18nProvider>
  );
}
