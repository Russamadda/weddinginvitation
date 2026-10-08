import { guestText as t, type GuestLanguage } from "@/lib/guest-language";
export default function HomeIntro({ greeting, guestCount, language = "en" }: { greeting?: string; guestCount?: number; language?: GuestLanguage }) {
  return (
    <section className="home-intro" aria-labelledby="invitation-heading">
      <div className="invitation-artboard">
        <div className="curtain-crop" aria-hidden="true">
          <div className="curtain-top"><img src="/decorations/curtains.png" alt="" /></div>
          <div className="curtain-middle"><img src="/decorations/curtains.png" alt="" /></div>
          <div className="curtain-bottom"><img src="/decorations/curtains.png" alt="" /></div>
        </div>
        <h2 id="invitation-heading" className={greeting ? "personalized-greeting" : undefined}>{greeting || (language === "no" ? t(language, "S007") : <>Dear Family &amp;<br />Friends,</>)}</h2>
        <p className="invitation-copy">{language === "no" ? t(language, "H004").replace("deg/dere", guestCount === 1 ? "deg" : "dere") : <>We invite you to join us on our<br />wedding day. Surrounded by our<br />closest loved ones, we&apos;ll say &quot;I do&quot;<br />and begin a new chapter<br />together.</>}</p>
        <div className="monogram" aria-hidden="true"><span>M</span><span>D</span></div>
      </div>
    </section>
  );
}
