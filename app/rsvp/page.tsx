import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { publicInvitation } from "@/lib/wedding-store";
import type { Metadata } from "next";
import Header from "@/components/Header";
import RsvpForm from "@/components/RsvpForm";

export const metadata: Metadata = { title: "RSVP | Marthe & Deivi", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, record } = await guestContext(searchParams);

  return (
    <>
      <Header currentPage="rsvp" inviteToken={token} />
      <main className="rsvp-page">
        <div className="rsvp-page-background" aria-hidden="true" />
        <div className="rsvp-page-content">
          <div className="rsvp-page-monogram" aria-hidden="true"><span>M</span><span>D</span></div>
          <h1>RSVP</h1>
          <p className="rsvp-page-intro"><strong>We can&apos;t wait to celebrate with you.</strong><br />Please reply by February 25, 2027.</p>
          {record && token ? <RsvpForm key={record.id} invitation={publicInvitation(record)} inviteToken={token} initialDraft={record.draft || undefined} /> : <p className="rsvp-invitation-required">Please open the personal invitation link we sent you to reply. If you need your link, contact us below.</p>}
          <div className="rsvp-page-contact">
            <p>For any questions regarding travel, accommodation,<br />or wedding details, please contact us.</p>
            <a href="mailto:deivi.selenis@gmail.com">deivi.selenis@gmail.com</a>
            <a href="tel:+4790820779">+47 90820779</a>
          </div>
        </div>
      </main>
      <footer className="site-footer story-footer"><a href={token ? `/?invite=${encodeURIComponent(token)}` : "/"}>← back</a></footer>
    </>
  );
}
