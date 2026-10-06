"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildResponse, emptyDraft, invitationGreeting, normalizeDraft, validateRsvp, type Invitation, type RsvpDraft } from "@/lib/rsvp";

export default function RsvpForm({ invitation, inviteToken, initialDraft }: { invitation: Invitation; inviteToken: string; initialDraft?: RsvpDraft }) {
  const travelProfile = invitation.travelProfile;
  const activeInvitation = invitation;
  const [storedDraft, setDraft] = useState(() => initialDraft ? normalizeDraft(invitation, initialDraft) : emptyDraft(invitation));
  const draft = normalizeDraft(invitation, storedDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"edit" | "review" | "saved">("edit");
  const [saveError, setSaveError] = useState("");
  const [sending, setSending] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const allDeclining = invitation.guests.every(guest => draft.attendance[guest.id] === "no");
  const response = buildResponse(activeInvitation, draft);

  useEffect(() => { if (step !== "edit") heading.current?.focus(); }, [step]);

  function update(patch: Partial<RsvpDraft>) {
    setDraft(current => ({ ...current, ...patch }));
    setErrors({});
    setSaveError("");
  }

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(activeInvitation, draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const id = Object.keys(nextErrors)[0];
      document.getElementById(id)?.focus();
      return;
    }
    setStep("review");
  }

  async function save() {
    if (sending) return;
    setSending(true); setSaveError("");
    try {
      const result = await fetch(`/api/rsvp/${encodeURIComponent(inviteToken)}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await result.json();
      if (!result.ok) throw new Error(data.error || "Your reply could not be sent. Please try again.");
      setStep("saved");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Your reply could not be sent. Your answers are still here; please try again.");
    } finally { setSending(false); }
  }

  function error(id: string) {
    return errors[id] ? <p className="rsvp-error" id={`${id}-error`}>{errors[id]}</p> : null;
  }

  return (
    <div className="rsvp-form-wrap">
      <h2 className="rsvp-greeting">{invitationGreeting(invitation)}</h2>
      {step === "edit" ? <form className="rsvp-form" onSubmit={review} noValidate>
        <section className="rsvp-form-section" aria-labelledby="rsvp-attendance-title">
          <h3 id="rsvp-attendance-title">Who will be joining us?</h3>
          <p className="rsvp-help">Please reply for each person named on your invitation.</p>
          {invitation.guests.map(guest => <fieldset className="rsvp-person" key={guest.id}>
            <legend>{guest.name}</legend>
            <div className="rsvp-options">
              <label><input id={`attendance-${guest.id}`} type="radio" name={`attendance-${guest.id}`} value="yes" checked={draft.attendance[guest.id] === "yes"} onChange={() => update({ attendance: { ...draft.attendance, [guest.id]: "yes" } })} aria-describedby={errors[`attendance-${guest.id}`] ? `attendance-${guest.id}-error` : undefined} aria-invalid={!!errors[`attendance-${guest.id}`]} />Happily attending</label>
              <label><input type="radio" name={`attendance-${guest.id}`} value="no" checked={draft.attendance[guest.id] === "no"} onChange={() => update({ attendance: { ...draft.attendance, [guest.id]: "no" } })} />Regretfully declining</label>
            </div>
            {error(`attendance-${guest.id}`)}
            {draft.attendance[guest.id] === "yes" && <>
              <label htmlFor={`dietary-${guest.id}`}>Dietary needs or allergies for {guest.name} (optional)</label>
              <input id={`dietary-${guest.id}`} maxLength={500} value={draft.dietary[guest.id] || ""} onChange={event => update({ dietary: { ...draft.dietary, [guest.id]: event.target.value } })} />
            </>}
          </fieldset>)}
        </section>
        {!allDeclining && <>
          {invitation.additionalGuestAllowance > 0 && <fieldset className="rsvp-form-section" aria-describedby="rsvp-plus-one-help">
            <legend>Will you bring a plus one?</legend>
            <div className="rsvp-options">
              <label><input id="plusOne" type="radio" name="plusOne" checked={draft.bringPlusOne === "yes"} onChange={() => update({ bringPlusOne: "yes", additionalGuests: draft.additionalGuests.length ? draft.additionalGuests : [{ id: crypto.randomUUID(), name: "", dietary: "" }] })} aria-describedby={errors.plusOne ? "plusOne-error" : "rsvp-plus-one-help"} aria-invalid={!!errors.plusOne} />Yes</label>
              <label><input type="radio" name="plusOne" checked={draft.bringPlusOne === "no"} onChange={() => update({ bringPlusOne: "no" })} />No</label>
            </div>
            <p className="rsvp-help rsvp-plus-one-help" id="rsvp-plus-one-help">Children of all ages are warmly welcome. Children under the age of 5 do not need to be registered as a plus one. If one is attending let us know in the field below!</p>
            <label htmlFor="childrenNotes">Children under 5 attending (optional)</label>
            <textarea id="childrenNotes" placeholder="Name and dietary restrictions/allergies" rows={2} maxLength={1000} value={draft.childrenNotes || ""} onChange={event => update({ childrenNotes: event.target.value })} />
            {error("plusOne")}
            {draft.bringPlusOne === "yes" && draft.additionalGuests.map(guest => <div className="rsvp-added-guest" key={guest.id}>
              <label htmlFor={`name-${guest.id}`}>Plus one's full name</label>
              <input id={`name-${guest.id}`} maxLength={100} value={guest.name} onChange={event => update({ additionalGuests: draft.additionalGuests.map(item => item.id === guest.id ? { ...item, name: event.target.value } : item) })} aria-invalid={!!errors[`name-${guest.id}`]} aria-describedby={errors[`name-${guest.id}`] ? `name-${guest.id}-error` : undefined} />
              {error(`name-${guest.id}`)}
              <label htmlFor={`dietary-${guest.id}`}>Dietary needs or allergies (optional)</label>
              <input id={`dietary-${guest.id}`} maxLength={500} value={guest.dietary} onChange={event => update({ additionalGuests: draft.additionalGuests.map(item => item.id === guest.id ? { ...item, dietary: event.target.value } : item) })} />
            </div>)}
            {draft.bringPlusOne === "yes" && draft.additionalGuests.length < invitation.additionalGuestAllowance && <button type="button" className="rsvp-add-button" onClick={() => update({ additionalGuests: [...draft.additionalGuests, { id: crypto.randomUUID(), name: "", dietary: "" }] })}>+ Add another guest</button>}
          </fieldset>}
          {travelProfile === "traveling" && <><fieldset className="rsvp-form-section" aria-describedby="rsvp-hotel-help">
            <legend>A group hotel offer in Kaunas</legend>
            <p className="rsvp-help" id="rsvp-hotel-help">For guests traveling to Kaunas and staying September 3–4: would you like to receive a group hotel offer if we find one? Choosing yes does not reserve a room.</p>
            <div className="rsvp-options">{["yes", "no"].map((value, index) => <label key={value}><input id={index === 0 ? "hotelOffer" : "hotelOffer-no"} type="radio" name="hotelOffer" checked={draft.hotelOffer === value} onChange={() => update({ hotelOffer: value as RsvpDraft["hotelOffer"] })} aria-describedby={errors.hotelOffer ? "hotelOffer-error" : "rsvp-hotel-help"} aria-invalid={!!errors.hotelOffer} />{value === "yes" ? "Yes please" : "No Thank you"}</label>)}</div>
            {error("hotelOffer")}
          </fieldset>
          {(draft.hotelOffer === "yes") && <div className="rsvp-form-section">
            <label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" maxLength={254} value={draft.email} onChange={event => update({ email: event.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error rsvp-email-help" : "rsvp-email-help"} />{error("email")}
            <p className="rsvp-email-help" id="rsvp-email-help">We'll use this email to share the Kaunas group hotel offer for September 3–4 and updates about arranging that stay.</p>
          </div>}</>}
          {travelProfile === "local" && <fieldset className="rsvp-form-section" aria-describedby="rsvp-venue-help">
            <legend>A night at the venue · September 4–5</legend>
            <p className="rsvp-help" id="rsvp-venue-help">Would your attending party like to stay overnight at Villa 9 Vėjai after the wedding? All guests are welcome to stay, including those who live nearby. Please let us know so we can plan accommodation.</p>
            <div className="rsvp-options">{["yes", "no"].map((value, index) => <label key={value}><input id={index === 0 ? "venueStay" : "venueStay-no"} type="radio" name="venueStay" checked={draft.venueStay === value} onChange={() => update({ venueStay: value as RsvpDraft["venueStay"] })} aria-describedby={errors.venueStay ? "venueStay-error" : "rsvp-venue-help"} aria-invalid={!!errors.venueStay} />{value === "yes" ? "Yes please" : "No Thank you"}</label>)}</div>
            {error("venueStay")}
            <p className="rsvp-help rsvp-plus-one-help">If only some of your party will stay, please tell us who in the notes below.</p>
          </fieldset>}
        </>}
        <section className="rsvp-form-section" aria-labelledby="rsvp-contact-title">
          <h3 id="rsvp-contact-title">Anything else?</h3>
          <label htmlFor="comments">Anything else you&apos;d like us to know? (optional)</label><textarea id="comments" rows={3} maxLength={2000} value={draft.comments} onChange={event => update({ comments: event.target.value })} />
        </section>
        {Object.keys(errors).length > 0 && <p className="rsvp-error" role="alert">Please complete the highlighted answers before reviewing your reply.</p>}
        <button className="rsvp-submit" type="submit">Review your reply</button>
      </form> : <section className="rsvp-review" aria-labelledby="rsvp-review-title">
        <h3 id="rsvp-review-title" ref={heading} tabIndex={-1}>{step === "saved" ? "Your reply has been sent to Marthe and Deivi" : "Review your reply"}</h3>
        <ul>{response.guests.map(guest => <li key={guest.guestId}><strong>{guest.name}</strong> &mdash; {guest.attending ? "Attending" : "Declining"}{guest.dietary && <span>Dietary needs: {guest.dietary}</span>}</li>)}
          {response.additionalGuests.map(guest => <li key={guest.id}><strong>{guest.name}</strong> &mdash; Additional guest{guest.dietary && <span>Dietary needs: {guest.dietary}</span>}</li>)}
        </ul>
        {response.hotelOffer && <p><strong>Kaunas hotel offer, September 3–4:</strong> {response.hotelOffer === "yes" ? "Yes" : "No"}</p>}
        {response.venueStay && <p><strong>Venue stay, September 4–5:</strong> {response.venueStay === "yes" ? "Yes" : "No"}</p>}
        {response.email && <p><strong>Email for group hotel updates:</strong> {response.email}</p>}
        {response.childrenNotes && <p className="rsvp-review-comments"><strong>Children under 5:</strong> {response.childrenNotes}</p>}
        {response.comments && <p className="rsvp-review-comments"><strong>Notes:</strong> {response.comments}</p>}
        {saveError && <p className="rsvp-error" role="alert">{saveError}</p>}
        {step === "review" && <button type="button" className="rsvp-submit" disabled={sending} onClick={() => void save()}>{sending ? "Sending…" : "Send reply"}</button>}
        <button type="button" className="rsvp-add-button" disabled={sending} onClick={() => { setStep("edit"); setSaveError(""); }}>Edit your reply</button>
      </section>}
    </div>
  );
}
