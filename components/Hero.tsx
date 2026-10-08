import { guestText as t, type GuestLanguage } from "@/lib/guest-language";
import type { CSSProperties } from "react";

function DrawnText({ text, start }: { text: string; start: number }) {
  return <>{Array.from(text).map((letter, index) => <span className="hero-glyph" key={index} style={{ "--glyph-delay": `${start + index * .1}s` } as CSSProperties}>{letter}</span>)}</>;
}

export default function Hero({ language = "en" }: { language?: GuestLanguage }) {
  return (
    <section className="hero" aria-labelledby="couple-names">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label={t(language, "H001")}>
          <span className="name-marthe" aria-hidden="true"><DrawnText text="Marthe" start={.15} /></span>
          <span className="name-and" aria-hidden="true"><DrawnText text={language === "no" ? "og" : "and"} start={1.3} /></span>
          <span className="name-deivi" aria-hidden="true"><DrawnText text="Deivi" start={2.15} /></span>
        </h1>
        <p className="marriage-line hero-fade">{t(language, "H002")}<br /><time dateTime="2027-09-04" aria-label={t(language, "A005")}>{t(language, "H003")}</time></p>
      </div>
    </section>
  );
}
