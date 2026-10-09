# Wedding admin and invitation links

## Access

Open `/admin` to create invitations; `/admin/replies` shows replies and categories. The pages and their APIs require an admin session. The generated local password is in `.local-data/admin-password.txt` (created on the first admin login-page visit). This file and the database are ignored by Git and never served as public assets. Alternatively, set a strong `ADMIN_PASSWORD` in `.env.local`. Never put credentials in `public` or use a NEXT_PUBLIC variable for them.

Requires Node 24 or newer; the current environment uses Node 24.14.0. Run `npm run dev`, or `npm run build` then `npm start` for production. The backend uses Supabase over HTTPS when configured, with built-in SQLite as a local development fallback. See `SUPABASE_SETUP.md`. A configured cloud database requires `ADMIN_PASSWORD`.

## Create and send invitations

Enter a guest name and press Add (or Enter), then repeat for each person. Names can be removed before creating the invitation. A name still in the input is included on creation. There is no separate group label to fill in. A couple/group shares an invitation while retaining individual attendance and dietary answers. Choose Local/Traveling, English/Norwegian/Lithuanian. Only the named guests are invited; new invitations have no plus-one allowance. Copy the generated unique invitation link. The link opens Home with a personalized greeting and retains its token through Love Story, Details, FAQ and RSVP. Footer Next links follow that order and preserve the invitation and language.

English, Norwegian and Lithuanian are available. Invitations open automatically in their chosen language. A temporary English/Norsk/Lietuvių preview switcher is available for reviewing the translations.

Traveling invitations show only the Kaunas group hotel offer for September 3–4. Local invitations show only the venue overnight stay for September 4–5. RSVP requires a valid invitation; `/rsvp` without one asks guests to open their personal link. Demo RSVP forms, guest-category switches and the demo submission endpoint have been removed; the temporary language preview switcher does not create an invitation or change its category. Historical demo records remain in private storage but cannot be opened or shown in admin.

## Replies

“Send reply” posts to the server and displays “Your reply has been sent to Marthe and Deivi” only after a successful database write. Failure preserves the form and shows an error. Repeat submissions update the same invitation row. Reopening the private link loads the saved draft for editing. Review/sent headings are centered; the guest-facing attendance count and local-only confirmation text are removed. Children of all ages are warmly welcome and have a dedicated optional field for names, ages and dietary needs/allergies. There is no plus-one choice. Old saved drafts discard additional-guest entries when reopened, and the server rejects attempts to submit extra adult guests.

Both admin lists show six columns: Guests, Category / language, Reply, Group option, Email address, and Invitation link. Individual named guest Yes/No answers are visible directly. Reply, accommodation and email cells stay empty until a reply is received. Group option identifies the relevant Kaunas hotel or venue stay. More details expands dietary notes, children’s details, comments and reply time. Search/status/category filters, refresh, and CSV export are included. Export omits invitation tokens and escapes spreadsheet formula prefixes. Children entered in this field are notes, not included in the structured listed-guest attendance total.

The Delete invitation action asks for confirmation, then permanently removes the invitation and its saved reply and draft. Deleted links show an unavailable page and cannot submit replies.

## Storage and hosting

Supabase stores invitations/replies, hashed admin sessions, and login-failure throttling when `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are configured. Run `supabase/wedding-schema.sql` in Supabase's SQL Editor first. These tables deny anonymous and signed-in Supabase clients all access; server APIs enforce admin sessions or invitation tokens. See `SUPABASE_SETUP.md` for local/Vercel setup. `npm run db:migrate-local` copies existing non-demo invitations/replies without replacing cloud replies.

Local SQLite fallback: `.local-data/wedding.sqlite`, with WAL/SHM sidecars. Back up with SQLite tooling or stop the server before copying the entire data directory. `WEDDING_DATA_DIR` can change its location. Vercel requires Supabase credentials and does not fall back to local SQLite. Keep local data if you need to migrate previously created invitation links.

Admin passwords are checked with constant-time derived-key comparison. Sessions have random, hashed tokens, HttpOnly/SameSite cookies and a seven-day expiry. Failed login attempts are throttled. Mutation endpoints check request origin, cap JSON payloads at 32KB, validate all guest IDs/choices/text limits on the server, and ignore irrelevant accommodation/dietary/email answers when producing a reply. Authenticated APIs use no-store responses.

## Envelope previews in SMS

Original read-only asset: `Reference/Envelope.png` (1847×1038). Production copy: `public/images/invitation-envelope.png`. Root server-rendered Open Graph metadata provides the envelope, generic wedding title and description; Twitter metadata uses summary_large_image. The invitation page returns those tags and the image without requiring JavaScript or admin login. Recipient names are not in the link-preview title. Referrer policy is no-referrer and indexing is disabled for the private wedding site.

Set `SITE_URL=https://your-public-domain` in the hosting environment (see `.env.example`), rebuild/restart, and use those new public links for SMS. localhost cannot be fetched by guests' phones or preview services. Exact presentation/cropping and preview caching belong to the messaging app; a real SMS preview cannot be verified until the site has a public HTTPS URL.

## Verification

`npm run build` passed, including TypeScript. `tests/admin-integration.cjs` runs against an isolated production server on port 3001 with a temporary private database and test password, not the real guest database. It checks authentication, creation/language/category, unique tokens, personalized greeting/navigation, server-rendered envelope tags/image, send failure/success, saved draft reload/upsert, admin replies, traveling/local forms, unauthorized/cross-origin/foreign-guest rejection, link revocation, logout and mobile overflow.

`tests/rsvp-state.cjs` retains the old-state crash regression. `tests/rsvp-preview.cjs` checks the demo toggle and server-send flow. Use the bundled Playwright through NODE_PATH or an existing Playwright installation; start the dev server for the preview tests. Screenshots in docs/screenshots include admin desktop/replies/mobile and both RSVP previews. Test fixtures use an isolated .local-data/integration-* directory and synthetic guest names; they do not create real guest records.

Build trace verification: next.config.ts explicitly excludes private .local-data, local environment files, and read-only Reference files from deployment tracing. Inspected all NFT trace manifests and found zero private/reference entries; the integration test includes this check. Local database files remain private runtime storage, never bundled assets; production data lives in Supabase when configured. Mobile admin tables were corrected to stacked labeled rows so expanded replies remain visible without horizontal scrolling.


Supabase integration verification: production build and the isolated SQLite regression checks pass. `tests/supabase-integration.cjs` is an opt-in live test that creates synthetic traveling/local invitations, verifies password sessions, saved/updated replies, accommodation/email/dietary/child notes, personalization, revocation, and logout, then removes its own fixtures. `npm run db:check` checks the live schema and verifies public clients cannot read these tables when the publishable key is configured.

## Guest languages

English, Norwegian and Lithuanian guest pages are implemented. An invitation with language `no` opens in Norwegian automatically. The temporary English/Norsk/Lietuvių preview links override the displayed language with `lang=en`, `lang=no` or `lang=lt`, without editing the stored invitation. The invitation token and selected language follow guest navigation. Local/traveling accommodation logic is independent of language. An invitation with language `lt` opens in Lithuanian automatically; its link preview reads “Jūsų kvietimas”. English previews read “Your invitation”; Norwegian previews read “Din invitasjon”. The private admin remains in English.

Historical additional-guest replies remain readable in admin; this change does not rewrite existing replies or require a schema migration.
