// StampIQ post-launch landing — ThreeActs, SigiVision, MeetSigi

const Act = ({ idx, eyebrow, title, body, bullets, screen, dark, pose, accent, right, silhouette, bgSilhouette, countries, i18nBase }) => {
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
      {/* Decorative tinted blob — soft color wash behind everything.
          Suppressed when bgSilhouette is in play, since the silhouette IS the background shape. */}
      {isDark && <div style={{
        position: 'absolute', bottom: -200, left: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', zIndex: 0,
      }}/>}

      {/* BIG matching-pose Sigi silhouette half off-page on the side OPPOSITE the phone.
          ONLY enabled per-act via the `bgSilhouette` prop — we're rolling this out one
          section at a time so we can validate the treatment. */}
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

      {/* Big background silhouette for the dark Explore act (different pose, different color) */}
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
            <span style={{ marginRight: 10, opacity: 0.6 }}>0{idx}</span><span data-i18n={`${i18nBase}.eyebrow`}>{eyebrow}</span>
          </SectionEyebrow>
          <SectionTitle light={isDark} className="siq-section-title" style={{ marginBottom: 20 }}><span data-i18n={`${i18nBase}.title`}>{title}</span></SectionTitle>
          <p data-i18n={`${i18nBase}.body`} style={{
            fontSize: 18, lineHeight: 1.65, marginBottom: 24,
            color: isDark ? 'rgba(255,255,255,0.92)' : SIQ.fgSubtle, maxWidth: 520,
          }}>{body}</p>
          <ul className="siq-bullets" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {bullets.map((b, bi) => (
              <li key={b} style={{ display: 'flex', gap: 14, padding: '10px 0', alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: isDark ? 'rgba(255,255,255,0.95)' : SIQ.green,
                  color: isDark ? SIQ.greenDarker : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
                }}><Icons.Check size={14}/></span>
                <span data-i18n={`${i18nBase}.bullet.${bi + 1}`} style={{ color: isDark ? 'white' : SIQ.fg, fontSize: 16, lineHeight: 1.55 }}>{b}</span>
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
              <div data-i18n="features.catalogs_label" style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.14em',
                color: isDark ? 'rgba(255,255,255,0.7)' : SIQ.fgMuted,
                textTransform: 'uppercase', marginBottom: 12,
              }}>Currently available catalogs · more to come</div>
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

const ThreeActs = () => (
  <section id="features">
    <Act
      idx={1}
      i18nBase="act1"
      eyebrow="Scan & Identify"
      title="Point your camera. Get an instant answer"
      body="SigiVision™ recognition technology identifies stamps from supported catalogs in under one second. No more thumbing through paper catalogs for an unknown issue."
      bullets={[
        'Single-tap recognition for one stamp at a time',
        'Catalog numbers, country, year of issue',
        'The story behind the stamp',
        'Related stamps and stamps from the series',
      ]}
      screen="assets/screens/scan.webp"
      pose={{ kind: 'magnifying', side: 'right', bottom: 0, size: 200 }}
      countries={[
        { f: '🇨🇭', c: 'CH' }, { f: '🇩🇪', c: 'DE' }, { f: '🇦🇹', c: 'AT' },
        { f: '🇱🇮', c: 'LI' }, { f: '🇳🇱', c: 'NL' }, { f: '🇵🇱', c: 'PL' },
      ]}
    />
    <Act
      idx={2}
      i18nBase="act2"
      eyebrow="Collect & Organize"
      title="Your complete collection, always with you"
      body="Managing a collection shouldn't require endless lists and scattered notebooks. Organize by country, theme, or series. Track condition, value, and certificates. Add personal photos and notes."
      bullets={[
        'Organize by country, theme, or series',
        'Track condition, purchase value, certificates',
        'See what\'s missing — avoid duplicates',
        'Access your collection on any device',
      ]}
      screen="assets/screens/catalog.webp"
      right
      pose={{ kind: 'thumbsup', side: 'left', bottom: 0, size: 190, flip: true }}
    />
    <Act
      idx={3}
      i18nBase="act3"
      eyebrow="Scan Bulk & Digitalize"
      title="Identify 40+ stamps in a single photo"
      body="Snap one photo of an album page and SigiVision™ detects every stamp at once — automatically cropping and matching against the catalog. The fastest way to digitalize a lifetime of philately."
      bullets={[
        'Detect dozens of stamps from one image',
        'Automatic cropping and catalog matching',
        'See total detected, in collection, on the wishlist',
        'Review each match before saving',
      ]}
      screen="assets/screens/bulk-results.webp"
      pose={{ kind: 'thumbsup', side: 'right', bottom: 0, size: 195 }}
    />
    <Act
      idx={4}
      i18nBase="act4"
      dark
      eyebrow="Explore & Discover"
      title="Philately beyond the desk"
      body="See stamps as windows into the real world. Discover places near you depicted on stamps in your collection — buildings, monuments, landscapes. Turn a Sunday walk into a stamp adventure."
      bullets={[
        'Discover stamp locations on an interactive map',
        'Connect stamps to real-world places',
        'Filter by what interests you',
        'Ask Sigi about history and context',
      ]}
      screen="assets/screens/map.webp"
      right
      pose={{ kind: 'celebrating', side: 'left', bottom: 0, size: 210, flip: true }}
      silhouette
    />
  </section>
);

const SigiVision = () => (
  <section id="sigivision" className="siq-section" style={{ padding: '110px 0', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>

    <div className="siq-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <SectionEyebrow><span data-i18n="sigivision.eyebrow">The Technology</span></SectionEyebrow>
      <GradientHeadline className="siq-headline" style={{ marginBottom: 18, maxWidth: 880, margin: '0 auto 18px' }}>
        <span data-i18n="sigivision.headline">SigiVision™ — recognition trained on real stamps and catalogs</span>
      </GradientHeadline>
      <p data-i18n="sigivision.body" style={{ fontSize: 19, color: SIQ.fgSubtle, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 60px' }}>
        Our recognition engine is built specifically for stamps — not generic image classification. Every model is tuned per country catalog and validated against certified references.
      </p>

      <div className="siq-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 60 }}>
        {[
          { v: '<1s',  l: 'Average recognition time',     sub: 'Before the catalog leaves the shelf.',         base: 'sigivision.stat.speed' },
          { v: '98%',  l: 'Recognition accuracy',         sub: 'Validated against certified reference sets.',  base: 'sigivision.stat.accuracy' },
          { v: '25K+', l: 'Stamps in active catalogs',    sub: 'New issues every month.',                      base: 'sigivision.stat.catalog' },
          { v: '6',    l: 'Countries supported',          sub: 'More to come.',                                base: 'sigivision.stat.countries' },
        ].map(s => (
          <div key={s.l} style={{
            padding: 32, background: SIQ.bg, borderRadius: 16, borderLeft: `4px solid ${SIQ.green}`,
            textAlign: 'left',
          }}>
            <div data-i18n={`${s.base}.value`} style={{
              fontSize: 56, fontWeight: 800, lineHeight: 1, marginBottom: 10,
              background: 'linear-gradient(135deg, #2D5016 0%, #66E204 50%, #A8E063 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{s.v}</div>
            <div data-i18n={`${s.base}.label`} style={{ fontSize: 16, fontWeight: 700, color: SIQ.fg, marginBottom: 6 }}>{s.l}</div>
            <div data-i18n={`${s.base}.sub`} style={{ fontSize: 14, color: SIQ.fgMuted, lineHeight: 1.5 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MeetSigi = () => (
  <section className="siq-section" style={{ padding: '110px 0', background: '#F9F9F9', position: 'relative', overflow: 'hidden' }}>
    <div className="siq-container siq-split" style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 24px',
      display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'center',
    }}>
      <div className="siq-phone-wrap" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <PhoneMockup src="assets/screens/chat.webp" w={280} h={580}/>
        <SigiPose pose="thinking" size={210} className="siq-meet-sigi-pose" style={{
          position: 'absolute', top: -40, right: -70, zIndex: 2,
        }}/>
      </div>
      <div>
        <SectionEyebrow><span data-i18n="meet_sigi.eyebrow">Your Companion</span></SectionEyebrow>
        <GradientHeadline className="siq-headline" style={{ marginBottom: 22 }}><span data-i18n="meet_sigi.headline">Meet Sigi</span></GradientHeadline>
        <p data-i18n="meet_sigi.p1" style={{ fontSize: 19, lineHeight: 1.6, color: SIQ.fgSubtle, marginBottom: 22, maxWidth: 540 }}>
          Sigi is your AI-powered stamp companion. Ask about a stamp's history, the story it tells, or where to start with a country you've never collected.
        </p>
        <p data-i18n="meet_sigi.p2" style={{ fontSize: 17, lineHeight: 1.6, color: SIQ.fgSubtle, marginBottom: 32, maxWidth: 540 }}>
          He's friendly, patient, and ready whenever curiosity strikes.
        </p>
        <div className="siq-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 520 }}>
          {[
            { text: 'Historical context for any issue',          key: 'meet_sigi.feature.1' },
            { text: 'Conversational answers to your questions',  key: 'meet_sigi.feature.2' },
            { text: 'Identify themes and series',                key: 'meet_sigi.feature.3' },
            { text: 'Tips for organizing and preserving',        key: 'meet_sigi.feature.4' },
          ].map(s => (
            <div key={s.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                background: SIQ.green, color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
              }}><Icons.Check size={14}/></span>
              <span data-i18n={s.key} style={{ fontSize: 15, color: SIQ.fg, lineHeight: 1.55 }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { ThreeActs, SigiVision, MeetSigi });
