import Link from "next/link";
import { guestHref, guestText as t, type GuestLanguage } from "@/lib/guest-language";
import Header from "./Header";

export default function FaqPage({ inviteToken, language = "en" }: { inviteToken?: string; language?: GuestLanguage }) {
  return (
    <>
      <Header currentPage="faq" inviteToken={inviteToken} language={language} />
      <main className="faq-main">
        <div className="faq-background" aria-hidden="true" />
        <div className="faq-hero">
          <h1>{t(language, "F001")}</h1>
          <div className="faq-bouquet">
            <div className="faq-bouquet-frame" aria-hidden="true"><img src="/decorations/faq-bouquet-frame.png" alt="" /></div>
            <div className="faq-bouquet-photo"><img src="/images/faq-bouquet.jpg" alt={t(language, "A011")} /></div>
          </div>
        </div>
        <div className="faq-questions">
          <section aria-labelledby="faq-white">
            <h2 id="faq-white">{t(language, "F004")}</h2>
            <p>{t(language, "F005")}</p>
          </section>
          <section aria-labelledby="faq-contact">
            <h2 id="faq-contact">{language !== "en" ? t(language, "F006") : <>Who should I contact if I have<br />questions?</>}</h2>
            <p>{language !== "en" ? t(language, "F007") : <>For travel, accommodation, or wedding<br />questions, please contact us.</>}</p>
            <address>
              <a href="mailto:deivi.selenis@gmail.com">deivi.selenis@gmail.com</a>
              <a href="tel:+4790820779">+47 90820779</a>
            </address>
          </section>
        </div>
      </main>
      <footer className="site-footer story-footer"><Link href={guestHref("/rsvp", inviteToken, language)}>{t(language, "S005")} <span className="footer-arrow" aria-hidden="true">→</span></Link></footer>
    </>
  );
}
