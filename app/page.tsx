import HomePage from "@/components/HomePage";
import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import { invitationGreeting } from "@/lib/rsvp";
export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token, record } = await guestContext(searchParams);
  return <HomePage inviteToken={token} greeting={record ? invitationGreeting(record) : undefined} />;
}
