import HomePage from "@/components/HomePage";
import GuestLanguage from "@/components/GuestLanguage";
import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { guestMetadata } from "@/lib/guest-metadata";
import { invitationGreeting } from "@/lib/rsvp";

export async function generateMetadata({ searchParams }: { searchParams: GuestSearch }) { return guestMetadata(searchParams, "M001"); }
export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, record, language, photoOverride } = await guestContext(searchParams);
  return <GuestLanguage language={language} photoOverride={photoOverride}><HomePage guestCount={record?.guests.length} inviteToken={token} photoOverride={photoOverride} language={language} greeting={record ? invitationGreeting(record, language) : undefined} /></GuestLanguage>;
}
