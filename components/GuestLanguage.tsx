"use client";
import { useEffect, type CSSProperties } from "react";
import type { GuestLanguage } from "@/lib/guest-language";

export default function GuestLanguage({ language, photoOverride, children }: { language: GuestLanguage; photoOverride?: string; children: React.ReactNode }) {
  useEffect(() => { document.documentElement.lang = language === "no" ? "nb" : language; }, [language]);
  return <div className="guest-site" data-photo-override={photoOverride ? "true" : undefined} style={photoOverride ? { "--invitation-photo": `url("${photoOverride}")` } as CSSProperties : undefined} data-language={language} lang={language === "no" ? "nb" : language}>{children}</div>;
}
