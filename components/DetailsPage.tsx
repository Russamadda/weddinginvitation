import Link from "next/link";
import { guestHref, guestText as t, type GuestLanguage } from "@/lib/guest-language";
import Header from "./Header";

const vippsGiftUrl = "https://qr.vipps.no/box/cab15b5e-b04a-4ca3-bde5-89c834d8544b/pay-in";
const venueWebsite = "https://9vejai.eu/";
// Navigation link published by the venue on its own website.
const venueMap = "https://maps.app.goo.gl/5eR1gZciG6s3QGNaA";

function Divider({ dark = false }: { dark?: boolean }) {
  return <img className="details-divider" src={`/decorations/divider-${dark ? "navy" : "cream"}.svg`} alt="" aria-hidden="true" />;
}

export default function DetailsPage({ inviteToken, language = "en" }: { inviteToken?: string; language?: GuestLanguage }) {
  return (
    <>
      <Header currentPage="details" inviteToken={inviteToken} language={language} />
      <main className="details-page">
        <section className="details-section details-venue" aria-labelledby="venue-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h1 id="venue-heading">{language !== "en" ? t(language, "D001") : <>Date <span>and</span> Venue</>}</h1>
            <p className="details-date"><time dateTime="2027-09-04">{t(language, "D002")}</time></p>
            <figure className="details-venue-photo">
              <div className="details-venue-frame" aria-hidden="true"><img src="/decorations/photo-frame.png" alt="" /></div>
              <div className="details-villa-crop"><img src="/images/venue-villa.jpg" alt={t(language, "A008")} /></div>
              <figcaption><a href={venueWebsite} target="_blank" rel="noopener noreferrer">{t(language, "D028")}</a><br />{t(language, "D044")}</figcaption>
            </figure>
            <div className="details-ceremony"><p>{t(language, "D003")}</p><p className="details-arrival">{t(language, "D045")}</p></div>
            <a className="details-button details-map" href={venueMap} target="_blank" rel="noopener noreferrer">{t(language, "D040")}</a>
          </div>
        </section>
        <section className="details-section details-travel" aria-labelledby="travel-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="travel-heading">{t(language, "D004")}</h2>
            <div className="details-by-car"><h3>{t(language, "D005")}</h3><Divider /><p>{language !== "en" ? t(language, "D006") : <><em>Knygnešio P. Varkalos g. 44</em></>}</p><p>{t(language, "D007")}</p></div>
            <div className="details-traveling"><h3>{t(language, "D008")}</h3><Divider /><div className="details-travel-copy">
              <p>{t(language, "D009")}</p>
              <p>{t(language, "D010")}</p>
              <p>{t(language, "D011")}</p>
              <p>{t(language, "D012")}</p>
            </div></div>
            <div className="details-speeches"><h3>{t(language, "D013")}</h3><Divider /><p>{t(language, "D014").split(language === "no" ? " Telefon:" : language === "lt" ? " Tel.:" : " Phone:")[0]}<span className="details-toastmaster-phone">{language === "no" ? "Telefon:" : language === "lt" ? "Tel.:" : "Phone:"} <a href="tel:+4794896863">+47 948 96 863</a></span></p></div>
          </div>
        </section>
        <section className="details-section details-timeline" aria-labelledby="timeline-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="timeline-heading">{t(language, "D015")}</h2>
            <div className="details-friday"><h3>{t(language, "D016")}</h3><p>{t(language, "D017")}</p></div>
            <div className="details-saturday"><h3>{t(language, "D018")}</h3><p>{t(language, "D019")}</p></div>
            <div className="details-sunday"><h3>{t(language, "D020")}</h3><p>{t(language, "D021")}</p></div>
            <div className="details-timeline-note"><Divider dark /><p>{t(language, "D022")}</p></div>
          </div>
        </section>
        <section className="details-section details-accommodations" aria-labelledby="accommodations-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="accommodations-heading">{t(language, "D023")}</h2>
            <div className="details-stays">
              <div className="details-stay details-kaunas"><h3><img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" /><span>{t(language, "D024")}</span></h3><p className="details-stay-date">{t(language, "D025")}</p><div className="details-stay-copy"><p>{t(language, "D026")}</p><p>{t(language, "D027")}</p></div></div>
              <div className="details-stay details-villa-stay"><h3><img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" /><span>{t(language, "D028")}</span></h3><p className="details-stay-date">{t(language, "D029")}</p><div className="details-stay-copy"><p>{t(language, "D030")}</p><p>{t(language, "D031")}</p></div><a className="details-visit" href={venueWebsite} target="_blank" rel="noopener noreferrer">{t(language, "D041")}</a></div>
            </div>
            <div className="details-stay-note"><p>{t(language, "D032")}</p><p>{language !== "en" ? t(language, "D033") : <>This will help us explore a group rate.<br />We’ll share hotel options and travel updates once arrangements are confirmed.</>}</p></div>
          </div>
        </section>
        <section className="details-section details-dress" aria-labelledby="dress-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="dress-heading">{language !== "en" ? t(language, "D034") : <>Dress <span>code</span></>}</h2>
            <p className="details-formal">{t(language, "D035")}</p>
            <div className="details-dress-copy"><p>{t(language, "D036")}</p><p>{t(language, "D037")}</p></div>
            <div className="details-palette" aria-label={t(language, "A009")}>{["olive", "red", "pink"].map(color => <img key={color} src={`/decorations/palette-${color}.svg`} alt="" />)}</div>
          </div>
        </section>
        <section className="details-section details-gifts" aria-labelledby="gifts-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="gifts-heading">{t(language, "D038")}</h2>
            <p className="details-gifts-copy">{t(language, "D039")}</p>
            <a className="details-button details-registry" href={vippsGiftUrl}>{t(language, "D042")}</a>
            <p className="details-bank-info">{t(language, "D043")}</p>
          </div>
        </section>
      </main>
      <footer className="site-footer story-footer"><Link href={guestHref("/rsvp", inviteToken, language)}>{t(language, "S005")}</Link></footer>
    </>
  );
}
