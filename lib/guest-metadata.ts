import "server-only";
import type { Metadata } from "next";
import { guestContext, type GuestSearch } from "./invitation-context";
import { guestText, type MessageId } from "./guest-language";

export async function guestMetadata(searchParams: GuestSearch, title: MessageId = "M001"): Promise<Metadata> {
  const { language } = await guestContext(searchParams);
  const invitationTitle = guestText(language, "M001");
  return {
    title: guestText(language, title), description: guestText(language, "M007"),
    openGraph: { type: "website", title: invitationTitle, description: guestText(language, "M008"), locale: language === "no" ? "nb_NO" : language === "lt" ? "lt_LT" : "en_GB", images: [{ url: "/images/invitation-envelope.png", width: 1847, height: 1038, alt: guestText(language, "M009") }] },
    twitter: { card: "summary_large_image", title: invitationTitle, description: guestText(language, "M008"), images: ["/images/invitation-envelope.png"] },
  };
}
