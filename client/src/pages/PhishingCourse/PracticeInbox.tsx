import type { ReactNode } from "react";
import styles from "./PhishingCourse.module.css";

export function PracticeInbox({
  title,
  address,
  folders,
  children,
}: {
  title: string;
  address: string;
  folders: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.mailDesktop}>
      <div className={styles.mailAppBar}>
        <strong>{title}</strong>
        <span>{address}</span>
      </div>
      <div className={styles.mailWorkspace}>
        <aside className={styles.mailFolders} aria-label="Sähköpostikansiot">
          {folders}
        </aside>
        <div className={styles.mailContent}>{children}</div>
      </div>
    </div>
  );
}

export function PracticeMessageList({
  messages,
  selectedId,
  onSelect,
}: {
  messages: readonly {
    id: string;
    sender: string;
    subject: string;
    time: string;
  }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className={styles.inboxList}>
      {messages.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            aria-pressed={selectedId === item.id}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.sender}</span>
            <strong>{item.subject}</strong>
            <span>{item.time}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
