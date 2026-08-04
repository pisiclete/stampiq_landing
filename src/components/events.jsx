// StampIQ — AnnouncementBar, Events
//
// Both carry the `siq-ibb` class. An inline script in Layout.astro hides that
// class outright once the last fair is over, so a build that predates the
// events still stops showing them on the visitor's own clock.
import React, { useState } from 'react';
import { SIQ } from '../lib/tokens';
import { useT, useLang } from '../i18n/I18nContext';
import { Icons, SectionEyebrow, GradientHeadline } from './components';

const DISMISS_KEY = 'siq-ibb-dismissed';

const EVENTS = [
  {
    id: 'ibb',
    image: '/assets/events/ibb-ulm-2026.webp',
    imageAlt: 'Internationale Briefmarken-Börse, 22.–24. Oktober 2026, Ulm-Messe',
    url: 'https://www.briefmarken-messe.de',
    stand: true,
  },
  {
    id: 'oevebria',
    image: '/assets/events/oevebria-2026.webp',
    imageAlt: 'ÖVEBRIA 2026, St. Pölten',
    url: 'https://voeph.at/aktuelles/alle-termine',
  },
  {
    id: 'philabrig',
    image: '/assets/events/philabrig-2026.webp',
    imageAlt: 'PhilaBrig 26, Brig-Glis',
    url: 'https://philabrig26.ch',
  },
];

export const AnnouncementBar = () => {
  const t = useT();
  const lang = useLang();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const home = lang === 'en' ? '/' : `/${lang}/`;

  return (
    <div id="siq-ibb-bar" className="siq-ibb" style={{
      background: SIQ.footer, color: 'white',
    }}>
      <div className="siq-ibb-bar-inner" style={{
        position: 'relative',
        maxWidth: 1280, margin: '0 auto', padding: '9px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
      }}>
        <a href={`${home}#events`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 500,
        }}>
          <span className="siq-ibb-bar-long" dangerouslySetInnerHTML={{ __html: t('ibb.bar.text') }}/>
          <span className="siq-ibb-bar-short" style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: t('ibb.bar.short') }}/>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            color: SIQ.green, fontWeight: 700, whiteSpace: 'nowrap',
          }}>
            <span dangerouslySetInnerHTML={{ __html: t('ibb.bar.cta') }}/>
            <Icons.Arrow size={14}/>
          </span>
        </a>
        <button
          type="button"
          aria-label={t('ibb.bar.dismiss')}
          onClick={() => {
            try { localStorage.setItem(DISMISS_KEY, '1'); } catch (_) {}
            setDismissed(true);
          }}
          style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1,
            padding: '2px 4px',
          }}>×</button>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const t = useT();
  const rows = [
    { key: `${event.id}.dates`, icon: Icons.Calendar },
    { key: `${event.id}.venue`, icon: Icons.Pin },
    ...(event.stand ? [{ key: `${event.id}.stand`, icon: Icons.Booth }] : []),
  ];

  return (
    <div className="siq-event" style={{
      background: 'white', borderRadius: 20, overflow: 'hidden',
      border: `1px solid ${SIQ.border}`,
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    }}>
      <a href={event.url} target="_blank" rel="noopener" className="siq-event-media" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 168, padding: 20, background: '#FFFFFF',
        borderBottom: `1px solid ${SIQ.border}`,
      }}>
        <img
          src={event.image}
          alt={event.imageAlt}
          loading="lazy"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
        />
      </a>
      <h3 className="siq-event-title" style={{
        fontSize: 21, fontWeight: 800, lineHeight: 1.25, color: SIQ.fg,
        margin: 0, padding: '26px 28px 14px',
      }} dangerouslySetInnerHTML={{ __html: t(`${event.id}.name`) }}/>
      <ul className="siq-event-details" style={{ listStyle: 'none', margin: 0, padding: '0 28px 16px' }}>
        {rows.map(({ key, icon: Icon }) => (
          <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8, fontSize: 15, fontWeight: 600, color: SIQ.fg, lineHeight: 1.4 }}>
            <span style={{ display: 'inline-flex', color: SIQ.greenDarker, flexShrink: 0, marginTop: 1 }}><Icon size={17}/></span>
            <span dangerouslySetInnerHTML={{ __html: t(key) }}/>
          </li>
        ))}
      </ul>
      <p className="siq-event-body" style={{
        fontSize: 15, lineHeight: 1.6, color: SIQ.fgSubtle,
        margin: 0, padding: '0 28px 22px',
      }} dangerouslySetInnerHTML={{ __html: t(`${event.id}.body`) }}/>
      <div className="siq-event-cta" style={{ padding: '0 28px 28px' }}>
        <a href={event.url} target="_blank" rel="noopener" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px',
          background: SIQ.green, color: 'white', borderRadius: 25,
          textDecoration: 'none', fontSize: 14, fontWeight: 600,
          boxShadow: '0 6px 16px rgba(102,226,4,0.35)',
        }}><span dangerouslySetInnerHTML={{ __html: t('events.cta') }}/><Icons.Arrow size={16}/></a>
      </div>
    </div>
  );
};

export const Events = () => {
  const t = useT();
  return (
    <section id="events" className="siq-section siq-ibb" style={{ padding: '110px 0', background: '#FFFFFF' }}>
      <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div className="siq-section-intro" style={{ textAlign: 'center', marginBottom: 50 }}>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('events.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 14 }}>
            <span dangerouslySetInnerHTML={{ __html: t('events.headline') }}/>
          </GradientHeadline>
          <p style={{ fontSize: 17, color: SIQ.fgSubtle, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('events.body') }}/>
        </div>

        <div className="siq-events-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          columnGap: 24, rowGap: 24, alignItems: 'stretch',
        }}>
          {EVENTS.map(event => <EventCard key={event.id} event={event}/>)}
        </div>
      </div>
    </section>
  );
};
