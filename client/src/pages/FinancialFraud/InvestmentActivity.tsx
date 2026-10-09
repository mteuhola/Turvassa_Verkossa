import { useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import CompletionNotice from "../../components/CompletionNotice";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import {
  investmentOffers,
  clueIds,
  discoverClue,
  allCluesFound,
  type InvestmentOffer,
  type OfferPart,
} from "./investmentOffers";
import styles from "./InvestmentActivity.module.css";

export default function InvestmentActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [found, setFound] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const complete = allCluesFound(found);
  function inspect(offer: InvestmentOffer, part: OfferPart) {
    const id = offer.id + "/" + part.id;
    const next = discoverClue(found, id);
    setFound(next);
    setFeedback(
      (part.suspicious
        ? found.includes(id)
          ? "Löysit tämän jo. "
          : "Hyvä havainto! "
        : "Tämä kohta ei yksin ole varoitusmerkki. ") + part.explanation,
    );
    if (!complete && allCluesFound(next)) onComplete();
  }
  return (
    <div className={styles.root} data-course="financial-fraud">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/financial-fraud">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <h1>Tunnista epäilyttävät sijoitustarjoukset</h1>
          <p>
            Tutki kolmea kuvitteellista tarjousta. Valitse tekstikohdat, jotka
            herättävät epäilyksiä. Jokaisessa tarjouksessa on kolme
            varoitusmerkkiä ja yksi kohta, joka ei yksin osoita huijausta.
          </p>
          <p>
            Valinnat eivät avaa linkkejä tai siirrä rahaa. Voit kokeilla
            rauhassa. Kun löydät kaikki yhdeksän merkkiä, saat suoritusmerkin.
          </p>
          {isComplete && <CompletionBadge />}
        </header>
        <p>
          Löydetty {found.length}/{clueIds.length} varoitusmerkkiä
        </p>
        <progress
          value={found.length}
          max={clueIds.length}
          aria-label="Löydetyt varoitusmerkit"
        />
        <div
          className={styles.feedback}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {feedback}
        </div>
        <div className={styles.offers}>
          {investmentOffers.map((offer, index) => (
            <section
              className={styles.offer}
              key={offer.id}
              aria-labelledby={offer.id}
            >
              <h2 id={offer.id}>
                {index + 1}. {offer.title}
              </h2>
              <p>{offer.intro}</p>
              <p className={styles.count}>
                Löydetty{" "}
                {
                  offer.parts.filter((part) =>
                    found.includes(offer.id + "/" + part.id),
                  ).length
                }
                /3
              </p>
              {offer.parts.map((part) => {
                const discovered = found.includes(offer.id + "/" + part.id);
                return (
                  <div key={part.id} className={styles.part}>
                    <button
                      type="button"
                      onClick={() => inspect(offer, part)}
                      data-found={discovered}
                    >
                      {part.text}
                      {discovered && <strong> ✓ Löydetty</strong>}
                    </button>
                    {discovered && (
                      <p className={styles.explanation}>{part.explanation}</p>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>
        {complete && (
          <CompletionNotice>
            <h2>Kaikki varoitusmerkit löytyivät!</h2>
            <p>
              Huomasit, miten tuottolupauksilla, kiireellä ja luottamuksen
              herättämisellä voidaan houkutella maksamaan. Jatka seuraavaksi
              teoriaan.
            </p>
            <Link to="/course/financial-fraud/theory">
              Seuraava aihe: Teoria →
            </Link>
          </CompletionNotice>
        )}
        <button
          className={styles.restart}
          type="button"
          onClick={() => {
            setFound([]);
            setFeedback(
              "Harjoitus aloitettu alusta. Aiemmin ansaittu suoritusmerkki säilyy.",
            );
          }}
        >
          Kokeile uudelleen
        </button>
        <p>
          Keskeneräiset löydöt eivät tallennu. Ansaittu suoritusmerkki säilyy
          tässä selaimessa.
        </p>
      </main>
    </div>
  );
}
