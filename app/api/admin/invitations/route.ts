import { isAdmin, checkOrigin, readJson, noCache } from "@/lib/server-request";
import { createInvitation, deleteInvitation, listInvitations, setInvitationEnabled } from "@/lib/wedding-store";

export async function GET() {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401, headers: noCache });
  return Response.json({ invitations: await listInvitations() }, { headers: noCache });
}
export async function POST(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try { checkOrigin(request); return Response.json({ invitation: await createInvitation(await readJson(request)) }, { status: 201, headers: noCache }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Could not create invitation." }, { status: 400 }); }
}
export async function PATCH(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401 });
  try { checkOrigin(request); const value = await readJson(request); if (typeof value.id !== "string" || typeof value.enabled !== "boolean") throw new Error("Invalid invitation."); if (!await setInvitationEnabled(value.id, value.enabled)) return Response.json({ error: "Invitation not found." }, { status: 404 }); return Response.json({ ok: true }, { headers: noCache }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Could not update invitation." }, { status: 400 }); }
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Please sign in." }, { status: 401, headers: noCache });
  try {
    checkOrigin(request);
    const value = await readJson(request);
    if (typeof value.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.id)) throw new Error("Invalid invitation.");
    if (!await deleteInvitation(value.id)) return Response.json({ error: "Invitation not found." }, { status: 404, headers: noCache });
    return Response.json({ ok: true }, { headers: noCache });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not delete invitation." }, { status: 400, headers: noCache });
  }
}
