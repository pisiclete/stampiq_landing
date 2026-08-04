// StampIQ — Press, Founder
import React, { useState, useRef } from 'react';
import { SIQ } from '../lib/tokens';
import { useT } from '../i18n/I18nContext';
import { Icons, SectionEyebrow, GradientHeadline } from './components';

const PRESS_ISSUES = [
  {
    id: 'sbz_2026_03',
    pdf: '/assets/press/sbz-2026-03.pdf',
    cover: '/assets/press/sbz-2026-03-cover.webp',
    alt: 'SBZ Issue 03/2026 — StampIQ: der digitale Begleiter',
  },
  {
    id: 'filatelista_2026_08',
    pdf: '/assets/press/filatelista-2026-08.pdf',
    cover: '/assets/press/filatelista-2026-08-cover.webp',
    alt: 'Filatelista 8/2026 — StampIQ: cyfrowy towarzysz kolekcjonera',
    advertorial: true,
  },
];

const PressIssue = ({ issue }) => {
  const t = useT();
  const k = (suffix) => `press.issue.${issue.id}.${suffix}`;
  return (
    <div className="siq-press" style={{
      background: 'white', borderRadius: 20, padding: 40,
      border: `1px solid ${SIQ.border}`,
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 50, alignItems: 'center',
    }}>
      <a href={issue.pdf} target="_blank" rel="noopener" style={{
        aspectRatio: '210/297', background: 'white', borderRadius: 12,
        display: 'block', position: 'relative', overflow: 'hidden',
        border: `1px solid ${SIQ.border}`,
        boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.18)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.12)'; }}
      >
        <img src={issue.cover} alt={issue.alt} style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block',
        }}/>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '6px 12px', background: 'rgba(0,0,0,0.75)', color: 'white',
          borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        }} dangerouslySetInnerHTML={{ __html: t(k('tag')) }}/>
      </a>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SIQ.greenDarker }} dangerouslySetInnerHTML={{ __html: t(k('publication')) }}/>
          {issue.advertorial && (
            <span style={{
              padding: '3px 10px', borderRadius: 999,
              border: `1px solid ${SIQ.border}`, background: '#F4F4F4', color: SIQ.fgMuted,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }} dangerouslySetInnerHTML={{ __html: t('press.advertorial') }}/>
          )}
        </div>
        <h3 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, color: SIQ.fg, margin: '0 0 18px' }} dangerouslySetInnerHTML={{ __html: t(k('title')) }}/>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: SIQ.fgSubtle, marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: t(k('body')) }}/>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={issue.pdf} target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
            background: SIQ.green, color: 'white', borderRadius: 25,
            textDecoration: 'none', fontSize: 14, fontWeight: 600,
            boxShadow: '0 6px 16px rgba(102,226,4,0.35)',
          }}><span dangerouslySetInnerHTML={{ __html: t('press.cta') }}/><Icons.Arrow size={16}/></a>
        </div>
      </div>
    </div>
  );
};

const CarouselArrow = ({ dir, label, onClick }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`siq-press-arrow siq-press-arrow-${dir}`}
    style={{
      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
      [dir === 'left' ? 'left' : 'right']: -22,
      width: 44, height: 44, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'white', border: `1px solid ${SIQ.border}`, color: SIQ.fg,
      boxShadow: '0 4px 14px rgba(0,0,0,0.12)', cursor: 'pointer', zIndex: 2,
    }}>
    <Icons.Arrow dir={dir} size={20}/>
  </button>
);

const PressCarousel = () => {
  const t = useT();
  const [index, setIndex] = useState(0);
  const count = PRESS_ISSUES.length;
  const touchX = useRef(null);

  const go = (delta) => setIndex(i => (i + delta + count) % count);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {count > 1 && <CarouselArrow dir="left" label={t('press.prev')} onClick={() => go(-1)}/>}
      {count > 1 && <CarouselArrow dir="right" label={t('press.next')} onClick={() => go(1)}/>}

      <div
        style={{ overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div style={{
          display: 'flex',
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {PRESS_ISSUES.map((issue, i) => (
            <div
              key={issue.id}
              aria-hidden={i !== index}
              style={{ minWidth: '100%', padding: '14px 16px' }}
            >
              <PressIssue issue={issue}/>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 8 }}>
          {PRESS_ISSUES.map((issue, i) => (
            <button
              key={issue.id}
              type="button"
              aria-label={t(`press.issue.${issue.id}.tag`)}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 26 : 9, height: 9, borderRadius: 999,
                border: 'none', padding: 0, cursor: 'pointer',
                background: i === index ? SIQ.green : SIQ.border,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Press = () => {
  const t = useT();
  return (
    <section id="press" className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9' }}>
      <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('press.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 14 }}>
            <span dangerouslySetInnerHTML={{ __html: t('press.headline') }}/>
          </GradientHeadline>
          <p style={{ fontSize: 17, color: SIQ.fgSubtle, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('press.body') }}/>
        </div>

        <PressCarousel/>
      </div>
    </section>
  );
};

export const Founder = () => {
  const t = useT();
  return (
    <section id="about" className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9' }}>
      <div className="siq-container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('founder.eyebrow') }}/></SectionEyebrow>
        <GradientHeadline className="siq-headline" style={{ marginBottom: 30 }}>
          <span dangerouslySetInnerHTML={{ __html: t('founder.headline') }}/>
        </GradientHeadline>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
          {[1, 2, 3].map(i => (
            <img key={i} src={`/assets/founder/portrait-${i}.webp`} alt="" style={{
              width: 160, height: 160, objectFit: 'cover', borderRadius: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}/>
          ))}
        </div>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: SIQ.fgSubtle, marginBottom: 18 }} dangerouslySetInnerHTML={{ __html: t('founder.p1') }}/>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: SIQ.fgSubtle, marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: t('founder.p2') }}/>
        <p style={{ fontSize: 18, fontWeight: 700, color: SIQ.fg, fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: t('founder.byline') }}/>
      </div>
    </section>
  );
};
