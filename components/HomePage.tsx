import Header from "./Header";
import Hero from "./Hero";
import HomeIntro from "./HomeIntro";
import Countdown from "./Countdown";

export default function HomePage({ inviteToken, greeting }: { inviteToken?: string; greeting?: string }) {
  return (
    <>
      <Header inviteToken={inviteToken} />
      <main>
        <Hero />
        <HomeIntro greeting={greeting} />
        <Countdown />
        <section className="home-rsvp" aria-label="Celebrate with us">
          <div className="rsvp-artboard">
            <div className="envelope-composition">
              <div className="envelope-crop" aria-hidden="true"><img src="/decorations/envelope.png" alt="" /></div>
              <div className="photo-frame-crop" aria-hidden="true"><img src="/decorations/photo-frame.png" alt="" /></div>
              <div className="couple-photo-crop"><img src="/images/couple-photo.jpg" alt="Marthe and Deivi sharing a smile" /></div>
            </div>
            <p className="celebration-line">We can&apos;t wait to celebrate with you.</p>
            <a className="rsvp-link" href={inviteToken ? `/rsvp?invite=${encodeURIComponent(inviteToken)}` : "/rsvp"}>
              <img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" />
              <span>Click here for RSVP</span><small>by February 25, 2027</small>
            </a>
            <div className="swans-crop" aria-hidden="true"><img src="/decorations/swans.png" alt="" /></div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><a href="#home">← back</a></footer>
    </>
  );
}
