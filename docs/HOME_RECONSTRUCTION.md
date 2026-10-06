# Home reconstruction analysis

Analysis completed before UI implementation. Sources: Home.html, all Home_files assets, Home.pdf, homehero.png, home2.png, home3.png. No reference files are modified.

## Coordinate system and discrepancies

The saved rendered DOM uses a **2545px-wide** canvas, not the approximately 1470px width in the brief. Section heights and element sizes are independent of that wide desktop canvas; all meaningful groups are centered. Coordinates below are the exact saved DOM values, in pixels relative to their section. The supplied screenshots are 1756/1770px wide and show essentially the same fixed-size centered groups. Production uses centered groups and the exact section heights at 1470px; it does not scale the entire canvas by 1470/2545.

Home.pdf is a single 612x792pt page containing one flattened 2269x2792 floral background image, with no text or font resources. It does not represent the complete homepage. The PNGs take precedence.

Canva content uses zero letter-spacing, centered text, normal weight unless noted, no content borders, and no visible shadows. The 10% inset overlay rectangles in the DOM are layout guides, not visible content padding.

## Navigation

- Height 84; background rgb(154,165,182), #9aa5b6.
- Centered navigation group 329.061x15.3333, x1107.97 y34.3333.
- Individual left offsets 0, 68.3768, 171.24, 245.125, 293.619; widths 47.8929, 82.3797, 53.4004, 28.0102, 35.4425. Gaps approximately 20.484.
- Cormorant SC 13.3333px/18px, weight400, normal, #1d2e4d. Uppercase navigation; no underline.
- Only Home navigation and back-to-top are local. Other links preserve original published Canva destinations; no additional pages are implemented.

## Floral hero

- Height893; base #fffef4. Background hero-background.jpg at opacity0.6.
- Intrinsic1350x2399 (export metadata says2400); displayed2545x4522.04, x0 y-1413.23, no rotation. Equivalent vertical crop position38.943% of excess image height. Full-width image, overflow clipped.
- Name group442.162x171.634, x1051.42 y294.676. Marthe box367.378x72 at group x37.3919 y0; Deivi442.162x72 at y99.6338. Cormorant SC60px/84px, weight400, uppercase, #402825; text wrapper offset y-6.
- And: Shelley Script60px/84px, outer122.759x120.72 at1211.12,320.133; inner74.0394x72 inset24.36, wrapper y-6.
- Marriage line and date group224.031x48 at1160.48,554.036. Cormorant Garamond20px/28px; wrapper y-2. Date starts24px lower, weight700 italic. Centered, #402825.

## Curtain invitation

- Height798; #fffef4.
- Curtain clipped frame547.954x709.284 at998.523,36.7579; opacity0.75. Actual png641x800; displayed600.37x748.992 at-22.4939,-11.3861 inside clipped frame.
- Heading outer154.717x60.42 at1195.14,229.82; inner146.297x52 inset4.21. Cormorant SC20px/28px, uppercase, #402825; wrapper y-2. Two lines: Dear Family & / Friends,.
- Invitation260.658x222.987 at1142.17,315.323. Allison26.6664px/37px scaled1.24112, equivalent33.097px/45.922px; color#4c535b. Five explicit lines, wrapper offset -3.31 after scaling.
- Monogram68.3318x118.854 at1227.96,567.31, visually slightly left of section center. Pinyon Script M effective76.9725px, D74.5345px. M at group0,0; D5.26876,30.3443. Color#92969c.
- Additional vector at1211.33,667.71,134.314x93.5317 uses90-degree rotation. It is not visibly distinct in screenshot home2; preserve only if recovered asset confirms a visible role.

## Countdown

- Height132; #fffef4. Widget153.292x38.3231 at1195.85,13.2; export scales595.238x148.81 by0.257531.
- Times New Roman, color#92969c; visible value approximately21.628px, labels6.601px. Four values separated by colons. Target from iframe: September4,2027 at00:00 Europe/Oslo (2027-09-03T22:00:00Z).
- Caption218.094x51.8733 at1164.58,53.3711. Cormorant SC26.6668px/37px in HTML; screenshot caption visually about20px, so screenshot governs production. Shelley Script26.6665px/37px at group x70.0313 y20.2066; screenshot about24px.
- Timer implemented locally with React; no third-party iframe or runtime. Values change with current time; screenshot's333-day value is historical.

## Envelope and RSVP

- Height812; #fffef4. Envelope group382.778x464.565 at1081.11,24.2572.
- Envelope png582x800 displayed420.552x577.767 at-18.0522,-47.8384 inside clipped group.
- Decorative inner frame600x800 png: viewport175.812x156.992 at group103.483,142.991; opacity0.91. Image262.46x349.946 at-46.7397,-77.0988 inside viewport.
- Couple photo579x800 clipped to138.418x135.804 at group120.118,164.179. Render width138.418 height191.284; top-27.739 (central square crop).
- Celebration line223.73x28.2 at1160.63,497.19. Allison23.9999px/33px, color#4c535b; wrapper-2.4.
- RSVP ornamental frame288.714x70.3212 at1128.14,533.759, opacity0.6; blob URL in saved DOM, original SVG URL recoverable from embedded asset metadata. No CSS replacement when original is recovered.
- RSVP text group186.682x41.8 at1179.16,548.019. Cormorant SC19.9999px/27px, uppercase, #92969c. Deadline Garamond16px/22px uppercase at group x35.6643 y23. No RSVP functionality in this phase.
- Swans viewport244.503x138.924 at1150.25,648.819; png800x800 rendered264.471 square at-9.4293,-64.3496, overflow clipped.

## Footer

Height49; background#e9ecf1. Back link54.3906x24 at1245.3,12.5; Cormorant Garamond20px/28px, #4c535b, wrapper-2.

## Responsive evidence and implementation

The saved DOM is a single wide desktop layout snapshot. Canva scripts contain rendering machinery but no trustworthy saved mobile positions; supplied PNGs have no mobile view. Desktop widths expand background space while centered content retains its dimensions. Production follows that behavior. Below600px, the same artwork and fixed line breaks scale proportionally to available width (390px gives a0.65 content scale), retaining the composition and avoiding horizontal overflow. Header retains all five links at legible size. Mobile hero uses the same crop principle with a taller-than-wide presentation. Exact parity with unpublished Canva mobile layout is unverified.

## Fonts

Cormorant SC, Cormorant Garamond (regular and bold italic), Shelley Script, Allison, Pinyon Script, Garamond; Times New Roman for countdown. No font binaries exist in supplied Reference. Exact URLs and font metadata are embedded in Home.html. Retrieve only used faces into public/fonts from the user-owned published site, retaining their original bytes. Font distribution license files were not included in the export; no independent licensing assertion is made.

## Completed browser verification

Playwright with installed Chrome captured and visually inspected the complete page at1470x977 and390x844. A supplementary1756px capture was compared directly with homehero.png. All seven configured font faces loaded; all six image elements and the hero background loaded. Browser reported no JavaScript errors or failed HTTP responses. The mobile document width equals390px, with no horizontal overflow. Footer back link returns scrollY to0.

Desktop measured heights: header84, hero893, invitation798, countdown132, envelope812, footer49; total2768px. Colors, centered positions, name font rendering, floral crop, curtain crop, portrait crop, frame opacity, and swan placement were visually checked against the PNGs.

Correction pass: fixed a mobile hero background strip by using cover sizing, disabled the development indicator, and restored the navigation's exact exported item widths and20.484px desktop gaps. Final captures are `docs/screenshots/home-desktop-1470.png` and `docs/screenshots/home-mobile-390.png`.

Remaining differences/limits: the countdown intentionally shows current remaining time instead of the historical screenshot values. Countdown is a clean local implementation of the visible widget, with possible minor system-font spacing differences. Caption sizing follows screenshot appearance instead of the larger saved DOM values. Screenshot rasterization and saved section heights differ slightly; production retains exported pixel heights. Exact Canva mobile reflow cannot be verified because no mobile reference was supplied; the same composition is scaled without new sections. Two unresolved saved blob objects are not visibly identifiable in the supplied screenshots and are omitted. All visible major artwork and font families are recovered; no substitute decoration or font is used.

`npm run build` and `npm run typecheck` passed. Scope stops at Home; other navigation destinations remain on the original Canva site.


## Pre-translation polish (October 6, 2026)

The celebration line and RSVP box now sit 40px farther below the envelope; the RSVP label is “Click here for RSVP”. Countdown and caption are about 15% larger. Hero letters reveal in a gentle left-to-right stagger while retaining the existing typography; this is a handwriting-inspired reveal, not a traced pen-stroke font animation. Other page content fades in once on scroll. Animations respect reduced motion and retain readable content when JavaScript is unavailable. Home and Details were inspected at 1470px and 390px with no horizontal overflow. Captures: `home-polish-1470.png`, `home-polish-390.png`, `details-polish-1470.png`, `details-polish-390.png` in `docs/screenshots`.
