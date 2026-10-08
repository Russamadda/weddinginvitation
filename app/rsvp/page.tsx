import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { publicInvitation } from "@/lib/wedding-store";
import GuestLanguage from "@/components/GuestLanguage";
import { guestMetadata } from "@/lib/guest-metadata";
import { guestHref, guestText as t } from "@/lib/guest-language";
import Header from "@/components/Header";
import RsvpForm from "@/components/RsvpForm";

export async function generateMetadata({ searchParams }: { searchParams: GuestSearch }) { return guestMetadata(searchParams, "M005"); }

export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, record, language } = await guestContext(searchParams);

  return (
    <GuestLanguage language={language}>
      <Header currentPage="rsvp" inviteToken={token} language={language} />
      <main className="rsvp-page">
        <div className="rsvp-page-background" aria-hidden="true" />
        <div className="rsvp-page-content">
          <div className="rsvp-page-monogram" aria-hidden="true"><span>M</span><span>D</span></div>
          <h1>RSVP</h1>
          <p className="rsvp-page-intro"><strong>{t(language, "R002").replace("deg/dere", record?.guests.length === 1 ? "deg" : "dere")}</strong><br />{t(language, "R003")}</p>
          {record && token ? <RsvpForm key={record.id} language={language} invitation={publicInvitation(record)} inviteToken={token} initialDraft={record.draft || undefined} /> : <p className="rsvp-invitation-required">{t(language, "R004")}</p>}
          <div className="rsvp-page-contact">
            <p>{t(language, "C017")}</p>
            <a href="mailto:deivi.selenis@gmail.com">deivi.selenis@gmail.com</a>
            <a href="tel:+4790820779">+47 90820779</a>
          </div>
        </div>
      </main>
      <footer className="site-footer story-footer"><a href={guestHref("/", token, language)}>{language === "no" ? "← " : ""}{t(language, "S006")}</a></footer>
    </GuestLanguage>
  );
}
