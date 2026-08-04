// StampIQ — WebApp
import React, { useState, useEffect } from 'react';
import { SIQ } from '../lib/tokens';
import { useT, useLang } from '../i18n/I18nContext';
import { Icons, SectionEyebrow, GradientHeadline } from './components';

const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.stampiq.io';

const POINTS = ['webapp.point.sync', 'webapp.point.install', 'webapp.point.languages'];

export const WebApp = () => {
  const t = useT();
  const lang = useLang();
  const href = `${APP_URL}/?lang=${lang}`;

  // Layout.astro routes de-CH and de-DE to the same /de/ page because it drops
  // the region. Read it here so a Swiss visitor sees the Swiss catalog.
  const [shot, setShot] = useState(lang);
  useEffect(() => {
    if (lang !== 'de') return;
    const tags = navigator.languages || [navigator.language || ''];
    if (tags.some(tag => /^de-CH$/i.test(tag))) setShot('de-ch');
  }, [lang]);

  return (
    <section id="webapp" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF' }}>
      <div className="siq-container" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div className="siq-section-intro" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 46px' }}>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('webapp.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 16 }}>
            <span dangerouslySetInnerHTML={{ __html: t('webapp.headline') }}/>
          </GradientHeadline>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: SIQ.fgSubtle, margin: 0 }} dangerouslySetInnerHTML={{ __html: t('webapp.body') }}/>
        </div>

        <img
          className="siq-webapp-shot"
          src={`/assets/screens/web/${shot}.webp`}
          width={1920} height={1050}
          alt="StampIQ in the browser at app.stampiq.io"
          loading="lazy"
          style={{
            width: '100%', height: 'auto', display: 'block',
            borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
          }}
        />

        <ul className="siq-webapp-points" style={{
          listStyle: 'none', margin: '40px 0 0', padding: 0,
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px 36px',
        }}>
          {POINTS.map(key => (
            <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                background: SIQ.green, color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
              }}><Icons.Check size={14}/></span>
              <span style={{ fontSize: 15, color: SIQ.fg, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: t(key) }}/>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a href={href} target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: SIQ.green, color: 'white',
            padding: '14px 30px', borderRadius: 999,
            textDecoration: 'none', fontSize: 15, fontWeight: 700,
            boxShadow: '0 8px 25px rgba(102,226,4,0.40)',
          }}><span dangerouslySetInnerHTML={{ __html: t('webapp.cta') }}/><Icons.Arrow size={18}/></a>
        </div>
      </div>
    </section>
  );
};
