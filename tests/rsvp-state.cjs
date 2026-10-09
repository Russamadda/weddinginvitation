const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');

const compiled = ts.transpileModule(fs.readFileSync('lib/rsvp.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;
const languageContext = { exports: {}, require: () => ({ default: JSON.parse(fs.readFileSync('lib/guest-messages.json', 'utf8')) }) };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/guest-language.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText, languageContext);
const context = { exports: {}, require: () => languageContext.exports };
vm.runInNewContext(compiled, context);
const { normalizeDraft, buildResponse, emptyDraft } = context.exports;
const invitation = { id: 'test-couple', guests: [{ id: 'alex', name: 'Alex' }, { id: 'sam', name: 'Sam' }], language: 'en', travelProfile: 'traveling', additionalGuestAllowance: 1 };
const legacy = {
  attendance: { alex: 'yes', sam: 'no' },
  email: 'alex@example.com',
  bringPlusOne: 'yes',
  additionalGuests: [{ id: 'taylor', name: 'Taylor' }],
  comments: 'Keep my existing answers.',
};
const normalized = normalizeDraft(invitation, legacy);
assert.equal(normalized.dietary.alex, undefined);
assert.equal(normalized.additionalGuests.length, 0);
assert.equal(normalized.bringPlusOne, 'no');
assert.equal(normalized.hotelOffer, '');
assert.equal(normalized.venueStay, '');
assert.equal(normalized.comments, legacy.comments);
const response = buildResponse(invitation, legacy);
assert.equal(response.guests[0].attending, true);
assert.equal(response.guests[0].dietary, '');
assert.equal(response.additionalGuests.length, 0);
assert.equal(response.comments, legacy.comments);
const current = emptyDraft(invitation);
current.attendance.alex = 'yes';
current.dietary.alex = ' No nuts ';
current.additionalGuests = [{ id: 'taylor', name: 'Taylor', dietary: ' Vegan ' }];
current.bringPlusOne = 'yes';
const currentResponse = buildResponse(invitation, current);
assert.equal(currentResponse.guests[0].dietary, 'No nuts');
assert.equal(currentResponse.additionalGuests.length, 0);
assert.equal(context.exports.validateRsvp(invitation, current).additionalGuests, 'Too many additional guests for this invitation.');
console.log('PASS: legacy draft without dietary fields renders safely, preserves named guests and dietary notes, strips retired plus ones, and rejects unnamed guests.');

for (const language of ['en', 'no', 'lt']) for (const travelProfile of ['traveling', 'local']) {
  const invite = { ...invitation, language, travelProfile, additionalGuestAllowance: 0 };
  const draft = emptyDraft(invite);
  draft.attendance = { alex: 'no', sam: 'no' };
  draft.email = 'stale@example.com';
  draft.dietary = { alex: 'Old dietary answer' };
  draft.childrenNotes = 'Old children answer';
  draft.hotelOffer = 'yes'; draft.venueStay = 'yes';
  assert.equal(Object.keys(context.exports.validateRsvp(invite, draft)).length, 0);
  const declined = buildResponse(invite, draft);
  assert.equal(declined.guests.every(g => !g.attending && !g.dietary), true);
  assert.equal(declined.hotelOffer, null); assert.equal(declined.venueStay, null);
  assert.equal(declined.email, ''); assert.equal(declined.childrenNotes, '');
  draft.attendance.alex = 'yes'; draft.hotelOffer = ''; draft.venueStay = '';
  const option = travelProfile === 'local' ? 'venueStay' : 'hotelOffer';
  assert.ok(context.exports.validateRsvp(invite, draft)[option]);
  draft[option] = 'yes'; draft.email = '';
  assert.equal(!!context.exports.validateRsvp(invite, draft).email, travelProfile === 'traveling');
  draft[option] = 'no';
  assert.equal(Object.keys(context.exports.validateRsvp(invite, draft)).length, 0);
  assert.equal(buildResponse(invite, draft).email, '');
}
console.log('PASS: all-declining clears stale dietary, child, hotel and email data; relevant accommodation choices are required; email only required for hotel offers, in all three languages.');
