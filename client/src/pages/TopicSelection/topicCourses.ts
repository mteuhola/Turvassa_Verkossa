import { helpStories } from "../Theory/helpStories.ts";
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
  flow?: "password-introduction" | "phishing-introduction";
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
};

const courseCatalog: CourseCatalogEntry[] = [
  {
    id: "passwords",
    isComplete: false,
    title: "Salasanojen turvallisuus",
    path: "/course/passwords",
    introductionDescription:
      "Lue, millainen on hyvä salasana, ja tutki esimerkkisalasanoja.",
    topics: [
      {
        id: "password-strength",
        isComplete: false,
        title: "Kuinka kaikki salasanat voi muistaa?",
        description:
          "Opi millaisia keinoja salasanojen tallettamiseen on. Luo oma harjoitussalasanasi ja harjoittele sen tallettamista.",
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
    topics: [
      {
        id: "safe-responses",
        kind: "activity",
        isComplete: false,
        title: "Kuinka toimia epäilyttävän viestin kanssa?",
        description:
          "Lue mitä tehdä kohdatessaan huijausviestin, ja kuinka toimia, jos huijaus on jo tapahtunut. Harjoittele viestien aitouden tarkistamista tutun sovelluksen ja tallennetun yhteystiedon kautta.",
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
    topics: [
      {
        id: "investment-offers",
        kind: "activity",
        isComplete: false,
        title: "Tunnista epäilyttävät sijoitustarjoukset",
        description:
          "Tutki kolmea sijoitustarjousta ja etsi niiden varoitusmerkit.",
        path: "/course/financial-fraud/investment-offers",
      },
    ],
  },
];

// Introductions and quizzes count toward progress just like activities.
export const topicCourses: TopicCourse[] = courseCatalog.map(
  ({ introductionDescription, ...course }) => ({
    ...course,
    topics: [
      {
        id: "introduction",
        kind: "theory",
        ...(course.id === "passwords"
          ? { flow: "password-introduction" as const }
          : course.id === "phishing"
            ? { flow: "phishing-introduction" as const }
            : {}),
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
              kind: "theory" as const,
              isComplete: false,
              title: "Teoria",
              description: "",
              path: `${course.path}/theory`,
              content: { sections: [] },
            },
          ]),
      {
        id: helpStories[course.id].id,
        kind: "theory",
        isComplete: false,
        title: helpStories[course.id].title,
        description: helpStories[course.id].description,
        path: `${course.path}/${helpStories[course.id].id}`,
        content: helpStories[course.id].content,
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
