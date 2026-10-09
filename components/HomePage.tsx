import Link from "next/link";
import { guestHref, guestText as t, type GuestLanguage } from "@/lib/guest-language";
import Header from "./Header";
import Hero from "./Hero";
import HomeIntro from "./HomeIntro";
import Countdown from "./Countdown";

export default function HomePage({ inviteToken, greeting, guestCount, language = "en" }: { inviteToken?: string; greeting?: string; guestCount?: number; language?: GuestLanguage }) {
  return (
    <>
      <Header language={language} inviteToken={inviteToken} />
      <main>
        <Hero language={language} />
        <HomeIntro guestCount={guestCount} language={language} greeting={greeting} />
        <Countdown language={language} />
        <section className="home-rsvp" aria-label={t(language, "A002")}>
          <div className="rsvp-artboard">
            <div className="envelope-composition">
              <div className="envelope-crop" aria-hidden="true"><img src="/decorations/envelope.png" alt="" /></div>
              <div className="photo-frame-crop" aria-hidden="true"><img src="/decorations/photo-frame.png" alt="" /></div>
              <div className="couple-photo-crop"><img src="/images/couple-photo.jpg" alt={t(language, "A003")} /></div>
            </div>
            <p className="celebration-line">{t(language, "H011").replace("deg/dere", guestCount === 1 ? "deg" : "dere")}</p>
            <a className="rsvp-link" href={guestHref("/rsvp", inviteToken, language)}>
              <img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" />
              <span>{t(language, "H012")}</span><small>{t(language, "H013")}</small>
            </a>
            <div className="swans-crop" aria-hidden="true"><img src="/decorations/swans.png" alt="" /></div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><Link href={guestHref("/love-story", inviteToken, language)}>{t(language, "S013")}</Link></footer>
    </>
  );
}
