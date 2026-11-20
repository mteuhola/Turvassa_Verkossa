import { isExactSelection } from "../../selection";

export const passwordExamples = [
  {
    name: "salasana",
    value: "salasana",
    question: "Miksi tämä salasana on helppo arvata?",
    choices: [
      "Se on tuttu ja yleisesti käytetty sana.",
      "Siinä ei ole isoja kirjaimia.",
      "Se on suomenkielinen.",
    ],
    correctAnswers: [0],
    lesson:
      "Sana ”salasana” on yleisesti käytetty salasana. Huijarit kokeilevat yleensä tuttuja ja yleisiä salasanoja.",
  },
  {
    name: "Salasana123!",
    value: "Salasana123!",
    question: "Miksi tämä salasana on edelleen melko helppo arvata?",
    choices: [
      "Huutomerkki on väärässä paikassa.",
      "Siinä on tuttu sana ja yleinen numerosarja.",
      "Iso alkukirjain heikentää salasanaa.",
    ],
    correctAnswers: [1],
    lesson:
      "Tuttu sana ja numerosarja 123 muodostavat helposti arvattavan yhdistelmän. Iso kirjain ja huutomerkki eivät yksin tee salasanasta vahvaa.",
  },
  {
    name: "5alasana1sana",
    value: "5alasana1sana",
    question:
      "Miten numeroiden käyttäminen vaikuttaa tämän salasanan vahvuuteen?",
    choices: [
      "Numerot tekevät salasanasta aina vahvan.",
      "Kirjainten korvaaminen numeroilla tekee sanasta mahdottoman tunnistaa.",
      "Tutun sanan voi edelleen tunnistaa, vaikka kirjaimia korvataan numeroilla.",
    ],
    correctAnswers: [2],
    lesson:
      "Esimerkiksi S-kirjaimen korvaaminen numerolla 5 on melko yleinen tapa muokata salasanoja. Tuttu sana voi silti olla helposti arvattavissa.",
  },

  {
    name: "majakka sieni viulu pilvi",
    value: "majakka sieni viulu pilvi",
    question: "Miksi tämä salasana on vaikeampi arvata kuin aiemmat esimerkit?",
    choices: [
      "Se koostuu useasta sanasta, jotka eivät liity toisiinsa.",
      "Siinä käytetään ainoastaan pieniä kirjaimia.",
      "Kaikki sen sisältämät sanat ovat suomenkielisiä.",
    ],
    correctAnswers: [0],
    lesson:
      "Useasta toisistaan riippumattomasta sanasta voi muodostaa pitkän salasanan, joka on sekä vaikeasti arvattava että helpompi muistaa.",
  },
  {
    name: "k65I(g50*tw39x1&.}8QplsU4R0546A1",
    value: "k65I(g50*tw39x1&.}8QplsU4R0546A1",
    question: "Mikä tekee tästä salasanasta erityisen vaikean arvata?",
    choices: [
      "Salasanassa on isoja kirjaimia, mikä on ainut syy erityiselle vahvuudelle.",
      "Se on pitkä, eikä sen merkeistä muodostu helposti arvattavia sanoja tai sarjoja.",
      "Se sisältää enemmän numeroita kuin sanoja.",
    ],
    correctAnswers: [1],
    lesson:
      "Salasana on pitkä ja sen sisältöä on vaikea päätellä tai arvata. Tällaisten salasanojen muistamisessa voi hyödyntää esimerkiksi salasanojen hallintaohjelmaa.",
  },
];

export function isExampleCorrect(
  selected: number[] | undefined,
  expected: number[],
) {
  return selected !== undefined && isExactSelection(selected, expected);
}
