// StampIQ — ThreeActs, SigiVision, MeetSigi
import React from 'react';
import { SIQ } from '../lib/tokens';
import { useT, useLang } from '../i18n/I18nContext';
import {
  Icons, PhoneMockup, SectionEyebrow, SectionTitle, GradientHeadline,
  SigiPose, SigiSilhouette, screenSrc,
} from './components';

const Act = ({ idx, i18nBase, bulletCount, screen, dark, pose, accent, right, silhouette, bgSilhouette, countries }) => {
  const t = useT();
  const isDark = dark;
  const flip = right;
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: isDark
        ? `linear-gradient(135deg, ${SIQ.green} 0%, ${SIQ.greenDark} 100%)`
        : (idx % 2 === 0 ? '#F9F9F9' : '#FFFFFF'),
      padding: '110px 0',
    }}>
      {isDark && <div style={{
        position: 'absolute', bottom: -200, left: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', zIndex: 0,
      }}/>}

      {bgSilhouette && !isDark && (
        <div aria-hidden="true" className="siq-bg-silhouette" style={{
          position: 'absolute',
          [bgSilhouette.side ?? (flip ? 'right' : 'left')]: bgSilhouette.offset ?? -340,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <SigiSilhouette
            pose={bgSilhouette.pose}
            size={bgSilhouette.size ?? 760}
            color={bgSilhouette.color ?? 'rgba(102,226,4,0.16)'}
            flip={bgSilhouette.flip ?? (bgSilhouette.faceInward !== false ? !flip : flip)}
          />
        </div>
      )}

      {silhouette && isDark && (
        <SigiSilhouette pose="celebrating" size={820} color="rgba(255,255,255,0.14)" className="siq-bg-silhouette" style={{
          position: 'absolute', top: -60, right: -260, zIndex: 0,
        }}/>
      )}

      <div className="siq-container siq-split" style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: flip ? '0.9fr 1.1fr' : '1.1fr 0.9fr', gap: 80, alignItems: 'center',
      }}>
        <div style={{ order: flip ? 2 : 1 }}>
          <SectionEyebrow color={isDark ? 'rgba(255,255,255,0.85)' : SIQ.green}>
            <span style={{ marginRight: 10, opacity: 0.6 }}>0{idx}</span>
            <span dangerouslySetInnerHTML={{ __html: t(`${i18nBase}.eyebrow`) }}/>
          </SectionEyebrow>
          <SectionTitle light={isDark} className="siq-section-title" style={{ marginBottom: 20 }}>
            <span dangerouslySetInnerHTML={{ __html: t(`${i18nBase}.title`) }}/>
          </SectionTitle>
          <p style={{
            fontSize: 18, lineHeight: 1.65, marginBottom: 24,
            color: isDark ? 'rgba(255,255,255,0.92)' : SIQ.fgSubtle, maxWidth: 520,
          }} dangerouslySetInnerHTML={{ __html: t(`${i18nBase}.body`) }}/>
          <ul className="siq-bullets" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Array.from({ length: bulletCount }, (_, bi) => (
              <li key={bi} style={{ display: 'flex', gap: 14, padding: '10px 0', alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: isDark ? 'rgba(255,255,255,0.95)' : SIQ.green,
                  color: isDark ? SIQ.greenDarker : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
                }}><Icons.Check size={14}/></span>
                <span style={{ color: isDark ? 'white' : SIQ.fg, fontSize: 16, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: t(`${i18nBase}.bullet.${bi + 1}`) }}/>
              </li>
            ))}
          </ul>
          {accent && (
            <div className="siq-accent" style={{
              marginTop: 28, padding: '12px 18px', display: 'inline-flex', alignItems: 'center', gap: 10,
              background: isDark ? 'rgba(255,255,255,0.16)' : SIQ.greenTint,
              color: isDark ? 'white' : SIQ.greenDarker,
              borderRadius: 12, fontSize: 14, fontWeight: 600,
            }}>{accent}</div>
          )}
          {countries && countries.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.14em',
                color: isDark ? 'rgba(255,255,255,0.7)' : SIQ.fgMuted,
                textTransform: 'uppercase', marginBottom: 12,
              }} dangerouslySetInnerHTML={{ __html: t('features.catalogs_label') }}/>
              <div className="siq-countries" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {countries.map(x => (
                  <div key={x.c} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: isDark ? 'rgba(255,255,255,0.12)' : 'white',
                    padding: '8px 14px', borderRadius: 25,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.18)' : SIQ.border}`,
                    fontWeight: 600, fontSize: 13,
                    color: isDark ? 'white' : SIQ.fg,
                  }}><span style={{ fontSize: 16 }}>{x.f}</span>{x.c}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="siq-phone-wrap" style={{ order: flip ? 1 : 2, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <PhoneMockup src={screen} w={280} h={580}/>
          {pose && (
            <SigiPose
              pose={pose.kind}
              size={pose.size ?? 180}
              flip={pose.flip}
              className="siq-act-sigi"
              style={{
                position: 'absolute', [pose.side]: -60, bottom: pose.bottom ?? 0,
                zIndex: 2,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const ThreeActs = () => {
  const lang = useLang();
  return (
    <section id="features">
      <Act
        idx={1}
        i18nBase="act1"
        bulletCount={4}
        screen={screenSrc('scan', lang)}
        pose={{ kind: 'magnifying', side: 'right', bottom: 0, size: 200 }}
        countries={[
          { f: '🇨🇭', c: 'CH' }, { f: '🇩🇪', c: 'DE' }, { f: '🇦🇹', c: 'AT' },
          { f: '🇱🇮', c: 'LI' }, { f: '🇳🇱', c: 'NL' }, { f: '🇵🇱', c: 'PL' },
        ]}
      />
      <Act
        idx={2}
        i18nBase="act2"
        bulletCount={4}
        screen={screenSrc('catalog', lang)}
        right
        pose={{ kind: 'thumbsup', side: 'left', bottom: 0, size: 190, flip: true }}
      />
      <Act
        idx={3}
        i18nBase="act3"
        bulletCount={4}
        screen={screenSrc('bulk-results', lang)}
        pose={{ kind: 'thumbsup', side: 'right', bottom: 0, size: 195 }}
      />
      <Act
        idx={4}
        i18nBase="act4"
        bulletCount={4}
        dark
        screen={screenSrc('map', lang)}
        right
        pose={{ kind: 'celebrating', side: 'left', bottom: 0, size: 210, flip: true }}
        silhouette
      />
    </section>
  );
};

export const SigiVision = () => {
  const t = useT();
  return (
    <section id="sigivision" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('sigivision.eyebrow') }}/></SectionEyebrow>
        <GradientHeadline className="siq-headline" style={{ marginBottom: 18, maxWidth: 880, margin: '0 auto 18px' }}>
          <span dangerouslySetInnerHTML={{ __html: t('sigivision.headline') }}/>
        </GradientHeadline>
        <p style={{ fontSize: 19, color: SIQ.fgSubtle, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 60px' }} dangerouslySetInnerHTML={{ __html: t('sigivision.body') }}/>

        <div className="siq-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 60 }}>
          {[
            { base: 'sigivision.stat.speed' },
            { base: 'sigivision.stat.accuracy' },
            { base: 'sigivision.stat.catalog' },
            { base: 'sigivision.stat.countries' },
          ].map(s => (
            <div key={s.base} style={{
              padding: 32, background: SIQ.bg, borderRadius: 16, borderLeft: `4px solid ${SIQ.green}`,
              textAlign: 'left',
            }}>
              <div style={{
                fontSize: 56, fontWeight: 800, lineHeight: 1, marginBottom: 10,
                background: 'linear-gradient(135deg, #2D5016 0%, #66E204 50%, #A8E063 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }} dangerouslySetInnerHTML={{ __html: t(`${s.base}.value`) }}/>
              <div style={{ fontSize: 16, fontWeight: 700, color: SIQ.fg, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: t(`${s.base}.label`) }}/>
              <div style={{ fontSize: 14, color: SIQ.fgMuted, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t(`${s.base}.sub`) }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MeetSigi = () => {
  const t = useT();
  const lang = useLang();
  return (
    <section className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9', position: 'relative', overflow: 'hidden' }}>
      <div className="siq-container siq-split" style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'center',
      }}>
        <div className="siq-phone-wrap" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <PhoneMockup src={screenSrc('chat', lang)} w={280} h={580}/>
          <SigiPose pose="thinking" size={210} className="siq-meet-sigi-pose" style={{
            position: 'absolute', top: -40, right: -70, zIndex: 2,
          }}/>
        </div>
        <div>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('meet_sigi.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 22 }}>
            <span dangerouslySetInnerHTML={{ __html: t('meet_sigi.headline') }}/>
          </GradientHeadline>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: SIQ.fgSubtle, marginBottom: 22, maxWidth: 540 }} dangerouslySetInnerHTML={{ __html: t('meet_sigi.p1') }}/>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: SIQ.fgSubtle, marginBottom: 32, maxWidth: 540 }} dangerouslySetInnerHTML={{ __html: t('meet_sigi.p2') }}/>
          <div className="siq-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 520 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                  background: SIQ.green, color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                }}><Icons.Check size={14}/></span>
                <span style={{ fontSize: 15, color: SIQ.fg, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: t(`meet_sigi.feature.${i}`) }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
