import {
  courseIntroductions,
  type TheoryContent,
} from "../Theory/theoryData.ts";

interface TopicDetails {
  id: string;
  isComplete: boolean;
  title: string;
  description: string;
  path: string;
}

export type CourseTopic = TopicDetails &
  ({ kind: "theory"; content: TheoryContent } | { kind?: "activity" | "quiz" });

export interface TopicCourse {
  id: string;
  isComplete: boolean;
  title: string;
  path: string;
  topics: CourseTopic[];
}

type CourseCatalogEntry = TopicCourse & {
  introductionDescription: string;
  helpActivity: Pick<CourseTopic, "id" | "title" | "description">;
};

const courseCatalog: CourseCatalogEntry[] = [
  {
    id: "passwords",
    isComplete: false,
    title: "Salasanojen turvallisuus",
    path: "/course/passwords",
    introductionDescription:
      "Lue, millainen on hyvä salasana, ja tutki esimerkkisalasanoja.",
    helpActivity: {
      id: "help-sanna",
      title: "Auta Sannaa",
      description:
        "Sanna tarvitsee apuasi salasanojen vaihtamisessa ja salasanojen hallintaohjelman kanssa.",
    },
    topics: [
      {
        id: "password-strength",
        isComplete: false,
        title: "Kuinka kaikki salasanat voi muistaa?",
        description: "Opi keinoja salasanojen muistamiseen. ",
        path: "/course/passwords/password-strength",
      },
    ],
  },
  {
    id: "phishing",
    isComplete: false,
    title: "Vaaralliset viestit",
    path: "/course/phishing",
    introductionDescription:
      "Lue tietojenkalastelusta ja huijausviestien varoitusmerkeistä. Etsi huijauksen merkkejä esimerkkiviestistä.",
    helpActivity: {
      id: "help-kaarlo",
      title: "Auta Kaarloa",
      description:
        "Arvioi Kaarlon saamia outoja sähköposteja ja selvitä, mikä johti näiden viestien saapumiseen.",
    },
    topics: [
      {
        id: "safe-responses",
        kind: "activity",
        isComplete: false,
        title: "Kuinka toimia epäilyttävän viestin kanssa?",
        description:
          "Lue mitä tehdä kohdatessaan huijausviestin, ja kuinka toimia, jos huijaus on jo tapahtunut. Harjoittele viestien aitouden tarkistamista.",
        path: "/course/phishing/safe-responses",
      },
    ],
  },
  {
    id: "financial-fraud",
    isComplete: false,
    title: "Liian hyvää ollakseen totta",
    path: "/course/financial-fraud",
    introductionDescription:
      "Tutustu kurssin aiheeseen ja siihen, mitä pääset harjoittelemaan.",
    helpActivity: {
      id: "help-raija",
      title: "Auta Raijaa",
      description:
        "Auta ensin Raijaa tukemaan Simoa sijoitushuijauksen jälkeen. Auttakaa sitten yhdessä Raijaa ottamaan seuraavat askeleet.",
    },
    topics: [
      {
        id: "investment-offers",
        kind: "activity",
        isComplete: false,
        title: "Sijoitushuijaukset",
        description: "Opi sijoitushuijauksista, ja pohdi sijoitustarjousta.",
        path: "/course/financial-fraud/investment-offers",
      },
    ],
  },
];

// Introductions and quizzes count toward progress just like activities.
export const topicCourses: TopicCourse[] = courseCatalog.map(
  ({ introductionDescription, helpActivity, ...course }) => ({
    ...course,
    topics: [
      {
        id: "introduction",
        kind: "theory",
        isComplete: false,
        title: "Johdanto",
        description: introductionDescription,
        path: `${course.path}/introduction`,
        content: courseIntroductions[course.id],
      },
      ...course.topics,
      ...(course.id === "passwords" || course.id === "phishing"
        ? []
        : [
            {
              id: "theory",
              kind: "activity" as const,
              isComplete: false,
              title: "Romanssihuijaukset",
              description:
                "Lue romanssihuijauksista ja etsi varoitusmerkkejä viesteistä.",
              path: `${course.path}/theory`,
            },
          ]),
      {
        ...helpActivity,
        kind: "activity",
        isComplete: false,
        path: `${course.path}/${helpActivity.id}`,
      },
      {
        id: "quiz",
        kind: "quiz",
        isComplete: false,
        title: "Kurssin tietovisa",
        description:
          "Kokeile, mitä olet oppinut. Saat vastauksista palautetta ja voit yrittää uudelleen.",
        path: `${course.path}/quiz`,
      },
    ],
  }),
);
