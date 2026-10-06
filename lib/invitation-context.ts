import "server-only";
import { notFound } from "next/navigation";
import { findInvitation } from "./wedding-store";
export type GuestSearch = Promise<{ invite?: string }>;
export async function guestContext(searchParams: GuestSearch) {
  const { invite } = await searchParams;
  if (!invite) return { token: undefined, record: null };
  const record = await findInvitation(invite);
  if (!record) notFound();
  return { token: invite, record };
}
