import { useEffect, useRef, useState } from "react";
import styles from "./RaijaActivity.module.css";

const notes = [
  {
    title: "Mitä Simo maksoi?",
    source: "Maksukuitti",
    detail: "2 500 € · Lomakyläsijoitus · Maksu lähetetty",
    sentence: "Siirsin 2 500 euroa lomakyläsijoitukseen.",
    action: "Lisää maksun tiedot",
    explanation: "Maksun tiedot auttavat pankkia selvittämään rahansiirtoa.",
  },
  {
    title: "Mitä Simolle luvattiin?",
    source: "Sijoitustarjous",
    detail: "Saat sijoittamasi rahat takaisin kaksinkertaisina vuodessa.",
    sentence: "Minulle luvattiin rahat takaisin kaksinkertaisina vuodessa.",
    action: "Lisää lupaus",
    explanation:
      "Poikkeuksellisen suuri tuottolupaus on yksi syy epäillä huijausta.",
  },
  {
    title: "Miksi Simo ei kertonut aiemmin?",
    source: "Tarjoajan ohje",
    detail: "Tästä tarjouksesta ei saa kertoa pankille eikä läheisille.",
    sentence: "Tarjoaja kielsi kertomasta asiasta pankille tai läheisille.",
    action: "Lisää salailupyyntö",
    explanation: "Salailupyyntö esti Simoa kysymästä muiden mielipidettä.",
  },
];

export function RecoverySupportLinks() {
  return (
    <details className={styles.document}>
      <summary>Lisää apua</summary>
      <p>Säilytä viestit ja maksutiedot. Tee myös rikosilmoitus poliisille.</p>
      <p>
        <a
          href="https://www.riku.fi/nettihuijaus/"
          target="_blank"
          rel="noreferrer"
        >
          RIKU: tukea ja neuvoja huijauksen jälkeen
        </a>
      </p>
      <p>
        <a href="https://nettideittiturva.fi/" target="_blank" rel="noreferrer">
          Nettideittiturva: apua romanssihuijauksen kokeneille
        </a>
      </p>
      <p className={styles.small}>Linkit avautuvat uuteen välilehteen.</p>
    </details>
  );
}

export default function SimoRecovery({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"prepare" | "call" | "done">("prepare");
  const [count, setCount] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const note = notes[count];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest" });
  }, [stage, count]);

  const account = (
    <section
      className={styles.bankAccount}
      aria-label="Simon kertomus pankille"
    >
      <h3>Näin Simo voi kertoa pankille</h3>
      <p>
        Epäilen, että olen lähettänyt rahaa huijarille.
        {notes.slice(0, count).map((item) => (
          <span key={item.title}> {item.sentence}</span>
        ))}
      </p>
    </section>
  );

  return (
    <section className={styles.simoPractice}>
      <h2 ref={heading} tabIndex={-1}>
        {stage === "prepare"
          ? "Auta Simoa kertomaan pankille"
          : stage === "call"
            ? "Soitetaan pankkiin"
            : "Pankkiin voi soittaa heti"}
      </h2>
      {stage === "prepare" && (
        <>
          {count === 0 && (
            <>
              <p>
                <strong>Simo:</strong> ”Maksoin sen sijoituksen jo ennen kuin
                katsoitte tarjousta. Nyt epäilyttää. En oikein tiedä, mitä
                pankille pitäisi sanoa.”
              </p>
              <p>
                Auta Simoa kokoamaan lyhyt kertomus. Saat tiedot yksi
                kerrallaan.
              </p>
            </>
          )}
          {note && (
            <div className={styles.sourceNote}>
              <h3>{note.title}</h3>
              <p>
                <strong>{note.source}:</strong> {note.detail}
              </p>
              <button
                className={styles.primary}
                onClick={() =>
                  setCount((current) => Math.min(current + 1, notes.length))
                }
              >
                {note.action}
              </button>
            </div>
          )}
          {account}
          <p className={styles.noteReason} role="status">
            {count > 0 ? notes[count - 1].explanation : ""}
          </p>
          <p className={styles.small}>
            Tietoja ei tarvitse kerätä valmiiksi ennen yhteydenottoa.
          </p>
          <button
            className={note ? undefined : styles.primary}
            onClick={() => setStage("call")}
          >
            {note ? "Soitetaan jo nyt" : "Soitetaan pankkiin"}
          </button>
          <p className={styles.small}>
            Tämä on harjoitus. Oikeaa puhelua ei soiteta.
          </p>
        </>
      )}
      {stage === "call" && (
        <>
          <p>
            Simo löytää numeron pankkinsa omasta sovelluksesta. Olet hänen
            vierellään, kun hän soittaa.
          </p>
          <p>
            <strong>Pankin työntekijä:</strong> Mitä on tapahtunut?
          </p>
          {account}
          {count < notes.length && (
            <p>
              Tällä pääsee alkuun. Pankin työntekijä kysyy tarvittavat
              lisätiedot.
            </p>
          )}
          <button className={styles.primary} onClick={() => setStage("done")}>
            Simo kertoo tapahtuneesta
          </button>
          <p className={styles.small}>Harjoituspuhelu</p>
        </>
      )}
      {stage === "done" && (
        <>
          <p>
            <strong>Simo:</strong> ”Sain kerrottua. Pankki selvittää nyt
            maksua.”
          </p>
          <p className={styles.takeaway}>
            Kun rahaa on jo lähetetty, ota heti yhteyttä pankkiin. Kaikkia
            tietoja ei tarvitse tietää valmiiksi.
          </p>
          <p>
            Pankki arvioi, voiko maksuun vielä puuttua. Rahojen palautumista ei
            voida luvata.
          </p>
          <button className={styles.primary} onClick={onFinish}>
            Jatka Raijan kanssa
          </button>
          <RecoverySupportLinks />
        </>
      )}
    </section>
  );
}
