# RSVP implementation

Current operational guide: `ADMIN_AND_INVITATIONS.md`.

RSVP is resolved on the server from a real invitation token. There are no sample forms, demo switches, demo submissions, or localStorage reply persistence. Plain `/rsvp` asks guests to open their personal link; invalid, historical demo, or revoked links show the invitation-unavailable page.

“Send reply” saves to SQLite before confirming. Failed saves preserve answers. Repeat submissions update the same invitation; reopening the link restores the server draft for editing. Review and sent headings are centered. Under-five details have the placeholder “Name and dietary restrictions/allergies”. Dietary fields appear for named guests who select attending.

Traveling guests see the Kaunas group hotel offer for September 3–4, with email shown and required only after Yes please. Local guests see the venue stay for September 4–5. Hidden answers, unneeded emails and dietary fields for declining guests are excluded from the saved response. An all-declining reply excludes extra guests, children notes and accommodation choices.

Read-only sources: `Reference/RSVP.html` and `Reference/Screenshots/rsvp.png`. Production uses copied local artwork, the shared cream/brown/silver palette, Cormorant SC/Garamond, and Pinyon Script monogram. No Canva runtime or generated CSS is used. The 420px form column adapts to mobile and grows naturally with conditional fields.

Verification: `npm run build`, `npm run typecheck`, `node tests/rsvp-state.cjs`, and `node tests/admin-integration.cjs` (Playwright available through NODE_PATH). Integration tests cover missing-link access, removed demo endpoint, real invitations, per-person answers, both accommodation versions, save failures/success/reload/update, private admin access, pending empty cells and mobile overflow.
