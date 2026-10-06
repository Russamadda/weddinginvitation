import "server-only";
import { DatabaseSync } from "node:sqlite";
import { randomBytes, randomUUID, createHash, timingSafeEqual, scryptSync } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { Invitation, RsvpDraft } from "./rsvp";
import { buildResponse, validateRsvp } from "./rsvp";

export type StoredInvitation = Invitation & { demo?: boolean; label: string; token: string; createdAt: string; enabled: boolean; response: ReturnType<typeof buildResponse> | null; respondedAt: string | null; draft: RsvpDraft | null };
type Row = { id: string; token: string; body: string; created_at: string; enabled: number; response: string | null; responded_at: string | null; draft: string | null };
const globalStore = globalThis as typeof globalThis & { weddingDatabase?: DatabaseSync };
const dataDirectory = () => path.resolve(/* turbopackIgnore: true */ process.env.WEDDING_DATA_DIR || path.join(process.cwd(), ".local-data"));

function db() {
  if (!globalStore.weddingDatabase) {
    mkdirSync(dataDirectory(), { recursive: true, mode: 0o700 });
    const database = new DatabaseSync(path.join(dataDirectory(), "wedding.sqlite"));
    database.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS invitations (id TEXT PRIMARY KEY, token TEXT UNIQUE NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1, response TEXT, responded_at TEXT, draft TEXT);
      CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS login_failures (created_at INTEGER NOT NULL);`);
    globalStore.weddingDatabase = database;
  }
  return globalStore.weddingDatabase;
}

function unpack(row: Row): StoredInvitation {
  return { ...JSON.parse(row.body), id: row.id, token: row.token, createdAt: row.created_at, enabled: !!row.enabled, response: row.response ? JSON.parse(row.response) : null, respondedAt: row.responded_at, draft: row.draft ? JSON.parse(row.draft) : null };
}

export function listInvitations() {
  return (db().prepare("SELECT * FROM invitations ORDER BY created_at DESC").all() as Row[]).map(unpack).filter(invitation => !invitation.demo);
}

export function findInvitation(token: string): StoredInvitation | null {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const row = db().prepare("SELECT * FROM invitations WHERE token=? AND enabled=1").get(token) as Row | undefined;
  return row && !JSON.parse(row.body).demo ? unpack(row) : null;
}

export function createInvitation(value: unknown) {
  const data = value as Record<string, unknown>;
  if (!data || !Array.isArray(data.names) || !data.names.length || data.names.length > 20 || data.names.some(name => typeof name !== "string" || !name.trim() || name.trim().length > 100)) throw new Error("Enter 1–20 guest names, up to 100 characters each.");
  if (!["traveling", "local"].includes(String(data.travelProfile)) || !["en", "no", "lt"].includes(String(data.language))) throw new Error("Choose a valid guest category and language.");
  if (!Number.isInteger(data.additionalGuestAllowance) || Number(data.additionalGuestAllowance) < 0 || Number(data.additionalGuestAllowance) > 10) throw new Error("Additional guest allowance must be from 0 to 10.");
  const names = (data.names as string[]).map(name => name.trim());
  if (new Set(names.map(name => name.toLowerCase())).size !== names.length) throw new Error("Guest names must be distinct. Use full names to distinguish people sharing a first name.");
  if (data.label !== undefined && (typeof data.label !== "string" || data.label.length > 150)) throw new Error("Group label must be at most 150 characters.");
  const invitation: Invitation & { label: string } = { id: randomUUID(), guests: names.map(name => ({ id: randomUUID(), name })), travelProfile: data.travelProfile as Invitation["travelProfile"], language: data.language as Invitation["language"], additionalGuestAllowance: Number(data.additionalGuestAllowance), label: typeof data.label === "string" && data.label.trim() ? data.label.trim() : names.join(" & ").slice(0, 150) };
  const token = randomBytes(24).toString("base64url");
  db().prepare("INSERT INTO invitations(id,token,body,created_at) VALUES(?,?,?,?)").run(invitation.id, token, JSON.stringify(invitation), new Date().toISOString());
  return findInvitation(token)!;
}

export function setInvitationEnabled(id: string, enabled: boolean) {
  return db().prepare("UPDATE invitations SET enabled=? WHERE id=?").run(enabled ? 1 : 0, id).changes > 0;
}

export function publicInvitation(record: StoredInvitation): Invitation {
  return { id: record.id, guests: record.guests, language: record.language, travelProfile: record.travelProfile, additionalGuestAllowance: record.additionalGuestAllowance };
}

export function parseDraft(invitation: Invitation, value: unknown): RsvpDraft {
  const raw = value as Record<string, unknown>;
  if (!raw || typeof raw !== "object" || !raw.attendance || typeof raw.attendance !== "object" || !raw.dietary || typeof raw.dietary !== "object" || !Array.isArray(raw.additionalGuests)) throw new Error("The reply could not be read. Please complete the form again.");
  const text = (input: unknown, limit: number) => { if (typeof input !== "string" || input.length > limit) throw new Error("One of the text fields is too long or invalid."); return input; };
  const attendance = raw.attendance as Record<string, unknown>;
  const dietary = raw.dietary as Record<string, unknown>;
  if (Object.keys(attendance).some(id => !invitation.guests.some(guest => guest.id === id))) throw new Error("This reply contains a guest who is not on this invitation.");
  const choice = (input: unknown) => { if (!["", "yes", "no"].includes(String(input))) throw new Error("Please select a valid answer."); return input as "" | "yes" | "no"; };
  if (raw.additionalGuests.length > invitation.additionalGuestAllowance) throw new Error("Too many additional guests for this invitation.");
  const draft: RsvpDraft = {
    attendance: Object.fromEntries(invitation.guests.map(guest => [guest.id, choice(attendance[guest.id])])),
    dietary: Object.fromEntries(invitation.guests.map(guest => [guest.id, text(dietary[guest.id] ?? "", 500)])),
    bringPlusOne: choice(raw.bringPlusOne), hotelOffer: choice(raw.hotelOffer), venueStay: choice(raw.venueStay),
    email: text(raw.email, 254), childrenNotes: text(raw.childrenNotes, 1000), comments: text(raw.comments, 2000),
    additionalGuests: raw.additionalGuests.map((item: unknown) => { const guest = item as Record<string, unknown>; if (!guest) throw new Error("Invalid additional guest."); return { id: text(guest.id, 100), name: text(guest.name, 100), dietary: text(guest.dietary, 500) }; }),
  };
  const errors = validateRsvp(invitation, draft);
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
  return draft;
}

export function saveReply(record: StoredInvitation, value: unknown) {
  const draft = parseDraft(record, value);
  const response = buildResponse(record, draft);
  const changed = db().prepare("UPDATE invitations SET response=?, draft=?, responded_at=? WHERE id=? AND enabled=1").run(JSON.stringify(response), JSON.stringify(draft), new Date().toISOString(), record.id).changes;
  if (!changed) throw new Error("This invitation is no longer active.");
  return response;
}

function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  const file = path.join(dataDirectory(), "admin-password.txt");
  mkdirSync(dataDirectory(), { recursive: true, mode: 0o700 });
  if (!existsSync(file)) { try { writeFileSync(file, randomBytes(24).toString("base64url"), { mode: 0o600, flag: "wx" }); } catch (error) { if (!existsSync(file)) throw error; } }
  return readFileSync(file, "utf8").trim();
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export function loginAdmin(password: string) {
  const database = db();
  database.prepare("DELETE FROM login_failures WHERE created_at<?").run(Date.now() - 15 * 60 * 1000);
  const failures = database.prepare("SELECT COUNT(*) AS total FROM login_failures").get() as { total: number };
  if (failures.total >= 10) throw new Error("Too many sign-in attempts. Please try again in 15 minutes.");
  const expected = scryptSync(adminPassword(), "wedding-admin-password", 32);
  const supplied = scryptSync(password, "wedding-admin-password", 32);
  if (!timingSafeEqual(expected, supplied)) { database.prepare("INSERT INTO login_failures(created_at) VALUES(?)").run(Date.now()); return null; }
  database.exec("DELETE FROM login_failures");
  const token = randomBytes(32).toString("base64url");
  database.prepare("INSERT INTO sessions(hash,expires) VALUES(?,?)").run(hash(token), Date.now() + 7 * 24 * 60 * 60 * 1000);
  return token;
}

export function validAdminSession(token?: string) {
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return false;
  return !!db().prepare("SELECT hash FROM sessions WHERE hash=? AND expires>?").get(hash(token), Date.now());
}
export function logoutAdmin(token: string) { db().prepare("DELETE FROM sessions WHERE hash=?").run(hash(token)); }
export function ensureAdminPassword() { adminPassword(); }
