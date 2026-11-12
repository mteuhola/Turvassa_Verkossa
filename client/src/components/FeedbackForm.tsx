import { useRef, useState, type FormEvent } from "react";
import { getVisitorId } from "../visitorId";
import styles from "./FeedbackForm.module.css";

const MAX_LENGTH = 5000;

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !feedback.trim()) return;
    submitting.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: getVisitorId(),
          feedback: feedback.trim(),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Feedback request failed");
      const result = await response.json();
      if (result.status !== "received")
        throw new Error("Invalid feedback response");
      setFeedback("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <section className={styles.root} aria-label="Palaute">
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="feedback-form"
        onClick={() => setOpen(!open)}
      >
        {open ? "Sulje palautelomake" : "Anna palautetta"}
      </button>
      <form
        id="feedback-form"
        className={styles.form}
        hidden={!open}
        onSubmit={submit}
      >
        <label htmlFor="feedback-message">Palautteesi</label>
        <p id="feedback-hint" className={styles.hint}>
          Kerro, mikä toimi tai mitä voisi parantaa. Enintään 5000 merkkiä.
        </p>
        <textarea
          id="feedback-message"
          aria-describedby="feedback-hint"
          value={feedback}
          onChange={(event) => {
            event.target.setCustomValidity(
              event.target.value.trim()
                ? ""
                : "Kirjoita palaute ennen lähettämistä.",
            );
            setFeedback(event.target.value);
            setStatus("idle");
          }}
          maxLength={MAX_LENGTH}
          rows={5}
          required
          disabled={status === "sending"}
        />
        <button
          type="submit"
          className={styles.send}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Lähetetään…" : "Lähetä palaute"}
        </button>
        <p role="status" className={styles.message}>
          {status === "success" && "Kiitos! Palautteesi on vastaanotettu."}
          {status === "sending" && "Palautetta lähetetään."}
        </p>
        {status === "error" && (
          <p role="alert" className={styles.message}>
            Lähetys epäonnistui. Palautteesi on yhä kentässä. Tarkista
            verkkoyhteys ja yritä uudelleen.
          </p>
        )}
      </form>
    </section>
  );
}
