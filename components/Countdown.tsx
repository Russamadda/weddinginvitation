"use client";

import { useEffect, useState } from "react";

// Midnight on the wedding date in Europe/Oslo, as specified by the reference widget.
const weddingTime = Date.parse("2027-09-04T00:00:00+02:00");

function remaining() {
  const total = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
}

export default function Countdown() {
  const [values, setValues] = useState<number[] | null>(null);
  useEffect(() => {
    setValues(remaining());
    const interval = setInterval(() => setValues(remaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown" aria-label="Countdown to our wedding">
      <div className="countdown-artboard">
        <div className="countdown-clock" role="timer" aria-label={values ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes, ${values[3]} seconds until our wedding` : "Wedding countdown loading"}>
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => <div className="countdown-unit" key={label}><span className="countdown-value">{values ? String(values[index]).padStart(2, "0") : "–"}</span><span className="countdown-label">{label}</span></div>)}
        </div>
        <p className="countdown-caption">until our<span>forever begins</span></p>
      </div>
    </section>
  );
}
