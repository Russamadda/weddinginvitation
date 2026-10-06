import "server-only";
import { cookies } from "next/headers";
import { validAdminSession } from "./wedding-store";

export const publicSiteUrl = () => (process.env.SITE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
export async function isAdmin() { return validAdminSession((await cookies()).get("wedding-admin")?.value); }
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || ![new URL(request.url).origin, new URL(publicSiteUrl()).origin].includes(origin)) throw new Error("Request origin is not allowed.");
}
export async function readJson(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new Error("Send JSON data.");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing request body.");
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; if (size > 32_768) { await reader.cancel(); throw new Error("The reply is too large."); } chunks.push(value); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export const noCache = { "Cache-Control": "private, no-store" };
