interface QuestionBase {
  id: string;
  prompt: string;
  explanation: string;
}
export interface ChoiceQuestion extends QuestionBase {
  type: "single" | "multiple";
  options: { id: string; text: string }[];
  correctOptionIds: string[];
}
export interface PracticePasswordQuestion extends QuestionBase {
  type: "practice-password";
}
export type QuizQuestion = ChoiceQuestion | PracticePasswordQuestion;
export interface CourseQuiz {
  questions: QuizQuestion[];
}

/** Edit course content here; the template handles presentation and feedback. */
export const courseQuizzes: Record<string, CourseQuiz> = {
  passwords: {
    questions: [
      {
        id: "unique",
        type: "single",
        prompt: "Mikä on hyvä tapa käyttää salasanoja eri palveluissa?",
        options: [
          { id: "reuse", text: "Käytän samaa vahvaa salasanaa kaikkialla." },
          {
            id: "unique",
            text: "Käytän jokaisessa palvelussa omaa pitkää salasanaa.",
          },
          {
            id: "suffix",
            text: "Lisään saman salasanan loppuun palvelun nimen.",
          },
        ],
        correctOptionIds: ["unique"],
        explanation:
          "Oma salasana jokaisessa palvelussa estää yhden palvelun salasanavuotoa avaamasta muita tilejäsi. Salasananhallintaohjelma auttaa muistamaan eri salasanat.",
      },
      {
        id: "strong",
        type: "multiple",
        prompt: "Mitkä tavat auttavat suojaamaan tilejäsi?",
        options: [
          {
            id: "length",
            text: "Valitsen pitkän salasanan, jossa on toisiinsa liittymättömiä sanoja.",
          },
          { id: "repeat", text: "Toistan samaa lyhyttä sanaa monta kertaa." },
          {
            id: "manager",
            text: "Käytän salasananhallintaohjelmaa erilaisten salasanojen luomiseen ja muistamiseen.",
          },
          { id: "mfa", text: "Otan monivaiheisen tunnistautumisen käyttöön." },
        ],
        correctOptionIds: ["length", "manager", "mfa"],
        explanation:
          "Pituus ja arvaamattomuus auttavat. Salasananhallintaohjelma helpottaa erilaisten salasanojen käyttöä, ja monivaiheinen tunnistautuminen tuo lisäsuojaa. Ennustettava toisto ei yksin tee salasanasta vahvaa.",
      },
      {
        id: "recall",
        type: "practice-password",
        prompt: "Muistatko luomasi harjoitussalasanan?",
        explanation:
          "Syötit saman harjoitussalasanan kuin tallensit. Oikeita salasanoja ei tarvitse opetella kaikkia ulkoa: salasananhallintaohjelma auttaa muistamaan ne.",
      },
    ],
  },
  phishing: {
    questions: [
      {
        id: "verify",
        type: "single",
        prompt:
          "Saat sähköpostin, jonka mukaan pankkitilisi suljetaan heti. Mitä teet?",
        options: [
          {
            id: "click",
            text: "Avaan viestin linkin nopeasti ja kirjaudun sisään.",
          },
          {
            id: "verify",
            text: "Tarkistan asian pankin omasta sovelluksesta tai tutusta puhelinnumerosta.",
          },
          {
            id: "reply",
            text: "Vastaan viestiin ja lähetän pyydetyn vahvistuskoodin.",
          },
        ],
        correctOptionIds: ["verify"],
        explanation:
          "Kiireellä voidaan painostaa toimimaan tarkistamatta. Tarkista asia itse tuntemasi kanavan kautta ja pidä salasana sekä vahvistuskoodit omana tietonasi.",
      },
      {
        id: "clues",
        type: "multiple",
        prompt: "Mitkä seuraavista ovat syitä epäillä viestiä?",
        options: [
          {
            id: "code",
            text: "Viestissä pyydetään salasanaani ja vahvistuskoodiani.",
          },
          {
            id: "secrecy",
            text: "Minua kielletään tarkistamasta asiaa pankilta tai läheiseltä.",
          },
          {
            id: "attachment",
            text: "Odottamattomassa viestissä on Turvapaivitys.exe-liite.",
          },
          {
            id: "polite",
            text: "Viesti päättyy sanoihin Ystävällisin terveisin.",
          },
        ],
        correctOptionIds: ["code", "secrecy", "attachment"],
        explanation:
          "Salaisten tietojen pyytäminen, tarkistamisen estäminen ja odottamaton ohjelmaliite ovat varoitusmerkkejä. Kohtelias allekirjoitus ei yksin kerro aitoudesta: sen voi kopioida.",
      },
    ],
  },
  "financial-fraud": {
    questions: [
      {
        id: "money",
        type: "single",
        prompt:
          "Vain verkossa tapaamasi ihminen pyytää kiireesti rahaa matkustaakseen luoksesi. Miten toimit?",
        options: [
          { id: "pay", text: "Lähetän rahat heti, koska hän on ystävällinen." },
          {
            id: "pause",
            text: "Pysähdyn, en lähetä rahaa ja keskustelen pyynnöstä luotettavan läheisen kanssa.",
          },
          {
            id: "secret",
            text: "Pidän pyynnön salassa, koska hän pyysi niin.",
          },
        ],
        correctOptionIds: ["pause"],
        explanation:
          "Luottamusta voidaan rakentaa pitkään ennen rahapyyntöä. Kiireellinen matka- tai hätätilanne voi olla keksitty. Pysähtyminen ja läheiseltä kysyminen auttavat arvioimaan tilannetta.",
      },
      {
        id: "investment",
        type: "multiple",
        prompt: "Mitkä asiat herättävät epäilyn sijoitustarjouksesta?",
        options: [
          {
            id: "guarantee",
            text: "Luvataan poikkeuksellisen suuri tuotto ilman mitään riskiä.",
          },
          {
            id: "urgent",
            text: "Rahat täytyy siirtää heti, eikä asiaa saa harkita.",
          },
          {
            id: "fee",
            text: "Omien rahojen nostaminen vaatii yllättäen uuden maksun.",
          },
          {
            id: "time",
            text: "Minulle annetaan aikaa tutustua ehtoihin ja kysyä neuvoa.",
          },
        ],
        correctOptionIds: ["guarantee", "urgent", "fee"],
        explanation:
          "Epärealistiset tuottolupaukset, kiire ja rahojen nostamiseen liitetyt uudet maksut ovat tyypillisiä huijauksen varoitusmerkkejä. Harkinta-aika ei ole tällainen merkki, mutta ei yksin todista tarjousta aidoksi.",
      },
    ],
  },
};

export function isChoiceAnswerCorrect(
  question: ChoiceQuestion,
  selected: string[],
): boolean {
  const chosen = new Set(selected);
  const correct = new Set(question.correctOptionIds);
  return (
    chosen.size > 0 &&
    chosen.size === selected.length &&
    chosen.size === correct.size &&
    (question.type !== "single" || chosen.size === 1) &&
    [...chosen].every((id) => correct.has(id))
  );
}
