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
    ├── pricing-data.js         # Per-country pricing + detectCountry() cascade
    ├── i18n.js                 # Translation loader (data-i18n + MutationObserver)
    ├── translations.json       # 180 keys × 6 languages (en/de/nl/pl/fr/it)
    ├── components.jsx          # Shared lib (SIQ tokens, Logo, Icons, SigiPose, useLanguage hook)
    ├── app.jsx                 # Root component, composes sections
    ├── chrome.jsx              # Header + Footer + LanguageSelector
    ├── hero.jsx                # Hero
    ├── features.jsx            # ThreeActs + SigiVision + MeetSigi
    ├── pricing.jsx             # Pricing tiers (reads pricing-data.js, computes Save %)
    ├── social-proof.jsx        # Press + Founder
    ├── partner.jsx             # Partnerships
    ├── cta.jsx                 # FAQ + FinalCTA
    └── assets/
        ├── sigi/               # 6 mascot SVGs (poses)
        ├── badges/             # App Store + Play Store SVGs
        ├── decor/              # Stamp silhouette decorations
        ├── screens/<lang>/     # In-app screens, one folder per language
        │                       #   en/, de/, fr/, it/, nl/, pl/ × 6 screens each
        ├── press/              # SBZ 2026/03 PDF + cover WebP
        └── founder/            # 3 portrait WebPs
```

## Auto-detection cascades

Both run on every visit, independently:

| | Where | Cascade |
|---|---|---|
| **Country** (pricing & currency) | `pricing-data.js` → `window.detectCountry()` | `localStorage.siq_country` → browser locale region (`de-CH` → `CH`) → timezone (`Europe/Zurich` → `CH`) → `STAMPIQ_DEFAULT_COUNTRY` (DE) |
| **Language** (UI text & screens) | `i18n.js` + `useLanguage()` hook | URL `?lang=` → `localStorage.language` → `navigator.language` → `en` |

The `useLanguage()` hook re-renders any subscribing component when the user picks a new language via the LanguageSelector. Screens and the dynamic Save % both update live without a page reload.

## i18n

- **Add a new translatable string**: add an entry to `post-launch/translations.json` with `{ key, "section/location", en, de, nl, pl, fr, it }`, then drop a `data-i18n="<key>"` attribute on the JSX element. The loader walks `[data-i18n]` after React mounts and on every re-render via MutationObserver.
- **HTML allowed in values** (used in FAQ answers for `<a>` links).
- **Empty target-language values fall back to English** — safe to leave new keys partially translated.

## Pricing

Edit `pricing-data.js` to change prices for any of the 6 markets. The Pricing component reads from `window.STAMPIQ_PRICING[country]` based on the detected country and formats with the appropriate currency symbol (`Fr.` / `€` / `zł`). The "Save X%" badge is computed dynamically from the premium yearly/monthly ratio.

## Local preview

Babel-in-browser and `fetch()` calls require a real HTTP server (won't work via `file://`):

```bash
cd /Users/sigi/dev/stampiq_landing
python3 -m http.server 8000
```

Then visit:
- http://localhost:8000/ — root (redirects to pre-launch)
- http://localhost:8000/post-launch/
- http://localhost:8000/post-launch/?lang=pl — force a specific language
- http://localhost:8000/pre-launch/
- http://localhost:8000/privacy.html

## Conventions

- **kebab-case** for filenames and asset paths
- **WebP** for raster images (screens, photos), **SVG** for logos / icons / decorations
- Post-launch JSX files each export their components on `window.*` since there's no module bundler
- Informal address (du / tu / jij / ty / tu) consistently across all 5 target languages
- Standard German (ß), not Swiss German (ss), for `de`

## Going live with post-launch

Edit root `index.html` and change the two `pre-launch/` references to `post-launch/`.

## License

Proprietary — StampIQ.io
