// StampIQ post-launch landing — FAQ, FinalCTA

const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = React.useState(!!defaultOpen);
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
        <span style={{ flex: 1 }}>{q}</span>
        <span style={{
          flexShrink: 0, marginLeft: 16, fontSize: 22, color: SIQ.green, fontWeight: 300,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s',
        }}>+</span>
      </button>
      {open && <p className="siq-faq-a" style={{ color: SIQ.fgSubtle, fontSize: 15, lineHeight: 1.65, margin: '14px 0 0' }}>{a}</p>}
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="siq-section siq-faq-section" style={{
    padding: '110px 0 180px',
    background: '#FFFFFF',
    position: 'relative',
    // Diagonal cut at the bottom — this section ends at an angle so Final CTA's green sweeps up into it
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)',
  }}>
    <div className="siq-container" style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <SectionEyebrow>FAQ</SectionEyebrow>
        <GradientHeadline className="siq-headline">Questions, answered.</GradientHeadline>
      </div>
      <div style={{ display: 'grid', gap: 14 }}>
        <FAQItem defaultOpen q="Which countries' stamps can StampIQ identify?"
          a="At launch we support stamps from Switzerland, Germany, Austria, Liechtenstein, the Netherlands, and Poland. More countries to come."/>
        <FAQItem q="How accurate is the recognition?"
          a="SigiVision™ delivers 98% recognition accuracy across supported catalogs, with most identifications completing in under one second."/>
        <FAQItem q="Is there a free version?"
          a="Yes. The free tier lets you try the basics — 5 single scans and 1 bulk scan per month. You see catalog details for the stamps you scan, but not the full catalog. Premium includes one full country catalog (with unlimited single scans inside it), and Professional includes all country catalogs."/>
        <FAQItem q="Can I scan an entire album page?"
          a="Yes — Bulk Scan recognizes multiple stamps at once. Free accounts get 1 bulk scan per month, Premium gets 5, and Professional includes unlimited bulk scanning."/>
        <FAQItem q="Can I switch between plans anytime?"
          a="Yes. You can upgrade, downgrade, or cancel anytime — your collection, scans, and notes always stay saved."/>
        <FAQItem q="Which devices does StampIQ support?"
          a="StampIQ is available for iOS and Android — both smartphones and tablets."/>
        <FAQItem q="Do I need internet to use StampIQ?"
          a="Yes. An internet connection is required for stamp recognition and catalog access."/>
        <FAQItem q="Which languages does the app support?"
          a="The app is available in English, German, French, Italian, Polish, and Dutch."/>
        <FAQItem q="Where is my collection stored?"
          a="Your collection, scans, and notes are stored securely in the EU and synced to your account. Your data is never sold or shared."/>
        <FAQItem q="Will my data be private?"
          a={<>Your collection, scans, and notes are stored securely in the EU and never sold. To make StampIQ work, some data is shared with trusted service providers — for example, AWS for hosting, and OpenAI for Sigi's AI chat (chat messages and a collection summary). Full details, including what is shared and where, are in our <a href="../privacy.html" target="_blank" rel="noopener" style={{ color: SIQ.greenDarker, fontWeight: 600 }}>Privacy Policy</a>.</>}/>
        <FAQItem q="Can I export my collection?"
          a="Professional users can export collections as CSV or PDF. We're working on additional formats based on collector requests."/>
        <FAQItem q="How often are new features added?"
          a="We add features regularly, guided by feedback from real collectors. Tell us what would make StampIQ better — your input directly shapes the roadmap."/>
        <FAQItem q="How do I get support?"
          a={<>Reach us anytime at <a href="mailto:support@stampiq.io" style={{ color: SIQ.greenDarker, fontWeight: 600 }}>support@stampiq.io</a>. We typically reply within one business day.</>}/>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="download" className="siq-section-cta" style={{
    padding: '140px 0 120px',
    background: `linear-gradient(135deg, ${SIQ.green} 0%, ${SIQ.greenDark} 100%)`,
    position: 'relative', overflow: 'hidden',
    // Pulled up into the founder's diagonal cut so the seam disappears
    marginTop: -80,
  }}>
    {/* Scattered stamp pattern motif — replaces the stain-blob silhouette */}
    <div aria-hidden="true" className="siq-stamp-dots" style={{
      position: 'absolute', inset: 0, zIndex: 0, opacity: 0.18,
      backgroundImage: `
        radial-gradient(circle at 8% 20%, rgba(255,255,255,0.9) 0 2px, transparent 2px),
        radial-gradient(circle at 22% 75%, rgba(255,255,255,0.7) 0 2px, transparent 2px),
        radial-gradient(circle at 88% 35%, rgba(255,255,255,0.85) 0 2px, transparent 2px),
        radial-gradient(circle at 70% 88%, rgba(255,255,255,0.7) 0 2px, transparent 2px)
      `,
    }}/>
    {/* Scattered light-green stamp silhouettes — using the real stamp shape */}
    <div className="siq-stamp-shapes" aria-hidden="true">
    {[
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
    ].map((s, i) => (
      <img key={i} src="assets/decor/stamp-silhouette-lightgreen.svg" alt="" aria-hidden="true" style={{
        position: 'absolute', top: s.top, left: s.left,
        width: s.size, opacity: s.op, transform: `rotate(${s.rot}deg)`,
        zIndex: 0, pointerEvents: 'none',
      }}/>
    ))}
    </div>

    {/* Sigi with magnifying glass — peeking from the left, signing off the page */}
    <SigiPose pose="magnifying" size={220} flip className="siq-bg-silhouette siq-final-cta-sigi" style={{
      position: 'absolute', bottom: -20, left: '4%', zIndex: 2,
      filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.30))',
    }}/>

    <div className="siq-container siq-final-cta-content" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <h2 className="siq-final-cta-h1" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: 'white', margin: '0 0 20px', textWrap: 'balance' }}>
        Keep collecting smarter.
      </h2>
      <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.92)', lineHeight: 1.55, margin: '0 auto 36px', maxWidth: 540 }}>
        Free download. No card required. Your collection on every device.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StoreBadges size="large"/>
      </div>
    </div>
  </section>
);

Object.assign(window, { FAQ, FinalCTA });
