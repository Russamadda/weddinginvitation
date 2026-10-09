"use client";

import { guestText as t, guestError, type GuestLanguage } from "@/lib/guest-language";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildResponse, emptyDraft, invitationGreeting, normalizeDraft, validateRsvp, type Invitation, type RsvpDraft } from "@/lib/rsvp";

export default function RsvpForm({ invitation, inviteToken, initialDraft, language = "en" }: { invitation: Invitation; inviteToken: string; initialDraft?: RsvpDraft; language?: GuestLanguage }) {
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
    const nextErrors = validateRsvp(activeInvitation, draft, language);
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
      if (!result.ok) throw new Error(data.error || t(language, "E011"));
      setStep("saved");
    } catch (error) {
      setSaveError(error instanceof Error ? guestError(language, error.message) : t(language, "E012"));
    } finally { setSending(false); }
  }

  function error(id: string) {
    return errors[id] ? <p className="rsvp-error" id={`${id}-error`}>{errors[id]}</p> : null;
  }

  return (
    <div className="rsvp-form-wrap">
      <h2 className="rsvp-greeting">{invitationGreeting(invitation, language)}</h2>
      {step === "edit" ? <form className="rsvp-form" onSubmit={review} noValidate>
        <section className="rsvp-form-section" aria-labelledby="rsvp-attendance-title">
          <h3 id="rsvp-attendance-title">{t(language, "R005").replace("du/dere", invitation.guests.length === 1 ? "du" : "dere")}</h3>
          <p className="rsvp-help">{t(language, "R006")}</p>
          {invitation.guests.map(guest => <fieldset className="rsvp-person" key={guest.id}>
            <legend>{guest.name}</legend>
            <div className="rsvp-options">
              <label><input id={`attendance-${guest.id}`} type="radio" name={`attendance-${guest.id}`} value="yes" checked={draft.attendance[guest.id] === "yes"} onChange={() => update({ attendance: { ...draft.attendance, [guest.id]: "yes" } })} aria-describedby={errors[`attendance-${guest.id}`] ? `attendance-${guest.id}-error` : undefined} aria-invalid={!!errors[`attendance-${guest.id}`]} />{t(language, "R007")}</label>
              <label><input type="radio" name={`attendance-${guest.id}`} value="no" checked={draft.attendance[guest.id] === "no"} onChange={() => update({ attendance: { ...draft.attendance, [guest.id]: "no" } })} />{t(language, "R008")}</label>
            </div>
            {error(`attendance-${guest.id}`)}
            {draft.attendance[guest.id] === "yes" && <>
              <label htmlFor={`dietary-${guest.id}`}>{t(language, "R009", { name: guest.name })}</label>
              <input id={`dietary-${guest.id}`} maxLength={500} value={draft.dietary[guest.id] || ""} onChange={event => update({ dietary: { ...draft.dietary, [guest.id]: event.target.value } })} />
            </>}
          </fieldset>)}
        </section>
        {!allDeclining && <>
          <section className="rsvp-form-section" aria-labelledby="rsvp-children-title">
            <h3 id="rsvp-children-title">{t(language, "R017")}</h3>
            <p className="rsvp-help">{t(language, "R011")}</p>
            <label htmlFor="childrenNotes">{t(language, "R012")}</label>
            <textarea id="childrenNotes" placeholder={t(language, "R013")} rows={3} maxLength={1000} value={draft.childrenNotes || ""} onChange={event => update({ childrenNotes: event.target.value })} />
          </section>
          {travelProfile === "traveling" && <><fieldset className="rsvp-form-section" aria-describedby="rsvp-hotel-help">
            <legend>{t(language, "T001")}</legend>
            <p className="rsvp-help" id="rsvp-hotel-help">{t(language, "T002")}</p>
            <div className="rsvp-options">{["yes", "no"].map((value, index) => <label key={value}><input id={index === 0 ? "hotelOffer" : "hotelOffer-no"} type="radio" name="hotelOffer" checked={draft.hotelOffer === value} onChange={() => update({ hotelOffer: value as RsvpDraft["hotelOffer"] })} aria-describedby={errors.hotelOffer ? "hotelOffer-error" : "rsvp-hotel-help"} aria-invalid={!!errors.hotelOffer} />{value === "yes" ? t(language, "T003") : t(language, "T004")}</label>)}</div>
            {error("hotelOffer")}
          </fieldset>
          {(draft.hotelOffer === "yes") && <div className="rsvp-form-section">
            <label htmlFor="email">{t(language, "T005")}</label><input id="email" type="email" autoComplete="email" maxLength={254} value={draft.email} onChange={event => update({ email: event.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error rsvp-email-help" : "rsvp-email-help"} />{error("email")}
            <p className="rsvp-email-help" id="rsvp-email-help">{t(language, "T006")}</p>
          </div>}</>}
          {travelProfile === "local" && <fieldset className="rsvp-form-section" aria-describedby="rsvp-venue-help">
            <legend>{t(language, "V001")}</legend>
            <p className="rsvp-help" id="rsvp-venue-help">{t(language, "V002")}</p>
            <div className="rsvp-options">{["yes", "no"].map((value, index) => <label key={value}><input id={index === 0 ? "venueStay" : "venueStay-no"} type="radio" name="venueStay" checked={draft.venueStay === value} onChange={() => update({ venueStay: value as RsvpDraft["venueStay"] })} aria-describedby={errors.venueStay ? "venueStay-error" : "rsvp-venue-help"} aria-invalid={!!errors.venueStay} />{value === "yes" ? t(language, "V003") : t(language, "V004")}</label>)}</div>
            {error("venueStay")}
            <p className="rsvp-help rsvp-plus-one-help">{t(language, "V005")}</p>
          </fieldset>}
        </>}
        <section className="rsvp-form-section" aria-labelledby="rsvp-contact-title">
          <h3 id="rsvp-contact-title">{t(language, "C001")}</h3>
          <label htmlFor="comments">{t(language, "C002")}</label><textarea id="comments" rows={3} maxLength={2000} value={draft.comments} onChange={event => update({ comments: event.target.value })} />
        </section>
        {Object.keys(errors).length > 0 && <p className="rsvp-error" role="alert">{t(language, "E010")}</p>}
        <button className="rsvp-submit" type="submit">{t(language, "C003")}</button>
      </form> : <section className="rsvp-review" aria-labelledby="rsvp-review-title">
        <h3 id="rsvp-review-title" ref={heading} tabIndex={-1}>{step === "saved" ? t(language, "C007") : t(language, "C003")}</h3>
        <ul>{response.guests.map(guest => <li key={guest.guestId}><strong>{guest.name}</strong> &mdash; {guest.attending ? t(language, "C008") : t(language, "C009")}{guest.dietary && <span>{t(language, "C011")} {guest.dietary}</span>}</li>)}
        </ul>
        {response.hotelOffer && <p><strong>{t(language, "C012")}</strong> {response.hotelOffer === "yes" ? t(language, "S011") : t(language, "S012")}</p>}
        {response.venueStay && <p><strong>{t(language, "C013")}</strong> {response.venueStay === "yes" ? t(language, "S011") : t(language, "S012")}</p>}
        {response.email && <p><strong>{t(language, "C014")}</strong> {response.email}</p>}
        {response.childrenNotes && <p className="rsvp-review-comments"><strong>{t(language, "C015")}</strong> {response.childrenNotes}</p>}
        {response.comments && <p className="rsvp-review-comments"><strong>{t(language, "C016")}</strong> {response.comments}</p>}
        {saveError && <p className="rsvp-error" role="alert">{saveError}</p>}
        {step === "review" && <button type="button" className="rsvp-submit" disabled={sending} onClick={() => void save()}>{sending ? t(language, "C005") : t(language, "C004")}</button>}
        <button type="button" className="rsvp-add-button" disabled={sending} onClick={() => { setStep("edit"); setSaveError(""); }}>{t(language, "C006")}</button>
      </section>}
    </div>
  );
}
