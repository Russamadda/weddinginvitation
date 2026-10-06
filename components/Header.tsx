export default function Header({ currentPage = "home", inviteToken }: { inviteToken?: string; currentPage?: "home" | "love-story" | "details" | "faq" | "rsvp" }) {
  const guestHref = (path: string) => inviteToken ? `${path}?invite=${encodeURIComponent(inviteToken)}` : path;
  return (
    <header className={`site-header${currentPage !== "home" ? " story-header" : ""}`} id={currentPage}>
      <nav aria-label="Main navigation">
        <a href={currentPage === "home" ? "#home" : guestHref("/")} aria-current={currentPage === "home" ? "page" : undefined}>Home</a>
        <a href={guestHref("/love-story")} aria-current={currentPage === "love-story" ? "page" : undefined}>Love Story</a>
        <a href={guestHref("/details")} aria-current={currentPage === "details" ? "page" : undefined}>Details</a>
        <a href={guestHref("/faq")} aria-current={currentPage === "faq" ? "page" : undefined}>FAQ</a>
        <a href={guestHref("/rsvp")} aria-current={currentPage === "rsvp" ? "page" : undefined}>RSVP</a>
      </nav>
    </header>
  );
}
