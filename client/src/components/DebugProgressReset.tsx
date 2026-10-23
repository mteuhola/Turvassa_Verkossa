import { useState } from "react";
import styles from "./DebugProgressReset.module.css";

export default function DebugProgressReset({
  onReset,
}: {
  onReset: () => boolean;
}) {
  const [message, setMessage] = useState("");
  return (
    <section className={styles.root} aria-label="Testaustyökalut">
      <p>
        Testaustyökalu: nollaa tämän selaimen suoritusmerkit, kurssien
        edistyminen ja tallennettu harjoitussalasana.
      </p>
      <button
        type="button"
        onClick={() => {
          const saved = onReset();
          setMessage(
            saved
              ? "Edistyminen ja harjoitussalasana nollattu."
              : "Edistyminen nollattiin tässä näkymässä, mutta selaimen tallennuksen tyhjennys epäonnistui. Tiedot voivat palautua sivun päivityksessä.",
          );
        }}
      >
        Nollaa kurssien edistyminen
      </button>
      <p role="status">{message}</p>
    </section>
  );
}
