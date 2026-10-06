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

export function invitationGreeting(invitation: Invitation) {
  const names = invitation.guests.map(guest => guest.name);
  return `Dear ${names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`},`;
}

export function emptyDraft(invitation: Invitation): RsvpDraft {
  return { attendance: Object.fromEntries(invitation.guests.map(guest => [guest.id, ""])), dietary: {}, bringPlusOne: "", email: "", additionalGuests: [], hotelOffer: "", venueStay: "", childrenNotes: "", comments: "" };
}

// Fast Refresh can retain a draft from before new form fields were added.
export function normalizeDraft(invitation: Invitation, draft: Partial<RsvpDraft>): RsvpDraft {
  return {
    ...emptyDraft(invitation),
    ...draft,
    dietary: draft.dietary ?? {},
    additionalGuests: (draft.additionalGuests ?? []).map(guest => ({ ...guest, dietary: guest.dietary ?? "" })),
  };
}

export function validateRsvp(invitation: Invitation, draft: RsvpDraft) {
  const errors: Record<string, string> = {};
  for (const guest of invitation.guests) {
    if (!["yes", "no"].includes(draft.attendance[guest.id])) errors[`attendance-${guest.id}`] = `Please choose whether ${guest.name} is attending.`;
  }
  if (invitation.guests.some(guest => draft.attendance[guest.id] === "yes")) {
    if (invitation.additionalGuestAllowance > 0 && !["yes", "no"].includes(draft.bringPlusOne)) errors.plusOne = "Please choose whether you will bring a plus one.";
    const additions = draft.bringPlusOne === "yes" ? draft.additionalGuests : [];
    if (additions.length > invitation.additionalGuestAllowance) errors.plusOne = "This invitation's additional guest allowance has been exceeded.";
    if (draft.bringPlusOne === "yes" && !additions.length) errors.plusOne = "Please add your plus one's name.";
    const invitedNames = invitation.guests.map(guest => guest.name.trim().toLowerCase());
    const addedNames = new Set<string>();
    for (const guest of additions) {
      const name = guest.name.trim().toLowerCase();
      if (!name) errors[`name-${guest.id}`] = "Please enter their name.";
      else if (invitedNames.includes(name) || addedNames.has(name)) errors[`name-${guest.id}`] = "This name is already listed. Please use a full name if two people share a name.";
      addedNames.add(name);
    }
    if (invitation.travelProfile !== "local" && !["yes", "no"].includes(draft.hotelOffer)) errors.hotelOffer = "Please choose whether you would like the Kaunas hotel offer.";
    if (invitation.travelProfile === "local" && !["yes", "no"].includes(draft.venueStay)) errors.venueStay = "Please choose whether your party would like to stay at the venue.";
    if (invitation.travelProfile !== "local" && draft.hotelOffer === "yes" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = "Please enter a valid email for group hotel updates.";
  }
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
    additionalGuests: attending && draft.bringPlusOne === "yes" ? draft.additionalGuests.map(guest => ({ ...guest, name: guest.name.trim(), dietary: guest.dietary.trim() })) : [],
    hotelOffer: attending && invitation.travelProfile !== "local" ? draft.hotelOffer : null,
    venueStay: attending && invitation.travelProfile === "local" ? draft.venueStay : null,
    childrenNotes: attending ? (draft.childrenNotes || "").trim() : "",
    comments: draft.comments.trim(),
  };
}
