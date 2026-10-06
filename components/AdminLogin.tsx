"use client";
import { useState, type FormEvent } from "react";
export default function AdminLogin() {
  const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try { const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); window.location.href = "/admin"; }
    catch (error) { setError(error instanceof Error ? error.message : "Could not sign in."); setBusy(false); }
  }
  return <div className="admin-login"><p className="admin-eyebrow">Marthe &amp; Deivi</p><h1>Wedding admin</h1><p>Sign in to manage invitations and replies.</p><form onSubmit={submit}><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" required maxLength={256} value={password} onChange={event => setPassword(event.target.value)} />{error && <p className="rsvp-error" role="alert">{error}</p>}<button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form><a href="/">Return to the wedding website</a></div>;
}
