import type { Metadata } from "next";
export const metadata: Metadata = { title: "Wedding admin | Marthe & Deivi", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return <main className="admin-page">{children}</main>; }
