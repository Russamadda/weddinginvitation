import Header from "./Header";

export default function LoveStoryPage({ inviteToken }: { inviteToken?: string }) {
  return (
    <>
      <Header currentPage="love-story" inviteToken={inviteToken} />
      <main className="love-story-main">
        <div className="love-story-background" aria-hidden="true" />
        <article className="love-story-content" aria-labelledby="love-story-heading">
          <h1 id="love-story-heading"><span>our</span>Love Story</h1>
          <p className="story-opening">If there’s one thing our story has taught us, it’s that a little curiosity, and some questionable flirting, can change everything.</p>
          <div className="story-portrait">
            <div className="story-portrait-frame" aria-hidden="true"><img src="/decorations/love-story-portrait-frame.png" alt="" /></div>
            <div className="story-portrait-photo"><img src="/images/love-story-couple.jpg" alt="Marthe and Deivi together in an early photograph" /></div>
          </div>
          <p className="story-cafeteria">Our story began in the high school cafeteria. Deivi had read that staring at someone could make them fall in love, so he decided to test the theory on Marthe. Three weeks later, she approached him. Whether the experiment worked or she simply wanted an explanation is still up for debate.</p>
          <p className="story-friends">Soon, we were best friends, finding every excuse to spend time together despite living on opposite sides of our hometown. Later, Bergen became our home. Deivi moved for work, and Marthe followed. Those years gave us lifelong friendships, new experiences, and more than a few memorable nights out.</p>
          <p className="story-hometown">Eventually, we returned to our hometown to focus on education and build our future. Through every change, we’ve held onto the same belief: when a light goes out in your home, you change the bulb; you don’t buy a new house. We care for what we’ve built, and for the people around us.</p>
          <p className="story-looking-back">Looking back, it’s funny to think that all of this began with a glance across a cafeteria. Through thick and thin, we’ve grown together, and we’re excited for everything still to come.</p>
          <p className="story-next-chapter">Now, as we look ahead to this next chapter, we’re filled with gratitude for the journey that brought us here and excitement for everything still to come.</p>
          <p className="story-gratitude">Most of all, we’re grateful to share this day with the people who have been part of our story from the very beginning, middle and end.</p>
          <div className="story-rings">
            <div className="story-rings-frame" aria-hidden="true"><img src="/decorations/love-story-ring-frame.png" alt="" /></div>
            <div className="story-rings-photo"><img src="/images/love-story-rings.jpg" alt="Our hands together, wearing our rings" /></div>
          </div>
          <div className="story-monogram" aria-hidden="true"><span>M</span><span>D</span></div>
        </article>
      </main>
      <footer className="site-footer story-footer"><a href={inviteToken ? `/?invite=${encodeURIComponent(inviteToken)}` : "/"}>← back</a></footer>
    </>
  );
}
