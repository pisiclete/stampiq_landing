// StampIQ — FAQ, FinalCTA
import React, { useState } from 'react';
import { SIQ } from '../lib/tokens';
import { useT } from '../i18n/I18nContext';
import { SectionEyebrow, GradientHeadline, StoreBadges, SigiPose } from './components';

const FAQItem = ({ k, defaultOpen, t }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{
      background: 'white', borderRadius: 14, padding: '20px 24px',
      borderLeft: `4px solid ${open ? SIQ.green : SIQ.border}`,
      transition: 'all 0.2s', boxShadow: open ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
    }}>
      <button className="siq-faq-q" onClick={() => setOpen(o => !o)} style={{
        background: 'none', border: 0, padding: 0, cursor: 'pointer', width: '100%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        fontSize: 17, fontWeight: 600, color: open ? SIQ.greenDarker : SIQ.fg,
        textAlign: 'left', fontFamily: 'inherit',
      }}>
        <span style={{ flex: 1 }} dangerouslySetInnerHTML={{ __html: t(`faq.q.${k}`) }}/>
        <span style={{
          flexShrink: 0, marginLeft: 16, fontSize: 22, color: SIQ.green, fontWeight: 300,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s',
        }}>+</span>
      </button>
      {open && <p className="siq-faq-a" style={{ color: SIQ.fgSubtle, fontSize: 15, lineHeight: 1.65, margin: '14px 0 0' }} dangerouslySetInnerHTML={{ __html: t(`faq.a.${k}`) }}/>}
    </div>
  );
};

const FAQ_KEYS = [
  'countries', 'accuracy', 'free_version', 'bulk_scan', 'switch_plans',
  'devices', 'internet', 'languages', 'storage', 'privacy',
  'export', 'updates', 'support',
];

export const FAQ = () => {
  const t = useT();
  return (
    <section id="faq" className="siq-section siq-faq-section" style={{
      padding: '110px 0 180px',
      background: '#FFFFFF',
      position: 'relative',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)',
    }}>
      <div className="siq-container" style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('faq.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline">
            <span dangerouslySetInnerHTML={{ __html: t('faq.headline') }}/>
          </GradientHeadline>
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          {FAQ_KEYS.map((k, i) => (
            <FAQItem key={k} k={k} defaultOpen={i === 0} t={t}/>
          ))}
        </div>
      </div>
    </section>
  );
};

const STAMP_POSITIONS = [
  { top: '5%',  left: '4%',  size: 60, rot: -14, op: 0.22 },
  { top: '8%',  left: '24%', size: 50, rot: 8,   op: 0.18 },
  { top: '12%', left: '46%', size: 55, rot: -6,  op: 0.16 },
  { top: '6%',  left: '68%', size: 65, rot: 18,  op: 0.20 },
  { top: '10%', left: '88%', size: 55, rot: -12, op: 0.22 },
  { top: '22%', left: '12%', size: 50, rot: 22,  op: 0.18 },
  { top: '26%', left: '34%', size: 60, rot: -18, op: 0.20 },
  { top: '20%', left: '58%', size: 50, rot: 14,  op: 0.16 },
  { top: '24%', left: '78%', size: 60, rot: -10, op: 0.20 },
  { top: '40%', left: '3%',  size: 55, rot: 16,  op: 0.18 },
  { top: '38%', left: '22%', size: 50, rot: -8,  op: 0.16 },
  { top: '42%', left: '52%', size: 55, rot: 24,  op: 0.18 },
  { top: '38%', left: '72%', size: 60, rot: -16, op: 0.20 },
  { top: '44%', left: '92%', size: 50, rot: 6,   op: 0.18 },
  { top: '58%', left: '8%',  size: 60, rot: -22, op: 0.20 },
  { top: '60%', left: '28%', size: 50, rot: 12,  op: 0.16 },
  { top: '56%', left: '46%', size: 55, rot: -14, op: 0.18 },
  { top: '62%', left: '66%', size: 60, rot: 20,  op: 0.20 },
  { top: '58%', left: '86%', size: 55, rot: -8,  op: 0.18 },
  { top: '76%', left: '6%',  size: 55, rot: 18,  op: 0.18 },
  { top: '80%', left: '24%', size: 60, rot: -10, op: 0.20 },
  { top: '78%', left: '52%', size: 50, rot: 14,  op: 0.16 },
  { top: '82%', left: '70%', size: 60, rot: -20, op: 0.20 },
  { top: '76%', left: '90%', size: 55, rot: 8,   op: 0.18 },
  { top: '90%', left: '14%', size: 50, rot: -16, op: 0.16 },
  { top: '92%', left: '40%', size: 55, rot: 22,  op: 0.18 },
  { top: '88%', left: '60%', size: 60, rot: -6,  op: 0.20 },
  { top: '90%', left: '82%', size: 50, rot: 12,  op: 0.16 },
];

export const FinalCTA = () => {
  const t = useT();
  return (
    <section id="download" className="siq-section-cta" style={{
      padding: '140px 0 120px',
      background: `linear-gradient(135deg, ${SIQ.green} 0%, ${SIQ.greenDark} 100%)`,
      position: 'relative', overflow: 'hidden',
      marginTop: -80,
    }}>
      <div aria-hidden="true" className="siq-stamp-dots" style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.18,
        backgroundImage: `
          radial-gradient(circle at 8% 20%, rgba(255,255,255,0.9) 0 2px, transparent 2px),
          radial-gradient(circle at 22% 75%, rgba(255,255,255,0.7) 0 2px, transparent 2px),
          radial-gradient(circle at 88% 35%, rgba(255,255,255,0.85) 0 2px, transparent 2px),
          radial-gradient(circle at 70% 88%, rgba(255,255,255,0.7) 0 2px, transparent 2px)
        `,
      }}/>
      <div className="siq-stamp-shapes" aria-hidden="true">
        {STAMP_POSITIONS.map((s, i) => (
          <img key={i} src="/assets/decor/stamp-silhouette-lightgreen.svg" alt="" aria-hidden="true" style={{
            position: 'absolute', top: s.top, left: s.left,
            width: s.size, opacity: s.op, transform: `rotate(${s.rot}deg)`,
            zIndex: 0, pointerEvents: 'none',
          }}/>
        ))}
      </div>

      <SigiPose pose="magnifying" size={220} flip className="siq-bg-silhouette siq-final-cta-sigi" style={{
        position: 'absolute', bottom: -20, left: '4%', zIndex: 2,
        filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.30))',
      }}/>

      <div className="siq-container siq-final-cta-content" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 className="siq-final-cta-h1" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: 'white', margin: '0 0 20px', textWrap: 'balance' }} dangerouslySetInnerHTML={{ __html: t('final_cta.headline') }}/>
        <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.92)', lineHeight: 1.55, margin: '0 auto 36px', maxWidth: 540 }} dangerouslySetInnerHTML={{ __html: t('final_cta.body') }}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StoreBadges size="large"/>
        </div>
      </div>
    </section>
  );
};
