import "server-only";
import { weddingDatabase as db, dataDirectory, type InvitationRow } from "./wedding-database";
import { randomBytes, randomUUID, createHash, timingSafeEqual, scryptSync } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { Invitation, RsvpDraft } from "./rsvp";
import { buildResponse, validateRsvp } from "./rsvp";

export type StoredInvitation = Invitation & { demo?: boolean; label: string; token: string; createdAt: string; enabled: boolean; response: ReturnType<typeof buildResponse> | null; respondedAt: string | null; draft: RsvpDraft | null };
function unpack(row: InvitationRow): StoredInvitation {
  return { ...JSON.parse(row.body), id: row.id, token: row.token, createdAt: row.created_at, enabled: !!row.enabled, response: row.response ? JSON.parse(row.response) : null, respondedAt: row.responded_at, draft: row.draft ? JSON.parse(row.draft) : null };
}

export async function listInvitations() {
  return (await db().list()).map(unpack).filter(invitation => !invitation.demo);
}

export async function findInvitation(token: string): Promise<StoredInvitation | null> {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const row = await db().find(token);
  return row && !JSON.parse(row.body).demo ? unpack(row) : null;
}

export async function createInvitation(value: unknown) {
  const data = value as Record<string, unknown>;
  if (!data || !Array.isArray(data.names) || !data.names.length || data.names.length > 20 || data.names.some(name => typeof name !== "string" || !name.trim() || name.trim().length > 100)) throw new Error("Enter 1–20 guest names, up to 100 characters each.");
  if (!["traveling", "local"].includes(String(data.travelProfile)) || !["en", "no", "lt"].includes(String(data.language))) throw new Error("Choose a valid guest category and language.");
  const names = (data.names as string[]).map(name => name.trim());
  if (new Set(names.map(name => name.toLowerCase())).size !== names.length) throw new Error("Guest names must be distinct. Use full names to distinguish people sharing a first name.");
  if (data.label !== undefined && (typeof data.label !== "string" || data.label.length > 150)) throw new Error("Group label must be at most 150 characters.");
  const invitation: Invitation & { label: string } = { id: randomUUID(), guests: names.map(name => ({ id: randomUUID(), name })), travelProfile: data.travelProfile as Invitation["travelProfile"], language: data.language as Invitation["language"], additionalGuestAllowance: 0, label: typeof data.label === "string" && data.label.trim() ? data.label.trim() : names.join(" & ").slice(0, 150) };
  const token = randomBytes(24).toString("base64url");
  const createdAt = new Date().toISOString();
  await db().insert({ id: invitation.id, token, body: JSON.stringify(invitation), created_at: createdAt, enabled: 1, response: null, responded_at: null, draft: null });
  return { ...invitation, token, createdAt, enabled: true, response: null, respondedAt: null, draft: null } as StoredInvitation;
}

export async function setInvitationEnabled(id: string, enabled: boolean) {
  return db().enable(id, enabled);
}

export async function deleteInvitation(id: string) {
  return db().remove(id);
}

export function publicInvitation(record: StoredInvitation): Invitation {
  return { id: record.id, guests: record.guests, language: record.language, travelProfile: record.travelProfile, additionalGuestAllowance: 0 };
}

export function parseDraft(invitation: Invitation, value: unknown): RsvpDraft {
  const raw = value as Record<string, unknown>;
  if (!raw || typeof raw !== "object" || !raw.attendance || typeof raw.attendance !== "object" || !raw.dietary || typeof raw.dietary !== "object" || !Array.isArray(raw.additionalGuests)) throw new Error("The reply could not be read. Please complete the form again.");
  const text = (input: unknown, limit: number) => { if (typeof input !== "string" || input.length > limit) throw new Error("One of the text fields is too long or invalid."); return input; };
  const attendance = raw.attendance as Record<string, unknown>;
  const dietary = raw.dietary as Record<string, unknown>;
  if (Object.keys(attendance).some(id => !invitation.guests.some(guest => guest.id === id))) throw new Error("This reply contains a guest who is not on this invitation.");
  const choice = (input: unknown) => { if (!["", "yes", "no"].includes(String(input))) throw new Error("Please select a valid answer."); return input as "" | "yes" | "no"; };
  if (raw.additionalGuests.length > 0) throw new Error("Too many additional guests for this invitation.");
  const draft: RsvpDraft = {
    attendance: Object.fromEntries(invitation.guests.map(guest => [guest.id, choice(attendance[guest.id])])),
    dietary: Object.fromEntries(invitation.guests.map(guest => [guest.id, text(dietary[guest.id] ?? "", 500)])),
    bringPlusOne: "no", hotelOffer: choice(raw.hotelOffer), venueStay: choice(raw.venueStay),
    email: text(raw.email, 254), childrenNotes: text(raw.childrenNotes, 1000), comments: text(raw.comments, 2000),
    additionalGuests: [],
  };
  const errors = validateRsvp(invitation, draft);
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
  return draft;
}

export async function saveReply(record: StoredInvitation, value: unknown) {
  const draft = parseDraft(record, value);
  const response = buildResponse(record, draft);
  const changed = await db().reply(record.id, { response: JSON.stringify(response), draft: JSON.stringify(draft), responded_at: new Date().toISOString() });
  if (!changed) throw new Error("This invitation is no longer active.");
  return response;
}

function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.SUPABASE_SECRET_KEY || process.env.VERCEL) throw new Error("Set ADMIN_PASSWORD before using the hosted wedding database.");
  const file = path.join(dataDirectory(), "admin-password.txt");
  mkdirSync(dataDirectory(), { recursive: true, mode: 0o700 });
  if (!existsSync(file)) { try { writeFileSync(file, randomBytes(24).toString("base64url"), { mode: 0o600, flag: "wx" }); } catch (error) { if (!existsSync(file)) throw error; } }
  return readFileSync(file, "utf8").trim();
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export async function loginAdmin(password: string) {
  const database = db();
  if (await database.failures(Date.now() - 15 * 60 * 1000) >= 10) throw new Error("Too many sign-in attempts. Please try again in 15 minutes.");
  const expected = scryptSync(adminPassword(), "wedding-admin-password", 32);
  const supplied = scryptSync(password, "wedding-admin-password", 32);
  if (!timingSafeEqual(expected, supplied)) { await database.addFailure(Date.now()); return null; }
  await database.clearFailures();
  const token = randomBytes(32).toString("base64url");
  await database.addSession(hash(token), Date.now() + 7 * 24 * 60 * 60 * 1000);
  return token;
}

export async function validAdminSession(token?: string) {
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return false;
  return db().hasSession(hash(token), Date.now());
}
export async function logoutAdmin(token: string) { await db().removeSession(hash(token)); }
export function ensureAdminPassword() { adminPassword(); }
