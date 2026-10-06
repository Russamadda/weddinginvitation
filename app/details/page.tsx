import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import type { Metadata } from "next";
import DetailsPage from "@/components/DetailsPage";

export const metadata: Metadata = { title: "Wedding Details | Marthe & Deivi" };

export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token } = await guestContext(searchParams);
  return <DetailsPage inviteToken={token} />;
}
