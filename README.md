# StampIQ Landing

Static site for [stampiq.io](https://stampiq.io). Hosts both the pre-launch "coming soon" page and the post-launch product page, plus shared legal pages.

## Structure

```
stampiq_landing/
├── index.html                  # Root redirect (currently → pre-launch/, flip to post-launch/ at launch)
├── privacy.html                # Shared — linked from both sites
├── terms.html                  # Shared
├── delete-account.html         # Google Play compliance — linked from terms.html
├── redirect.html               # QR code landing
├── styles.css                  # Used by legal pages + pre-launch
├── translations.json           # i18n strings (legal pages + pre-launch)
├── translations-legal.json     # i18n strings (legal pages only)
├── CNAME, _config.yml          # GitHub Pages config
├── .well-known/                # iOS Universal Links + Android App Links
│
├── pre-launch/                 # "Coming soon" site (vanilla HTML + Lottie)
│   ├── index.html
│   ├── animations/             # Sigi Lottie files (idle, blink, waving, etc.)
│   ├── images/                 # Feature screenshots + demo video
│   └── svgs/                   # Store badges + Sigi icon
│
└── post-launch/                # Product site (React via Babel-in-browser, no build)
    ├── index.html
    ├── tokens.css              # Design tokens (colors, type)
    ├── responsive.css          # Mobile/tablet rules
    ├── pricing-data.js         # Per-country pricing
    ├── components.jsx          # Shared lib (SIQ tokens, Logo, Icons, SigiPose, etc.)
    ├── app.jsx                 # Root component, composes sections
    ├── chrome.jsx              # Header + Footer + LanguageSelector
    ├── hero.jsx                # Hero
    ├── features.jsx            # ThreeActs + SigiVision + MeetSigi
    ├── pricing.jsx             # Pricing tiers
    ├── social-proof.jsx        # Press + Founder
    ├── partner.jsx             # Partnerships
    ├── cta.jsx                 # FAQ + FinalCTA
    └── assets/
        ├── sigi/               # 6 mascot SVGs (poses)
        ├── badges/             # App Store + Play Store SVGs
        ├── decor/              # Stamp silhouette decorations
        ├── screens/            # 6 in-app screen WebPs
        ├── press/              # SBZ 2026/03 PDF + cover WebP
        └── founder/            # 3 portrait WebPs
```

## Local preview

Babel-in-browser and `fetch()` calls require a real HTTP server (won't work via `file://`):

```bash
cd /Users/sigi/dev/stampiq_landing
python3 -m http.server 8000
```

Then visit:
- http://localhost:8000/ — root (redirects to pre-launch)
- http://localhost:8000/post-launch/
- http://localhost:8000/pre-launch/
- http://localhost:8000/privacy.html

## Conventions

- **kebab-case** for filenames and asset paths
- **WebP** for raster images (screens, photos), **SVG** for logos / icons / decorations
- Post-launch JSX files each export their components on `window.*` since there's no module bundler

## Going live with post-launch

Edit root `index.html` and change the two `pre-launch/` references to `post-launch/`.

## License

Proprietary — StampIQ.io
