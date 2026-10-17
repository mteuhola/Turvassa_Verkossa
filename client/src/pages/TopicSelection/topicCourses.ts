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
  flow?: "password-introduction";
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

const courseCatalog: TopicCourse[] = [
  {
    id: "passwords",
    isComplete: false,
    title: "Salasanojen turvallisuus",
    path: "/course/passwords",
    topics: [
      {
        id: "password-strength",
        isComplete: false,
        title: "Kokeile salasanan vahvuutta",
        description:
          "Lue, millainen on hyvä salasana, ja luo oma harjoitussalasanasi.",
        path: "/course/passwords/password-strength",
      },
    ],
  },
  {
    id: "phishing",
    isComplete: false,
    title: "Vaaralliset viestit",
    path: "/course/phishing",
    topics: [
      {
        id: "suspicious-email",
        isComplete: false,
        title: "Tunnista huijausviestin merkit",
        description:
          "Tutki kuvitteellista sähköpostia ja etsi sen epäilyttävät kohdat. Saat jokaisesta havainnosta selityksen ja tarvittaessa vihjeen.",
        path: "/course/phishing/suspicious-email",
      },
    ],
  },
  {
    id: "financial-fraud",
    isComplete: false,
    title: "Liian hyvää ollakseen totta",
    path: "/course/financial-fraud",
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
export const topicCourses: TopicCourse[] = courseCatalog.map((course) => ({
  ...course,
  topics: [
    {
      id: "introduction",
      kind: "theory",
      ...(course.id === "passwords"
        ? { flow: "password-introduction" as const }
        : {}),
      isComplete: false,
      title: "Johdanto",
      description:
        "Tutustu kurssin aiheeseen ja siihen, mitä pääset harjoittelemaan.",
      path: `${course.path}/introduction`,
      content: courseIntroductions[course.id],
    },
    ...course.topics,
    ...(course.id === "passwords"
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
        "Kokeile, mitä muistat. Saat vastauksista palautetta ja voit yrittää uudelleen.",
      path: `${course.path}/quiz`,
    },
  ],
}));
