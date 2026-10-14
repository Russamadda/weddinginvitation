"use client";

import { useEffect, useState } from "react";
import { guestText as t, type GuestLanguage } from "@/lib/guest-language";
export default function Hero({ language = "en" }: { language?: GuestLanguage }) {
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let active = true;
    // Start the sequence only after all hero fonts have settled, including on a cold mobile visit.
    Promise.all([
      document.fonts.load('400 60px "Cormorant SC"'),
      document.fonts.load('400 60px "Shelley Script"'),
      document.fonts.load('400 20px "Cormorant Garamond"'),
      document.fonts.load('italic 700 20px "Cormorant Garamond"'),
    ]).catch(() => undefined).then(() => { if (active) setFontsReady(true); });
    return () => { active = false; };
  }, []);

  return (
    <section className={`hero ${fontsReady ? "hero-ready" : "hero-pending"}`} aria-labelledby="couple-names">
      <noscript><style>{`.hero-pending .hero-content { opacity: 1; }`}</style></noscript>
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label={t(language, "H001")}>
          <span className="name-marthe" aria-hidden="true">Marthe</span>
          <span className="name-and" aria-hidden="true">{language === "no" ? "og" : language === "lt" ? "ir" : "and"}</span>
          <span className="name-deivi" aria-hidden="true">Deivi</span>
        </h1>
        <p className="marriage-line hero-fade">{t(language, "H002")}<br /><time dateTime="2027-09-04" aria-label={t(language, "A005")}>{t(language, "H003")}</time></p>
      </div>
    </section>
  );
}
