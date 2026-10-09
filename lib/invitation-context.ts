import "server-only";
import { notFound } from "next/navigation";
import { findInvitation } from "./wedding-store";
import { cache } from "react";
import type { GuestLanguage } from "./guest-language";
export type GuestSearch = Promise<{ invite?: string; lang?: string }>;
export const guestContext = cache(async (searchParams: GuestSearch) => {
  const { invite, lang } = await searchParams;
  const record = invite ? await findInvitation(invite) : null;
  const language: GuestLanguage = lang === "en" || lang === "no" || lang === "lt" ? lang : record?.language ?? "en";
  if (!invite) return { token: undefined, record: null, language };
  if (!record) notFound();
  return { token: invite, record, language };
});
