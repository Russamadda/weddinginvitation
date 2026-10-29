const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { chromium } = require('playwright');

const token = 'qhcUQeVtTS-aOSR54L8J_ISUn-8xn5_q';
const base = 'http://127.0.0.1:3006';
const dataDir = path.resolve('.local-data', 'photo-test-' + Date.now());
fs.mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, 'wedding.sqlite'));
db.exec('CREATE TABLE invitations (id TEXT PRIMARY KEY, token TEXT UNIQUE NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1, response TEXT, responded_at TEXT, draft TEXT)');
// Synthetic records only; never connect this test to production storage.
for (const key of [token, token.slice(0, -1) + 'x', 'n'.repeat(32)]) {
  const invitation = { id: randomUUID(), guests: [{ id: randomUUID(), name: 'Photo Test Guest' }], language: 'en', travelProfile: 'traveling', additionalGuestAllowance: 0 };
  db.prepare('INSERT INTO invitations(id,token,body,created_at) VALUES(?,?,?,?)').run(invitation.id, key, JSON.stringify(invitation), new Date().toISOString());
}
db.close();
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3006'], {
  windowsHide: true, stdio: 'ignore',
  env: { ...process.env, WEDDING_DATA_DIR: dataDir, SUPABASE_URL: '', NEXT_PUBLIC_SUPABASE_URL: '', SUPABASE_SECRET_KEY: '', VERCEL: '', SITE_URL: base },
});

(async () => {
  let browser;
  try {
    for (let i = 0; i < 80; i++) {
      try { if ((await fetch(base)).ok) break; } catch {}
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const language of ['en', 'no', 'lt']) {
        // Alternating invitations in one browser checks there is no sticky visitor setting.
        for (const key of [token, 'n'.repeat(32), token.slice(0, -1) + 'x', undefined]) {
          for (const route of ['/', '/love-story', '/details', '/faq', '/rsvp']) {
            const query = new URLSearchParams({ lang: language });
            if (key) query.set('invite', key);
            await page.goto(`${base}${route}?${query}`);
            const special = key === token;
            assert.equal(await page.locator('.guest-site').getAttribute('data-photo-override'), special ? 'true' : null);
            const photos = await page.locator('.guest-site img[src^="/images/"]').evaluateAll(images => images.map(image => image.getAttribute('src')));
            assert.equal(photos.every(src => src === '/images/fiskekake.jpg'), special || photos.length === 0);
            const backgrounds = await page.locator('.hero-art, .love-story-background, .details-background, .faq-background, .rsvp-page-background').evaluateAll(elements => elements.map(element => getComputedStyle(element).backgroundImage));
            assert.ok(backgrounds.length > 0);
            assert.ok(backgrounds.every(image => image.includes('fiskekake.jpg') === special));
            assert.ok((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/images/invitation-envelope.png'));
            assert.ok((await page.locator('meta[name="twitter:image"]').getAttribute('content')).endsWith('/images/invitation-envelope.png'));
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
            if (special && language === 'en') await page.screenshot({ path: `.local-data/photo-override-${width}-${route.replaceAll('/', '') || 'home'}.png`, fullPage: true });
          }
        }
      }
    }
    await page.goto(`${base}/?invite=${token}&lang=en`);
    for (const route of ['/love-story', '/details', '/faq', '/rsvp']) {
      await page.locator(route === '/rsvp' ? '.faq-rsvp-button' : '.site-footer a').click();
      await page.waitForURL(url => url.pathname === route);
      assert.equal(new URL(page.url()).searchParams.get('invite'), token);
      assert.equal(await page.locator('.guest-site').getAttribute('data-photo-override'), 'true');
    }
    const plain = await browser.newPage({ javaScriptEnabled: false });
    await plain.goto(`${base}/?invite=${token}&lang=en`);
    assert.equal(await plain.locator('.couple-photo-crop img').getAttribute('src'), '/images/fiskekake.jpg');
    const bundles = fs.readdirSync('.next/static/chunks', { recursive: true }).filter(file => file.endsWith('.js'));
    for (const file of bundles) assert.ok(!fs.readFileSync(path.join('.next/static/chunks', file), 'utf8').includes(token), 'Token must stay out of shared client bundles');
    console.log('PASS: exact-token photo isolation on all pages/languages, normal/near-match/anonymous visitors unchanged, navigation, SSR, metadata and mobile/desktop layouts.');
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
