// StampIQ post-launch landing — Press, Founder

const Press = () => (
  <section id="press" className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9' }}>
    <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <SectionEyebrow><span data-i18n="press.eyebrow">Press</span></SectionEyebrow>
        <GradientHeadline className="siq-headline" style={{ marginBottom: 14 }}><span data-i18n="press.headline">Featured in print.</span></GradientHeadline>
        <p data-i18n="press.body" style={{ fontSize: 17, color: SIQ.fgSubtle, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
          Recognized by leading philately publications.
        </p>
      </div>

      <div className="siq-press" style={{
        background: 'white', borderRadius: 20, padding: 40,
        borderLeft: `5px solid ${SIQ.green}`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 50, alignItems: 'center',
      }}>
        <a href="assets/press/sbz-2026-03.pdf" target="_blank" rel="noopener" style={{
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
          <img src="assets/press/sbz-2026-03-cover.webp" alt="SBZ Issue 03/2026 — StampIQ: der digitale Begleiter" style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block',
          }}/>
          {/* Issue tag */}
          <div data-i18n="press.issue.sbz_2026_03.tag" style={{
            position: 'absolute', top: 14, left: 14,
            padding: '6px 12px', background: 'rgba(0,0,0,0.75)', color: 'white',
            borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          }}>SBZ · 03/2026</div>
        </a>
        <div>
          <div data-i18n="press.issue.sbz_2026_03.publication" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SIQ.greenDarker, marginBottom: 12 }}>
            Schweizer Briefmarken Zeitung · 03/2026
          </div>
          <h3 data-i18n="press.issue.sbz_2026_03.title" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, color: SIQ.fg, margin: '0 0 18px' }}>
            "StampIQ: der digitale Begleiter."
          </h3>
          <p data-i18n="press.issue.sbz_2026_03.body" style={{ fontSize: 16, lineHeight: 1.65, color: SIQ.fgSubtle, marginBottom: 28 }}>
            SBZ — Schweizer Briefmarken Zeitung, Switzerland's leading philately magazine — featured StampIQ in their March 2026 issue. A two-page profile of the new collector's companion from Zug, the technology behind SigiVision, and the philosophy of an app built by collectors for collectors.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="assets/press/sbz-2026-03.pdf" target="_blank" rel="noopener" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
              background: SIQ.green, color: 'white', borderRadius: 25,
              textDecoration: 'none', fontSize: 14, fontWeight: 600,
              boxShadow: '0 6px 16px rgba(102,226,4,0.35)',
            }}><span data-i18n="press.cta">Read the article</span><Icons.Arrow size={16}/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Founder = () => (
  <section className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9' }}>
    <div className="siq-container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
      <SectionEyebrow><span data-i18n="founder.eyebrow">One frustrated collector. One better way.</span></SectionEyebrow>
      <GradientHeadline className="siq-headline" style={{ marginBottom: 30 }}><span data-i18n="founder.headline">Built by collectors, for collectors.</span></GradientHeadline>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
        {[1, 2, 3].map(i => (
          <img key={i} src={`assets/founder/portrait-${i}.webp`} alt="" style={{
            width: 160, height: 160, objectFit: 'cover', borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}/>
        ))}
      </div>
      <p data-i18n="founder.p1" style={{ fontSize: 18, lineHeight: 1.7, color: SIQ.fgSubtle, marginBottom: 18 }}>
        StampIQ was born from a simple frustration: managing a stamp collection shouldn't require endless catalogs, manual searches, and guesswork. As a lifelong collector, I knew there had to be a better way.
      </p>
      <p data-i18n="founder.p2" style={{ fontSize: 18, lineHeight: 1.7, color: SIQ.fgSubtle, marginBottom: 28 }}>
        After combining my passion for philately with years of work in technology, StampIQ is the tool I wish I'd had when I started collecting.
      </p>
      <p data-i18n="founder.byline" style={{ fontSize: 18, fontWeight: 700, color: SIQ.fg, fontStyle: 'italic' }}>
        — Marius Dygudaj, Founder
      </p>
    </div>
  </section>
);

Object.assign(window, { Press, Founder });
