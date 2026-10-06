import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server-request";
import { ensureAdminPassword } from "@/lib/wedding-store";
import AdminLogin from "@/components/AdminLogin";
export default async function Page() { if (await isAdmin()) redirect("/admin"); ensureAdminPassword(); return <AdminLogin />; }
