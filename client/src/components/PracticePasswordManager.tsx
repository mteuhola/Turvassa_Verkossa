import { useState } from "react";
import { readPracticePassword } from "../progress/practicePassword";
import styles from "./PracticePasswordManager.module.css";

export default function PracticePasswordManager({
  onFill,
  disabled = false,
}: {
  onFill?: (password: string) => void;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const password = readPracticePassword()?.managerPassword;
  return (
    <details className={styles.root} onToggle={() => setVisible(false)}>
      <summary>Avaa harjoituksen salasananhallinta</summary>
      <p>
        Tämä on harjoitus, ei oikea salasananhallintaohjelma. Tänne tallennettua
        salasanaa ei saa käyttää missään oikeassa palvelussa. Se säilyy tässä
        selaimessa luettavassa muodossa, kunnes vaihdat sen tai nollaat
        edistymisen.
      </p>
      {password ? (
        <>
          <h3>Turvassa Verkossa -harjoitus</h3>
          <p className={styles.password}>
            {visible ? password : "***************"}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={visible}
              onClick={() => setVisible(!visible)}
            >
              {visible ? "Piilota salasana" : "Näytä salasana"}
            </button>
            {onFill && (
              <button
                type="button"
                disabled={disabled}
                onClick={() => {
                  onFill(password);
                  setVisible(false);
                }}
              >
                Täytä salasana
              </button>
            )}
          </div>
        </>
      ) : (
        <p>
          Salasananhallintaan ei ole tallennettu harjoitussalasanaa. Käytä
          muistiinpanoasi tai luo uusi salasana salasanaharjoituksessa.
        </p>
      )}
    </details>
  );
}
