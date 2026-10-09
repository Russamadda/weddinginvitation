# Norsk invitasjon – gjennomgang av oversettelsen

Tekstene bygger på Word-dokumentet dere leverte 8. oktober 2026. Originaldokumentet er ikke endret. Tekst-ID-ene fra dokumentet er bevart i `lib/guest-messages.json`, slik at senere rettelser er enkle å plassere.

## Språk og tone

Deres tone er beholdt, inkludert «Ska gift sæ», «Love Story» i menyen og «Hade på badet-grillfest». Små skrivefeil, sammensatte ord, bøyning og tegnsetting er rettet, blant annet «kjærlighetshistorie», «velkomstmiddag», «toastmaster», «dagen derpå», «takknemlige» og datoer som «4. september 2027».

«Deg/dere» og «du/dere» velges automatisk ut fra antall navngitte gjester. Personlige hilsener bruker «Kjære … og …». Gjestenavn og kontaktopplysninger oversettes ikke.

## Utfyllinger og presiseringer

- D009: Den ufullstendige reisesetningen er utfylt. Togtiden på 45 minutter er korrigert til «rundt én time». [Litauens samferdselsdepartement](https://sumin.lrv.lt/en/news/from-vilnius-to-kaunas-without-stops-ltg-link-express-train-began-operating-on-march-29-aMfX/) oppgir fra 59 minutter med ekspresstog og 1 time 10–20 minutter for øvrige avganger. Rutetider i 2027 kan endres. Transportforslaget er formulert generelt som taxi eller en annen transporttjeneste.
- D003 (oppdatert 9. oktober): Innledningen forklarer også at gjestene er velkomne til å overnatte på lokalet, og at brudeparet spanderer overnattingen fra lørdag til søndag.
- D021: Den avbrutte setningen om hjemreise på søndag er fullført med «kan dra når det passer for dem».
- R006: Det er tydeliggjort at man skal svare for hver navngitte person, også dem som ikke kommer.
- R009/R015: Matpreferanser er beholdt sammen med allergier, slik at blant annet vegetariske behov kan oppgis. Feltene er valgfrie og vises for navngitte gjester først når de velger å komme.
- R011 (oppdatert 9. oktober): Barn i alle aldre er hjertelig velkomne og oppgis i eget tekstfelt med navn, alder og matpreferanser/allergier. Pluss én er fjernet fra FAQ og RSVP.
- T002: Presiseringen om at et ja til hotelltilbudet ikke reserverer et rom, er beholdt.
- D006/D044: Adresse og stedsnavn er utfylt; Lithuania er oversatt til Litauen.
- Tomme gjestefeilmeldinger, nettlesertitler, lenkeforhåndsvisning og skjermlesertekster er oversatt.

## Språk og RSVP

Invitasjonens språkvalg i admin brukes automatisk. Språkvelgeren English/Norsk er en midlertidig forhåndsvisning. Den bruker `lang=en` eller `lang=no` i adressen, beholder invitasjonsnøkkelen og endrer ikke språkvalget som er lagret i databasen. Utfylte RSVP-svar beholdes ved språkbytte.

Gjestegruppen bestemmer fortsatt overnattingsspørsmålet: reisende får hotelltilbud i Kaunas 3.–4. september; lokale får spørsmål om overnatting på lokalet 4.–5. september. Norsk språk endrer ikke gjestegruppen. De norske tekstene for begge tilfeller er lagt inn.

Admin beholdes på engelsk, siden denne delen av dokumentet ikke var oversatt. Litauisk er nå implementert; se LITHUANIAN_TRANSLATION_REVIEW.md for språkvalgene og den samlede tekstoversikten. Ingen databaseskjemaendring er nødvendig.

Den norske lenkeforhåndsvisningen heter «Din invitasjon». Konvoluttbildet er beholdt; den engelske teksten som er en del av bildet, er ikke endret i denne runden.

## Layout

Norske avsnitt får vokse naturlig, slik at lengre tekst ikke overlapper bilder eller andre avsnitt. Farger, skrifttyper og illustrasjoner er beholdt. Overskriften for overnattingsmuligheter og RSVP-knappen har fått plass til den norske teksten.
