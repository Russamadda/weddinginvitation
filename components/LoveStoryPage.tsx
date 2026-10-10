import Link from "next/link";
import { guestHref, guestText as t, type GuestLanguage } from "@/lib/guest-language";
import Header from "./Header";

export default function LoveStoryPage({ inviteToken, language = "en" }: { inviteToken?: string; language?: GuestLanguage }) {
  return (
    <>
      <Header currentPage="love-story" inviteToken={inviteToken} language={language} />
      <main className="love-story-main">
        <div className="love-story-background" aria-hidden="true" />
        <article className="love-story-content" aria-labelledby="love-story-heading">
          <h1 id="love-story-heading"><span>{t(language, "L001").split(" ")[0]}</span>{t(language, "L001").split(" ").slice(1).join(" ")}</h1>
          <p className="story-opening">{t(language, "L002")}</p>
          <div className="story-portrait">
            <div className="story-portrait-frame" aria-hidden="true"><img src="/decorations/love-story-portrait-frame.png" alt="" /></div>
            <div className="story-portrait-photo"><img src="/images/love-story-couple.jpg" alt={t(language, "A006")} /></div>
          </div>
          <p className="story-cafeteria">{t(language, "L003")}</p>
          <p className="story-friends">{t(language, "L004")}</p>
          <p className="story-hometown">{t(language, "L005")}</p>
          <p className="story-looking-back">{t(language, "L006")}</p>
          <p className="story-next-chapter">{t(language, "L007")}</p>
          <p className="story-gratitude">{t(language, "L008")}</p>
          <div className="story-rings">
            <div className="story-rings-frame" aria-hidden="true"><img src="/decorations/love-story-ring-frame.png" alt="" /></div>
            <div className="story-rings-photo"><img src="/images/love-story-rings.jpg" alt={t(language, "A007")} /></div>
          </div>
          <div className="story-monogram" aria-hidden="true"><span>M</span><span>D</span></div>
        </article>
      </main>
      <footer className="site-footer story-footer"><Link href={guestHref("/details", inviteToken, language)}>{t(language, "S003")} <span className="footer-arrow" aria-hidden="true">→</span></Link></footer>
    </>
  );
}
