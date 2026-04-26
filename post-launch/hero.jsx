// StampIQ post-launch landing — Hero

const Hero = () => (
  <section id="top" style={{
    position: 'relative', overflow: 'hidden',
    background: SIQ.bg,
    padding: '60px 0 80px',
  }}>
    <div className="siq-container siq-split" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div>
        <div className="siq-hero-pill-row">
          <Pill variant="available" style={{ marginBottom: 24 }}/>
        </div>
        <h1 className="siq-h1" style={{
          fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.05, margin: '0 0 22px',
          letterSpacing: '-0.02em',
          background: `linear-gradient(135deg, ${SIQ.fg} 0%, ${SIQ.green} 100%)`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textWrap: 'balance',
        }}>Keep Collecting Smarter.</h1>
        <p style={{ fontSize: 20, color: SIQ.fgSubtle, lineHeight: 1.55, margin: '0 0 32px', maxWidth: 540 }}>
          Discover, identify, and organize your stamps with ease. Your digital companion, built by collectors, for collectors.
        </p>
        <div className="siq-hero-badges" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 36 }}>
          <StoreBadges/>
        </div>
        <div className="siq-hero-stats" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            { v: '<1s', l: 'Recognition speed' },
            { v: '98%', l: 'Accuracy' },
            { v: '25K+', l: 'Stamps catalogued' },
            { v: '6', l: 'Countries' },
          ].map(s => (
            <div key={s.l} style={{ minWidth: 110, whiteSpace: 'nowrap' }}>
              <div className="siq-hero-stat-v" style={{
                fontSize: 32, fontWeight: 800, lineHeight: 1, marginBottom: 4,
                background: 'linear-gradient(135deg, #2D5016 0%, #66E204 50%, #A8E063 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.v}</div>
              <div className="siq-hero-stat-l" style={{ color: SIQ.fgMuted, fontSize: 13 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="siq-phone-wrap" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600 }}>
        {/* White stamp silhouettes peeking from behind the phone */}
        <img src="assets/decor/stamp-silhouette-white.svg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: '8%', left: '50%',
          width: 180, opacity: 1, transform: 'translateX(-130%) rotate(-18deg)',
          zIndex: 0, pointerEvents: 'none',
        }}/>
        <img src="assets/decor/stamp-silhouette-white.svg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: '20%', left: '50%',
          width: 160, opacity: 1, transform: 'translateX(60%) rotate(15deg)',
          zIndex: 0, pointerEvents: 'none',
        }}/>
        {/* Bottom-left of phone */}
        <img src="assets/decor/stamp-silhouette-white.svg" alt="" aria-hidden="true" style={{
          position: 'absolute', bottom: '10%', left: '50%',
          width: 170, opacity: 1, transform: 'translateX(-150%) rotate(22deg)',
          zIndex: 0, pointerEvents: 'none',
        }}/>
        {/* Off-page (right edge, partially clipped) */}
        <img src="assets/decor/stamp-silhouette-white.svg" alt="" aria-hidden="true" style={{
          position: 'absolute', top: '55%', right: -100,
          width: 220, opacity: 1, transform: 'rotate(-8deg)',
          zIndex: 0, pointerEvents: 'none',
        }}/>
        <PhoneMockup src="assets/screens/home.webp" w={300} h={620}/>
        {/* Sigi waving — peeks from bottom-right */}
        <SigiPose pose="waving" size={220} className="siq-hero-sigi" style={{
          position: 'absolute', bottom: -30, right: -40, zIndex: 2,
        }}/>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
