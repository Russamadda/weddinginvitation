import Header from "./Header";

const venueWebsite = "https://9vejai.eu/";
// Navigation link published by the venue on its own website.
const venueMap = "https://maps.app.goo.gl/5eR1gZciG6s3QGNaA";

function Divider({ dark = false }: { dark?: boolean }) {
  return <img className="details-divider" src={`/decorations/divider-${dark ? "navy" : "cream"}.svg`} alt="" aria-hidden="true" />;
}

export default function DetailsPage({ inviteToken }: { inviteToken?: string }) {
  return (
    <>
      <Header currentPage="details" inviteToken={inviteToken} />
      <main className="details-page">
        <section className="details-section details-venue" aria-labelledby="venue-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h1 id="venue-heading">Date <span>and</span> Venue</h1>
            <p className="details-date"><time dateTime="2027-09-04">Saturday, 4 September 2027</time></p>
            <figure className="details-venue-photo">
              <div className="details-venue-frame" aria-hidden="true"><img src="/decorations/photo-frame.png" alt="" /></div>
              <div className="details-villa-crop"><img src="/images/venue-villa.jpg" alt="Aerial view of Villa 9 Vėjai and its gardens" /></div>
              <figcaption><a href={venueWebsite} target="_blank" rel="noopener noreferrer">Villa 9 Vejai</a><br />Girininkai, Lithuania</figcaption>
            </figure>
            <p className="details-ceremony">Both our ceremony and reception will take place at Villa 9 Vejai. We kindly ask guests to arrive 30 minutes before the ceremony begins.</p>
            <a className="details-button details-map" href={venueMap} target="_blank" rel="noopener noreferrer">View on map</a>
          </div>
        </section>
        <section className="details-section details-travel" aria-labelledby="travel-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="travel-heading">How to Get There</h2>
            <div className="details-by-car"><h3>By car</h3><Divider /><p><em>Knygnešio P. Varkalos g. 44</em></p><p>Complimentary parking is available at both the ceremony and reception locations.</p></div>
            <div className="details-traveling"><h3>Traveling guests</h3><Divider /><div className="details-travel-copy">
              <p>The easiest route is to fly from Oslo to Vilnius. From Vilnius Airport, travel to Vilnius train station, then take the train to Kaunas. The train ride takes about one hour.</p>
              <p>We recommend arriving on Friday, 3 September, and staying at a hotel in Kaunas before the wedding.</p>
              <p>The wedding venue is about 20 minutes from Kaunas by car. We recommend a taxi or ride service, or a rental car if you plan to explore the area.</p>
              <p>Please book your travel early. You’re welcome to contact us for help with travel plans, hotels or any other questions.</p>
            </div></div>
            <div className="details-speeches"><h3>Speeches</h3><Divider /><p>Would you like to share a few words or prepare a surprise? Please contact our toastmaster, Mathias Krohn, to arrange speeches, toasts, or other contributions to the evening.<br />Phone: <a href="tel:+4794896863">+47 948 96 863</a></p></div>
          </div>
        </section>
        <section className="details-section details-timeline" aria-labelledby="timeline-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="timeline-heading">Timeline</h2>
            <div className="details-friday"><h3>Friday, 3 September | Welcome Dinner</h3><p>For guests travelling to Lithuania, we’ll meet at a restaurant in Kaunas for a relaxed dinner. It’s a chance to catch up, meet everyone and start the weekend together.</p></div>
            <div className="details-saturday"><h3>Saturday, 4 September | Ceremony &amp; Celebration</h3><p>We’ll gather at 9 Vėjai for the ceremony, followed by dinner, music and a wedding party that lasts into the night.</p></div>
            <div className="details-sunday"><h3>Sunday, 5 September | Farewell Barbecue</h3><p>After a slow morning, we’re planning a casual barbecue with our guests before we say goodbye. Those travelling home on Sunday can leave whenever it suits their plans.</p></div>
            <div className="details-timeline-note"><Divider dark /><p>More details, including times and locations, will follow.</p></div>
          </div>
        </section>
        <section className="details-section details-accommodations" aria-labelledby="accommodations-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="accommodations-heading">Accommodations</h2>
            <div className="details-stays">
              <div className="details-stay details-kaunas"><h3><img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" /><span>Stay in Kaunas</span></h3><p className="details-stay-date">3 - 4 September</p><div className="details-stay-copy"><p>We’re exploring hotel options in Kaunas and hope to arrange a group rate for guests arriving the day before the wedding.</p><p>Once we’ve received your RSVPs, we’ll have a better idea of numbers and share an update with those joining us.</p></div></div>
              <div className="details-stay details-villa-stay"><h3><img src="/decorations/rsvp-frame.svg" alt="" aria-hidden="true" /><span>Villa 9 Vejai</span></h3><p className="details-stay-date">4 - 5 September</p><div className="details-stay-copy"><p>Set in the countryside near Kaunas, Villa 9 Vėjai is where we’ll celebrate and stay together. We’ve arranged and covered your overnight stay.</p><p>Please contact us if you have any questions.</p></div><a className="details-visit" href={venueWebsite} target="_blank" rel="noopener noreferrer">Visit Website</a></div>
            </div>
            <div className="details-stay-note"><p>Please let us know in your RSVP if you’ll need accommodation in Kaunas on 3–4 September.</p><p>This will help us explore a group rate.<br />We’ll share hotel options and travel updates once arrangements are confirmed.</p></div>
          </div>
        </section>
        <section className="details-section details-dress" aria-labelledby="dress-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="dress-heading">Dress <span>code</span></h2>
            <p className="details-formal">Formal Attire</p>
            <div className="details-dress-copy"><p>As we gather to celebrate this special day, we invite our guests to dress in formal attire.</p><p>Our color palette is provided below for inspiration, though your presence is what matters most.</p></div>
            <div className="details-palette" aria-label="Color inspiration: olive green, deep red, and pale pink">{["olive", "red", "pink"].map(color => <img key={color} src={`/decorations/palette-${color}.svg`} alt="" />)}</div>
          </div>
        </section>
        <section className="details-section details-gifts" aria-labelledby="gifts-heading">
          <div className="details-background" aria-hidden="true" />
          <div className="details-canvas">
            <h2 id="gifts-heading">Gift <span>registry</span></h2>
            <p className="details-gifts-copy">Your presence at our wedding is the greatest gift of all.<br />For friends and family who have asked, we&apos;ve created a registry with a few things we&apos;d love for our home and future together.</p>
            <button className="details-button details-registry" disabled title="Gift registry link coming soon" aria-label="View registry — link coming soon">View Registry</button>
          </div>
        </section>
      </main>
      <footer className="site-footer story-footer"><a href={inviteToken ? `/?invite=${encodeURIComponent(inviteToken)}` : "/"}>← back</a></footer>
    </>
  );
}
