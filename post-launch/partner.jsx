// ---------- Partner with StampIQ ----------
const Partner = () => {
  const cards = [
    { key: 'dealers',      title: 'For Stamp Dealers',           desc: 'Partner with us to reach engaged collectors and integrate your inventory with our platform.' },
    { key: 'associations', title: 'For Philatelic Associations', desc: 'Collaborate to bring digital tools to your members and grow the collecting community.' },
    { key: 'publishers',   title: 'For Catalog Publishers',      desc: 'Work with us to bring your catalogs to collectors in a modern, accessible format.' },
    { key: 'press',        title: 'For Press & Media',           desc: 'Get in touch for press materials, interviews, and exclusive updates.' },
  ];

  return (
    <section id="partner" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF' }}>
      <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <SectionEyebrow><span data-i18n="partner.eyebrow">Partnerships</span></SectionEyebrow>
          <GradientHeadline className="siq-headline" style={{ marginBottom: 16 }}><span data-i18n="partner.headline">Partner with StampIQ.</span></GradientHeadline>
          <p data-i18n="partner.body" style={{ fontSize: 18, color: SIQ.fgSubtle, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            We're building the future of stamp collecting and we'd love to collaborate with dealers, philatelic associations, catalog publishers, and the wider collecting community.
          </p>
        </div>

        <div className="siq-grid-2" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 48,
        }}>
          {cards.map(c => (
            <div key={c.key} style={{
              background: 'white',
              border: `1px solid ${SIQ.border}`,
              borderLeft: `4px solid ${SIQ.green}`,
              borderRadius: 12, padding: '28px 32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div data-i18n={`partner.card.${c.key}.title`} style={{ fontSize: 18, fontWeight: 700, color: SIQ.fg, marginBottom: 10 }}>{c.title}</div>
              <p data-i18n={`partner.card.${c.key}.desc`} style={{ fontSize: 15, lineHeight: 1.6, color: SIQ.fgSubtle, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="mailto:partnerships@stampiq.io" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: SIQ.green, color: 'white',
            padding: '14px 28px', borderRadius: 999,
            textDecoration: 'none', fontSize: 15, fontWeight: 600,
            boxShadow: '0 6px 16px rgba(102,226,4,0.35)',
          }}><span data-i18n="partner.cta">Contact us about partnerships</span><Icons.Arrow size={16}/></a>
        </div>
      </div>
    </section>
  );
};

window.Partner = Partner;
