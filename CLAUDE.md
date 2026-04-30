# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
(not yet described)

## Current status
Migrated to Astro on 2026-04-30. The whole site (marketing + legal) is now SSG: 24 static HTML pages (6 marketing + 6×3 legal) with per-language URLs and proper hreflang for SEO. Build with `npm run build`, deploy via `.github/workflows/deploy.yml` on push to main.

## Recent activity
- 2026-04-30: Migrated legal pages (privacy, terms, delete-account) into Astro routes. Removed legacy `post-launch/` and `pre-launch/` directories. URLs preserved as `.html` so app and store deep-links keep working.
- 2026-04-29: Initial Astro migration of the marketing site (i18n via React Context, per-language routes, sitemap, GitHub Actions deploy).

## Open issues
- Bundle size ~390 KB unminified for chrome (~127 KB gzipped) — could be reduced by code-splitting legal vs marketing translations.
- `public/assets/og-default.png` does not exist — social cards lack an image. 1200×630 PNG to be added.

## Handoff notes
- Build format: `preserve` (in `astro.config.mjs`) — keeps `/privacy.html`, `/de/privacy.html` URLs canonical.
- Translations live in `src/i18n/translations.json` (marketing) and `src/i18n/translations-legal.json` (legal). Both merged into the same dict at build via `I18nContext.jsx`. For Astro frontmatter use `tFor(lang, key)` from `src/i18n/lookup.js`.
- New translation keys are tagged via `t('key.path')` in JSX (rendered with `dangerouslySetInnerHTML` to support inline HTML in translations). Add the key to the right JSON file with all 6 languages.
- Per-language assets: `public/assets/screens/<lang>/<screen>.webp` — phones rotate based on the visitor's URL language.
<!-- sigi-end -->
