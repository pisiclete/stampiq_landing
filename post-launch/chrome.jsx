// StampIQ post-launch landing — Header, Footer, LanguageSelector

const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'nl', label: 'NL', flag: '🇳🇱' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

const LanguageSelector = () => {
  const [lang, setLang] = React.useState('en');
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  // Init: localStorage → browser language → 'en'
  React.useEffect(() => {
    const saved = localStorage.getItem('language');
    const browser = (navigator.language || 'en').split('-')[0];
    const supported = SUPPORTED_LANGS.map(l => l.code);
    if (saved && supported.includes(saved)) setLang(saved);
    else if (supported.includes(browser)) setLang(browser);
  }, []);

  // Click outside to close
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const choose = (code) => {
    setLang(code);
    localStorage.setItem('language', code);
    setOpen(false);
    // Translation hook — when wired up, this is where we'd call applyTranslations(code)
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: code } }));
  };

  const current = SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: open ? '#F2F2F2' : 'transparent',
          border: `1px solid ${SIQ.border}`,
          borderRadius: 999, padding: '6px 12px',
          fontSize: 13, fontWeight: 600, color: SIQ.fg,
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'white', border: `1px solid ${SIQ.border}`,
          borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          padding: 6, minWidth: 120, zIndex: 100,
        }}>
          {SUPPORTED_LANGS.map(l => (
            <button key={l.code} onClick={() => choose(l.code)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              background: lang === l.code ? '#F2F2F2' : 'transparent',
              border: 'none', borderRadius: 8, padding: '8px 12px',
              fontSize: 13, fontWeight: 600, color: SIQ.fg,
              cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState('CH');
  React.useEffect(() => { setCountry(window.detectCountry()); }, []);
  const c = STAMPIQ_PRICING[country];
  const links = [
    { href: '#features', label: 'Features' },
    { href: '#sigivision', label: 'SigiVision' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#press', label: 'Press' },
    { href: '#partner', label: 'Partners' },
    { href: '#faq', label: 'FAQ' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${SIQ.border}`,
    }}>
      <nav className="siq-nav" style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#top" style={{ display: 'block' }}><Logo height={30}/></a>
        <div className="siq-nav-links" style={{ display: 'flex', gap: 28, marginLeft: 32 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: SIQ.fg, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{l.label}</a>
          ))}
        </div>
        <div className="siq-nav-pills" style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Pill variant="neutral" style={{}} className="siq-nav-pill"><Icons.SwissFlag/>Swiss Made</Pill>
          <Pill variant="available" className="siq-nav-pill"/>
          <LanguageSelector/>
          <a href="#download" style={{
            display: 'inline-flex', alignItems: 'center',
            background: SIQ.green, color: 'white', padding: '6px 20px', borderRadius: 25,
            textDecoration: 'none', fontSize: 13, fontWeight: 600, lineHeight: 1.4,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(102,226,4,0.30)',
          }}>Download</a>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer style={{
    background: SIQ.footer, color: 'rgba(255,255,255,0.78)',
    padding: '90px 0 30px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Faint horizontal walking-Sigi strip — easter egg along the top edge.
        Three small Sigi silhouettes in dark green on dark, low-contrast on purpose. */}
    <div aria-hidden="true" style={{
      position: 'absolute', top: 18, left: 0, right: 0, height: 60,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      opacity: 0.18, pointerEvents: 'none',
    }}>
      {['waving', 'magnifying', 'thumbsup', 'celebrating', 'thinking', 'stamp', 'waving'].map((p, i) => (
        <SigiSilhouette key={i} pose={p} size={48} color="rgba(102,226,4,0.95)"/>
      ))}
    </div>
    {/* Top divider stroke — sets the strip apart from the columns below */}
    <div aria-hidden="true" style={{
      position: 'absolute', top: 80, left: 0, right: 0, height: 1,
      background: 'rgba(255,255,255,0.06)',
    }}/>
    <div className="siq-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
      <div className="siq-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div className="siq-footer-brand">
          <Logo height={28} mono/>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: '18px 0 18px', color: 'rgba(255,255,255,0.65)', maxWidth: 280 }}>
            Your digital stamp collecting companion. Built in Switzerland for collectors everywhere.
          </p>
          <Pill variant="neutral" style={{ background: 'rgba(255,255,255,0.10)', color: 'white', border: 'none' }}>
            <Icons.SwissFlag/>Swiss Made
          </Pill>
        </div>
        {[
          { title: 'Product', items: [['Features', '#features'], ['SigiVision', '#sigivision'], ['Pricing', '#pricing'], ['FAQ', '#faq']] },
          { title: 'Company', items: [['Press', '#press'], ['About', '#'], ['Contact', 'mailto:support@stampiq.io']] },
          { title: 'Legal', items: [['Privacy', '../privacy.html'], ['Terms', '../terms.html']] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 16 }}>{col.title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {col.items.map(([label, href]) => (
                <li key={label} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14 }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="siq-footer-copyright" style={{
        paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
          © 2026 StampIQ · Designed and built in Switzerland · support@stampiq.io
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          Supporting CH · DE · AT · LI · NL · PL
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Header, Footer });
