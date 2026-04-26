// StampIQ post-launch landing — Pricing
// Matches in-app pricing screens exactly: green-bordered cards, grey circular
// icon badges, green-flooded header on the Most Popular Premium card.

const PriceFeatureRow = ({ icon, title, desc, titleKey, descKey }) => (
  <div style={{ display: 'flex', gap: 14, padding: '12px 0', alignItems: 'flex-start' }}>
    <div style={{
      flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
      background: '#EFEFEF', color: '#5C5C5C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div data-i18n={titleKey} style={{ fontSize: 15, fontWeight: 700, color: SIQ.fg, marginBottom: 3 }}>{title}</div>
      <div data-i18n={descKey} style={{ fontSize: 14, color: SIQ.fgSubtle, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </div>
);

const Pricing = () => {
  const [billing, setBilling] = React.useState('monthly');
  // Swiss pricing — yearly saves 17% (rounded to .90 cents)
  const prices = {
    monthly: { premium: 'Fr.10.90', pro: 'Fr.32.90', unit: '/month' },
    yearly:  { premium: 'Fr.108.90', pro: 'Fr.328.90', unit: '/year' },
  };
  const p = prices[billing];
  const tiers = [
    {
      key: 'free',
      name: 'Free Plan',
      headerKind: 'free',
      priceLabel: 'Free',
      sub: 'Perfect for new collectors who want to explore StampIQ',
      cta: 'Go Free',
      features: [
        { icon: <Icons.Eye/>,      title: <>SigiVision<sup style={{ fontSize: 9 }}>™</sup> Recognition</>,
          desc: 'Identify your stamps with 95% accuracy. Results delivered in a few seconds.' },
        { icon: <Icons.Calendar/>, title: '5 Scans per Month',
          desc: 'Enjoy 5 free single scans and 2 bulk scans each month to explore your collection.' },
        { icon: <Icons.Info/>,     title: 'Scanned Stamp Details',
          desc: "View catalog matches and key information for the stamps you've scanned." },
        { icon: <Icons.NoEntry/>,  title: 'No Direct Support',
          desc: 'Personal support is not included. FAQs and help articles are always available.' },
      ],
    },
    {
      key: 'premium',
      name: 'Premium Plan',
      headerKind: 'green',
      popular: true,
      priceMain: p.premium,
      priceUnit: p.unit,
      cta: 'Go Premium',
      features: [
        { icon: <Icons.Eye/>,       title: <>SigiVision<sup style={{ fontSize: 9 }}>™</sup> Instant Recognition</>,
          desc: 'Identify your stamps with 95% accuracy in under 1 second — no waiting around.' },
        { icon: <Icons.Infinity/>,  title: 'Unlimited Single Scans',
          desc: 'Scan as many stamps as you like, one at a time — no daily or monthly limits.' },
        { icon: <Icons.Grid/>,      title: 'Limited Bulk Scanning',
          desc: 'Scan multi-stamp pages with automatic cropping and catalog matching, up to 5 pages per month.' },
        { icon: <Icons.History/>,   title: 'Personal Collection History',
          desc: 'All your scans are saved automatically, making it easy to revisit, organize, or re-check details anytime.' },
        { icon: <Icons.Stars/>,     title: 'Early Access to New Features',
          desc: 'Be among the first to try upcoming collector tools as they roll out.' },
      ],
    },
    {
      key: 'pro',
      name: 'Professional Plan',
      headerKind: 'free',
      priceMain: p.pro,
      priceUnit: p.unit,
      sub: null,
      includesEverything: 'Includes everything in Premium, plus:',
      cta: 'Go Professional',
      features: [
        { icon: <Icons.Eye/>,    title: <>SigiVision<sup style={{ fontSize: 9 }}>™</sup> Pro Recognition</>,
          desc: 'Our most powerful recognition engine — 98% accuracy in under 1 second for the best possible matches.' },
        { icon: <Icons.Grid/>,   title: 'Unlimited Bulk Scanning',
          desc: 'Detect multiple stamps on a single page with automatic cropping and catalog matching. No limits.' },
        { icon: <Icons.Medal/>,  title: 'Premium Support',
          desc: 'Priority email help from our philately team.' },
      ],
    },
  ];

  const renderCard = (t) => {
    const isGreen = t.headerKind === 'green';
    return (
      <div key={t.name} style={{
        position: 'relative',
        background: 'white',
        border: `2.5px solid ${SIQ.green}`,
        borderRadius: 18,
        boxShadow: t.popular ? '0 22px 50px rgba(102,226,4,0.22)' : '0 8px 24px rgba(0,0,0,0.06)',
        transform: t.popular ? 'translateY(-12px)' : 'none',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: isGreen ? SIQ.green : '#F4F4F4',
          color: isGreen ? 'white' : SIQ.fg,
          padding: '24px 28px 22px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div data-i18n={`pricing.tier.${t.key}.name`} style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>{t.name}</div>
            {t.popular && (
              <div data-i18n="pricing.most_popular" style={{
                background: 'white', color: SIQ.greenDarker,
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>Most Popular</div>
            )}
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
            {t.priceLabel ? (
              <span data-i18n={`pricing.tier.${t.key}.price_label`} style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em' }}>{t.priceLabel}</span>
            ) : (
              <>
                <span style={{ fontSize: 38, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em' }}>{t.priceMain}</span>
                <span style={{ fontSize: 14, opacity: 0.85 }}>{t.priceUnit}</span>
              </>
            )}
          </div>
          {t.sub && (
            <div data-i18n={`pricing.tier.${t.key}.sub`} style={{ marginTop: 10, fontSize: 13.5, color: isGreen ? 'rgba(255,255,255,0.92)' : SIQ.fgSubtle, lineHeight: 1.5 }}>
              {t.sub}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {t.includesEverything && (
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
              <span data-i18n={`pricing.tier.${t.key}.includes_everything`}>{t.includesEverything}</span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            {t.features.map((f, i) => (
              <PriceFeatureRow key={i}
                icon={f.icon} title={f.title} desc={f.desc}
                titleKey={`pricing.tier.${t.key}.feature.${i + 1}.title`}
                descKey={`pricing.tier.${t.key}.feature.${i + 1}.desc`}
              />
            ))}
          </div>
          <a href="#download" data-i18n={`pricing.tier.${t.key}.cta`} style={{
            marginTop: 20, display: 'block', textAlign: 'center',
            padding: '14px 22px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            background: t.popular ? SIQ.green : 'white',
            color: t.popular ? 'white' : SIQ.greenDarker,
            border: t.popular ? 'none' : `2px solid ${SIQ.green}`,
            boxShadow: t.popular ? '0 8px 20px rgba(102,226,4,0.35)' : 'none',
          }}>{t.cta}</a>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF' }}>
      <div className="siq-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionEyebrow><span data-i18n="pricing.eyebrow">Pricing</span></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 16 }}><span data-i18n="pricing.headline">Choose your plan.</span></GradientHeadline>
          <p data-i18n="pricing.sub" style={{ fontSize: 18, color: SIQ.fgSubtle, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Try the basics free. Unlock the catalogs when you're ready.
          </p>
          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', background: 'white', padding: 6, borderRadius: 999,
            border: `1.5px solid ${SIQ.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {[
              { key: 'monthly', label: 'Monthly', i18nKey: 'pricing.toggle.monthly' },
              { key: 'yearly',  label: 'Yearly',  save: 'Save 17%', i18nKey: 'pricing.toggle.yearly', saveKey: 'pricing.toggle.save' },
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
                  <span data-i18n={opt.i18nKey}>{opt.label}</span>
                  {opt.save && <span data-i18n={opt.saveKey} style={{
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

window.Pricing = Pricing;
