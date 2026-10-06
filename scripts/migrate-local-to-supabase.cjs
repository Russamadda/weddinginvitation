// Preserve already-created invitation links. Inserts missing rows only; never
// overwrites Supabase replies and never migrates local admin sessions/passwords.
const { loadEnvConfig } = require('@next/env');
const { createClient } = require('@supabase/supabase-js');
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
loadEnvConfig(process.cwd());
(async () => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !process.env.SUPABASE_SECRET_KEY) throw new Error('Configure Supabase first.');
  const db = new DatabaseSync(path.join(process.env.WEDDING_DATA_DIR || '.local-data', 'wedding.sqlite'), { readOnly: true });
  let rows;
  try { rows = db.prepare('SELECT * FROM invitations').all().filter(row => !JSON.parse(row.body).demo); }
  finally { db.close(); }
  const client = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  let added = 0;
  for (const row of rows) {
    const existing = await client.from('wedding_invitations').select('id,token').or(`id.eq.${row.id},token.eq.${row.token}`);
    if (existing.error) throw new Error('Cannot check existing invitations. Run the wedding schema first.');
    if (existing.data.some(item => item.id !== row.id || item.token !== row.token)) throw new Error('An existing ID/link conflicts with local data. Migration stopped without overwriting it.');
    if (!existing.data.length) {
      const insert = await client.from('wedding_invitations').upsert(row, { onConflict: 'id', ignoreDuplicates: true });
      if (insert.error) throw new Error('Cannot insert an invitation. Migration can be retried; existing cloud replies are preserved.');
      added++;
    }
  }
  console.log(`Migration complete: ${added} invitations copied, ${rows.length - added} already present. Local data and existing Supabase replies were preserved.`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
