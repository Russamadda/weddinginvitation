import { checkOrigin, readJson, noCache } from "@/lib/server-request";
import { findInvitation, saveReply } from "@/lib/wedding-store";

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    checkOrigin(request);
    const { token } = await params;
    const invitation = await findInvitation(token);
    if (!invitation) return Response.json({ error: "This invitation is unavailable. Please contact Marthe & Deivi." }, { status: 404, headers: noCache });
    const response = await saveReply(invitation, await readJson(request));
    return Response.json({ ok: true, response }, { headers: noCache });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Your reply could not be saved. Please try again." }, { status: 400, headers: noCache }); }
}
