export default function Hero() {
  return (
    <section className="hero" aria-labelledby="couple-names">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="couple-names" aria-label="Marthe and Deivi">
          <span className="name-marthe hero-fade" aria-hidden="true">Marthe</span>
          <span className="name-and hero-fade" aria-hidden="true">and</span>
          <span className="name-deivi hero-fade" aria-hidden="true">Deivi</span>
        </h1>
        <p className="marriage-line hero-fade">are getting married<br /><time dateTime="2027-09-04" aria-label="September 4, 2027">04.09.27</time></p>
      </div>
    </section>
  );
}
