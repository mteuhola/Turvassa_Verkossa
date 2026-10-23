import { useLayoutEffect, useRef } from "react";
import styles from "./PhishingCourse.module.css";

interface Props {
  title: string;
  explanation: string;
  anchor: HTMLElement;
  reviewed: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function ClueExplanation({
  title,
  explanation,
  anchor,
  reviewed,
  onConfirm,
  onDismiss,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = dialog.current!;
    anchor.scrollIntoView({ block: "nearest", behavior: "instant" });
    element.showModal();
    heading.current?.focus({ preventScroll: true });
    const position = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const offsetX = viewport?.offsetLeft ?? 0;
      const offsetY = viewport?.offsetTop ?? 0;
      element.style.maxHeight = `${Math.max(0, height - 32)}px`;
      element.style.width = `${Math.min(560, width - 32)}px`;
      const target = anchor.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const right = target.right + 16;
      const left =
        right + box.width <= offsetX + width - 16
          ? right
          : target.left - box.width - 16 >= offsetX + 16
            ? target.left - box.width - 16
            : target.left;
      const top =
        right + box.width <= offsetX + width - 16 ||
        target.left - box.width - 16 >= offsetX + 16
          ? target.top
          : target.bottom + 16 + box.height <= offsetY + height - 16
            ? target.bottom + 16
            : target.top - box.height - 16;
      element.style.left = `${Math.max(offsetX + 16, Math.min(left, offsetX + width - box.width - 16))}px`;
      element.style.top = `${Math.max(offsetY + 16, Math.min(top, offsetY + height - box.height - 16))}px`;
    };
    position();
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    window.visualViewport?.addEventListener("resize", position);
    window.visualViewport?.addEventListener("scroll", position);
    const observer = new ResizeObserver(position);
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      window.visualViewport?.removeEventListener("resize", position);
      window.visualViewport?.removeEventListener("scroll", position);
      element.close();
      anchor.focus({ preventScroll: true });
    };
  }, [anchor]);

  return (
    <dialog
      ref={dialog}
      className={styles.clueDialog}
      aria-labelledby="clue-title"
      aria-describedby="clue-explanation"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
    >
      <h2 id="clue-title" ref={heading} tabIndex={-1}>
        {title}
      </h2>
      <p id="clue-explanation">{explanation}</p>
      <button
        type="button"
        className={`${styles.action} ${styles.primaryAction}`}
        onClick={onConfirm}
      >
        {reviewed ? "Palaa viestiin" : "Ymmärsin, jatka"}
      </button>
      {!reviewed && (
        <p className={styles.small}>
          Havainto kirjataan, kun valitset ”Ymmärsin, jatka”.
        </p>
      )}
    </dialog>
  );
}
