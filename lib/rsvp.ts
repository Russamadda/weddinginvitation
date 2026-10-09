import { guestText as t, type GuestLanguage } from "./guest-language";
export type TravelProfile = "traveling" | "local";
export type Attendance = "" | "yes" | "no";
export type Invitation = {
  id: string;
  guests: { id: string; name: string }[];
  language: "en" | "no" | "lt";
  travelProfile: TravelProfile;
  additionalGuestAllowance: number;
};
export type AddedGuest = { id: string; name: string; dietary: string };
export type RsvpDraft = {
  attendance: Record<string, Attendance>;
  dietary: Record<string, string>;
  bringPlusOne: Attendance;
  email: string;
  additionalGuests: AddedGuest[];
  hotelOffer: Attendance;
  venueStay: Attendance;
  childrenNotes: string;
  comments: string;
};

export function invitationGreeting(invitation: Invitation, language: GuestLanguage = invitation.language) {
  const names = invitation.guests.map(guest => guest.name);
  const joined = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")}${language === "no" ? " og " : language === "lt" ? " ir " : " & "}${names[names.length - 1]}`;
  return language === "lt" ? `Kviečiame švęsti kartu: ${joined}` : `${language === "no" ? "Kjære" : "Dear"} ${joined},`;
}

export function emptyDraft(invitation: Invitation): RsvpDraft {
  return { attendance: Object.fromEntries(invitation.guests.map(guest => [guest.id, ""])), dietary: {}, bringPlusOne: "no", email: "", additionalGuests: [], hotelOffer: "", venueStay: "", childrenNotes: "", comments: "" };
}

// Fast Refresh can retain a draft from before new form fields were added.
export function normalizeDraft(invitation: Invitation, draft: Partial<RsvpDraft>): RsvpDraft {
  return {
    ...emptyDraft(invitation),
    ...draft,
    dietary: draft.dietary ?? {},
    // Old drafts may contain plus ones; the current form accepts named invitees only.
    bringPlusOne: "no",
    additionalGuests: [],
  };
}

export function validateRsvp(invitation: Invitation, draft: RsvpDraft, language: GuestLanguage = invitation.language) {
  const errors: Record<string, string> = {};
  for (const guest of invitation.guests) {
    if (!["yes", "no"].includes(draft.attendance[guest.id])) errors[`attendance-${guest.id}`] = t(language, "E001", { name: guest.name });
  }
  if (invitation.guests.some(guest => draft.attendance[guest.id] === "yes")) {
    if (invitation.travelProfile !== "local" && !["yes", "no"].includes(draft.hotelOffer)) errors.hotelOffer = t(language, "E007");
    if (invitation.travelProfile === "local" && !["yes", "no"].includes(draft.venueStay)) errors.venueStay = t(language, "E008");
    if (invitation.travelProfile !== "local" && draft.hotelOffer === "yes" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = t(language, "E009");
  }
  if (draft.additionalGuests.length) errors.additionalGuests = t(language, "E022");
  return errors;
}

export function buildResponse(invitation: Invitation, inputDraft: Partial<RsvpDraft>) {
  const draft = normalizeDraft(invitation, inputDraft);
  const attending = invitation.guests.some(guest => draft.attendance[guest.id] === "yes");
  const groupHotel = attending && invitation.travelProfile !== "local" && draft.hotelOffer === "yes";
  return {
    invitationId: invitation.id,
    travelProfile: invitation.travelProfile ?? "traveling",
    guests: invitation.guests.map(guest => ({ guestId: guest.id, name: guest.name, attending: draft.attendance[guest.id] === "yes", dietary: draft.attendance[guest.id] === "yes" ? (draft.dietary[guest.id] || "").trim() : "" })),
    email: groupHotel ? draft.email.trim() : "",
    additionalGuests: [] as AddedGuest[],
    hotelOffer: attending && invitation.travelProfile !== "local" ? draft.hotelOffer : null,
    venueStay: attending && invitation.travelProfile === "local" ? draft.venueStay : null,
    childrenNotes: attending ? (draft.childrenNotes || "").trim() : "",
    comments: draft.comments.trim(),
  };
}
