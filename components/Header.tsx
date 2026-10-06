import Link from "next/link";

export default function Header({ currentPage = "home", inviteToken }: { inviteToken?: string; currentPage?: "home" | "love-story" | "details" | "faq" | "rsvp" }) {
  const guestHref = (path: string) => inviteToken ? `${path}?invite=${encodeURIComponent(inviteToken)}` : path;
  return (
    <header className={`site-header${currentPage !== "home" ? " story-header" : ""}`} id={currentPage}>
      <nav aria-label="Main navigation">
        <Link href={currentPage === "home" ? "#home" : guestHref("/")} aria-current={currentPage === "home" ? "page" : undefined}>Home</Link>
        <Link href={guestHref("/love-story")} aria-current={currentPage === "love-story" ? "page" : undefined}>Love Story</Link>
        <Link href={guestHref("/details")} aria-current={currentPage === "details" ? "page" : undefined}>Details</Link>
        <Link href={guestHref("/faq")} aria-current={currentPage === "faq" ? "page" : undefined}>FAQ</Link>
        <Link href={guestHref("/rsvp")} aria-current={currentPage === "rsvp" ? "page" : undefined}>RSVP</Link>
      </nav>
    </header>
  );
}
