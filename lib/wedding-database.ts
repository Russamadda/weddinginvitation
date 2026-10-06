import "server-only";
import { createClient } from "@supabase/supabase-js";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type InvitationRow = { id: string; token: string; body: string; created_at: string; enabled: number; response: string | null; responded_at: string | null; draft: string | null };
type ReplyUpdate = Pick<InvitationRow, "response" | "draft" | "responded_at">;
type Database = {
  list(): Promise<InvitationRow[]>;
  find(token: string): Promise<InvitationRow | undefined>;
  insert(row: InvitationRow): Promise<void>;
  enable(id: string, enabled: boolean): Promise<boolean>;
  remove(id: string): Promise<boolean>;
  reply(id: string, update: ReplyUpdate): Promise<boolean>;
  failures(cutoff: number): Promise<number>;
  addFailure(time: number): Promise<void>;
  clearFailures(): Promise<void>;
  addSession(hash: string, expires: number): Promise<void>;
  hasSession(hash: string, now: number): Promise<boolean>;
  removeSession(hash: string): Promise<void>;
};
const store = globalThis as typeof globalThis & { weddingDatabase?: Database; weddingDatabaseKey?: string };
export const dataDirectory = () => path.resolve(/* turbopackIgnore: true */ process.env.WEDDING_DATA_DIR || path.join(process.cwd(), ".local-data"));

function localDatabase(): Database {
  mkdirSync(dataDirectory(), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(path.join(dataDirectory(), "wedding.sqlite"));
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS invitations (id TEXT PRIMARY KEY, token TEXT UNIQUE NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1, response TEXT, responded_at TEXT, draft TEXT);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS login_failures (created_at INTEGER NOT NULL);`);
  return {
    async list() { return db.prepare("SELECT * FROM invitations ORDER BY created_at DESC").all() as InvitationRow[]; },
    async find(token) { return db.prepare("SELECT * FROM invitations WHERE token=? AND enabled=1").get(token) as InvitationRow | undefined; },
    async insert(row) { db.prepare("INSERT INTO invitations(id,token,body,created_at,enabled,response,responded_at,draft) VALUES(?,?,?,?,?,?,?,?)").run(row.id, row.token, row.body, row.created_at, row.enabled, row.response, row.responded_at, row.draft); },
    async enable(id, enabled) { return db.prepare("UPDATE invitations SET enabled=? WHERE id=?").run(enabled ? 1 : 0, id).changes > 0; },
    async remove(id) { return db.prepare("DELETE FROM invitations WHERE id=?").run(id).changes > 0; },
    async reply(id, update) { return db.prepare("UPDATE invitations SET response=?,draft=?,responded_at=? WHERE id=? AND enabled=1").run(update.response, update.draft, update.responded_at, id).changes > 0; },
    async failures(cutoff) { db.prepare("DELETE FROM login_failures WHERE created_at<?").run(cutoff); return (db.prepare("SELECT COUNT(*) AS total FROM login_failures").get() as { total: number }).total; },
    async addFailure(time) { db.prepare("INSERT INTO login_failures(created_at) VALUES(?)").run(time); },
    async clearFailures() { db.exec("DELETE FROM login_failures"); },
    async addSession(hash, expires) { db.prepare("INSERT INTO sessions(hash,expires) VALUES(?,?)").run(hash, expires); },
    async hasSession(hash, now) { return !!db.prepare("SELECT hash FROM sessions WHERE hash=? AND expires>?").get(hash, now); },
    async removeSession(hash) { db.prepare("DELETE FROM sessions WHERE hash=?").run(hash); },
  };
}

function cloudDatabase(url: string, secret: string): Database {
  const client = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store", signal: init?.signal || AbortSignal.timeout(15_000) }) },
  });
  function checked<T>(result: { data: T; error: { code?: string } | null }): T {
    if (result.error) {
      // Do not send database details or credentials back to guests.
      console.error("Wedding database request failed", result.error.code || "connection");
      throw new Error("The wedding database is temporarily unavailable. Please try again.");
    }
    return result.data;
  }
  return {
    async list() { return checked(await client.from("wedding_invitations").select("*").order("created_at", { ascending: false })) as InvitationRow[]; },
    async find(token) { return (checked(await client.from("wedding_invitations").select("*").eq("token", token).eq("enabled", 1).maybeSingle()) as InvitationRow | null) || undefined; },
    async insert(row) { checked(await client.from("wedding_invitations").insert(row)); },
    async enable(id, enabled) { return !!checked(await client.from("wedding_invitations").update({ enabled: enabled ? 1 : 0 }).eq("id", id).select("id").maybeSingle()); },
    async remove(id) { return !!checked(await client.from("wedding_invitations").delete().eq("id", id).select("id").maybeSingle()); },
    async reply(id, update) { return !!checked(await client.from("wedding_invitations").update(update).eq("id", id).eq("enabled", 1).select("id").maybeSingle()); },
    async failures(cutoff) {
      checked(await client.from("wedding_login_failures").delete().lt("created_at", cutoff));
      const result = await client.from("wedding_login_failures").select("id", { count: "exact", head: true });
      checked(result); return result.count || 0;
    },
    async addFailure(time) { checked(await client.from("wedding_login_failures").insert({ created_at: time })); },
    async clearFailures() { checked(await client.from("wedding_login_failures").delete().gte("created_at", 0)); },
    async addSession(hash, expires) { checked(await client.from("wedding_admin_sessions").delete().lt("expires", Date.now())); checked(await client.from("wedding_admin_sessions").insert({ hash, expires })); },
    async hasSession(hash, now) { return !!checked(await client.from("wedding_admin_sessions").select("hash").eq("hash", hash).gt("expires", now).maybeSingle()); },
    async removeSession(hash) { checked(await client.from("wedding_admin_sessions").delete().eq("hash", hash)); },
  };
}

export function weddingDatabase(): Database {
  const secret = process.env.SUPABASE_SECRET_KEY;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (secret && !url) throw new Error("Set SUPABASE_URL for the wedding database.");
  if (process.env.VERCEL && (!secret || !url)) throw new Error("Configure SUPABASE_URL and SUPABASE_SECRET_KEY before using invitations on Vercel.");
  const key = secret && url ? `supabase:${url}:${secret}` : `sqlite:${dataDirectory()}`;
  if (!store.weddingDatabase || store.weddingDatabaseKey !== key) {
    store.weddingDatabase = secret && url ? cloudDatabase(url, secret) : localDatabase();
    store.weddingDatabaseKey = key;
  }
  return store.weddingDatabase;
}
