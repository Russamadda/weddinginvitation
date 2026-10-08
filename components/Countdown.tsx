"use client";

import { useEffect, useState } from "react";
import { guestText as t, type GuestLanguage } from "@/lib/guest-language";

// Midnight on the wedding date in Europe/Oslo, as specified by the reference widget.
const weddingTime = Date.parse("2027-09-04T00:00:00+02:00");

function remaining() {
  const total = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
}

export default function Countdown({ language = "en" }: { language?: GuestLanguage }) {
  const [values, setValues] = useState<number[] | null>(null);
  useEffect(() => {
    setValues(remaining());
    const interval = setInterval(() => setValues(remaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown" aria-label={t(language, "A012")}>
      <div className="countdown-artboard">
        <div className="countdown-clock" role="timer" aria-label={values ? t(language, "A014", { days: values[0], hours: values[1], minutes: values[2], seconds: values[3] }) : t(language, "A015")}>
          {(["H005", "H006", "H007", "H008"] as const).map((label, index) => <div className="countdown-unit" key={label}><span className="countdown-value">{values ? String(values[index]).padStart(2, "0") : "–"}</span><span className="countdown-label">{t(language, label)}</span></div>)}
        </div>
        <p className="countdown-caption">{t(language, "H009")}<span>{t(language, "H010")}</span></p>
      </div>
    </section>
  );
}
