import { useLayoutEffect, useRef } from "react";
import { CharacterPortrait } from "../../components/CourseGuide";
import styles from "./PhishingCourse.module.css";

export default function KaarloFeedback({
  title,
  explanation,
  response,
  complete,
  onDismiss,
  onConfirm,
  confirmLabel,
}: {
  title: string;
  explanation: string;
  response?: string;
  complete?: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement;
    element.showModal();
    heading.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      } else {
        document
          .getElementById("kaarlo-subject")
          ?.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className={`${styles.clueDialog} ${styles.kaarloDialog}`}
      aria-labelledby="kaarlo-feedback-title"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
    >
      <h2 id="kaarlo-feedback-title" ref={heading} tabIndex={-1}>
        {title}
      </h2>
      <p>{explanation}</p>
      {response && (
        <div className={styles.kaarloConcern}>
          <div className={styles.kaarloPortrait}>
            <CharacterPortrait courseId="phishing" />
          </div>
          <p>{response}</p>
        </div>
      )}
      <button
        type="button"
        className={`${styles.action} ${styles.primaryAction}`}
        onClick={onConfirm}
      >
        {confirmLabel ??
          (complete ? "Päätä harjoitus" : "Jatka viestien tarkastelua")}
      </button>
      {complete && (
        <button type="button" className={styles.action} onClick={onDismiss}>
          Palaa postilaatikkoon
        </button>
      )}
    </dialog>
  );
}
