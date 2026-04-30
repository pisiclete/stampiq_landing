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

const SAVE_TMPL = {
  en: (n) => `Save ${n}%`,
  de: (n) => `Spare ${n} %`,
  fr: (n) => `Économise ${n} %`,
  it: (n) => `Risparmia il ${n}%`,
  nl: (n) => `Bespaar ${n}%`,
  pl: (n) => `Zaoszczędź ${n}%`,
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
    monthly: { premium: fmt(cdata.premium_monthly), pro: fmt(cdata.pro_monthly), unit: '/month' },
    yearly:  { premium: fmt(cdata.premium_yearly),  pro: fmt(cdata.pro_yearly),  unit: '/year' },
  };
  const p = prices[billing];

  const tiers = [
    {
      key: 'free',
      headerKind: 'free',
      priceLabel: 'Free',
      featureCount: 4,
    },
    {
      key: 'premium',
      headerKind: 'green',
      popular: true,
      priceMain: p.premium,
      priceUnit: p.unit,
      featureCount: 5,
    },
    {
      key: 'pro',
      headerKind: 'free',
      priceMain: p.pro,
      priceUnit: p.unit,
      includesEverything: true,
      featureCount: 3,
    },
  ];

  const featureIconsByTier = {
    free:    [<Icons.Eye/>, <Icons.Calendar/>, <Icons.Info/>, <Icons.NoEntry/>],
    premium: [<Icons.Eye/>, <Icons.Infinity/>, <Icons.Grid/>, <Icons.History/>, <Icons.Stars/>],
    pro:     [<Icons.Eye/>, <Icons.Grid/>, <Icons.Medal/>],
  };

  const renderCard = (tier) => {
    const isGreen = tier.headerKind === 'green';
    const icons = featureIconsByTier[tier.key];
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
          {tier.key === 'free' && (
            <div style={{ marginTop: 10, fontSize: 13.5, color: isGreen ? 'rgba(255,255,255,0.92)' : SIQ.fgSubtle, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t(`pricing.tier.${tier.key}.sub`) }}/>
          )}
        </div>

        <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {tier.includesEverything && (
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
              <span dangerouslySetInnerHTML={{ __html: t(`pricing.tier.${tier.key}.includes_everything`) }}/>
            </div>
          )}
          <div style={{ flex: 1 }}>
            {Array.from({ length: tier.featureCount }, (_, i) => (
              <PriceFeatureRow key={i}
                icon={icons[i]}
                titleKey={`pricing.tier.${tier.key}.feature.${i + 1}.title`}
                descKey={`pricing.tier.${tier.key}.feature.${i + 1}.desc`}
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
    <section id="pricing" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF' }}>
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
