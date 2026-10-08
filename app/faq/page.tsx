import FaqPage from "@/components/FaqPage";
import GuestLanguage from "@/components/GuestLanguage";
import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { guestMetadata } from "@/lib/guest-metadata";

export async function generateMetadata({ searchParams }: { searchParams: GuestSearch }) { return guestMetadata(searchParams, "M004"); }
export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, language } = await guestContext(searchParams);
  return <GuestLanguage language={language}><FaqPage inviteToken={token} language={language} /></GuestLanguage>;
}
