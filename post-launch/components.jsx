// StampIQ post-launch landing — shared components
// Reuses the design tokens from tokens.css

const SIQ = {
  green: '#66E204',
  greenDark: '#52C003',
  greenDarker: '#4FA902',
  greenTint: 'rgba(102,226,4,0.10)',
  greenTintLight: 'rgba(102,226,4,0.04)',
  fg: '#222222',
  fgMuted: '#888888',
  fgSubtle: '#555555',
  bg: '#F9F9F9',
  border: '#E0E0E0',
  footer: '#2D2F2A',
  shadow: {
    card: '0 4px 20px rgba(0,0,0,0.08)',
    soft: '0 2px 8px rgba(0,0,0,0.10)',
    pop: '0 4px 15px rgba(0,0,0,0.10)',
    deep: '0 20px 40px rgba(0,0,0,0.30)',
    cta: '0 8px 25px rgba(102,226,4,0.40)',
  },
};

// ---- Logo (colored — green icon, dark wordmark) ----
const Logo = ({ height = 32, mono = false }) => {
  const iconColor = mono ? 'currentColor' : SIQ.green;
  const wordColor = mono ? 'currentColor' : SIQ.fg;
  // Render the source SVG with explicit fills overriding cls-1/cls-2
  return (
    <svg viewBox="0 0 705.14 174.29" height={height} style={{ display: 'block' }} aria-label="StampIQ">
      <g>
        {/* Wordmark "Stamp" letters use cls-2 (dark) */}
        <g fill={wordColor}>
          <path d="M261.71,106.35c0-3.58-1.26-6.34-3.79-8.25-2.53-1.92-7.08-3.94-13.66-6.07-6.58-2.13-11.79-4.23-15.62-6.29-10.46-5.65-15.68-13.26-15.68-22.83,0-4.98,1.4-9.41,4.21-13.31,2.8-3.9,6.83-6.95,12.08-9.14,5.25-2.19,11.14-3.29,17.68-3.29s12.44,1.19,17.58,3.57c5.14,2.38,9.14,5.75,11.98,10.09,2.85,4.35,4.27,9.28,4.27,14.8h-18.97c0-4.21-1.33-7.49-3.99-9.84-2.65-2.34-6.39-3.51-11.19-3.51s-8.24.98-10.81,2.94c-2.57,1.96-3.86,4.55-3.86,7.75,0,2.99,1.51,5.5,4.52,7.53,3.01,2.02,7.45,3.92,13.31,5.69,10.79,3.25,18.66,7.27,23.59,12.08,4.93,4.81,7.4,10.79,7.4,17.96,0,7.97-3.01,14.22-9.04,18.75-6.03,4.53-14.15,6.8-24.35,6.8-7.08,0-13.53-1.3-19.35-3.89-5.82-2.59-10.26-6.15-13.31-10.66-3.06-4.51-4.58-9.74-4.58-15.68h19.04c0,10.16,6.07,15.24,18.21,15.24,4.51,0,8.03-.92,10.56-2.75,2.53-1.83,3.79-4.4,3.79-7.68Z"/>
          <path d="M314.26,45.25v16.82h11.7v13.41h-11.7v34.15c0,2.53.49,4.34,1.46,5.44.97,1.1,2.82,1.64,5.57,1.64,2.02,0,3.81-.15,5.38-.44v13.85c-3.59,1.1-7.28,1.65-11.07,1.65-12.82,0-19.35-6.47-19.61-19.42v-36.87h-9.99v-13.41h9.99v-16.82h18.28Z"/>
          <path d="M375.81,130.51c-.85-1.65-1.46-3.69-1.83-6.14-4.43,4.93-10.18,7.4-17.27,7.4-6.71,0-12.26-1.94-16.67-5.82-4.41-3.88-6.61-8.77-6.61-14.67,0-7.25,2.69-12.82,8.06-16.7,5.38-3.88,13.14-5.84,23.31-5.88h8.41v-3.92c0-3.16-.81-5.69-2.44-7.59-1.62-1.9-4.19-2.85-7.69-2.85-3.08,0-5.49.74-7.24,2.21-1.75,1.48-2.62,3.5-2.62,6.07h-18.28c0-3.96,1.22-7.63,3.67-11.01,2.44-3.37,5.9-6.02,10.37-7.94,4.47-1.92,9.49-2.88,15.05-2.88,8.43,0,15.13,2.12,20.08,6.35,4.95,4.24,7.43,10.19,7.43,17.87v29.66c.04,6.49.95,11.41,2.72,14.74v1.08h-18.47ZM360.69,117.8c2.7,0,5.19-.6,7.46-1.8,2.28-1.2,3.96-2.82,5.06-4.84v-11.76h-6.83c-9.15,0-14.02,3.16-14.61,9.49l-.06,1.08c0,2.28.8,4.15,2.4,5.63,1.6,1.48,3.79,2.21,6.58,2.21Z"/>
          <path d="M422.74,62.07l.57,7.65c4.85-5.95,11.4-8.92,19.67-8.92,8.81,0,14.86,3.48,18.15,10.44,4.8-6.96,11.65-10.44,20.56-10.44,7.42,0,12.94,2.16,16.57,6.48,3.63,4.32,5.44,10.83,5.44,19.51v43.7h-18.34v-43.64c0-3.88-.76-6.72-2.27-8.51-1.52-1.79-4.2-2.69-8.03-2.69-5.48,0-9.27,2.61-11.38,7.84l.06,46.99h-18.28v-43.58c0-3.96-.78-6.83-2.34-8.6-1.56-1.77-4.21-2.65-7.97-2.65-5.19,0-8.94,2.15-11.26,6.45v48.39h-18.28V62.07h17.14Z"/>
          <path d="M579.34,96.92c0,10.54-2.4,18.98-7.18,25.33-4.78,6.35-11.25,9.52-19.38,9.52-6.92,0-12.5-2.4-16.76-7.21v32.26h-18.28V62.07h16.95l.63,6.71c4.43-5.31,10.2-7.97,17.33-7.97,8.43,0,14.99,3.12,19.67,9.36,4.68,6.24,7.02,14.84,7.02,25.81v.95ZM561.06,95.6c0-6.37-1.13-11.28-3.39-14.74-2.25-3.46-5.53-5.18-9.83-5.18-5.74,0-9.68,2.19-11.83,6.58v28.02c2.24,4.51,6.22,6.77,11.95,6.77,8.73,0,13.09-7.15,13.09-21.44Z"/>
        </g>
        {/* "IQ" letters use cls-1 (green) */}
        <g fill={iconColor}>
          <path d="M612.04,130.51h-18.98V38.42h18.98v92.09Z"/>
          <path d="M705.14,86.55c0,8.6-1.39,16.08-4.17,22.42-2.79,6.35-6.64,11.44-11.58,15.28l15.31,12.02-12.08,10.69-19.6-15.75c-2.24.38-4.55.57-6.96.57-7.63,0-14.44-1.83-20.43-5.5-5.99-3.67-10.63-8.91-13.92-15.72-3.29-6.81-4.95-14.64-4.99-23.5v-4.55c0-9.07,1.63-17.05,4.9-23.94,3.27-6.89,7.88-12.18,13.85-15.87,5.97-3.69,12.79-5.53,20.46-5.53s14.49,1.85,20.47,5.53c5.97,3.69,10.58,8.98,13.85,15.87,3.26,6.89,4.9,14.85,4.9,23.88v4.11ZM685.91,82.38c0-9.65-1.73-16.99-5.19-22.01s-8.39-7.53-14.8-7.53-11.28,2.48-14.73,7.43c-3.46,4.95-5.21,12.22-5.25,21.79v4.49c0,9.4,1.73,16.7,5.19,21.88,3.45,5.18,8.43,7.78,14.92,7.78s11.26-2.5,14.67-7.49c3.42-5,5.15-12.28,5.19-21.85v-4.49Z"/>
        </g>
        {/* Stamp icon: green corner brackets + dark grid */}
        <g fill={iconColor}>
          <path d="M17.31,75.05V25.3c0-4.41,3.59-8,7.99-8h49.76V0H25.3C11.35,0,0,11.35,0,25.3v49.75h17.31Z"/>
          <path d="M156.98,99.24v49.75c0,4.41-3.59,8-8,8h-49.75v17.31h49.75c13.95,0,25.3-11.35,25.3-25.3v-49.75h-17.31Z"/>
          <path d="M75.05,156.99H25.3c-4.41,0-7.99-3.59-7.99-8v-49.75H0v49.75c0,13.95,11.35,25.3,25.3,25.3h49.76v-17.31Z"/>
        </g>
        <g fill={wordColor}>
          <path d="M142.03,97.38v-10.23h-54.92v-54.89h-10.2c-.75,6.09-5.88,10.83-12.17,10.83s-11.43-4.74-12.17-10.83h-20.31v20.31c6.09.75,10.83,5.88,10.83,12.17s-4.74,11.43-10.83,12.17v20.46c6.09.74,10.83,5.88,10.83,12.17s-4.74,11.43-10.83,12.17v20.31h20.31c.74-6.09,5.88-10.83,12.17-10.83s11.43,4.74,12.17,10.83h20.46c.75-6.09,5.88-10.83,12.17-10.83s11.43,4.74,12.17,10.83h20.31v-20.31c-6.09-.74-10.83-5.88-10.83-12.17s4.74-11.43,10.83-12.17Z"/>
        </g>
        <g fill={iconColor}>
          <rect x="114.59" y="59.67" width="27.48" height="27.48"/>
          <rect x="87.12" y="32.19" width="27.48" height="27.48"/>
          <rect x="142.07" y="32.19" width="27.48" height="27.48"/>
          <rect x="114.59" y="4.71" width="27.48" height="27.48"/>
        </g>
      </g>
    </svg>
  );
};

const Icons = {
  Camera: ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="4"/></svg>,
  Folder: ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Globe: ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Sparkles: ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  Check: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Dash: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Arrow: ({ dir = 'right', size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d={dir === 'right' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}/></svg>,
  Chevron: ({ dir = 'down', size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'up' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"/></svg>,
  Eye: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  Calendar: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Info: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  NoEntry: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  Infinity: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.739-8z"/></svg>,
  Grid: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  History: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/><polyline points="12 7 12 12 15 14"/></svg>,
  Stars: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.8 5.5H19l-4.4 3.2L16.4 16 12 12.8 7.6 16l1.8-5.3L5 7.5h5.2L12 2z"/><path d="M5 18l.6 1.8H7.4l-1.5 1.1.6 1.7L5 21.5l-1.5 1.1.6-1.7L2.6 19.8h1.8L5 18z" opacity=".6"/></svg>,
  Medal: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="14" r="6"/><polyline points="9 6 7 2 17 2 15 6"/><polygon points="12 11 12.9 13 15 13.3 13.5 14.8 13.8 17 12 16 10.2 17 10.5 14.8 9 13.3 11.1 13"/></svg>,
  Handshake: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l2 2a1 1 0 0 0 3-3"/><path d="M14 14l2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-1.41 0l-1.59-1.59a1 1 0 0 0-1.41 0L5 11l4 4"/><path d="M3 13l3-3 7 7-3 3z"/></svg>,
  Users: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Book: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Megaphone: ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11v3a1 1 0 0 0 1 1h3l3.6 5.4a1 1 0 0 0 1.8-.6V4.2a1 1 0 0 0-1.8-.6L7 9H4a1 1 0 0 0-1 1z"/><path d="M18 8a5 5 0 0 1 0 8"/></svg>,
  SwissFlag: ({ size = 14 }) => <svg viewBox="0 0 32 32" width={size} height={size} style={{ marginRight: 6, borderRadius: 2 }}><rect width="32" height="32" fill="#FF0000"/><rect x="13" y="6" width="6" height="20" fill="white"/><rect x="6" y="13" width="20" height="6" fill="white"/></svg>,
};

// ---- Pill ----
const Pill = ({ variant = 'green', children, style, className }) => {
  const base = { display: 'inline-flex', alignItems: 'center', borderRadius: 25, fontSize: 13, fontWeight: 600, padding: '6px 16px', whiteSpace: 'nowrap', ...style };
  if (variant === 'green') return <span className={className} style={{ ...base, background: SIQ.green, color: 'white', padding: '6px 20px' }}>{children}</span>;
  if (variant === 'available') return <span className={className} style={{ ...base, background: SIQ.greenTint, color: SIQ.greenDarker, padding: '6px 16px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: SIQ.green, marginRight: 8, boxShadow: `0 0 0 4px ${SIQ.greenTint}` }}/>Now Available</span>;
  return <span className={className} style={{ ...base, background: 'white', color: SIQ.fg, border: `1px solid ${SIQ.border}` }}>{children}</span>;
};

// ---- Phone bezel ----
const PhoneMockup = ({ src, w = 280, h = 580, style }) => (
  <div style={{
    width: w, height: h, background: '#000', borderRadius: 38, padding: 8,
    boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 0 0 2px #1a1a1a',
    position: 'relative', flexShrink: 0, ...style,
  }}>
    <div style={{ width: '100%', height: '100%', borderRadius: 30, overflow: 'hidden', background: '#fff' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}/>
    </div>
  </div>
);

// ---- Section title with gradient ----
const SectionEyebrow = ({ children, color = SIQ.green }) => (
  <div style={{ color, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>{children}</div>
);

const SectionTitle = ({ children, light, style, className }) => (
  <h2 className={className} style={{
    fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0,
    ...(light
      ? { color: 'white' }
      : {
          background: `linear-gradient(135deg, ${SIQ.fg} 0%, ${SIQ.green} 100%)`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }),
    textWrap: 'balance', ...style,
  }}>{children}</h2>
);

const GradientHeadline = ({ children, style, className }) => (
  <h2 className={className} style={{
    fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0,
    background: `linear-gradient(135deg, ${SIQ.fg} 0%, ${SIQ.green} 100%)`,
    WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
    textWrap: 'balance', ...style,
  }}>{children}</h2>
);

// ---- Store badges ----
const StoreBadges = ({ light = false, size = 'normal' }) => {
  const h = size === 'large' ? 60 : 54;
  return (
    <div className="siq-store-badges" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
      <a href="#" style={{ display: 'block', borderRadius: 8, overflow: 'hidden' }}>
        <img src="assets/badges/app-store.svg" alt="App Store" style={{ height: h, display: 'block' }}/>
      </a>
      <a href="#" style={{ display: 'block', borderRadius: 8, overflow: 'hidden' }}>
        <img src="assets/badges/play-store.svg?v=2" alt="Google Play" style={{ height: h, display: 'block' }}/>
      </a>
    </div>
  );
};

// ---- SigiVision lockup ----
const SigiVisionMark = ({ light = false, size = 18 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'baseline', gap: 0,
    fontSize: size, fontWeight: 800, fontFamily: 'Roboto, sans-serif',
    color: light ? 'white' : SIQ.fg, lineHeight: 1,
  }}>
    <span style={{ fontSize: size * 0.45, fontWeight: 500, color: light ? 'rgba(255,255,255,0.7)' : SIQ.fgMuted, marginRight: 6, textTransform: 'lowercase', letterSpacing: '0.02em' }}>powered by</span>
    <span>Sigi</span>
    <span style={{ color: SIQ.green }}>Vision</span>
    <span style={{ fontSize: size * 0.4, fontWeight: 600, color: light ? 'rgba(255,255,255,0.7)' : SIQ.fgMuted, marginLeft: 2 }}>™</span>
  </span>
);

// ---- Pose variants (transparent SVGs of Sigi in different poses) ----
const SIGI_POSES = {
  waving:         "assets/sigi/waving.svg",
  magnifying:     "assets/sigi/magnifying.svg",
  thinking:       "assets/sigi/thinking.svg",
  thumbsup:       "assets/sigi/thumbs-up.svg",
  celebrating:    "assets/sigi/celebrating.svg",
  stamp:          "assets/sigi/stamp.svg",
};
const SigiPose = ({ pose = 'waving', size = 200, style, flip = false, className }) => (
  <img src={SIGI_POSES[pose]} alt="" aria-hidden="true" className={className} style={{
    width: size, height: 'auto', display: 'block',
    transform: flip ? 'scaleX(-1)' : 'none',
    filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.18))',
    ...style,
  }}/>
);

// ---- Big background outline silhouette of Sigi (brochure-style) ----
// Renders the SVG huge with a CSS mask trick — fills entire shape with a single color/opacity.
// We tint by wrapping in a div with mix-blend-mode, but simpler: use opacity + a hue-rotate-free
// approach by rendering the actual SVG at low opacity. Looks great on green sections.
const SigiSilhouette = ({ pose = 'waving', size = 600, color = 'rgba(255,255,255,0.10)', style, flip = false, className }) => {
  // Use CSS mask-image so we get a solid-color silhouette regardless of internal SVG colors
  return (
    <div aria-hidden="true" className={className} style={{
      width: size, height: size * 1.3, pointerEvents: 'none',
      WebkitMaskImage: `url(${SIGI_POSES[pose]})`,
      maskImage: `url(${SIGI_POSES[pose]})`,
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center', maskPosition: 'center',
      background: color,
      transform: flip ? 'scaleX(-1)' : 'none',
      ...style,
    }}/>
  );
};

Object.assign(window, {
  SIQ, Logo, Icons, Pill, PhoneMockup, SectionEyebrow, SectionTitle, GradientHeadline,
  StoreBadges, SigiVisionMark, SigiPose, SigiSilhouette, SIGI_POSES,
});
