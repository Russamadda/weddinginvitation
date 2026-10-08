import DetailsPage from "@/components/DetailsPage";
import GuestLanguage from "@/components/GuestLanguage";
import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { guestMetadata } from "@/lib/guest-metadata";

export async function generateMetadata({ searchParams }: { searchParams: GuestSearch }) { return guestMetadata(searchParams, "M003"); }
export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, language } = await guestContext(searchParams);
  return <GuestLanguage language={language}><DetailsPage inviteToken={token} language={language} /></GuestLanguage>;
}
