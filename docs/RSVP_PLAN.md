# Invitations and RSVP plan

Status: invitation admin, private links, personalized Home greetings, categorized replies, and SQLite server storage are implemented. See `ADMIN_AND_INVITATIONS.md` for actual operation and configuration. Translations remain pending; language choices are stored. The original staged plan below is retained as design context.

## Invitation model

One invitation represents a household or invited party. Store an internal ID, an unguessable private link token, language, travel profile (traveling/local), named guests with stable IDs, optional hotel-update email, additional guest allowance, and active/revoked status. Couples have two named guests with equal status; neither is classified as a plus one. Children of all ages are welcome. Children aged five and over count as a plus one unless already named on the invitation; under-fives do not count as a plus one. Guests can mention them in the optional notes; they are not automatically included in the structured attendance count.

The invitation token will be resolved on the server once the backend exists. Use a sufficiently random token, do not put guest names/emails in URLs, and do not expose the whole guest list to browsers. The link authorizes replies only for its invitation. Preserve that token in all internal navigation and use its selected language for the whole site. Revoke/reissue links from admin when needed. Live routes should show an explanatory missing/invalid invitation state instead of assigning another guest's invitation.

## Admin, later phase

Provide authenticated access for the couple. Allow manual invitation creation and spreadsheet/CSV import with a review step: name, invitation group, language, traveling/local profile, optional email, and additional guest allowance. Let the couple correct grouping, preview the greeting/form, and copy the generated link. Import must preserve individual guests while grouping couples/families into one invitation; explicitly confirm duplicate handling before committing an import.

Show pending/replied invitations, attendance per named person, total adults/children/babies, extra guest names, dietary requirements, contact email, accommodation interest, and latest update. Provide filters and CSV export. A person declining must not count as attending even when their partner accepts. An invitation with an attending guest remains partially attending if other named guests decline. Distinguish no response, partial attendance, all attending, and all declining. No outbound messages are part of this phase.

## Guest page

Use invitation names to render Dear Alex & Sam / Dear Alex (and a comma-separated list with an ampersand before the final name for larger groups). Eventually reuse this same greeting on the Home page. No guest-facing language picker; translations will be implemented later using explicit locale text dictionaries and localized date formatting.

Attendance is mandatory per named person, with individual attending/declining controls only. An optional dietary/allergy field appears beneath each person only when they select Attending; a plus one has their own optional dietary field. Plus-one and stay questions are visible from the beginning, and hide only if every named person declines. Ask whether the party will bring a plus one, then reveal the name field on Yes. All single, couple, and family samples allow one additional guest. The help text welcomes all children and explains that under-fives do not need to be registered as plus ones, with an optional field immediately below for their details.

Accommodation is selected by the invitation's traveling/local profile, to be set in the later admin page. Traveling guests see only the Kaunas group hotel offer for September 3–4; local guests see only the venue overnight stay for September 4–5. Each offers Yes please / No, we'll arrange our own accommodation. Only the shown question is required and saved; hidden accommodation answers are excluded. Hotel email is required only for traveling guests selecting Yes and has a small italic explanation below the input, without an extra heading.

The current demo has an explicit Traveling guests / Local guests toggle above the greeting. This is a preview control, not a future guest-facing profile picker. Shared attendance and dietary answers are retained when switching; each mode saves to a separate browser-local preview. The children help now uses the requested under-five wording with an optional childrenNotes field directly below it, separately from final comments.

Hide the plus-one, stay, email, and dietary questions once every named guest declines. Exclude their stale values from the submitted response. Dietary notes for declined guests are empty; plus-one No excludes previously entered names; Kaunas offer No excludes a previously entered email without changing the venue stay choice. Review named attendance, additions, both stay answers, dietary requirements, and notes before saving; allow editing after saving. Invalid inputs show specific inline errors and focus the first invalid field.

## Persistence, later phase

Store one response per invitation and update it on repeat submission. Validate on the server: guest IDs belong to the invitation, every attendance answer is present, extra adults do not exceed allowance, added names are present, accommodation answers are allowed values, and declining people have no attendance-only fields. Use stable IDs and transactional writes, not counts inferred from a single household checkbox. Return success only after a successful server save; retain entered values on failure. Protect admin endpoints, constrain invitation access, and keep private guest records out of static output and logs. Hosting/database selection and retention policy remain decisions for that phase.

## Current implementation scope

Build only `/rsvp`, using the original Canva typography, cream background, monogram, form width, and subdued input styling. The requested household fields expand the original single-person form. Use typed sample invitations (couple/single/family) and browser-local preview responses so form logic can be exercised without presenting a false sent confirmation. Sample previews are not private invitation links. Do not create admin, a database, live token resolution, translations, or Home personalization yet. Keep the server-provided invitation prop ready for later integration.

Deadline: user confirmed February 25, 2027. Use it consistently with Home, overriding the Canva RSVP's May 1 date.
