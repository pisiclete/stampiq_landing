# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
StampIQ Landing is the static marketing and legal site for stampiq.io, built with Astro and React and deployed to GitHub Pages. It serves 24 pre-rendered HTML pages across six languages (English, German, French, Italian, Dutch, Polish), with separate per-language routes for the homepage, privacy policy, terms, and account deletion page. The site handles app deep-linking through standard `.well-known/` files, legacy `?lang=` query redirects from app store listings, and client-side pricing detection based on location data, all while maintaining full crawlability and Google indexing via hreflang annotations.

## Current status
No open issues. The last commit on 2026-09-08 updated the privacy policy to specify data collection practices at fair stands.

## Recent activity
- 2026-09-08: Updated privacy policy to specify data collection practices at a fair stand (485c01c)
- 2026-09-04: /subscribe path added to support promo expiry email deep-link
- 2026-08-17: Added app demo video (EN) for sharing (1 commit)
- 2026-08-09: Quote the same recognition accuracy everywhere (11a0640)
- 2026-08-08: Republished .well-known files, fixed promo code escape handling, and corrected install-flow code carry-through (3 commits)
- 2026-08-04: Added press feature, autumn fairs, and web app section; bumped deploy workflow actions to current majors (675fa1d, b790610)
- 2026-08-02: Under-13 flow disclosed in privacy policy and terms; email images hosted externally (3 commits)
- 2026-07-14: Synced CLAUDE.md (0e43a33)
- 2026-07-13: Synced CLAUDE.md (7260173)
- 2026-07-12: Synced CLAUDE.md (f651a50)
- 2026-07-11: Synced CLAUDE.md (3f3d42b)
- 2026-07-10: Synced CLAUDE.md (74dca1f)
- 2026-07-09: Sync CLAUDE.md (c686630)
- 2026-07-08: sync CLAUDE.md (5c6daba)
- 2026-07-07: synced CLAUDE.md (4491475)
- 2026-07-06: sync CLAUDE.md (90e7526)
- 2026-07-05: Synced CLAUDE.md (6eee41a)
- 2026-07-04: sync CLAUDE.md (209bc58)
- 2026-06-27: Shipped 3 commits: country-unavailable geo-block page, localised Sign In link, nav declutter
- 2026-06-26: Shipped 1 commit: disclosed web payments and broadened legal scope to cover web app
- 2026-06-18: Added /p subscription-promo QR landing page and universal-link path (909ccd0)
- 2026-06-16: Fixed /r promo page: custom-scheme handoff, cancel store redirect on app open, and manual open/install fallback buttons (3 commits)
- 2026-06-13: Added /r promo path to AASA and 404 store-redirect fallback (8a7e0c0)
- 2026-06-07: Updated CLAUDE.md to document the ToS Historical and Sensitive Content clause (8eda70b)
- 2026-06-06: Added Historical and Sensitive Content clause to Terms of Service (41ef88f)
- 2026-05-20: Added variants.gif for launch-update email (commit 25ebc77)
- 2026-05-16: Added launch-update email GIF assets (commit 5359ba2); updated CLAUDE.md for Sentry privacy disclosure (commit 6e3d12b)
- 2026-05-15: Disclosed Sentry crash reporting in privacy policy (commit 1b5eeec)
- 2026-05-10: Added iOS Smart App Banner meta tag (commit 1b12799); Smart App Banner stampiq_app todo marked done via Telegram
- 2026-04-30: Migrated site to Astro (SEO + multi-language URLs), added async Google Fonts, smart QR-code store redirect, and email-signature logo asset (commits 8656bda, 65e0efe, 36f3d9a, 763463f)

## Open issues
(none)

## Handoff notes
The site is stable with no outstanding issues. Recent feature work covered the fair-stand privacy policy update, the /subscribe deep-link path, the EN demo video, press and autumn fairs additions, under-13 legal disclosures, the /r and /p promo and universal-link paths, the geo-block page, and legal updates for web payments and sensitive content. Daily CLAUDE.md commits appear automated and carry no functional changes.
<!-- sigi-end -->
