# stampiq_landing

<!-- sigi-start -->
# stampiq_landing

## Summary
StampIQ Landing is the static marketing site and legal pages for stampiq.io, built with Astro and React and deployed to GitHub Pages. It serves six language versions across marketing pages, privacy/terms/account deletion, and a blog system where content is written externally by the cockpit and committed as JSON. The site uses per-language URLs with hreflang tags for SEO, client-side country detection for pricing currency, and a legacy query-string redirect to handle app store listing URLs that were registered before the migration to slash-based language routing.

## Current status
The 2026-09-22 push added an eleven-language rollout, waitlist form with Turnstile (site key now set), ops cockpit privacy/terms pages, store badges, and blog categories in five required languages. One open issue remains: final pricing and producibility confirmation from DDM for the DBZ 22 insert.

## Recent activity
- 2026-09-23: Scan data paragraph added to privacy section (15d2b3e)
- 2026-09-22: Eleven-language rollout, waitlist form with Turnstile, ops cockpit privacy/terms pages, store badges from stampiq.io, blog categories in five required languages (19 commits)
- 2026-09-21: /s/<SCAN_ID> route added to serve printed page labels (1 commit)
- 2026-09-17: Blog mobile layout fixes: image grouped with text on small screens, header elements drop progressively as width narrows, half-written drafts now buildable
- 2026-09-16: Added blog to the site (2c22257)
- 2026-09-14: Swiss flag asset added for newsletter Swiss Made pill (1 commit, d9c08b6)
- 2026-09-11: No activity today; DDM handoff to Print Media Group noted from mailing commits
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

## Open issues
- Obtain final pricing and producibility confirmation from DDM for DBZ 22 insert.

## Handoff notes
The site is stable. The only open item is awaiting DDM's final pricing and producibility confirmation for the DBZ 22 insert (105x210 mm folded, 315x210 mm open). Recent feature work covered the eleven-language expansion, Turnstile-gated waitlist form, /s/<SCAN_ID> label route, blog addition with mobile layout fixes, Swiss flag newsletter asset, fair-stand privacy policy update, the /subscribe deep-link path, and earlier promo and universal-link paths. Daily CLAUDE.md commits appear automated and carry no functional changes.
<!-- sigi-end -->
