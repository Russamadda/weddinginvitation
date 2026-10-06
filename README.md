# Marthe & Deivi wedding homepage

Clean Next.js App Router + TypeScript + standard CSS reconstruction. Home, Love Story, Details, FAQ, and the RSVP form are implemented. Reference source material is read-only; production uses local copies in `public` and has no runtime dependency on `Reference`.

## Run locally

Requires Node.js 24 or newer and npm (local development can use built-in SQLite).

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`. Run `npm run typecheck` for TypeScript validation.

## Reference and verification

- `docs/HOME_RECONSTRUCTION.md`: measurements, visual decisions, discrepancies, and verification results.
- `docs/HOME_ASSET_MAP.md`: original filenames, production copies, recovered fonts and ornament.
- `docs/LOVE_STORY_RECONSTRUCTION.md` and `docs/LOVE_STORY_ASSET_MAP.md`: Love Story measurements, crops, fonts, and verification.
- `docs/DETAILS_RECONSTRUCTION.md` and `docs/DETAILS_ASSET_MAP.md`: Details measurements, fonts, assets, and link behavior.
- `docs/FAQ_RECONSTRUCTION.md` and `docs/FAQ_ASSET_MAP.md`: FAQ measurements, artwork, fonts, and reduced spacing.
- `docs/RSVP_PLAN.md`: invitation model, personalized greetings, future admin/language settings, and RSVP persistence plan.
- `docs/RSVP_RECONSTRUCTION.md`: RSVP design, invitation access, assets, and verification.
- `docs/ADMIN_AND_INVITATIONS.md`: admin access, unique guest links, reply persistence, language choices, SMS envelope previews, hosting configuration, and verification.
- `docs/screenshots/`: visually inspected 1470px desktop and 390px mobile captures for the implemented pages.

Home is at `/`, Love Story at `/love-story`, Details at `/details`, FAQ at `/faq`, and RSVP at `/rsvp`, connected through navigation. `/admin` creates single/group invitations with a traveling/local category, language choice, and unique link. `/admin/replies` tracks replies, attendance, dietary needs, accommodation preferences, and notes. Guest links personalize Home and preserve the invitation across pages; replies save to Supabase when configured (SQLite during unconfigured local development) and can be updated. For Supabase, configure a private `ADMIN_PASSWORD` in `.env.local`. For SQLite-only development, the generated admin password is in `.local-data/admin-password.txt`, or configure `ADMIN_PASSWORD` in `.env.local`. Data and credentials are ignored by Git.

RSVP requires a real personal invitation link. Without a link, `/rsvp` asks guests to open their invitation or contact us; demo forms, profile toggles and demo submissions have been removed. Language preferences are stored, but translations remain for later. Details links to the supplied venue and map; the gift registry button remains disabled until supplied. Countdown targets midnight September 4, 2027 in Europe/Oslo.

The uploaded envelope is configured in server-rendered Open Graph/Twitter metadata. Set `SITE_URL` to your public HTTPS URL when hosting; localhost links and SMS previews work only after the site is publicly accessible. For Vercel, configure Supabase for persistent invitations and replies. See `docs/SUPABASE_SETUP.md`, `supabase/wedding-schema.sql`, and `.env.example`. `npm run db:check` verifies the connection.
