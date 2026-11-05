export const investmentCaseId = "holiday-village-v1";

export const villageImage: { src: string | null; alt: string } = {
  src: "/images/investment-cottage.png",
  alt: "Myyjän ainoana kuvana esittämä tekoälykuva lomakylästä.",
};

export const investmentMessages = [
  {
    message:
      "Sijoituksen tarjoaja soitti puhelun lomakylää perustavasta yrityksestä, jonka tiedot löytyvät verkosta. Pankille tai läheisille tarjouksesta ei kuulemma saisi kertoa tarjouksesta, sillä se on erikoistarjous vain Simolle. Simo kertoi tarjoajan olleen puhelussa kovin ystävällinen ja vakuuttava.",
    hasImage: false,
    parts: [
      {
        id: "phone",
        text: "Sijoitustarjous esitetään puhelimitse.",
      },
      {
        id: "targeted",
        text: "Tarjous on kuulemma kohdennettu vain Simolle.",
      },
      {
        id: "secrecy",
        text: "Tarjouksesta ei saa kertoa pankille tai läheisille.",
      },
      {
        id: "salesman",
        text: "Sijoituksen tarjoja vaikutti ystävälliseltä ja vakuuttavalta.",
      },
    ],
  },
  {
    message:
      "Lomakylän rakentaminen alkaa vuoden päästä, ja se tulee sijaitsemaan keskellä suosittua lomakaupunkia. Simo sai esitteen sähköpostitse. Alempana on sijoituksen tarjoajan lähettämä kuva, joka kuulemma esittää valmista kylän mökkiä.",
    hasImage: true,
    parts: [
      {
        id: "image",
        text: "Ainoa todiste sijoituskohteen olemassaolosta on tekoälyllä tehty kuva.",
      },
      {
        id: "email",
        text: "Esite lähetetään sähköpostitse.",
      },
      {
        id: "location",
        text: "Lomakylän kerrotaan sijaitsevan suositussa lomakaupungissa.",
      },
      {
        id: "construction",
        text: "Lomakylän rakentaminen alkaa vuoden päästä.",
      },
    ],
  },
    {
    message:
      "Simo kertoi, ettei nukkunut viime yönä hyvin miettiessään tarjousta. Hänelle nimittäin kerrottiin, että sijoitustarjous on voimassa vain ylihuomiseen, ja muuten tarjous esitetään jollekin toiselle, jos sijoitettujen rahojen kaksinkertaistaminen vuodessa ei kiinnosta. Myyjä pyysi siirtämään rahat yksityishenkilön tilille, jonka nimi ei vastaa yritystä, jonka nimissä sijoituksen tarjoaja alun perin soitti.",
    hasImage: false,
    parts: [
      {
        id: "deadline",
        text: "Päätös pitää tehdä nopeasti.",
      },
      {
        id: "double",
        text: "Simo saisi sijoitetut rahansa takaisin kaksinkertaisena vuodessa.",
      },
      {
        id: "account",
        text: "Rahat pyydetään eri nimisen yksityishenkilön tilille.",
      },
    ],
  },
];
export const offerParts = investmentMessages.flatMap(
  (message) => message.parts,
);
export type Recommendation = "invest" | "wait";
export const recommendations: { id: Recommendation; text: string }[] = [
  { id: "invest", text: "Kyllä, näillä tiedoilla." },
  { id: "wait", text: "Ei näillä tiedoilla." },
];
