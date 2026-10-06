import { cookies } from "next/headers";
import { checkOrigin, readJson, noCache } from "@/lib/server-request";
import { loginAdmin, logoutAdmin } from "@/lib/wedding-store";

export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const body = await readJson(request);
    if (typeof body.password !== "string" || body.password.length > 256) return Response.json({ error: "Enter your password." }, { status: 400 });
    const token = loginAdmin(body.password);
    if (!token) return Response.json({ error: "Incorrect password." }, { status: 401, headers: noCache });
    (await cookies()).set("wedding-admin", token, { httpOnly: true, sameSite: "strict", secure: request.url.startsWith("https://") || process.env.SITE_URL?.startsWith("https://"), path: "/", maxAge: 7 * 24 * 60 * 60 });
    return Response.json({ ok: true }, { headers: noCache });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Sign-in failed." }, { status: 400, headers: noCache }); }
}
export async function DELETE(request: Request) {
  try { checkOrigin(request); const jar = await cookies(); const token = jar.get("wedding-admin")?.value; if (token) logoutAdmin(token); jar.delete("wedding-admin"); return Response.json({ ok: true }, { headers: noCache }); }
  catch { return Response.json({ error: "Sign-out failed." }, { status: 403 }); }
}
