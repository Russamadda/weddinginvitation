# Supabase setup

Invitations, replies, admin sessions, and login throttling use Supabase when `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are set. The server connects over HTTPS using `@supabase/supabase-js`. Guests continue to use invitation links and the existing RSVP API. Admin sign-in continues to use the website's password; Supabase Auth accounts and browser session middleware are not needed.

## Create the tables

In the Supabase dashboard, open SQL Editor → New query. Copy and run `supabase/wedding-schema.sql`. It creates three `wedding_` tables and their indexes without deleting existing data. Replies and drafts are stored with their invitation so repeat submissions update the same record. Row Level Security is enabled, and public/anonymous/signed-in Supabase clients have no table access. Only the server's secret key can access the data; the website checks admin sessions or private invitation tokens first.

## Local configuration

Keep these values in the ignored `.env.local` file:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-secret-key
ADMIN_PASSWORD=your-private-admin-password
SITE_URL=http://127.0.0.1:3000
```

Use a Secret key from Project Settings → API Keys. A publishable key cannot access private guest information. Never use `NEXT_PUBLIC_` for the secret key or admin password. Do not commit or share `.env.local`.

Restart the development server after changing environment variables. Run `npm run db:check` to verify the connection and tables without reading or changing guest records. If `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set, the check also verifies public access is denied.

Local development without Supabase credentials still uses `.local-data/wedding.sqlite`. Run `npm run db:migrate-local` to copy existing non-demo invitations and replies into Supabase while preserving their IDs and tokens. It inserts missing invitations only and never overwrites existing Supabase replies. Keep the local file as a backup. Local admin sessions do not migrate; sign in again.

## Vercel

In Project Settings → Environment Variables, add `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD`, and `SITE_URL` for the environments you deploy. Set `SITE_URL` to the public HTTPS address, `https://www.martheogdeivi.no` (the root domain redirects to `www` in the current Vercel configuration). Use the same database in Production/Preview only if you want both to share the real guest list.

The Framework Preset must be **Next.js**, the Root Directory must contain `package.json`, and the Output Directory override must be **off**. Redeploy after changing environment variables or build settings. Missing database credentials on Vercel cause a configuration error instead of storing replies on an ephemeral filesystem.

After deployment, sign in at `/admin`, create an invitation, open its link in a separate browser, send a reply, and confirm it appears in `/admin/replies` and Supabase's `wedding_invitations` table. Never send guests localhost links.
