# Litauisk invitasjon – språk- og layoutgjennomgang

Oversatt fra gjeldende gjestetekster, med de siste norske endringene i tidslinje, overnatting og barn. Før innlegging ble et fullstendig utkast gjennomgått for ordvalg, grammatikk, tone, datoer og tekstvariabler. En ny gjennomgang rettet blant annet grillfestbeskrivelsen og formuleringer som ellers ville krevd automatisk bøyning av personnavn. Dette er en gjennomgang utført av implementeringsagenten, ikke en uavhengig kontroll av en litauisk morsmålsbruker.

## Språkvalg

- «Jūs», «Jūsų» og «Jumis» gir en høflig og varm tiltale som fungerer for både én gjest og et par eller en gruppe. Ingen «deg/dere»-plassholder vises på litauisk.
- Personlige hilsener bruker «Kviečiame švęsti kartu:» etterfulgt av navnene, med «ir» mellom de siste navnene. Denne formuleringen lar oss beholde navn slik de er registrert, uten å gjette kjønn eller bøye navn feil i vokativ.
- «Rehearsal dinner» er tilpasset som en hyggelig middag i forkant av bryllupet. Den norske avskjedsgrillfesten beskrives som «Atsisveikinimo vaišės», med grillet mat forklart i avsnittet.
- Tidstelleren sier «Iki mūsų vestuvių» (til bryllupet vårt), fremfor en unaturlig ordrett oversettelse av «forever begins».
- Datoer bruker litauiske månedsnavn og vanlig skrivemåte, blant annet «2027 m. rugsėjo 4 d.» og «2027 m. vasario 25 d.».
- Stedet omtales som «vila „9 Vėjai“», og adressen og telefonnumrene er beholdt.
- RSVP beholdes som menyetikett og overskrift; spørsmål, handlinger, kvittering, feil og hjelpetekst er oversatt.
- Barn i alle aldre er velkomne. Pluss én-spørsmålet er fortsatt fjernet. Eldre, ubrukte pluss én-nøkler er oversatt for at ordbøkene skal ha samme struktur, men vises ikke på nettsiden.
- Lokale og reisende får fremdeles forskjellige overnattingsspørsmål. Språkvalget endrer ikke gjestekategorien.

Formuleringer for invitasjon, svarfrist og nakvynė er sammenholdt med litauiske invitasjonseksempler og omtale av RSVP hos [Planuok pati](https://www.planuokpati.lt/straipsniai/perziura/vestuviniai-pakvietimai-ka-ir-kaip-rasyti) og en litauisk invitasjonsleverandørs [Popieriaus magija – DUK](https://popieriausmagija.lt/pages/duk). Disse er språkeksempler, ikke kilder til bryllupets praktiske opplysninger.

## Språkvelger og lenkeforhåndsvisning

English / Norsk / Lietuvių er tilgjengelig for gjennomgang. `lang=lt` overstyrer visningen uten å endre lagret språkvalg. Invitasjonsnøkkelen og utfylte RSVP-svar beholdes ved språkbytte. Invitasjoner med språk `lt` åpner automatisk på litauisk, også uten `lang` i lenken.

Forhåndsvisningens tittel bestemmes av invitasjonens språk på serveren: «Your invitation», «Din invitasjon» eller «Jūsų kvietimas». Konvoluttbildet er beholdt. Testen henter HTML som en lenkeforhåndsvisningsrobot, uten JavaScript, for alle tre språk. Eksisterende forhåndsvisninger kan være lagret i meldingsappens mellomlager.

## Kontroll

Samme tekstnøkler og plassholdere i alle tre språk. Mobil, nettbrett og desktop er kontrollert på 320, 390, 768 og 1440 piksler. Kontrollene dekker navigasjon, tekst som går utenfor bokser, overlapp, automatisk språkvalg, begge RSVP-kategorier, lagring av litauiske tegn og bevaring av svar ved språkbytte. Skriftene som brukes til gjestetekst inneholder litauiske tegn; monogrammets Pinyon-font brukes bare til M og D.

## Samlet tekstoversikt

Nedenfor står alle tekstnøkler, inkludert skjermlesertekst, metadata, feilmeldinger og historiske nøkler. Admin beholdes på engelsk.

### Meny og felles tekster

**S001**

Norsk: Hjem

Litauisk: Pradžia

**S002**

Norsk: Love Story

Litauisk: Mūsų istorija

**S003**

Norsk: Detaljer

Litauisk: Informacija

**S004**

Norsk: Spørsmål

Litauisk: Klausimai

**S005**

Norsk: RSVP

Litauisk: RSVP

**S006**

Norsk: Tilbake

Litauisk: ← Atgal

**S007**

Norsk: Kjære familie og venner,

Litauisk: Mieli artimieji ir draugai,

**S008**

Norsk: Kjære {name},

Litauisk: Kviečiame švęsti kartu: {name}

**S009**

Norsk: Kjære {name1} og {name2},

Litauisk: Kviečiame švęsti kartu: {name1} ir {name2}

**S010**

Norsk: Kjære {name1}, {name2} og {name3},

Litauisk: Kviečiame švęsti kartu: {name1}, {name2} ir {name3}

**S011**

Norsk: Ja

Litauisk: Taip

**S012**

Norsk: Nei

Litauisk: Ne

**S013**

Norsk: Neste →

Litauisk: Toliau →

**S014**

Norsk: Språk for forhåndsvisning

Litauisk: Peržiūros kalba

**S015**

Norsk: Forhåndsvisning

Litauisk: Peržiūra

### Hjem

**H001**

Norsk: Marthe og Deivi

Litauisk: Marthe ir Deivi

**H002**

Norsk: Ska gift sæ

Litauisk: tuokiasi

**H003**

Norsk: 04.09.2027

Litauisk: 2027.09.04

**H004**

Norsk: Vi inviterer deg/dere til vårt bryllup. Omgitt av våre nærmeste vil vi si «ja» til hverandre og begynne et nytt kapittel sammen.

Litauisk: Kviečiame Jus į mūsų vestuves. Artimiausių žmonių apsuptyje ištarsime vienas kitam „taip“ ir pradėsime naują bendro gyvenimo skyrių.

**H005**

Norsk: Dager

Litauisk: Dienos

**H006**

Norsk: Timer

Litauisk: Valandos

**H007**

Norsk: Minutter

Litauisk: Minutės

**H008**

Norsk: Sekunder

Litauisk: Sekundės

**H009**

Norsk: Til vårt

Litauisk: Iki mūsų

**H010**

Norsk: for alltid begynner

Litauisk: vestuvių

**H011**

Norsk: Vi gleder oss til å feire med deg/dere

Litauisk: Nekantraujame švęsti kartu su Jumis

**H012**

Norsk: Klikk her for å svare på invitasjonen

Litauisk: Atsakyti į kvietimą

**H013**

Norsk: Innen 25. februar 2027

Litauisk: Iki 2027 m. vasario 25 d.

### Kjærlighetshistorien

**L001**

Norsk: Vår kjærlighetshistorie

Litauisk: Mūsų meilės istorija

**L002**

Norsk: Hvis det er én ting vår historie har lært oss, så er det at litt nysgjerrighet og litt tvilsom flørting kan endre alt.

Litauisk: Jei mūsų istorija ko nors išmokė, tai to, kad šiek tiek smalsumo ir ne itin vykęs flirtas gali pakeisti viską.

**L003**

Norsk: Vår historie begynte i kantina på videregående. Deivi hadde lest at det å stirre på noen kunne få dem til å forelske seg i ham, og bestemte seg for å teste teorien på den fineste jenta på skolen. Tre uker senere tok hun kontakt. Om det var eksperimentet som fungerte, eller om hun bare ville ha en forklaring på hva han holdt på med, er fortsatt oppe til diskusjon.

Litauisk: Mūsų istorija prasidėjo mokyklos valgykloje. Deivi buvo skaitęs, kad ilgai žiūrėdamas žmogui į akis gali priversti jį įsimylėti, tad nusprendė šią teoriją išbandyti su gražiausia mokyklos mergina. Po trijų savaičių ji pati jį užkalbino. Ar eksperimentas pavyko, ar ji tiesiog norėjo sužinoti, ką jis čia išdarinėja, iki šiol lieka neaišku.

**L004**

Norsk: Like etter ble vi bestevenner og fant enhver unnskyldning for å tilbringe tid sammen, selv om vi bodde på hver vår side av byen. Deivi flyttet til Bergen, der han fikk en jobb, og Marthe fulgte etter. Disse årene ga oss vennskap vi alltid vil ta vare på, nye erfaringer og flere minnerike kvelder på byen.

Litauisk: Netrukus tapome geriausiais draugais ir ieškojome bet kokios progos pabūti kartu, nors gyvenome skirtinguose miesto galuose. Vėliau Deivi išsikraustė į Bergeną, kur gavo darbą, o Marthe persikėlė paskui jį. Tie metai mums padovanojo draugysčių, kurias visada branginsime, naujų patirčių ir ne vieną įsimintiną vakarą mieste.

**L005**

Norsk: Etter hvert flyttet vi hjem for å fokusere på utdanning og bygge et fundament for vår fremtid. Uansett hvilke forandringer vi har gått gjennom, har vi holdt fast ved det samme rådet: Når en lyspære slutter å fungere, bytter du pæren – du trenger ikke å kjøpe et nytt hus. Vi er stolte over det vi har bygget sammen, og veldig takknemlige for folkene rundt oss.

Litauisk: Galiausiai grįžome į gimtąjį miestą, kad daugiau dėmesio skirtume mokslams ir kurtume savo ateitį. Kad ir kiek pokyčių patyrėme, visada laikėmės tos pačios minties: kai namuose perdega lemputė, pakeiti lemputę, o ne perki naują namą. Didžiuojamės tuo, ką sukūrėme kartu, ir esame labai dėkingi mus supantiems žmonėms.

**L006**

Norsk: Når vi ser tilbake, er det morsomt å tenke på at alt dette startet med noen blikk i en kantine. Gjennom det meste har vi vokst sammen, og vi gleder oss til alt som kommer.

Litauisk: Žvelgiant atgal, smagu pagalvoti, kad viskas prasidėjo nuo kelių žvilgsnių mokyklos valgykloje. Kartu išgyvenome ir gražių, ir sunkių akimirkų, augome ir nekantriai laukiame visko, kas dar priešakyje.

**L007**

Norsk: Nå som vi ser frem til neste kapittel, er vi fylt med takknemlighet for reisen som har tatt oss hit, og vi gleder oss til alle de neste kapitlene som står for tur.

Litauisk: Pradėdami naują gyvenimo skyrių, jaučiame didžiulį dėkingumą už kelią, kuris mus atvedė iki čia, ir su džiaugsmu laukiame visų būsimų skyrių.

**L008**

Norsk: Men mest av alt er vi takknemlige for å tilbringe denne store dagen med de menneskene som betyr mest for oss: de som har vært her med oss fra starten, de vi har møtt underveis, og de som skal være med oss videre på reisen.

Litauisk: O labiausiai esame dėkingi, kad šia ypatinga diena galėsime dalytis su mums brangiausiais žmonėmis: tais, kurie buvo šalia nuo pat pradžių, tais, kuriuos sutikome pakeliui, ir tais, kurie mus lydės toliau.

### Detaljer

**D001**

Norsk: Dato og lokale

Litauisk: Data ir vieta

**D002**

Norsk: Lørdag 4. september 2027

Litauisk: 2027 m. rugsėjo 4 d., šeštadienis

**D003**

Norsk: Både vielsen og festen finner sted på Villa 9 Vejai. Her har vi også ordnet og dekket overnatting til alle gjester fra lørdag til søndag, slik at vi kan være samlet og feire så lenge vi måtte ønske.

Litauisk: Ir santuokos ceremonija, ir šventė vyks viloje „9 Vėjai“. Čia taip pat pasirūpinome visų svečių nakvyne iš šeštadienio į sekmadienį ir ją apmokėjome, kad galėtume būti kartu ir švęsti tiek, kiek norėsis.

**D004**

Norsk: Hvordan komme seg dit

Litauisk: Kaip atvykti

**D005**

Norsk: Med bil

Litauisk: Automobiliu

**D006**

Norsk: Knygnešio P. Varkalos g. 44

Litauisk: Knygnešio P. Varkalos g. 44

**D007**

Norsk: Det finnes parkering på stedet om du kommer med bil.

Litauisk: Atvykusiems automobiliu vietoje yra automobilių stovėjimo aikštelė.

**D008**

Norsk: Reisende gjester

Litauisk: Atvykstantiems iš užsienio

**D009**

Norsk: Den enkleste måten å reise på er å fly fra Norge til Vilnius. Fra Vilnius flyplass drar du til Vilnius togstasjon og tar toget videre til Kaunas. Togturen tar rundt én time.

Litauisk: Iš Norvegijos patogiausia skristi į Vilnių. Iš Vilniaus oro uosto nuvykite į Vilniaus geležinkelio stotį, o iš ten traukiniu važiuokite į Kauną. Kelionė traukiniu trunka apie valandą.

**D010**

Norsk: Vi anbefaler å komme til Kaunas i hvert fall én dag før bryllupet og bo på hotell i byen.

Litauisk: Rekomenduojame į Kauną atvykti bent dieną prieš vestuves ir apsistoti viešbutyje mieste.

**D011**

Norsk: Bryllupslokalet er cirka 20 minutter fra sentrum med bil. Vi anbefaler taxi eller en annen transporttjeneste, eller en leiebil om du ønsker å utforske området mer.

Litauisk: Nuo Kauno centro iki šventės vietos automobiliu nuvažiuosite maždaug per 20 minučių. Rekomenduojame rinktis taksi ar pavėžėjimo paslaugas. Jei norėsite daugiau pakeliauti po apylinkes, galite išsinuomoti automobilį.

**D012**

Norsk: Vi anbefaler å booke reisen tidlig med tanke på pris. Du må gjerne spørre brudeparet om hjelp til reiseplanlegging, enten det er fly, hotell eller andre spørsmål rundt dette.

Litauisk: Kelionę rekomenduojame užsisakyti iš anksto, kol kainos palankesnės. Jei prireiktų pagalbos planuojant skrydžius, renkantis viešbutį ar sprendžiant kitus kelionės klausimus, drąsiai kreipkitės į mus.

**D013**

Norsk: Taler

Litauisk: Kalbos ir staigmenos

**D014**

Norsk: Har du lyst til å holde tale eller planlegge en overraskelse? Da må du gjerne ta kontakt med vår toastmaster, Mathias Krohn, for å avtale tale eller andre artige og kreative bidrag til kvelden. Telefon: +47 948 96 863

Litauisk: Norėtumėte pasakyti kalbą ar paruošti staigmeną? Mūsų vakaro koordinatorius Mathias Krohn padės suderinti kalbas ir kitus smagius bei kūrybiškus šventės sumanymus. Drąsiai susisiekite su juo. Tel.: +47 948 96 863

**D015**

Norsk: Tidslinje

Litauisk: Savaitgalio programa

**D016**

Norsk: Fredag 3. september – Velkomstmiddag

Litauisk: Rugsėjo 3 d., penktadienis – Susipažinimo vakarienė

**D017**

Norsk: For gjestene som kommer reisende til Kaunas, planlegger vi en felles middag på restaurant, der man får anledning til å treffe hverandre og bli bedre kjent før vi tilbringer helgen sammen. Litt som en rehearsal dinner.

Litauisk: Į Kauną atvykstantiems svečiams planuojame bendrą vakarienę restorane. Tai bus proga susitikti ir geriau susipažinti prieš kartu praleidžiant savaitgalį – jaukus vakaras vestuvių išvakarėse.

**D018**

Norsk: Lørdag 4. september – Vielse og feiring

Litauisk: Rugsėjo 4 d., šeštadienis – Ceremonija ir šventė

**D019**

Norsk: Vi møtes på Villa 9 Vejai for vielse, etterfulgt av middag, musikk og en bryllupsfest som varer så lenge vi orker.

Litauisk: Susitiksime viloje „9 Vėjai“, kur vyks santuokos ceremonija. Po jos mūsų lauks vakarienė, muzika ir vestuvių šventė, kuri tęsis tol, kol turėsime jėgų.

**D020**

Norsk: Søndag 5. september – Hade på badet-grillfest

Litauisk: Rugsėjo 5 d., sekmadienis – Atsisveikinimo vaišės

**D021**

Norsk: Etter en rolig «dagen derpå» planlegger vi en koselig grillfest med våre gjester før alle drar videre hver for seg. De som planlegger å reise allerede på søndag, kan ta sine farvel og dra når det passer for dem.

Litauisk: Po ramaus ryto pakviesime svečius jaukiai pabūti kartu ir pasivaišinti ant grotelių keptu maistu, o paskui visi pasuksime savais keliais. Tie, kurie planuoja išvykti jau sekmadienį, galės atsisveikinti ir išvažiuoti jiems patogiu metu.

**D022**

Norsk: Flere detaljer, inkludert tidspunkt og steder, kommer snart.

Litauisk: Daugiau informacijos, taip pat tikslius laikus ir vietas, paskelbsime vėliau.

**D023**

Norsk: Overnattingsmuligheter

Litauisk: Nakvynė

**D024**

Norsk: Overnatting i Kaunas

Litauisk: Nakvynė Kaune

**D025**

Norsk: 3.–4. september

Litauisk: Rugsėjo 3–4 d.

**D026**

Norsk: Vi holder på å undersøke hoteller i Kaunas med gruppepris til dagen før bryllupet.

Litauisk: Ieškome viešbučių Kaune, kurie galėtų pasiūlyti palankesnę kainą mūsų svečiams, atvykstantiems dieną prieš vestuves.

**D027**

Norsk: Når vi har mottatt svarene deres, får vi en bedre oversikt over antall gjester. Da kan vi oppdatere dere som kommer, om hoteller.

Litauisk: Gavę Jūsų atsakymus, žinosime, kiek svečių atvyks, ir pasidalysime informacija apie viešbučius su tais, kuriems ji aktuali.

**D028**

Norsk: Villa 9 Vejai

Litauisk: Vila „9 Vėjai“

**D029**

Norsk: 4.–5. september

Litauisk: Rugsėjo 4–5 d.

**D030**

Norsk: Rett utenfor Kaunas har vi funnet et nydelig lokale som heter Villa 9 Vejai. Her skal vi feire og bo sammen. Vi har arrangert overnatting fra lørdag til søndag, som vi dekker for gjestene våre.

Litauisk: Netoli Kauno radome nuostabią vietą – vilą „9 Vėjai“. Čia kartu švęsime ir apsistosime nakvynei. Nakvyne iš šeštadienio į sekmadienį jau pasirūpinome ir ją apmokėjome savo svečiams.

**D031**

Norsk: Det er bare å ta kontakt dersom du har noen spørsmål.

Litauisk: Jei turite klausimų, drąsiai susisiekite su mumis.

**D032**

Norsk: Gi oss beskjed når du svarer på innbydelsen, om du vil ha hjelp til å finne overnatting i Kaunas 3.–4. september.

Litauisk: Atsakydami į kvietimą, praneškite, ar norėtumėte gauti viešbučio Kaune pasiūlymą rugsėjo 3–4 d. nakvynei.

**D033**

Norsk: Dette vil hjelpe oss når vi skal undersøke en gruppepris. Vi deler hotellforslag og mer informasjon når vi har fått inn svar fra alle.

Litauisk: Taip žinosime, kiek žmonių domisi nakvyne, ir galėsime teirautis dėl bendro pasiūlymo. Gavę atsakymus, pasidalysime viešbučių pasiūlymais ir kita informacija.

**D034**

Norsk: Kleskode

Litauisk: Aprangos kodas

**D035**

Norsk: Formelt antrekk

Litauisk: Šventinė apranga

**D036**

Norsk: Når vi møtes på lørdag for å feire denne dagen, er kleskoden formelt antrekk.

Litauisk: Šeštadienį, susitikus švęsti mūsų vestuvių, kviečiame pasipuošti iškilmingai progai skirta apranga.

**D037**

Norsk: Vår fargepalett er bare for inspirasjon, det viktigste for oss er å feire dagen med dere.

Litauisk: Žemiau pateikta spalvų paletė – tik įkvėpimui. Svarbiausia mums – švęsti šią dieną kartu su Jumis.

**D038**

Norsk: Gaveønsker

Litauisk: Dovanų idėjos

**D039**

Norsk: Din deltakelse er den største gaven av alle. For våre venner og familie som har spurt, har vi laget en ønskeliste med et par ting som vi hadde satt pris på.

Litauisk: Jūsų dalyvavimas mums yra didžiausia dovana. Artimiesiems ir draugams, kurie teiravosi, paruošėme nedidelį norų sąrašą su daiktais, kurie pradžiugintų mūsų namus ir bendrą ateitį.

**D040**

Norsk: Vis på kart

Litauisk: Žiūrėti žemėlapyje

**D041**

Norsk: Besøk nettside

Litauisk: Apsilankyti svetainėje

**D042**

Norsk: Se ønskeliste

Litauisk: Peržiūrėti norų sąrašą

**D043**

Norsk: Ønskeliste kommer snart

Litauisk: Nuorodą į norų sąrašą paskelbsime netrukus

**D044**

Norsk: Girininkai, Litauen

Litauisk: Girininkai, Lietuva

**D045**

Norsk: Vi ber alle gjester om å være på plass 30 minutter før vielsen begynner.

Litauisk: Prašome atvykti likus 30 minučių iki santuokos ceremonijos pradžios.

### Spørsmål

**F001**

Norsk: Spørsmål

Litauisk: Klausimai

**F002**

Norsk: Kan jeg ta med meg noen?

Litauisk: Ar galiu atsivesti papildomą svečią?

**F003**

Norsk: Se RSVP for flere detaljer.

Litauisk: Kvietime nurodyta, kam jis skirtas.

**F004**

Norsk: Kan jeg ha på meg hvitt?

Litauisk: Ar galima vilkėti baltai?

**F005**

Norsk: Nei.

Litauisk: Ne.

**F006**

Norsk: Hvem skal jeg kontakte om jeg har spørsmål?

Litauisk: Į ką kreiptis, jei turiu klausimų?

**F007**

Norsk: For reiseplanlegging, overnatting eller andre spørsmål, ikke nøl med å ta kontakt.

Litauisk: Jei turite klausimų apie kelionę, nakvynę ar pačias vestuves, drąsiai susisiekite su mumis.

### RSVP

**R001**

Norsk: RSVP

Litauisk: RSVP

**R002**

Norsk: Vi gleder oss til å feire med deg/dere

Litauisk: Nekantraujame švęsti kartu su Jumis

**R003**

Norsk: Svar innen 25. februar 2027, men gjerne før.

Litauisk: Atsakymo lauksime iki 2027 m. vasario 25 d., bet būsime dėkingi, jei atsakysite anksčiau.

**R004**

Norsk: Åpne den personlige invitasjonslenken vi sendte deg, for å svare. Hvis du har mistet lenken, ta kontakt med oss.

Litauisk: Norėdami atsakyti, atidarykite Jums atsiųstą asmeninę kvietimo nuorodą. Jei jos neberandate, susisiekite su mumis.

**R005**

Norsk: Kommer du/dere?

Litauisk: Kas dalyvaus šventėje?

**R006**

Norsk: Svar for hver person som er navngitt i invitasjonen.

Litauisk: Prašome atsakyti už kiekvieną kvietime nurodytą asmenį.

**R007**

Norsk: Kommer gjerne

Litauisk: Su džiaugsmu dalyvausiu

**R008**

Norsk: Kan dessverre ikke komme

Litauisk: Deja, negalėsiu dalyvauti

**R009**

Norsk: Matpreferanser eller allergier for {name} (valgfritt)

Litauisk: Mitybos poreikiai ar alergijos – {name} (neprivaloma)

**R010**

Norsk: Tar du med deg noen?

Litauisk: Ar atsivesite papildomą svečią?

**R011**

Norsk: Barn i alle aldre er hjertelig velkomne! Hvis dere tar med barn, skriv gjerne navn, alder og eventuelle matpreferanser eller allergier i feltet nedenfor.

Litauisk: Nuoširdžiai laukiame įvairaus amžiaus vaikų! Jei atvyksite su vaikais, žemiau parašykite jų vardus, amžių ir nurodykite mitybos poreikius ar alergijas.

**R012**

Norsk: Barn som blir med (valgfritt)

Litauisk: Kartu atvykstantys vaikai (neprivaloma)

**R013**

Norsk: Navn, alder og matpreferanser/allergier

Litauisk: Vardai, amžius, mitybos poreikiai ir alergijos

**R014**

Norsk: Fullt navn på ekstra gjest

Litauisk: Papildomo svečio vardas ir pavardė

**R015**

Norsk: Matpreferanser eller allergier (valgfritt)

Litauisk: Mitybos poreikiai ar alergijos (neprivaloma)

**R016**

Norsk: + Legg til flere gjester

Litauisk: + Pridėti svečią

**R017**

Norsk: Barn er hjertelig velkomne

Litauisk: Vaikai taip pat labai laukiami

### Hotelltilbud til reisende

**T001**

Norsk: Gruppetilbud på hotell i Kaunas

Litauisk: Bendras viešbučio pasiūlymas Kaune

**T002**

Norsk: For gjester som reiser til Kaunas og ønsker å bo der 3.–4. september: Ønsker du å motta et gruppetilbud på hotell dersom vi finner det? Et ja reserverer ikke et rom.

Litauisk: Jei atvyksite į Kauną ir norėsite apsistoti rugsėjo 3–4 d., ar norėtumėte gauti viešbučio pasiūlymą mūsų svečiams, jei pavyktų jį suderinti? Pasirinkus „taip“, kambarys nerezervuojamas.

**T003**

Norsk: Ja takk

Litauisk: Taip, ačiū

**T004**

Norsk: Nei takk

Litauisk: Ne, ačiū

**T005**

Norsk: E-postadresse

Litauisk: El. pašto adresas

**T006**

Norsk: Vi bruker denne e-postadressen til å sende hotellalternativer for 3.–4. september og oppdateringer om oppholdet.

Litauisk: Šiuo el. paštu atsiųsime bendrą viešbučio Kaune pasiūlymą rugsėjo 3–4 d. ir informaciją apie šios nakvynės organizavimą.

### Overnatting på lokalet

**V001**

Norsk: Overnatting på lokalet · 4.–5. september

Litauisk: Nakvynė šventės vietoje · rugsėjo 4–5 d.

**V002**

Norsk: Har dere lyst til å bo på bryllupslokalet fra lørdag til søndag? Alle gjester er velkomne til å bo her sammen med oss. Si ifra slik at vi kan planlegge dette.

Litauisk: Ar po vestuvių norėtumėte likti nakvoti viloje „9 Vėjai“? Nakvynei kviečiame visus svečius, taip pat ir gyvenančius netoliese. Praneškite, kad galėtume suplanuoti apgyvendinimą.

**V003**

Norsk: Ja, gjerne

Litauisk: Taip, ačiū

**V004**

Norsk: Nei takk

Litauisk: Ne, ačiū

**V005**

Norsk: Hvis bare noen av dere ønsker å overnatte, skriv navnene deres i merknadsfeltet nedenfor.

Litauisk: Jei nakvoti liks tik dalis Jūsų grupės, žemiau esančiame pastabų laukelyje parašykite, kas pasiliks.

### Gjennomgang og kvittering

**C001**

Norsk: Noe mer?

Litauisk: Dar kas nors?

**C002**

Norsk: Er det noe mer du ønsker at vi skal vite? (valgfritt)

Litauisk: Ar dar ką nors norėtumėte mums pranešti? (neprivaloma)

**C003**

Norsk: Se gjennom svaret ditt

Litauisk: Peržiūrėkite savo atsakymą

**C004**

Norsk: Send svar

Litauisk: Siųsti atsakymą

**C005**

Norsk: Sender…

Litauisk: Siunčiama…

**C006**

Norsk: Rediger svaret ditt

Litauisk: Keisti atsakymą

**C007**

Norsk: Svaret ditt har blitt sendt til Marthe og Deivi

Litauisk: Ačiū! Jūsų atsakymą gavome. Marthe ir Deivi

**C008**

Norsk: Kommer gjerne

Litauisk: Dalyvaus

**C009**

Norsk: Kan dessverre ikke komme

Litauisk: Nedalyvaus

**C010**

Norsk: Ekstra gjest

Litauisk: Papildomas svečias

**C011**

Norsk: Matpreferanser eller allergier:

Litauisk: Mitybos poreikiai:

**C012**

Norsk: Hotelltilbud i Kaunas, 3.–4. september:

Litauisk: Viešbučio Kaune pasiūlymas rugsėjo 3–4 d.:

**C013**

Norsk: Overnatting på bryllupslokalet, 4.–5. september:

Litauisk: Nakvynė šventės vietoje rugsėjo 4–5 d.:

**C014**

Norsk: E-postadresse for hotelltilbud:

Litauisk: El. paštas informacijai apie viešbutį:

**C015**

Norsk: Barn:

Litauisk: Vaikai:

**C016**

Norsk: Merknader:

Litauisk: Pastabos:

**C017**

Norsk: For spørsmål rundt reiseplanlegging, overnatting eller andre spørsmål, bare ta kontakt

Litauisk: Jei turite klausimų apie kelionę, nakvynę ar vestuves, susisiekite su mumis.

### Feilmeldinger

**E001**

Norsk: Velg om {name} kommer.

Litauisk: Pasirinkite, ar šis svečias dalyvaus: {name}.

**E002**

Norsk: Velg om du tar med en ekstra gjest.

Litauisk: Pasirinkite, ar atsivesite papildomą svečią.

**E003**

Norsk: Antall ekstra gjester overstiger det denne invitasjonen tillater.

Litauisk: Viršytas šiam kvietimui leidžiamas papildomų svečių skaičius.

**E004**

Norsk: Skriv navnet på den ekstra gjesten.

Litauisk: Įrašykite papildomo svečio vardą.

**E005**

Norsk: Skriv inn navnet.

Litauisk: Įrašykite svečio vardą.

**E006**

Norsk: Navnet er allerede registrert. Bruk fullt navn hvis to personer har samme navn.

Litauisk: Šis vardas jau įrašytas. Jei du svečiai turi tą patį vardą, nurodykite ir pavardes.

**E007**

Norsk: Velg om du ønsker hotelltilbudet i Kaunas.

Litauisk: Pasirinkite, ar norėtumėte gauti viešbučio Kaune pasiūlymą.

**E008**

Norsk: Velg om dere ønsker å overnatte på lokalet.

Litauisk: Pasirinkite, ar norėtumėte likti nakvoti šventės vietoje.

**E009**

Norsk: Skriv inn en gyldig e-postadresse for hotelltilbudet.

Litauisk: Įrašykite galiojantį el. pašto adresą informacijai apie viešbutį gauti.

**E010**

Norsk: Fyll ut de markerte feltene før du ser gjennom svaret.

Litauisk: Prieš peržiūrėdami atsakymą, užpildykite pažymėtus laukelius.

**E011**

Norsk: Svaret kunne ikke sendes. Prøv igjen.

Litauisk: Nepavyko išsiųsti atsakymo. Bandykite dar kartą.

**E012**

Norsk: Svaret kunne ikke sendes. Svarene dine er fortsatt her – prøv igjen.

Litauisk: Nepavyko išsiųsti atsakymo. Jūsų įrašyta informacija išliko – bandykite dar kartą.

**E013**

Norsk: Invitasjonen er utilgjengelig

Litauisk: Kvietimas nepasiekiamas

**E014**

Norsk: Denne invitasjonslenken er kanskje ikke lenger aktiv. Kontakt Marthe og Deivi for hjelp.

Litauisk: Ši kvietimo nuoroda galbūt nebegalioja. Jei reikia pagalbos, susisiekite su mumis.

**E015**

Norsk: Denne invitasjonen er utilgjengelig. Kontakt Marthe og Deivi.

Litauisk: Šis kvietimas nepasiekiamas. Susisiekite su mumis.

**E016**

Norsk: Svaret kunne ikke lagres. Prøv igjen.

Litauisk: Nepavyko išsaugoti atsakymo. Bandykite dar kartą.

**E017**

Norsk: Denne invitasjonen er ikke lenger aktiv.

Litauisk: Šis kvietimas nebegalioja.

**E018**

Norsk: Svaret kunne ikke leses. Fyll ut skjemaet på nytt.

Litauisk: Nepavyko perskaityti atsakymo. Užpildykite formą iš naujo.

**E019**

Norsk: Et av tekstfeltene er for langt eller ugyldig.

Litauisk: Vienas iš tekstinių laukelių yra per ilgas arba netinkamai užpildytas.

**E020**

Norsk: Svaret inneholder en gjest som ikke står på invitasjonen.

Litauisk: Atsakyme nurodytas svečias, kurio šiame kvietime nėra.

**E021**

Norsk: Velg et gyldig svar.

Litauisk: Pasirinkite tinkamą atsakymą.

**E022**

Norsk: For mange ekstra gjester for denne invitasjonen.

Litauisk: Šiam kvietimui negalima pridėti papildomų svečių.

**E023**

Norsk: Ugyldig ekstra gjest.

Litauisk: Netinkami papildomo svečio duomenys.

**E024**

Norsk: Forespørselen kommer fra en adresse som ikke er tillatt.

Litauisk: Užklausa iš šio šaltinio neleidžiama.

**E025**

Norsk: Send data i JSON-format.

Litauisk: Duomenis siųskite JSON formatu.

**E026**

Norsk: Forespørselen mangler innhold.

Litauisk: Trūksta užklausos duomenų.

**E027**

Norsk: Svaret er for stort.

Litauisk: Atsakymo duomenų per daug.

### Titler og lenkeforhåndsvisning

**M001**

Norsk: Din invitasjon

Litauisk: Jūsų kvietimas

**M002**

Norsk: Vår kjærlighetshistorie | Marthe og Deivi

Litauisk: Mūsų meilės istorija | Marthe ir Deivi

**M003**

Norsk: Bryllupsdetaljer | Marthe og Deivi

Litauisk: Vestuvių informacija | Marthe ir Deivi

**M004**

Norsk: Spørsmål | Marthe og Deivi

Litauisk: Klausimai | Marthe ir Deivi

**M005**

Norsk: RSVP | Marthe og Deivi

Litauisk: RSVP | Marthe ir Deivi

**M006**

Norsk: Bryllupsadministrasjon | Marthe og Deivi

Litauisk: Vestuvių administravimas | Marthe ir Deivi

**M007**

Norsk: Vi inviterer deg til bryllupet vårt 4. september 2027.

Litauisk: Kviečiame Jus į mūsų vestuves 2027 m. rugsėjo 4 d.

**M008**

Norsk: Ses vi i september? Du er invitert i bryllupet vårt.

Litauisk: Iki pasimatymo rugsėjį! Kviečiame Jus į mūsų vestuves.

**M009**

Norsk: Ses vi i september?

Litauisk: Iki pasimatymo rugsėjį!

### Tilgjengelighet

**A001**

Norsk: Hovedmeny

Litauisk: Pagrindinis meniu

**A002**

Norsk: Feir med oss

Litauisk: Švęskite kartu su mumis

**A003**

Norsk: Marthe og Deivi deler et smil

Litauisk: Marthe ir Deivi šypsosi vienas kitam

**A004**

Norsk: Marthe og Deivi

Litauisk: Marthe ir Deivi

**A005**

Norsk: 4. september 2027

Litauisk: 2027 m. rugsėjo 4 d.

**A006**

Norsk: Marthe og Deivi sammen på et bilde fra starten av forholdet

Litauisk: Marthe ir Deivi ankstyvoje bendroje nuotraukoje

**A007**

Norsk: Hendene våre sammen, med ringene våre

Litauisk: Mūsų rankos su vestuviniais žiedais

**A008**

Norsk: Villa 9 Vėjai og hagen sett ovenfra

Litauisk: Vila „9 Vėjai“ ir jos sodai iš paukščio skrydžio

**A009**

Norsk: Fargeinspirasjon: olivengrønt, dyprødt og lys rosa

Litauisk: Spalvų idėjos: alyvuogių žalia, sodri raudona ir švelni rožinė

**A010**

Norsk: Se ønskeliste – lenken kommer snart

Litauisk: Peržiūrėti norų sąrašą – nuorodą paskelbsime netrukus

**A011**

Norsk: En brudebukett med bilder av våre kjære

Litauisk: Vestuvių puokštė su atminimo nuotraukomis

**A012**

Norsk: Nedtelling til bryllupet vårt

Litauisk: Laikas iki mūsų vestuvių

**A013**

Norsk: Administrasjonsmeny

Litauisk: Administravimo meniu

**A014**

Norsk: {days} dager, {hours} timer, {minutes} minutter og {seconds} sekunder til bryllupet vårt

Litauisk: Iki mūsų vestuvių: {days} d., {hours} val., {minutes} min., {seconds} sek.

**A015**

Norsk: Nedtellingen til bryllupet lastes inn

Litauisk: Įkeliamas laikas iki vestuvių

