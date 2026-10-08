"use client";
import { useEffect, useState } from "react";
import { guestText as t, type GuestLanguage } from "@/lib/guest-language";

export default function InvitationUnavailable() {
  const [language, setLanguage] = useState<GuestLanguage>("en");
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("lang") === "no" ? "no" : "en";
    setLanguage(selected);
    document.documentElement.lang = selected === "no" ? "nb" : "en";
  }, []);
  return <main className="invitation-unavailable" lang={language === "no" ? "nb" : "en"}><h1>{t(language, "E013")}</h1><p>{t(language, "E014")}</p><a href="mailto:deivi.selenis@gmail.com">deivi.selenis@gmail.com</a></main>;
}
