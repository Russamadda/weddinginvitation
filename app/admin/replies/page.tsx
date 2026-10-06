import { redirect } from "next/navigation";
import { isAdmin, publicSiteUrl } from "@/lib/server-request";
import AdminDashboard from "@/components/AdminDashboard";
export default async function Page() { if (!await isAdmin()) redirect("/admin/login"); return <AdminDashboard siteUrl={publicSiteUrl()} view="replies" />; }
