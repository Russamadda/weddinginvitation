"use client";
import { useEffect } from "react";
import type { GuestLanguage } from "@/lib/guest-language";

export default function GuestLanguage({ language, children }: { language: GuestLanguage; children: React.ReactNode }) {
  useEffect(() => { document.documentElement.lang = language === "no" ? "nb" : language; }, [language]);
  return <div className="guest-site" data-language={language} lang={language === "no" ? "nb" : language}>{children}</div>;
}
