import { LockIcon, EmailIcon, MaskIcon } from "./icons";
import styles from "./CourseGuide.module.css";

const courseOverviews: Record<string, string> = {
  passwords:
    "Tutustu salasanojen turvallisuuteen, kokeile salasanan vahvuutta ja pohdi, miten opittua voi käyttää arjessa. Lopuksi kertaat asiat tietovisassa.",
  phishing:
    "Opi huomaamaan huijausviestin merkkejä. Tutki harjoitussähköpostia, pohdi erilaisia viestitilanteita ja kertaa oppimasi tietovisassa.",
  "financial-fraud":
    "Tutustu romanssi- ja sijoitushuijausten varoitusmerkkeihin. Pohdi verkossa syntyvää luottamusta ja rahapyyntöjä sekä kertaa aiheita tietovisassa.",
};

export function CharacterPortrait({ courseId }: { courseId: string }) {
  return (
    <span
      className={styles.portrait}
      data-character={courseId}
      aria-hidden="true"
    />
  );
}

export default function CourseGuide({ courseId }: { courseId: string }) {
  const overview = courseOverviews[courseId];
  if (!overview) return null;
  return (
    <section className={styles.guide} aria-labelledby={`${courseId}-guide`}>
      <span className={styles.icon} aria-hidden="true">
        {courseId === "passwords" && <LockIcon color="currentColor" />}
        {courseId === "phishing" && <EmailIcon color="currentColor" />}
        {courseId === "financial-fraud" && <MaskIcon color="currentColor" />}
      </span>
      <div className={styles.overview}>
        <h2 id={`${courseId}-guide`}>Tällä kurssilla</h2>
        <p>{overview}</p>
      </div>
    </section>
  );
}
