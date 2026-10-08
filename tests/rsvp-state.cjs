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
assert.equal(normalized.additionalGuests[0].dietary, '');
assert.equal(normalized.hotelOffer, '');
assert.equal(normalized.venueStay, '');
assert.equal(normalized.comments, legacy.comments);
const response = buildResponse(invitation, legacy);
assert.equal(response.guests[0].attending, true);
assert.equal(response.guests[0].dietary, '');
assert.equal(response.additionalGuests[0].dietary, '');
assert.equal(response.comments, legacy.comments);
const current = emptyDraft(invitation);
current.attendance.alex = 'yes';
current.dietary.alex = ' No nuts ';
current.additionalGuests = [{ id: 'taylor', name: 'Taylor', dietary: ' Vegan ' }];
current.bringPlusOne = 'yes';
const currentResponse = buildResponse(invitation, current);
assert.equal(currentResponse.guests[0].dietary, 'No nuts');
assert.equal(currentResponse.additionalGuests[0].dietary, 'Vegan');
console.log('PASS: legacy draft without dietary fields renders safely, preserves answers, and current dietary notes survive normalization.');
