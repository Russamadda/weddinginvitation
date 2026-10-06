# Details reconstruction analysis

Completed before implementation using Details.html, all Details_files images, Details.pdf and details1–6.png. Reference is read-only. PDF is a single flattened image without text; screenshots are visual authority. Export uses2545px canvas and fixed centered content, as with the other pages.

## Sections and measurements

All positions below are relative to their section. Text centered, letter-spacing0 unless specified. Header84px; footer50px (#e9ecf1). Default content color#402825.

|Section|Height|Background|Important positions / typography|
|---|---|---|---|
|Date and venue|1099px|#fffef4; leaf JPEG rendered2545x3817.5 at y-1566.99, opacity.06|Title y156.166, Cormorant SC33.3333/46; Shelley Script and26.6667/37. Date y264.981, EB Garamond60017.3333/24. Photo group263.201x356.487 at center-131.6,y354.997. Venue label at group y287.821, Shelley26.6665/37. Ceremony copy343.424wide at y772.285, EB17.3332/24. Map button142.816x34.7389 at y892.629.|
|Travel / speeches|1016px|#402825; swan JPEG rendered2545x3332.19 at y-1158.09, opacity.1|Title y115.139, Cormorant SC33.3333/46. Cream text#fffdf0. By car y174.529, travelers360.624, speeches751.763: Shelley26.6667/37, with82.3119x5.92319 original flourish. Address y235.64, parking y265.8567, EB17.3334/24 (address italic). Travel copy508.944wide y431.826, paragraph gaps24. Speech copy389.591wide y803.837, EB17.3334/24.|
|Timeline|752px|#fffef4; leaves crop y-1740.49, opacity.06|Title y93.9482, Cormorant SC33.3333/46. Friday group y170.214, label offset8.59795, body starts after blank line. Saturday y315.419, body+24.4378. Sunday y443.525, body+24.3726. Labels Garamond13.3333/18 uppercase. Body EB18.6667/26, widths499.602/562.91/494.127. Flourish y604.728, note y625.785, EB13.3333/18 uppercase.|
|Accommodations|859px|#e9ecf1; floral JPEG2545x4522.04 at y-1831.52, opacity.1|Title y145.727. Two288.714wide columns centered at xcenter±189.78, y262.886/262.647. Original ornamental rectangles288.714x70.3212 opacity.6. Shelley headings26.6667/37 at local y16.6606. Dates y350.657, Cormorant SC13.3333/18. Left copy265.961wide y380.187; right288.714wide y382.342, EB17.3334/24. Visit link y546.875 Cormorant Garamond italic13.3333/18. RSVP note274.329wide y644.3, EB italic16/22.|
|Dress code|651px|#fffef4; leaves crop y-1790.99, opacity.06|Title y130.501, Cormorant SC33.3333/46 + Shelley33.3333/46. Formal attire y230.914, EB17.3334/24 uppercase. Copy275.505wide y290.5415, two paragraphs separated24px. Palette y494.075: three35.33px circles, colors#7d894a,#972626,#fcc0c5; gaps10.455/10.0.|
|Gift registry|651px|#dde1e6; leaves crop y-1899.98, opacity.06|Title y186.098, Cormorant SC33.3333/46 + Shelley33.3333/46. Copy355.071wide y282.63, EB17.3334/24. Button194.365x34.7389 y430.163.|

Typography wrapper offsets: headings-3.33333px, Shelley26.6667-2.66667px, EB17.3333-1.73333px, labels13.3333-1.33333px. Button text Cormorant Garamond10.6667/15 uppercase, letter-spacing.138em; brown1px border, transparent fill. No shadows.

Venue frame uses existing600x800 photo-frame PNG, displayed397.81x530.413 at(-72.4819,-116.859) inside263.201x287.821 clip. Photo viewport198.293x218.412 at group(32.454,34.7044). Internal image501.896x281.974 at(-122.948,0) scaled.77458; equivalent388.7586x218.412 and x-95.233. Crop remains exact.

## Assets and fonts

Copy four JPEGs into public (leaves, swan background, venue, pale floral). Reuse existing photo-frame PNG and recovered ornamental RSVP rectangle. Recover original flourish SVG from embedded metadata; recolor its original#231f20 to#fffef1 for travel and#1d2e4d for timeline. Recover original palette circle SVG and recolor its original#ffea50 per export metadata. Reuse Cormorant SC, Cormorant Garamond, Garamond, Shelley Script. Add only EB Garamond400 regular,400 italic,600 regular from exact metadata URLs.

## Links and scope

Villa website https://9vejai.eu/ as explicitly supplied. Map link https://maps.app.goo.gl/5eR1gZciG6s3QGNaA, found in the venue website's address/navigation link; the browser fetch cannot resolve the shortened destination in this environment. This is the venue's published link, not an invented location. No map iframe or API key is required. Registry link is pending: keep visual button disabled with accessible explanation. Phone may use tel:+4794896863. Remaining travel text is faithfully reproduced reference content, not newly researched travel advice.

Mobile layout preserves section order and typography, uses fluid content widths and natural text wrapping, and stacks the accommodations columns. Exact Canva mobile behavior is unverified because no mobile reference exists. No FAQ, RSVP backend, or translation work is authorized.

## Completed verification

Playwright with installed Chrome inspected all six desktop sections at1756px against details1–6.png. Final full-page screenshots saved at1470x974 and390x844 in `docs/screenshots/details-desktop-1470.png` and `details-mobile-390.png`. Correction pass added the small heading gap around “and” and moved the Friday dinner body up8px to align its reference position. Mobile uses a separate natural-flow override for timeline spacing.

Measured desktop section heights1099/1016/752/859/651/651, total page5162px including header/footer. All image elements and local fonts loaded; no JavaScript errors or failed HTTP responses were reported. Mobile scroll width390 equals viewport390. Home-to-Details navigation and footer return to Home were exercised. Venue website links, published map link, tel link and disabled registry state were inspected. Production build and TypeScript validation passed.

Remaining differences: mobile composition is inferred rather than matched to a missing mobile reference; font antialiasing varies by browser. Mixed-font titles use clean inline typography instead of Canva's nested transformations. The map URL is confirmed on the venue's site, but the shortened Google destination could not be fetched by the research tool. Registry intentionally has no destination yet. Reference files are untouched, four copied JPEGs are byte-identical, and all major decorations use recovered original assets.

User adjustment: moved venue frame and photo upward35.32933px on desktop and38.83714px on mobile while keeping the date and venue caption positions. Browser measurements show approximately32.5px above/below the frame on desktop and36.17px on mobile, centering it between those text blocks.
