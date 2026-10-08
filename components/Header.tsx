import Link from "next/link";
import { guestHref, guestText as t, type GuestLanguage } from "@/lib/guest-language";

export default function Header({ currentPage = "home", inviteToken, language = "en" }: { inviteToken?: string; language?: GuestLanguage; currentPage?: "home" | "love-story" | "details" | "faq" | "rsvp" }) {
  const path = currentPage === "home" ? "/" : `/${currentPage}`;
  const pages = [["home", "/", "S001"], ["love-story", "/love-story", "S002"], ["details", "/details", "S003"], ["faq", "/faq", "S004"], ["rsvp", "/rsvp", "S005"]] as const;
  return <header className={`site-header${currentPage !== "home" ? " story-header" : ""}`} id={currentPage}>
    <nav aria-label={t(language, "A001")}>
      {pages.map(([page, href, label]) => <Link key={page} href={page === "home" && currentPage === "home" ? "#home" : guestHref(href, inviteToken, language)} aria-current={currentPage === page ? "page" : undefined}>{t(language, label)}</Link>)}
    </nav>
    <div className="language-preview" aria-label={language === "no" ? "Språk for forhåndsvisning" : "Preview language"}>
      <span>{language === "no" ? "Forhåndsvisning" : "Preview"}</span>
      <Link href={guestHref(path, inviteToken, "en")} scroll={false} aria-current={language === "en" ? "true" : undefined} lang="en">English</Link>
      <Link href={guestHref(path, inviteToken, "no")} scroll={false} aria-current={language === "no" ? "true" : undefined} lang="nb">Norsk</Link>
    </div>
  </header>;
}
