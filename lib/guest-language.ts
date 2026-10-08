import messages from "./guest-messages.json";

export type GuestLanguage = "en" | "no";
export type MessageId = keyof typeof messages.en;
export function guestText(language: GuestLanguage, id: MessageId, values: Record<string, string | number> = {}) {
  return messages[language][id].replace(/\{(\w+)\}/g, (placeholder, key: string) => String(values[key] ?? placeholder));
}
export function guestHref(path: string, token?: string, language: GuestLanguage = "en") {
  const query = new URLSearchParams();
  if (token) query.set("invite", token);
  query.set("lang", language);
  return `${path}?${query}`;
}
export function guestError(language: GuestLanguage, message: string) {
  const id = (Object.keys(messages.en) as MessageId[]).find(key => key.startsWith("E") && (messages.en[key] === message || messages.no[key] === message));
  return guestText(language, id || "E012");
}
