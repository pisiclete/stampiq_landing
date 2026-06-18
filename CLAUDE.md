# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
(not yet described)

## Current status
Subscription-promo QR landing page at /p/<CODE> is live with universal-link support. No open issues.

## Recent activity
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
stampiq_landing now serves two deep-link paths: /r/<CODE> for existing promo redemption (wired since 2026-06-16) and /p/<CODE> for subscription-promo QR codes (909ccd0, today). Universal Links (AASA) cover both paths on iOS. No open issues.
<!-- sigi-end -->
