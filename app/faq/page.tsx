import { guestContext, type GuestSearch } from "@/lib/invitation-context";
import type { Metadata } from "next";
import FaqPage from "@/components/FaqPage";

export const metadata: Metadata = { title: "FAQ | Marthe & Deivi" };

export default async function Page({ searchParams }: { searchParams: GuestSearch }) {
  const { token } = await guestContext(searchParams);
  return <FaqPage inviteToken={token} />;
}
