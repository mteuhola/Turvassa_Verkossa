import styles from "./CourseGuide.module.css";

const courseGuides: Record<
  string,
  { name: string; introduction: string; quote: string; invitation: string }
> = {
  passwords: {
    name: "Sanna",
    introduction: "Tutustu Sannaan",
    quote:
      "Salasanoja tarvitaan joka paikkaan. Miten keksisin sellaisen, jonka muistan itse mutta jota muut eivät arvaa?",
    invitation:
      "Kokeile Sannan kanssa, millainen salasana on vahva. Aloita esimerkeistä ja keksi sitten oma harjoitussalasana.",
  },
  phishing: {
    name: "Kaarlo",
    introduction: "Tutustu Kaarloon",
    quote:
      "Sain pankin nimissä viestin, jossa pyydetään toimimaan heti. Uskallanko avata siinä olevan linkin?",
    invitation:
      "Tutki harjoitusviestiä Kaarlon kanssa. Etsi kohdat, joiden vuoksi viestiin ei kannata luottaa.",
  },
  "romance-fraud": {
    name: "Raija",
    introduction: "Tutustu Raijaan",
    quote:
      "Olen jutellut mukavan ihmisen kanssa netissä. Nyt hän pyytää rahaa, vaikka emme ole koskaan tavanneet. Mitä minun pitäisi ajatella?",
    invitation:
      "Pohdi Raijan tilannetta. Voit aloittaa alla olevasta tietovisasta.",
  },
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
  const guide = courseGuides[courseId];
  if (!guide) return null;
  return (
    <section className={styles.guide} aria-labelledby={`${courseId}-guide`}>
      <CharacterPortrait courseId={courseId} />
      <div className={styles.story}>
        <h2 id={`${courseId}-guide`}>{guide.introduction}</h2>
        <blockquote>”{guide.quote}”</blockquote>
        <p>{guide.invitation}</p>
        <p className={styles.caption}>
          {guide.name} on kuvitteellinen harjoituskaveri.
        </p>
      </div>
    </section>
  );
}
