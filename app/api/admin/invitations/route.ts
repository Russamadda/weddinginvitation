import { isAdmin, checkOrigin, readJson, noCache } from "@/lib/server-request";
import { createInvitation, listInvitations, setInvitationEnabled } from "@/lib/wedding-store";

export async function GET() {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401, headers: noCache });
  return Response.json({ invitations: listInvitations() }, { headers: noCache });
}
export async function POST(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try { checkOrigin(request); return Response.json({ invitation: createInvitation(await readJson(request)) }, { status: 201, headers: noCache }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Could not create invitation." }, { status: 400 }); }
}
export async function PATCH(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try { checkOrigin(request); const value = await readJson(request); if (typeof value.id !== "string" || typeof value.enabled !== "boolean") throw new Error("Invalid invitation."); if (!setInvitationEnabled(value.id, value.enabled)) return Response.json({ error: "Invitation not found." }, { status: 404 }); return Response.json({ ok: true }, { headers: noCache }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Could not update invitation." }, { status: 400 }); }
}
