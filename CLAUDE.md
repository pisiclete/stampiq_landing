# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
StampIQ Landing is the static marketing and legal site for stampiq.io, built with Astro and React and deployed to GitHub Pages. It serves six language variants (English, German, French, Italian, Dutch, Polish) across separate per-language routes, with each page pre-rendered to HTML at build time so search engines see real content and can index each language separately via hreflang tags. The site includes marketing pages, privacy policy, terms of service, and account deletion flow, plus a legacy redirect layer that catches old `?lang=` query parameters from app store listings and normalizes them to the current canonical URL structure.

## Current status
No open issues. The last substantive work was in late June, adding a geo-block page, localising the Sign In link, and decluttering the nav. The past two weeks show only daily CLAUDE.md syncs with no code changes.

## Recent activity
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
- 2026-04-27: Added post-launch-style header + footer to privacy/terms/delete-account pages (commit d3cbb3d)
- 2026-04-26: Refactored repo structure into pre-launch/ and post-launch/ directories

## Open issues
(none)

## Handoff notes
The site is stable with no outstanding issues. The most recent feature work covered the /r and /p promo and universal-link paths, the geo-block page, and legal updates for web payments and sensitive content. Daily CLAUDE.md commits appear automated and carry no functional changes, so the working state matches the June 27 nav refactor.
<!-- sigi-end -->
