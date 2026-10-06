import type { CSSProperties } from "react";

function WrittenText({ text, start = 0, interval = 0.075 }: { text: string; start?: number; interval?: number }) {
  return <>{Array.from(text).map((letter, index) => <i className="hero-letter" key={index} style={{ "--letter-delay": `${start + index * interval}s` } as CSSProperties}>{letter === " " ? "\u00a0" : letter}</i>)}</>;
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="couple-names">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label="Marthe and Deivi"><span className="name-marthe" aria-hidden="true"><WrittenText text="Marthe" start={0.2} interval={0.15} /></span><span className="name-and" aria-hidden="true"><WrittenText text="and" start={1.2} interval={0.15} /></span><span className="name-deivi" aria-hidden="true"><WrittenText text="Deivi" start={1.8} interval={0.15} /></span></h1>
        <p className="marriage-line"><span className="sr-only">are getting married</span><span aria-hidden="true"><WrittenText text="are getting married" start={3.3} /></span><br /><time dateTime="2027-09-04" aria-label="September 4, 2027"><span aria-hidden="true"><WrittenText text="04.09.27" start={4.7} /></span></time></p>
      </div>
    </section>
  );
}
