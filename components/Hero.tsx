import type { CSSProperties } from "react";

function WrittenText({ text, start = 0, interval = 0.075 }: { text: string; start?: number; interval?: number }) {
  return <>{Array.from(text).map((letter, index) => <i className="hero-letter" key={index} style={{ "--letter-delay": `${start + index * interval}s` } as CSSProperties}>{letter === " " ? "\u00a0" : letter}</i>)}</>;
}

// Each word starts after the final letter of the previous word has finished.
const nameInterval = 0.15;
const nameDuration = 1.2;
const martheStart = 0.2;
const andStart = martheStart + ("Marthe".length - 1) * nameInterval + nameDuration + 0.08;
const deiviStart = andStart + ("and".length - 1) * nameInterval + nameDuration + 0.08;
const announcementStart = deiviStart + ("Deivi".length - 1) * nameInterval + nameDuration + 0.05;

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="couple-names">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label="Marthe and Deivi"><span className="name-marthe" aria-hidden="true"><WrittenText text="Marthe" start={martheStart} interval={nameInterval} /></span><span className="name-and" aria-hidden="true"><WrittenText text="and" start={andStart} interval={nameInterval} /></span><span className="name-deivi" aria-hidden="true"><WrittenText text="Deivi" start={deiviStart} interval={nameInterval} /></span></h1>
        <p className="marriage-line"><span className="sr-only">are getting married</span><span aria-hidden="true"><WrittenText text="are getting married" start={announcementStart} interval={0.03} /></span><br /><time dateTime="2027-09-04" aria-label="September 4, 2027"><span aria-hidden="true"><WrittenText text="04.09.27" start={announcementStart + 1.05} interval={0.04} /></span></time></p>
      </div>
    </section>
  );
}
