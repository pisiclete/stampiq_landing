# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
StampIQ Landing is the static marketing and legal site for stampiq.io, built with Astro and React and deployed to GitHub Pages. It serves 24 pre-rendered HTML pages across six languages (English, German, French, Italian, Dutch, Polish), with separate per-language routes for the homepage, privacy policy, terms, and account deletion page. The site handles app deep-linking through standard `.well-known/` files, legacy `?lang=` query redirects from app store listings, and client-side pricing detection based on location data, all while maintaining full crawlability and Google indexing via hreflang annotations.

## Current status
No open issues. Recent activity is offline marketing work for a DBZ insert and SLOVPHILEX 2027, with the last code commit on 2026-09-08 updating the privacy policy for fair-stand data collection.

## Recent activity
- 2026-09-10: No activity today
- 2026-09-09: (email) DBZ 19/2026 published StampIQ text adapted for German readers.
- 2026-09-09: (email) Print vendor confirmed format 105x210 mm high (wickelfalz) is feasible for DBZ 22/2026 insert, pending final pricing check.
- 2026-09-09: (email) Requested removal of duplicate QR code in DBZ 19 reader offer box, keeping only the QR code in the ad below.
- 2026-09-09: (email) Updated DBZ insert flyer format to 315 x 210 mm open, 105 x 210 mm closed, to meet print vendor minimum width requirement.
- 2026-09-09: (email) Applied to exhibit at SLOVPHILEX 2027 philatelic fair.
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

## Open issues
- Obtain final pricing and producibility confirmation from DDM for DBZ 22 insert.

## Handoff notes
The site is stable with no outstanding issues. Recent feature work covered the fair-stand privacy policy update, the /subscribe deep-link path, the EN demo video, press and autumn fairs additions, under-13 legal disclosures, the /r and /p promo and universal-link paths, the geo-block page, and legal updates for web payments and sensitive content. Daily CLAUDE.md commits appear automated and carry no functional changes.
<!-- sigi-end -->
