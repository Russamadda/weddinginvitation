import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import type { Metadata } from "next";
import LoveStoryPage from "@/components/LoveStoryPage";

export const metadata: Metadata = { title: "Our Love Story | Marthe & Deivi" };

export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token } = await guestContext(searchParams);
  return <LoveStoryPage inviteToken={token} />;
}
