import type { CSSProperties } from "react";

function DrawnText({ text, start }: { text: string; start: number }) {
  return <>{Array.from(text).map((letter, index) => <span className="hero-glyph" key={index} style={{ "--glyph-delay": `${start + index * .08}s` } as CSSProperties}>{letter}</span>)}</>;
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="couple-names">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label="Marthe and Deivi">
          <span className="name-marthe" aria-hidden="true"><DrawnText text="Marthe" start={.15} /></span>
          <span className="name-and" aria-hidden="true"><DrawnText text="and" start={1.08} /></span>
          <span className="name-deivi" aria-hidden="true"><DrawnText text="Deivi" start={1.77} /></span>
        </h1>
        <p className="marriage-line hero-fade">are getting married<br /><time dateTime="2027-09-04" aria-label="September 4, 2027">04.09.27</time></p>
      </div>
    </section>
  );
}
