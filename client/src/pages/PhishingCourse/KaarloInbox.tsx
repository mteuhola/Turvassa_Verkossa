import { useEffect, useRef, useState } from "react";
import { kaarloEmails, isKaarloDecisionCorrect } from "./kaarloEmails";
import styles from "./PhishingCourse.module.css";

type Action = "report" | "keep";
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
  const [notice, setNotice] = useState("");
  const subject = useRef<HTMLHeadingElement>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const email = selected === null ? null : kaarloEmails[selected];
  const reported = kaarloEmails.filter(
    (item) => actions[item.id] === "report",
  ).length;
  const solved = kaarloEmails.filter(
    (item, index) =>
      actions[item.id] !== undefined &&
      isKaarloDecisionCorrect(index, actions[item.id] === "report"),
  ).length;
  const visible = kaarloEmails.filter(
    (item) => (actions[item.id] === "report") === (folder === "junk"),
  );
  useEffect(() => {
    if (selected !== null) subject.current?.focus();
  }, [selected]);

  function act(action: Action) {
    if (!email || selected === null) return;
    setActions((current) => ({ ...current, [email.id]: action }));
    const correct = isKaarloDecisionCorrect(selected, action === "report");
    setNotice(
      `${action === "report" ? "Viesti ilmoitettu tietojenkalasteluksi ja siirretty roskapostiin." : "Viesti s?ilytetty saapuneissa."} ${correct ? email.response : "Pohditaan viel?."} ${email.explanation}`,
    );
  }

  return (
    <section aria-label="Kaarlon harjoituss?hk?posti">
      <p>
        Avaa viestejä haluamassasi järjestyksessä. Ilmoita huijausviestit
        tietojenkalasteluksi.
      </p>
      <div className={styles.mailDesktop}>
        <div className={styles.mailAppBar}>
          <strong>Kaarlon sähkäposti</strong>
          <span>kaarlo@kuustonen.fi</span>
        </div>
        <div className={styles.mailWorkspace}>
          <aside className={styles.mailFolders} aria-label="S?hk?postikansiot">
            {(["inbox", "junk"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={folder === value}
                onClick={() => {
                  setFolder(value);
                  setSelected(null);
                  setNotice("");
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
              <p>T?ss? kansiossa ei ole viestej?.</p>
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
                        setNotice("");
                      }}
                    >
                      <span>{item.sender}</span>
                      <strong>{item.subject}</strong>
                      <span>
                        {item.time}
                        {actions[item.id] === "keep" ? " ? S?ilytetty" : ""}
                      </span>
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
                  <button
                    className={styles.action}
                    type="button"
                    disabled={actions[email.id] === "report"}
                    onClick={() => act("report")}
                  >
                    Ilmoita tietojenkalasteluksi
                  </button>
                  <button
                    className={styles.action}
                    type="button"
                    onClick={() => act("keep")}
                  >
                    {actions[email.id] === "report"
                      ? "Ei roskapostia, palauta saapuneisiin"
                      : "Säilytä saapuneissa"}
                  </button>
                  <button
                    className={styles.action}
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setNotice("");
                      requestAnimationFrame(() => listHeading.current?.focus());
                    }}
                  >
                    Sulje viesti
                  </button>
                </div>
                {notice && (
                  <div role="status" className={styles.feedback}>
                    {notice}
                  </div>
                )}
                {actions[email.id] === "report" && folder === "inbox" && (
                  <p>
                    Viesti on nyt Roskaposti-kansiossa. Voit viel? lukea sen
                    alla tai avata toisen viestin.
                  </p>
                )}
                <article
                  className={styles.email}
                  aria-labelledby="kaarlo-subject"
                >
                  <div className={styles.mailToolbar}>
                    <span>Saapuneet</span>
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
                          aria-describedby="kaarlo-link-help"
                        >
                          {email.link.text}
                        </a>
                        <p id="kaarlo-link-help" className={styles.small}>
                          Linkin kohde: {email.link.destination}
                          <br />
                          Avautuu harjoitussivuna uuteen välilehteen.
                        </p>
                      </>
                    )}
                  </div>
                </article>
              </>
            ) : (
              <p>
                Valitse viesti luettelosta, niin näet sen sisällön ja lähettäjän
                tiedot.
              </p>
            )}
          </div>
        </div>
      </div>
      <p role="status">
        Turvallisesti käsitelty: {solved}/{kaarloEmails.length}
      </p>
      {solved === kaarloEmails.length && (
        <div className={styles.feedback}>
          <h2>Postilaatikko on järjestyksessä!</h2>
          <p>
            Huijausviestit ovat roskapostissa ja odotettu toimitusilmoitus
            saapuneissa.
          </p>
          <button
            type="button"
            className={`${styles.action} ${styles.primaryAction}`}
            onClick={onComplete}
          >
            P??t? harjoitus
          </button>
        </div>
      )}
    </section>
  );
}
