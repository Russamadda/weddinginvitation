# FAQ reconstruction

Source: read-only `Reference/FAQ.html`, `Reference/Screenshots/faq.pdf`, and `faq1.png` / `faq2.png`. Screenshots control the visible result. Use clean React and standard CSS with local assets.

The exported desktop canvas is 2545px wide; its header (89.34px) and section heights differ from the screenshots. Retain the shared 84px desktop header and 50px footer. Screenshot hero occupies approximately 347px beneath the header. Its lowercase title uses Pinyon Script 33.3332px/46px, color #92969c. The centered ornamental frame is 314.574 x 218.768px at hero y104.561, rotated -90deg internally and at opacity .5. Its elliptical photo viewport is 248.101 x 157.828px, inset 33.2367px / 30.4703px. Source image scaling .616515 gives rendered dimensions 303.216 x 455.653px and offsets -28.17 / -198.95px.

Questions use Cormorant SC 700, 20px/28px; answers use Cormorant Garamond 400 italic, 17.3334px/24px. Contacts use the same italic face at 16px/22px. All copy is silver #92969c. Cream background #fffef4 with the original floral artwork at .04 opacity.

User requested slightly smaller gaps between questions. Keep the first question at approximately the screenshot position, then use a consistent 100px gap after each answer group (source visible gaps roughly 125-155px). Preserve 20px between each question and its answer, and 22px before contact links. Use flowing content on desktop and mobile, with a centered 303px text column. Email and phone links use mailto and tel. Shared navigation routes FAQ to /faq.

Verification: `npm run build` passed, including TypeScript validation and static /faq generation. Browser captures at 1470px and 390px showed all three question groups, loaded artwork, correct bold heading font, working mailto/tel destinations, no browser errors, and no horizontal overflow. Screenshots are saved in `docs/screenshots/faq-desktop.png` and `faq-mobile.png`.

Visual correction pass: moved the title up 4px, the framed photograph up 12px, and the first question up 4px to align their visible positions with the screenshot. The background uses one continuous floral layer rather than the exported separate section crops, retaining the original artwork and opacity while allowing the requested tighter layout. Mobile uses an 85px gap between question groups.

Follow-up: user requested further tightening to bring the back button to the screen bottom. Hero height is now 310px, question/answer spacing 16px, and question group gaps adapt to viewport height between 14px and 50px. Main has a viewport-based minimum height accounting for header and footer, so the footer reaches the bottom on taller screens. Short screens scroll naturally. Desktop 1470x950 fit exactly with footer bottom at 950px and no horizontal overflow; mobile 390x844 was checked and the minimum gap reduced by 2px to accommodate that height.
