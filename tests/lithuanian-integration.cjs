const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {randomBytes}=require('node:crypto');
const path=require('node:path');
const fs=require('node:fs');
const messages=require('../lib/guest-messages.json');
const base='http://127.0.0.1:3004';
const password=randomBytes(24).toString('base64url');
const dataDir=path.resolve('.local-data','lithuanian-test-'+Date.now());
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3004'],{windowsHide:true,env:{...process.env,ADMIN_PASSWORD:password,SITE_URL:base,WEDDING_DATA_DIR:dataDir,SUPABASE_SECRET_KEY:'',SUPABASE_URL:'',NEXT_PUBLIC_SUPABASE_URL:'',VERCEL:''},stdio:'ignore'});
(async()=>{let browser;try{
 assert.deepEqual(Object.keys(messages.lt).sort(),Object.keys(messages.en).sort());
 for(const [key,value] of Object.entries(messages.lt)){assert.ok(value.trim(),key);assert.deepEqual((value.match(/\{\w+\}/g)||[]).sort(),(messages.en[key].match(/\{\w+\}/g)||[]).sort(),key);}
 for(let i=0;i<80;i++){try{if((await fetch(base+'/admin/login')).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({reducedMotion:'reduce'});const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));const headers={Origin:base};
 assert.equal((await context.request.post(base+'/api/admin/session',{headers,data:{password}})).status(),200);
 const fixtures={};
 for(const language of ['en','no','lt'])for(const profile of (language==='lt'?['local','traveling']:['local'])){
  const result=await context.request.post(base+'/api/admin/invitations',{headers,data:{names:profile==='local'?['Aistė Žukauskaitė','Ąžuolas Šimkūnas']:['Ūla Čepaitė'],language,travelProfile:profile}});assert.equal(result.status(),201);const invitation=(await result.json()).invitation;fixtures[language+'-'+profile]=invitation;
  // Bots receive the correct preview from the stored language, without a lang override or JavaScript.
  const raw=await (await fetch(`${base}/?invite=${invitation.token}`,{headers:{'User-Agent':'facebookexternalhit/1.1'}})).text();
  assert.ok(raw.includes(`property="og:title" content="${messages[language].M001}"`),'Stored-language Open Graph title '+language);
  assert.ok(raw.includes(`name="twitter:title" content="${messages[language].M001}"`),'Twitter title '+language);
  assert.ok(raw.includes('/images/invitation-envelope.png'),'Envelope preview retained');
 }
 const invite=fixtures['lt-local'];
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});
  for(const route of ['/','/love-story','/details','/faq','/rsvp']){
   await p.goto(`${base}${route}?invite=${invite.token}`);await p.evaluate(()=>document.fonts.ready);
   assert.equal(await p.locator('.guest-site').getAttribute('lang'),'lt');assert.equal(await p.evaluate(()=>document.documentElement.lang),'lt');
   assert.equal(await p.locator('.language-preview').count(),0);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Overflow '+width+route);
   const clipped=await p.locator('main h1, main h2, .rsvp-link > span, .rsvp-link small').evaluateAll(es=>es.flatMap(e=>{const range=document.createRange();range.selectNodeContents(e);const box=e.getBoundingClientRect();return [...range.getClientRects()].some(r=>r.left<box.left-2||r.right>box.right+2||r.bottom>box.bottom+4)?[e.textContent]:[]}));assert.deepEqual(clipped,[],'Clipped text '+width+route);
   if(route==='/details'){
    const overlap=await p.evaluate(()=>{const groups=[['.details-ceremony','.details-map'],['.details-by-car','.details-traveling','.details-speeches'],['.details-friday','.details-saturday','.details-sunday','.details-timeline-note'],['.details-stays','.details-stay-note'],['.details-dress-copy','.details-palette'],['.details-gifts-copy','.details-registry']];return groups.flatMap(g=>g.slice(1).filter((s,i)=>document.querySelector(s).getBoundingClientRect().top<document.querySelector(g[i]).getBoundingClientRect().bottom));});assert.deepEqual(overlap,[],'Overlapping details '+width);
    assert.equal(await p.locator('.details-toastmaster-phone').innerText(),'Tel.: +47 948 96 863');
   }
   if(route==='/faq')assert.equal(await p.locator('.faq-questions > section').count(),2);
   await p.screenshot({path:`.local-data/lithuanian-${width}-${route.replaceAll('/','')||'home'}.png`,fullPage:true});
   console.log('PASS Lithuanian layout',width,route);
  }
 }
 const routes=['/','/love-story','/details','/faq','/rsvp'];
 await p.goto(`${base}/?invite=${invite.token}`);
 for(const route of routes.slice(1)){await p.locator('footer a').click();await p.waitForURL(u=>u.pathname===route);const url=new URL(p.url());assert.equal(url.pathname,route);assert.equal(url.searchParams.get('invite'),invite.token);assert.equal(url.searchParams.get('lang'),'lt');}
 for(const profile of ['local','traveling']){
  const fixture=fixtures['lt-'+profile];await p.goto(`${base}/rsvp?invite=${fixture.token}`);
  assert.equal(await p.locator('#plusOne').count(),0);assert.equal(await p.locator('#childrenNotes').count(),1);
  await p.getByRole('button',{name:messages.lt.C003,exact:true}).click();assert.ok((await p.locator('.rsvp-error').first().innerText()).includes('Pasirinkite'));
  for(const guest of fixture.guests)await p.locator(`input[name="attendance-${guest.id}"][value="yes"]`).check();
  await p.locator(`#dietary-${fixture.guests[0].id}`).fill('Be riešutų');await p.locator('#childrenNotes').fill('Miglė, 4 m., alergija pienui');
  assert.equal(await p.locator('#hotelOffer').count(),profile==='traveling'?1:0);assert.equal(await p.locator('#venueStay').count(),profile==='local'?1:0);
  await p.locator(profile==='local'?'#venueStay':'#hotelOffer').check();
  if(profile==='traveling')await p.locator('#email').fill('synthetic@example.com');
  await p.locator('#comments').fill('Iki pasimatymo!');
  await p.getByRole('button',{name:messages.lt.C003,exact:true}).click();await p.getByRole('button',{name:messages.lt.C004,exact:true}).click();await p.getByRole('heading',{name:messages.lt.C007,exact:true}).waitFor();
  await p.reload();assert.equal(await p.locator('#childrenNotes').inputValue(),'Miglė, 4 m., alergija pienui');assert.equal(await p.locator(`#dietary-${fixture.guests[0].id}`).inputValue(),'Be riešutų');
 }
 assert.deepEqual(errors,[],'No browser errors');
 console.log('PASS all dictionary keys, invitation languages and crawler metadata, navigation, local/traveling RSVP, Unicode persistence and no guest language preview');
}finally{if(browser)await browser.close();server.kill();await new Promise(r=>server.once('exit',r));if(dataDir.startsWith(path.resolve('.local-data')+path.sep))fs.rmSync(dataDir,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exitCode=1;});
