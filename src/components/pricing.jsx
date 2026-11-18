// StampIQ — Pricing (matches in-app pricing screens)
import React, { useState, useEffect } from 'react';
import { SIQ } from '../lib/tokens';
import { useT, useLang } from '../i18n/I18nContext';
import { Icons, SectionEyebrow, GradientHeadline } from './components';
import { STAMPIQ_PRICING, STAMPIQ_DEFAULT_COUNTRY, detectCountry } from '../lib/pricing';

const PriceFeatureRow = ({ icon, titleKey, descKey, t }) => (
  <div style={{ display: 'flex', gap: 14, padding: '12px 0', alignItems: 'flex-start' }}>
    <div style={{
      flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
      background: '#EFEFEF', color: '#5C5C5C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: SIQ.fg, marginBottom: 3 }} dangerouslySetInnerHTML={{ __html: t(titleKey) }}/>
      <div style={{ fontSize: 14, color: SIQ.fgSubtle, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t(descKey) }}/>
    </div>
  </div>
);

const svg = (children) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const FEATURE_ICONS = {
  recognition: <Icons.Eye/>,
  scans: <Icons.Calendar/>,
  unlimitedScans: <Icons.Infinity/>,
  bulkScan: <Icons.Grid/>,
  covers: svg(<><rect x="3" y="11" width="11" height="9" rx="1"/><path d="M3 12l5.5 4L14 12"/><path d="M7 11V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6"/><path d="M15 7h3v3h-3z"/></>),
  motifs: svg(<><path d="M6.5 3L10 9H3z"/><path d="M17.5 9.5s-3.5-2.2-3.5-4.5a2 2 0 0 1 3.5-1.3A2 2 0 0 1 21 5c0 2.3-3.5 4.5-3.5 4.5z"/><circle cx="6.5" cy="17.5" r="3.5"/><rect x="14" y="14" width="7" height="7" rx="1"/></>),
  records: svg(<><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/></>),
  discovery: svg(<><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/></>),
  catalog: svg(<><path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h6M10 10h6M10 14h4"/></>),
  catalogPurchase: svg(<><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>),
  sigi: svg(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>),
  support: svg(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></>),
  help: svg(<><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></>),
  priority: <Icons.Medal/>,
};

const SAVE_TMPL = {
  en: (n) => `Save ${n}%`,
  de: (n) => `Spare ${n} %`,
  fr: (n) => `Économise ${n} %`,
  it: (n) => `Risparmia il ${n}%`,
  nl: (n) => `Bespaar ${n}%`,
  pl: (n) => `Zaoszczędź ${n}%`,
};

const iconFor = (tier, feature) => {
  if (feature !== 'support') return feature;
  if (tier === 'free') return 'help';
  return tier === 'pro' ? 'priority' : 'support';
};

export const Pricing = () => {
  const t = useT();
  const lang = useLang();
  const [billing, setBilling] = useState('monthly');
  const [country, setCountry] = useState(STAMPIQ_DEFAULT_COUNTRY);
  useEffect(() => { setCountry(detectCountry()); }, []);

  const cdata = STAMPIQ_PRICING[country] || STAMPIQ_PRICING['CH'];
  const SYMBOL = { CHF: 'Fr.', EUR: '€', PLN: 'zł' };
  const sym = SYMBOL[cdata.currency] || cdata.currency;
  const num = (s) => parseFloat(String(s).replace(',', '.'));
  const fmt = (amount) => cdata.currencyPos === 'before' ? `${sym}${amount}` : `${amount} ${sym}`;
  const savePct = Math.round((1 - num(cdata.premium_yearly) / (12 * num(cdata.premium_monthly))) * 100);
  const saveLabel = (SAVE_TMPL[lang] || SAVE_TMPL.en)(savePct);
  const prices = {
    monthly: { premium: fmt(cdata.premium_monthly), pro: fmt(cdata.pro_monthly), unit: t('pricing.unit.month') },
    yearly:  { premium: fmt(cdata.premium_yearly),  pro: fmt(cdata.pro_yearly),  unit: t('pricing.unit.year') },
  };
  const p = prices[billing];

  const tiers = [
    {
      key: 'free',
      headerKind: 'free',
      priceLabel: 'Free',
      features: ['recognition', 'scans', 'covers', 'motifs', 'records', 'discovery', 'sigi', 'support'],
    },
    {
      key: 'premium',
      headerKind: 'green',
      popular: true,
      priceMain: p.premium,
      priceUnit: p.unit,
      features: ['catalog', 'unlimitedScans', 'bulkScan', 'covers', 'motifs', 'catalogPurchase', 'sigi', 'support'],
    },
    {
      key: 'pro',
      headerKind: 'free',
      priceMain: p.pro,
      priceUnit: p.unit,
      features: ['catalog', 'bulkScan', 'covers', 'sigi', 'support'],
    },
  ];

  const renderCard = (tier) => {
    const isGreen = tier.headerKind === 'green';
    return (
      <div key={tier.key} style={{
        position: 'relative',
        background: 'white',
        border: `2.5px solid ${SIQ.green}`,
        borderRadius: 18,
        boxShadow: tier.popular ? '0 22px 50px rgba(102,226,4,0.22)' : '0 8px 24px rgba(0,0,0,0.06)',
        transform: tier.popular ? 'translateY(-12px)' : 'none',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          background: isGreen ? SIQ.green : '#F4F4F4',
          color: isGreen ? 'white' : SIQ.fg,
          padding: '24px 28px 22px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: t(`pricing.tier.${tier.key}.name`) }}/>
            {tier.popular && (
              <div style={{
                background: 'white', color: SIQ.greenDarker,
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                whiteSpace: 'nowrap',
              }} dangerouslySetInnerHTML={{ __html: t('pricing.most_popular') }}/>
            )}
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
            {tier.priceLabel ? (
              <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em' }} dangerouslySetInnerHTML={{ __html: t(`pricing.tier.${tier.key}.price_label`) }}/>
            ) : (
              <>
                <span style={{ fontSize: 38, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em' }}>{tier.priceMain}</span>
                <span style={{ fontSize: 14, opacity: 0.85 }}>{tier.priceUnit}</span>
              </>
            )}
          </div>
          <div style={{ marginTop: 10, fontSize: 13.5, color: isGreen ? 'rgba(255,255,255,0.92)' : SIQ.fgSubtle, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t(`pricing.plan.${tier.key}.summary`) }}/>
        </div>

        <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {tier.key !== 'free' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: SIQ.greenTint, color: SIQ.greenDarker,
              padding: '10px 14px', borderRadius: 10, marginBottom: 8,
              fontSize: 14, fontWeight: 600,
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', background: SIQ.green, color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icons.Check size={12}/></span>
              <span dangerouslySetInnerHTML={{ __html: t(`pricing.plan.${tier.key}.inherits`) }}/>
            </div>
          )}
          <div style={{ flex: 1 }}>
            {tier.features.map((f) => (
              <PriceFeatureRow key={f}
                icon={FEATURE_ICONS[iconFor(tier.key, f)]}
                titleKey={`pricing.plan.${tier.key}.${f}.title`}
                descKey={`pricing.plan.${tier.key}.${f}.desc`}
                t={t}
              />
            ))}
          </div>
          <a href="#download" style={{
            marginTop: 20, display: 'block', textAlign: 'center',
            padding: '14px 22px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            background: tier.popular ? SIQ.green : 'white',
            color: tier.popular ? 'white' : SIQ.greenDarker,
            border: tier.popular ? 'none' : `2px solid ${SIQ.green}`,
            boxShadow: tier.popular ? '0 8px 20px rgba(102,226,4,0.35)' : 'none',
          }} dangerouslySetInnerHTML={{ __html: t(`pricing.tier.${tier.key}.cta`) }}/>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9' }}>
      <div className="siq-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionEyebrow><span dangerouslySetInnerHTML={{ __html: t('pricing.eyebrow') }}/></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 16 }}>
            <span dangerouslySetInnerHTML={{ __html: t('pricing.headline') }}/>
          </GradientHeadline>
          <p style={{ fontSize: 18, color: SIQ.fgSubtle, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('pricing.sub') }}/>
          <div style={{
            display: 'inline-flex', background: 'white', padding: 6, borderRadius: 999,
            border: `1.5px solid ${SIQ.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {[
              { key: 'monthly', i18nKey: 'pricing.toggle.monthly' },
              { key: 'yearly',  i18nKey: 'pricing.toggle.yearly', save: saveLabel },
            ].map(opt => {
              const active = billing === opt.key;
              return (
                <button key={opt.key} onClick={() => setBilling(opt.key)} style={{
                  padding: '10px 28px', border: 0, cursor: 'pointer', borderRadius: 999,
                  fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                  background: active ? SIQ.green : 'transparent',
                  color: active ? 'white' : SIQ.fg,
                  transition: 'all 0.2s',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  <span dangerouslySetInnerHTML={{ __html: t(opt.i18nKey) }}/>
                  {opt.save && <span style={{
                    color: active ? 'white' : SIQ.greenDarker, fontWeight: 700, fontSize: 14,
                  }}>{opt.save}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="siq-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'stretch' }}>
          {tiers.map(renderCard)}
        </div>
      </div>
    </section>
  );
};
