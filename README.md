# StampIQ Landing

Static site for [stampiq.io](https://stampiq.io) — marketing pages plus legal (privacy, terms, account deletion). Built with Astro + React, deployed to GitHub Pages.

## Structure

```
stampiq_landing/
├── astro.config.mjs            # Astro config (build.format='preserve' keeps .html on legal pages)
├── package.json
├── tsconfig.json
├── public/                     # Copied verbatim into dist/
│   ├── CNAME                   # stampiq.io
│   ├── robots.txt
│   ├── .well-known/            # iOS Universal Links + Android App Links
│   ├── redirect.html           # QR landing: sends phones to the right store
│   ├── subscribe/index.html    # /subscribe — see "Deep-link paths" below
│   └── assets/
│       ├── sigi/               # 6 mascot SVGs (poses)
│       ├── badges/             # App Store + Play Store SVGs
│       ├── decor/              # Stamp silhouette decorations
│       ├── screens/<lang>/     # In-app screens, one folder per language
│       ├── press/              # SBZ 2026/03 PDF + cover WebP
│       └── founder/            # Portrait WebPs
│
├── src/
│   ├── pages/                  # Each .astro file generates one route
│   │   ├── index.astro                # /
│   │   ├── privacy.astro              # /privacy.html
│   │   ├── terms.astro                # /terms.html
│   │   ├── delete-account.astro       # /delete-account.html
│   │   └── [lang]/                    # de, fr, it, nl, pl
│   │       ├── index.astro            # /de/
│   │       ├── privacy.astro          # /de/privacy.html
│   │       ├── terms.astro            # /de/terms.html
│   │       └── delete-account.astro   # /de/delete-account.html
│   ├── layouts/Layout.astro    # HTML head, meta, OG, hreflang, sitemap
│   ├── components/
│   │   ├── App.jsx                    # Marketing page composition
│   │   ├── chrome.jsx                 # Header + Footer + LanguageSelector
│   │   ├── components.jsx             # SIQ tokens, Logo, Icons, Pill, PhoneMockup, SigiPose
│   │   ├── hero.jsx, features.jsx, pricing.jsx, social-proof.jsx, partner.jsx, cta.jsx
│   │   └── legal/
│   │       ├── LegalPage.jsx          # Wrapper: Header + content + Footer
│   │       ├── PrivacyPage.jsx, TermsPage.jsx, DeleteAccountPage.jsx
│   │       ├── Privacy.jsx, Terms.jsx, DeleteAccount.jsx  # Section data + render
│   │       └── renderSections.jsx     # Shared <h2>/<p>/<ul>/<table> renderer
│   ├── i18n/
│   │   ├── translations.json          # Marketing strings (181 keys × 6 langs)
│   │   ├── translations-legal.json    # Legal strings (433 keys × 6 langs)
│   │   ├── meta.js                    # Per-language SEO title/description for marketing pages
│   │   ├── lookup.js                  # Build-time t() for Astro frontmatter
│   │   └── I18nContext.jsx            # React Context: t(), useLang()
│   ├── lib/
│   │   ├── tokens.js                  # SIQ design tokens
│   │   └── pricing.js                 # STAMPIQ_PRICING + detectCountry()
│   └── styles/
│       ├── tokens.css, responsive.css # Marketing
│       └── legal.css                  # Legal pages
│
├── scripts/
│   └── codemod-i18n.mjs        # data-i18n → t() AST transform (one-shot, kept for reference)
│
└── .github/workflows/deploy.yml  # Build Astro → publish dist/ to Pages
```

## How it works

- **Per-language URLs**: `/`, `/de/`, `/fr/`, `/it/`, `/nl/`, `/pl/` for marketing; `/privacy.html`, `/de/privacy.html`, etc. for legal. Each is a fully pre-rendered static HTML file with the right language baked in. Crawlers see real content (not an empty `<div id="root">`), and Google indexes each language separately via `hreflang`.
- **Translations** live as build-time JSON imports. `useT()` returns the right string for the current language. Inline HTML in translations (e.g. `<a href="../privacy.html">`) gets rewritten by `withLang()` so it points at the right per-language URL.
- **Legal pages** reuse the same `<Header>`/`<Footer>` as the marketing site. The Header's anchor nav (`#features`, `#pricing`, etc.) prepends the language root so clicking "Pricing" from `/de/privacy.html` lands on `/de/#pricing`.
- **Pricing detection** stays client-side: `detectCountry()` cascades through `localStorage.siq_country` → `navigator.languages` region tag → timezone → fallback `DE`. The component re-renders with the right currency on mount.
- **Legacy `?lang=` redirect** — App Store and Play Store store listings registered URLs with `?lang=de` etc. before the migration. A small inline script in `Layout.astro` runs synchronously on every page: if `?lang=X` is in the URL, it redirects to the matching `/<lang>/...` canonical and strips the query. This keeps every store-registered link working without ever needing to update them.

## Develop

```bash
npm install
npm run dev      # Local dev with HMR
npm run build    # Generates dist/ (24 HTML pages + sitemap)
npm run preview  # Serves dist/ on http://127.0.0.1:4321
```

## Deploy

`.github/workflows/deploy.yml` builds Astro and publishes `dist/` to GitHub Pages on every push to `main`. The CNAME (`stampiq.io`) and `.well-known/` files for app deep-linking are passed through from `public/`.

## Deep-link paths

The app claims four paths on this domain. Each one has to be listed in `public/.well-known/apple-app-site-association` (and the root copy at `.well-known/`) for iOS, in `AndroidManifest.xml` in `stampiq_app` for Android, and handled in `classifyDeepLink` in the app. A path missing from any of the three never opens the app.

| Path | Sent by | App opens |
|---|---|---|
| `/activate` | account activation email | activation flow |
| `/r/<CODE>` | scan promo QR | scan promo redemption |
| `/p/<CODE>` | subscription promo QR | subscription promo redemption |
| `/subscribe` | promo expiry email | plan picker |

`/subscribe` is a directory index rather than an Astro page, because `build.format: 'preserve'` would serve an Astro page at `/subscribe.html` and the deep link needs the extensionless path. The AASA lists both `/subscribe` and `/subscribe/` since the browser requests the trailing-slash form.

A visitor who reaches the page at all does not have the app: the OS intercepts the link before the request goes out when it is installed. The page forwards to `https://app.stampiq.io/#/pricing` (hash routing, so the `#` is required), and the web app shows its own get-the-app screen on a phone browser.

## Conventions

- **kebab-case** for filenames and asset paths
- **WebP** for raster images, **SVG** for logos / icons / decorations
- Informal address (du / tu / jij / ty / tu) across all 5 non-English languages
- Standard German (ß), not Swiss German (ss)

## License

Proprietary — StampIQ.io
