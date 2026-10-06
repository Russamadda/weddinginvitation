import Header from "./Header";

export default function FaqPage({ inviteToken }: { inviteToken?: string }) {
  return (
    <>
      <Header currentPage="faq" inviteToken={inviteToken} />
      <main className="faq-main">
        <div className="faq-background" aria-hidden="true" />
        <div className="faq-hero">
          <h1>faq</h1>
          <div className="faq-bouquet">
            <div className="faq-bouquet-frame" aria-hidden="true"><img src="/decorations/faq-bouquet-frame.png" alt="" /></div>
            <div className="faq-bouquet-photo"><img src="/images/faq-bouquet.jpg" alt="A wedding bouquet with memorial photo charms" /></div>
          </div>
        </div>
        <div className="faq-questions">
          <section aria-labelledby="faq-plus-one">
            <h2 id="faq-plus-one">Can I bring a plus one?</h2>
            <p>Please refer to your invitation for details<br />regarding additional guests.</p>
          </section>
          <section aria-labelledby="faq-white">
            <h2 id="faq-white">Can I wear white?</h2>
            <p>No.</p>
          </section>
          <section aria-labelledby="faq-contact">
            <h2 id="faq-contact">Who should I contact if I have<br />questions?</h2>
            <p>For travel, accommodation, or wedding<br />questions, please contact us.</p>
            <address>
              <a href="mailto:deivi.selenis@gmail.com">deivi.selenis@gmail.com</a>
              <a href="tel:+4790820779">+47 90820779</a>
            </address>
          </section>
        </div>
      </main>
      <footer className="site-footer story-footer"><a href={inviteToken ? `/?invite=${encodeURIComponent(inviteToken)}` : "/"}>← back</a></footer>
    </>
  );
}
