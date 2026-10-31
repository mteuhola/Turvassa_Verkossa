export const passwordExamples = [
  {
    name: "salasana",
    value: "salasana",
    question: "Miksi tämä salasana on heikko?",
    choices: [
      "Se on yleinen sana, joka on helppo arvata.",
      "Se on lyhyt ja helposti pääteltävä.",
      "Suomenkielinen sana on aina turvallinen salasana.",
    ],
    correctAnswers: [0, 1],
    lesson:
      "Tuttu sana on helppo arvata. Myös suomalaiset sanat voivat löytyä hyökkääjän sanalistalta.",
  },
  {
    name: "sal4sana1pekka",
    value: "sal4sana1pekka",
    question: "Mitkä väitteet tästä salasanasta pitävät paikkansa?",
    choices: [
      "Salasana on vahva: oman nimen lisääminen tekee siitä yksilöllisen.",
      "A:n korvaaminen numerolla 4 tekee salasanasta arvaamattoman.",
      "Salasana koostuu tutusta sanasta ja yleisestä nimestä, joten se on helppo arvata.",
    ],
    correctAnswers: [2],
    lesson:
      "Oman nimen lisääminen ja yksittäisten kirjainten korvaaminen numeroilla ovat tavallisia muutoksia. Ne eivät yksin tee salasanasta vahvaa, ja voivat paljastaa tietoja käyttäjästä.",
  },
  {
    name: "Salasana123!",
    value: "Salasana123!",
    question: "Mitkä väitteet tästä salasanasta EIVÄT pidä paikkansa?",
    choices: [
      "Erikoismerkki kuten huutomerkki takaa, että salasana on vahva.",
      "Iso alkukirjain tekee tutusta sanasta mahdottoman arvata.",
      "Numerosarja 123 tekee salasanasta arvaamattoman.",
    ],
    correctAnswers: [0, 1, 2],
    lesson:
      "Iso alkukirjain, numerosarja ja huutomerkki ovat tavallisia muutoksia. Merkkien vaihtelu vahvistaa salasanaa, mutta se ei yksin tee salasanasta vahvaa.",
  },
  {
    name: "majakka sieni viulu pilvi",
    value: "majakka sieni viulu pilvi",
    question: "Mikä tekee tästä esimerkistä VAIKEAMMAN arvata?",
    choices: [
      "Se on pitkä.",
      "Salasana sisältää vain pieniä kirjaimia.",
      "Se sisältää useita toisistaan riippumattomia sanoja.",
    ],
    correctAnswers: [0, 2],
    lesson:
      "Pituus ja toisistaan riippumattomat sanat vaikeuttavat arvaamista.",
  },
  {
    name: "k65I(g50*tw39x1&.}8QplsU4R0546A1",
    value: "k65I(g50*tw39x1&.}8QplsU4R0546A1",
    question: "Mikä tekee tästä esimerkistä vaikean arvata?",
    choices: [
      "Salasana on huono, sillä sitä ei voi muistaa.",
      "Se sisältää erilaisia numeroita, kirjaimia ja erikoismerkkejä.",
      "Salasana ei ole tavallinen sana, eikä sen sisältöä pysty päättelemään.",
    ],
    correctAnswers: [1, 2],
    lesson:
      'Erilaiset numerot, isot ja pienet kirjaimet sekä erikoismerkit vaikeuttavat arvaamista, minkä lisäksi salasanan sisältö ei ole helposti pääteltävissä: tuollaisen "sanan" kirjoittamiseen huijari tarvitsee melkoista tuuria.',
  },
];

export function isExampleCorrect(
  selected: number[] | undefined,
  expected: number[],
) {
  return (
    selected !== undefined &&
    selected.length === expected.length &&
    new Set(selected).size === selected.length &&
    expected.every((choice) => selected.includes(choice))
  );
}

export function allExamplesCorrect(answers: Record<number, number[]>) {
  return passwordExamples.every((item, index) =>
    isExampleCorrect(answers[index], item.correctAnswers),
  );
}
