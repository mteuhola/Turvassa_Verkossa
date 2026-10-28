import { useEffect, useId, useRef, useState } from "react";
import { emailParts } from "../PhishingCourse/phishingEmail";
import styles from "./Quiz.module.css";

const notificationLink = emailParts.find((part) => part.id === "fakeLink")!;

export default function QuizNotifications({
  isLastQuestion,
}: {
  isLastQuestion: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [received, setReceived] = useState(false);
  const [read, setRead] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const unread = received && !read && !open;

  useEffect(() => {
    if (!isLastQuestion) return;
    const timer = window.setTimeout(() => setReceived(true), 3000);
    return () => window.clearTimeout(timer);
  }, [isLastQuestion]);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !container.current?.contains(event.target)
      ) {
        setOpen(false);
        if (received) setRead(true);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        if (received) setRead(true);
        button.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open, received]);

  return (
    <div className={styles.notifications} ref={container}>
      <button
        ref={button}
        type="button"
        className={styles.notificationButton}
        data-unread={unread}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen(!open);
          if (received) setRead(true);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
        <span>Ilmoitukset</span>
        {unread && (
          <span className={styles.notificationBadge}>1 uusi viesti</span>
        )}
      </button>
      <span className={styles.srOnly} role="status" aria-live="polite">
        {received ? "Uusi viesti saapui. Avaa Ilmoitukset lukeaksesi sen." : ""}
      </span>
      {open && (
        <section
          id={panelId}
          className={styles.notificationPanel}
          aria-label="Ilmoitukset"
        >
          {received ? (
            <>
              <p>
                <strong>Tonttupankki</strong>
              </p>
              <p>
                Tililläsi on havaittu poikkeavaa toimintaa. Vahvista tietosi
                heti, jotta tilisi pysyy käytössä.
              </p>
              <a
                href={notificationLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vahvista tietosi
              </a>
            </>
          ) : (
            <p>Ei viestejä</p>
          )}
        </section>
      )}
    </div>
  );
}
