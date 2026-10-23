import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  checkSafeActionOrder,
  createSafeActionOrder,
  safeActionSteps,
} from "./safeResponses";
import styles from "./PhishingCourse.module.css";

export default function SafeActionSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [order, setOrder] = useState(createSafeActionOrder);
  const [stage, setStage] = useState<"arrange" | "play" | "complete">(
    "arrange",
  );
  const [position, setPosition] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const stepsHeading = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const pendingFocus = useRef<string | null>(null);
  const check = checkSafeActionOrder(order);
  const step = safeActionSteps.find((item) => item.id === order[position])!;
  const blocked = !check.correct && position === check.index;

  useEffect(() => {
    if (stage !== "arrange") resultHeading.current?.focus();
  }, [stage, position]);
  useEffect(() => {
    if (pendingFocus.current) {
      itemRefs.current[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
  }, [order]);

  function move(index: number, direction: number) {
    const next = [...order];
    const destination = index + direction;
    if (destination < 0 || destination >= order.length) return;
    [next[index], next[destination]] = [next[destination], next[index]];
    pendingFocus.current = order[index];
    setOrder(next);
    setAnnouncement(
      `Siirretty kohtaan ${destination + 1}: ${safeActionSteps.find((item) => item.id === order[index])!.text}`,
    );
  }

  return (
    <>
      <section aria-labelledby="sequence-situation">
        <h2 id="sequence-situation">Ystävän kiireellinen rahapyyntö</h2>
        <p>
          Kuvitteellinen tilanne: ystäväsi nimellä tulee viesti, jossa pyydetään
          maksamaan liitteen lasku heti. Et odottanut laskua. Tavoitteesi on
          selvittää, lähettikö ystävä pyynnön, avaamatta liitettä tai
          maksamatta.
        </p>
        <p>
          Järjestä viisi toimintoa painikkeilla. Kokeile sitten suunnitelmaasi
          vaihe kerrallaan. Tässä harjoituksessa ystävä vastaa puheluun.
          Oikeassa tilanteessa voit odottaa varmistusta ja jättää pyynnön
          toteuttamatta.
        </p>
      </section>
      <p role="status" aria-atomic="true">
        {announcement}
      </p>
      {stage === "arrange" ? (
        <section aria-labelledby="sequence-steps">
          <h2 id="sequence-steps" ref={stepsHeading} tabIndex={-1}>
            Oma toimintaketjusi
          </h2>
          <ol className={styles.sequenceList}>
            {order.map((id, index) => {
              const item = safeActionSteps.find((item) => item.id === id)!;
              return (
                <li
                  key={id}
                  ref={(element) => {
                    itemRefs.current[id] = element;
                  }}
                  tabIndex={-1}
                >
                  <p>{item.text}</p>
                  <div className={styles.actions}>
                    <button
                      className={styles.action}
                      type="button"
                      disabled={index === 0}
                      aria-label={`Siirrä aiemmaksi: ${item.text}`}
                      onClick={() => move(index, -1)}
                    >
                      Siirrä aiemmaksi
                    </button>
                    <button
                      className={styles.action}
                      type="button"
                      disabled={index === order.length - 1}
                      aria-label={`Siirrä myöhemmäksi: ${item.text}`}
                      onClick={() => move(index, 1)}
                    >
                      Siirrä myöhemmäksi
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            className={`${styles.action} ${styles.primaryAction}`}
            onClick={() => {
              setPosition(0);
              setStage("play");
              setAnnouncement("");
            }}
          >
            Kokeile toimintaketjua
          </button>
        </section>
      ) : stage === "play" ? (
        <section
          className={styles.sequencePlayback}
          aria-labelledby="sequence-result"
        >
          <h2 ref={resultHeading} tabIndex={-1} id="sequence-result">
            Vaihe {position + 1}/{order.length}
          </h2>
          <p>
            <strong>{step.text}</strong>
          </p>
          <p>{blocked ? check.feedback : step.result}</p>
          {blocked ? (
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                setStage("arrange");
                setAnnouncement(
                  `Vaihe ${position + 1} tarvitsee muutoksen. ${check.feedback}`,
                );
                requestAnimationFrame(() => stepsHeading.current?.focus());
              }}
            >
              Muokkaa järjestystä
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.action} ${styles.primaryAction}`}
              onClick={() => {
                if (position < order.length - 1) setPosition(position + 1);
                else {
                  setStage("complete");
                  onComplete();
                }
              }}
            >
              {position < order.length - 1
                ? "Seuraava vaihe"
                : "Päätä harjoitus"}
            </button>
          )}
        </section>
      ) : (
        <section
          className={styles.sequencePlayback}
          aria-labelledby="sequence-result"
        >
          <h2 ref={resultHeading} tabIndex={-1} id="sequence-result">
            Turvallinen toimintaketju valmis!
          </h2>
          <p>
            Pysähdyit, etsit tutun yhteystiedon ja varmistit pyynnön ennen
            toimimista. Harjoitus on suoritettu.
          </p>
          <Link
            className={`${styles.action} ${styles.primaryAction}`}
            to="/course/phishing/help-kaarlo"
          >
            Jatka: Auta Kaarloa
          </Link>
          <p>
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                setOrder(createSafeActionOrder());
                setPosition(0);
                setStage("arrange");
                setAnnouncement("Uusi järjestys. Aiempi suoritus säilyy.");
                requestAnimationFrame(() => stepsHeading.current?.focus());
              }}
            >
              Rakenna uudelleen
            </button>
          </p>
        </section>
      )}
    </>
  );
}
