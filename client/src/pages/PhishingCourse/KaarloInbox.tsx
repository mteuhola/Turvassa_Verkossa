import { useEffect, useRef, useState } from "react";
import { kaarloEmails, isKaarloDecisionCorrect } from "./kaarloEmails";
import KaarloFeedback from "./KaarloFeedback";
import styles from "./PhishingCourse.module.css";

type Action = "report" | "restore";
export default function KaarloInbox({
  onComplete,
  onSelect,
}: {
  onComplete: () => void;
  onSelect: (index: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [folder, setFolder] = useState<"inbox" | "junk">("inbox");
  const [actions, setActions] = useState<Record<string, Action>>({});
  const [feedback, setFeedback] = useState<{
    title: string;
    explanation: string;
    response?: string;
    closeEmail?: boolean;
  } | null>(null);
  const subject = useRef<HTMLHeadingElement>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const email = selected === null ? null : kaarloEmails[selected];
  const reported = kaarloEmails.filter(
    (item) => actions[item.id] === "report",
  ).length;
  const sorted = kaarloEmails.every((item, index) =>
    isKaarloDecisionCorrect(index, actions[item.id] === "report"),
  );
  const visible = kaarloEmails.filter(
    (item) => (actions[item.id] === "report") === (folder === "junk"),
  );
  useEffect(() => {
    if (selected !== null) subject.current?.focus({ preventScroll: true });
  }, [selected]);

  function act(action: Action) {
    if (!email || selected === null) return;
    setActions((current) => ({ ...current, [email.id]: action }));
    const correct = isKaarloDecisionCorrect(selected, action === "report");
    setFeedback({
      title: correct
        ? action === "report"
          ? "Huijausviesti siirretty roskapostiin"
          : "Viesti palautettu saapuneisiin"
        : "Pohditaan vielä",
      explanation: email.explanation,
      response: correct ? email.response : undefined,
      closeEmail: true,
    });
  }

  function dismissFeedback() {
    setFeedback(null);
    if (feedback?.closeEmail) {
      setSelected(null);
      requestAnimationFrame(() =>
        listHeading.current?.focus({ preventScroll: true }),
      );
    }
  }

  return (
    <section aria-label="Kaarlon harjoitussähköposti">
      <p>
        Avaa viestejä haluamassasi järjestyksessä. Ilmoita huijausviestit
        tietojenkalasteluksi <strong>varoitus- ja roskakoripainikkeella</strong>. Jätä muut viestit saapuneisiin. Kun olet valmis, voit painaa <strong>Valmis</strong> -painiketta.
      </p>
      <div className={styles.mailDesktop}>
        <div className={styles.mailAppBar}>
          <strong>Kaarlon sähköposti</strong>
          <span>kaarlo@kuustonen.fi</span>
        </div>
        <div className={styles.mailWorkspace}>
          <aside className={styles.mailFolders} aria-label="Sähköpostikansiot">
            {(["inbox", "junk"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={folder === value}
                onClick={() => {
                  setFolder(value);
                  setSelected(null);
                }}
              >
                {value === "inbox"
                  ? `Saapuneet (${kaarloEmails.length - reported})`
                  : `Roskaposti (${reported})`}
              </button>
            ))}
          </aside>
          <div className={styles.mailContent}>
            <h2 ref={listHeading} tabIndex={-1}>
              {folder === "inbox" ? "Saapuneet" : "Roskaposti"}
            </h2>
            {visible.length === 0 ? (
              <p>Tässä kansiossa ei ole viestejä.</p>
            ) : (
              <ul className={styles.inboxList}>
                {visible.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={email?.id === item.id}
                      onClick={() => {
                        const index = kaarloEmails.findIndex(
                          (entry) => entry.id === item.id,
                        );
                        setSelected(index);
                        onSelect(index);
                      }}
                    >
                      <span>{item.sender}</span>
                      <strong>{item.subject}</strong>
                      <span>{item.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {email ? (
              <>
                <div
                  className={styles.mailCommandBar}
                  aria-label="Viestin toiminnot"
                >
                  {actions[email.id] === "report" ? (
                    <button
                      className={styles.action}
                      type="button"
                      onClick={() => act("restore")}
                    >
                      Ei roskapostia, palauta saapuneisiin
                    </button>
                  ) : (
                    <button
                      className={`${styles.action} ${styles.mailIconAction}`}
                      type="button"
                      aria-label="Ilmoita tietojenkalasteluksi ja siirrä roskapostiin"
                      title="Ilmoita tietojenkalasteluksi ja siirrä roskapostiin"
                      onClick={() => act("report")}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3 2 21h20L12 3Z" />
                        <path d="M12 9v5m0 3v.1" />
                      </svg>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
                      </svg>
                    </button>
                  )}
                  <button
                    className={styles.action}
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      requestAnimationFrame(() =>
                        listHeading.current?.focus({ preventScroll: true }),
                      );
                    }}
                  >
                    Sulje viesti
                  </button>
                </div>
                <article
                  className={styles.email}
                  aria-labelledby="kaarlo-subject"
                >
                  <div className={styles.mailToolbar}>
                    <span>
                      {actions[email.id] === "report"
                        ? "Roskaposti"
                        : "Saapuneet"}
                    </span>
                    <span>Kaarlon sähköposti</span>
                  </div>
                  <header className={styles.emailHeader}>
                    <h2 id="kaarlo-subject" ref={subject} tabIndex={-1}>
                      {email.subject}
                    </h2>
                    <dl className={styles.emailMetadata}>
                      <dt>Lähettäjä</dt>
                      <dd>
                        {email.sender}
                        <br />
                        {email.address}
                      </dd>
                      <dt>Vastaanottaja</dt>
                      <dd>kaarlo@kuustonen.fi</dd>
                      <dt>Saapunut</dt>
                      <dd>{email.time}</dd>
                      <dt>Liitteet</dt>
                      <dd>Ei liitteitä</dd>
                    </dl>
                  </header>
                  <div className={styles.emailBody}>
                    {email.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {email.link && (
                      <>
                        <a
                          href={email.link.destination}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {email.link.text}
                        </a>
                      </>
                    )}
                  </div>
                </article>
              </>
            ) : (
              <p>
                Valitse viesti luettelosta nähdäksesi sen sisällön.
              </p>
            )}
          </div>
        </div>
      </div>
      <p id="kaarlo-completion-help" role="status">
        {sorted
          ? "Viestit ovat oikeissa kansioissa. Voit jatkaa toiseen osaan."
          : "Voit jatkaa, kun huijausviestit ovat roskapostissa ja muut viestit saapuneissa."}
      </p>
      <button
        type="button"
        className={`${styles.action} ${styles.primaryAction}`}
        aria-describedby="kaarlo-completion-help"
        disabled={!sorted}
        onClick={() => {
          if (sorted) onComplete();
        }}
      >
        Valmis
      </button>
      {feedback && (
        <KaarloFeedback
          {...feedback}
          onDismiss={dismissFeedback}
          onConfirm={dismissFeedback}
        />
      )}
    </section>
  );
}
