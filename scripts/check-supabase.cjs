const { loadEnvConfig } = require('@next/env');
const { createClient } = require('@supabase/supabase-js');
loadEnvConfig(process.cwd());
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error('Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local. Keep the secret key out of chat and Git.');
  process.exit(1);
}
const options = { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(15000) }) } };
const client = createClient(url, secret, options);
(async () => {
  for (const table of ['wedding_invitations', 'wedding_admin_sessions', 'wedding_login_failures']) {
    const { error } = await client.from(table).select('*', { head: true });
    if (error) {
      console.error(`Cannot access ${table} (code: ${error.code || 'connection'}). Check the project URL/key and run supabase/wedding-schema.sql in the Supabase SQL Editor.`);
      process.exitCode = 1;
      return;
    }
    console.log(`OK: ${table}`);
  }
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (publicKey) {
    const publicClient = createClient(url, publicKey, options);
    for (const table of ['wedding_invitations', 'wedding_admin_sessions', 'wedding_login_failures']) {
      // GET keeps PostgREST's permission error code; HEAD omits its JSON body.
      // A zero-row limit avoids retrieving records even if permissions are wrong.
      const { error } = await publicClient.from(table).select('*').limit(0);
      if (!error) throw new Error(`Public access is enabled for ${table}. Re-run the security statements in the schema.`);
      if (error.code !== '42501') throw new Error(`Could not verify public access denial for ${table} (${error.code || 'connection'}).`);
    }
    console.log('OK: public clients cannot read wedding tables.');
  }
  console.log('Supabase connection and table access verified. No guest data was changed.');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
