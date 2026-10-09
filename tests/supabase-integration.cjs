// Opt-in live integration check. Creates synthetic invitations and removes only
// its own invitation/session rows afterwards. Never prints credentials or links.
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { createHash } = require('node:crypto');
const { loadEnvConfig } = require('@next/env');
const { createClient } = require('@supabase/supabase-js');
loadEnvConfig(process.cwd());
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
assert.ok(url && secret && process.env.ADMIN_PASSWORD, 'Configure Supabase and ADMIN_PASSWORD first.');
const client = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
const base = 'http://127.0.0.1:3002';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3002'], { windowsHide: true, env: { ...process.env, SITE_URL: base }, stdio: 'ignore' });
const invitationIds = [];
let cookie = '', sessionHash = '';
async function request(path, method = 'GET', data, admin = false) {
  return fetch(base + path, { method, headers: { Origin: base, ...(data ? { 'Content-Type': 'application/json' } : {}), ...(admin ? { Cookie: cookie } : {}) }, body: data ? JSON.stringify(data) : undefined });
}
async function json(response, status) {
  assert.equal(response.status, status);
  return response.json();
}
(async () => {
  try {
    let ready = false;
    for (let n = 0; n < 60; n++) {
      try { if ((await fetch(base + '/admin/login')).ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Production test server must start.');
    assert.equal((await request('/api/admin/invitations')).status, 401);
    const login = await request('/api/admin/session', 'POST', { password: process.env.ADMIN_PASSWORD });
    assert.equal(login.status, 200);
    cookie = login.headers.get('set-cookie').split(';')[0];
    sessionHash = createHash('sha256').update(cookie.split('=')[1]).digest('hex');
    for (const profile of ['traveling', 'local']) {
      const { invitation } = await json(await request('/api/admin/invitations', 'POST', { names: ['Supabase Test One', 'Supabase Test Two'], travelProfile: profile, language: 'no', additionalGuestAllowance: 1 }, true), 201);
      invitationIds.push(invitation.id);
      const draft = {
        attendance: { [invitation.guests[0].id]: 'yes', [invitation.guests[1].id]: 'no' },
        dietary: { [invitation.guests[0].id]: 'Vegetarian', [invitation.guests[1].id]: '' },
        bringPlusOne: 'no', additionalGuests: [],
        hotelOffer: profile === 'traveling' ? 'yes' : '', venueStay: profile === 'local' ? 'yes' : '',
        email: profile === 'traveling' ? 'test@example.com' : '', childrenNotes: 'Test child, 2, no allergies', comments: 'Synthetic integration check',
      };
      const home = await (await request('/?invite=' + invitation.token)).text();
      assert.match(home, /Dear Supabase Test One &amp; Supabase Test Two/);
      await json(await request('/api/rsvp/' + invitation.token, 'POST', draft), 200);
      const stored = await client.from('wedding_invitations').select('*').eq('id', invitation.id).single();
      assert.equal(stored.error, null);
      let reply = JSON.parse(stored.data.response);
      assert.equal(reply.guests[0].attending, true);
      assert.equal(reply.guests[1].attending, false);
      assert.equal(reply.guests[0].dietary, 'Vegetarian');
      assert.equal(reply.additionalGuests.length, 0);
      assert.equal(reply.hotelOffer, profile === 'traveling' ? 'yes' : null);
      assert.equal(reply.venueStay, profile === 'local' ? 'yes' : null);
      assert.equal(reply.email, profile === 'traveling' ? 'test@example.com' : '');
      draft.comments = 'Updated synthetic reply';
      await json(await request('/api/rsvp/' + invitation.token, 'POST', draft), 200);
      const admin = await json(await request('/api/admin/invitations', 'GET', undefined, true), 200);
      const record = admin.invitations.find(item => item.id === invitation.id);
      assert.equal(record.response.comments, draft.comments);
      assert.equal(record.language, 'no');
      assert.equal(record.travelProfile, profile);
      assert.equal(record.draft.childrenNotes, draft.childrenNotes);
      const bad = { ...draft, attendance: { ...draft.attendance, foreign: 'yes' } };
      assert.equal((await request('/api/rsvp/' + invitation.token, 'POST', bad)).status, 400);
      await json(await request('/api/admin/invitations', 'PATCH', { id: invitation.id, enabled: false }, true), 200);
      assert.equal((await request('/api/rsvp/' + invitation.token, 'POST', draft)).status, 404);
      assert.equal((await request('/?invite=' + invitation.token)).status, 404);
      await json(await request('/api/admin/invitations', 'DELETE', { id: invitation.id }, true), 200);
      const deleted = await client.from('wedding_invitations').select('id').eq('id', invitation.id).maybeSingle();
      assert.equal(deleted.error, null); assert.equal(deleted.data, null);
      const remaining = await json(await request('/api/admin/invitations', 'GET', undefined, true), 200);
      assert.equal(remaining.invitations.some(item => item.id === invitation.id), false);
      assert.equal((await request('/api/rsvp/' + invitation.token, 'POST', draft)).status, 404);

    }
    await json(await request('/api/admin/session', 'DELETE', undefined, true), 200);
    assert.equal((await request('/api/admin/invitations', 'GET', undefined, true)).status, 401);
    console.log('PASS: live Supabase admin authentication, local/traveling invitations, personalization, RSVP persistence/update, dietary/plus-one/child notes, hotel email, language, revoked links, permanent deletion, and logout.');
  } finally {
    server.kill();
    if (invitationIds.length) {
      const { error } = await client.from('wedding_invitations').delete().in('id', invitationIds);
      assert.equal(error, null, 'Remove synthetic invitation fixtures.');
    }
    if (sessionHash) {
      const { error } = await client.from('wedding_admin_sessions').delete().eq('hash', sessionHash);
      assert.equal(error, null, 'Remove synthetic session fixture.');
    }
  }
})().catch(() => { console.error('Live Supabase integration check failed. Synthetic records are cleaned up when possible; no credentials were printed.'); process.exitCode = 1; });
