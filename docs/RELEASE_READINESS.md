# Kontroll før utsending – 9. oktober 2026

Gjennomgangen gjelder gjeldende versjon før invitasjoner sendes ut. Språkvelgeren for forhåndsvisning er fjernet. Språket velges ved opprettelse av invitasjonen i admin, og invitasjonsnøkkel og språk følger navigasjonen.

## Kontroller som består

- Produksjonsbygg og TypeScript.
- Opprettelse av enkelt- og gruppeinvitasjoner, unike lenker, personlige hilsener og riktig deg/dere på norsk.
- Automatisk norsk, engelsk eller litauisk samt konvolutt og korrekt tittel i serverlevert lenkeforhåndsvisning.
- Bunnlenker med sidenavn (Hjem → Love Story → Detaljer → RSVP), menynavigasjon og invitasjonsnøkkel som beholdes mellom sidene. FAQ er tilgjengelig i menyen.
- RSVP med ulike individuelle svar, lokale/reisende, barn, allergier, fritekst og hotell-e-post.
- E-post kreves bare ved ja til hotelltilbudet; et nei til hotelltilbudet gir ikke lagret kontakt-e-post i svaret.
- Når alle takker nei, blir hotell-, overnattings-, allergi- og barneopplysninger utelatt fra det registrerte svaret, og overnattingsvalg kreves ikke.
- Vellykket innsending, feil ved innsending, gjenåpning og oppdatering av samme svar uten å opprette en ekstra invitasjon.
- Admininnlogging/-utlogging, beskyttede API-er, gjestefiltrering, svaroversikt, sletting med bekreftelse og ugyldige/slettede lenker.
- Avvisning av ekstra voksne, fremmede gjeste-ID-er og forespørsler fra feil origin.
- Mobil og desktop; lange navn holder seg inne i gardinene. Tekster overlapper ikke på kontrollerte bredder 320–1440 px.
- Supabase-tabeller kan nås fra serveren; offentlig klient nektes innsyn i alle tre private tabeller.
- Ekte Supabase-lagring/oppdatering/sletting testet med egne syntetiske invitasjoner og økten slettet etterpå. Eksisterende gjestesvar ble ikke endret.
- HTTPS på alle offentlige sider; admin-API uten innlogging svarer 401. Rotdomenet videresender til www og beholder query-parametrene.

## Ved utsending

Bruk Copy link på riktig invitasjon i admin. Kontroller navn, språk og Local/Traveling før lenken sendes. Lenken er personlig for den inviterte gruppen; alle med lenken kan se og oppdatere gruppens RSVP. Svar vises under Replies og kan eksporteres til CSV. Barn oppgis i fritekst og må tas med manuelt i planleggingen; de inngår ikke i telleren for navngitte gjester.

Bankinformasjonen er fortsatt teksten dere ba om: opplysninger kommer snart. Vipps er en vanlig lenke og krever ingen betalingsintegrasjon på nettsiden. Ingen reell betaling eller faktisk SMS-utsending er gjennomført som del av kontrollen.

## Publisert versjon

Versjonen uten språkvelger er bekreftet på https://www.martheogdeivi.no/. Full test mot Supabase gjennom lokal produksjonsserver består. Den videre testen via selve produksjonsdomenet stoppet ved admininnlogging: lokalt konfigurert passord ble avvist med 401. Produksjonens adminpassord må brukes for å bekrefte Vercel → RSVP → Supabase fra ende til ende. Det ble ikke opprettet noen invitasjoner i dette forsøket.

Testskriptet støtter `WEDDING_TEST_BASE_URL` og et separat, privat `WEDDING_TEST_ADMIN_PASSWORD` for denne kontrollen. Passordet skal kun ligge i lokal miljøkonfigurasjon og aldri i Git eller dokumentasjon.
