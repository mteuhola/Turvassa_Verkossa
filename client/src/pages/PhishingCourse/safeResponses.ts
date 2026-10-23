import type { TheoryContent } from "../Theory/theoryData";

export const safeResponseTheory: TheoryContent = {
  sections: [
    {
      heading: "Pysähdy ja tarkista muuta kautta",
      paragraphs: [
        "Epäilyttävän viestin kanssa ei tarvitse kiirehtiä. Älä vastaa siihen tai avaa sen linkkejä tai liitteitä selvittääksesi, onko se aito.",
        "Avaa palvelun tuttu sovellus tai kirjoita itse sen tuntemasi verkko-osoite. Jos viesti näyttää tulevan tutulta ihmiseltä, varmista pyyntö esimerkiksi soittamalla hänelle ennestään tuntemaasi numeroon. Älä käytä epäilyttävän viestin yhteystietoja varmistamiseen.",
      ],
    },
    {
      heading: "Harjoittele turvallista seuraavaa askelta",
      paragraphs: [
        "Tutulta näyttävä lähettäjä tai pieni maksupyyntö ei yksin takaa viestin aitoutta. Tarkista ensin, liittyykö viesti johonkin odottamaasi asiaan ja vahvista pyyntö erillistä, tuttua yhteyttä pitkin.",
        "Seuraavassa harjoituksessa valitset turvallisen toimintatavan kolmeen kuvitteelliseen tilanteeseen. Saat jokaisesta valinnasta palautetta. Voit yrittää uudelleen ilman aikarajaa, ja aihe valmistuu, kun olet ratkaissut kaikki tilanteet.",
      ],
    },
  ],
};

export const safeActionSteps = [
  {
    id: "pause",
    text: "Pysähdyn. En vastaa viestiin, maksa tai avaa liitett?.",
    result: "Kiire ei ohjaa toimintaasi. Viesti ja liite jäävät avaamatta.",
    requires: null,
    hint: "Pysähdy ensin. Älä anna viestin kiireen ohjata toimintaasi.",
  },
  {
    id: "contact",
    text: "Etsin ystävän ennestään tutun numeron omista yhteystiedoistani.",
    result:
      "Löydät yhteystietoihisi aiemmin tallentamasi numeron. Et käytä viestissä annettuja yhteystietoja.",
    requires: "pause",
    hint: "Pysähdy ennen kuin alat selvittää pyyntöä.",
  },
  {
    id: "call",
    text: "Soitan ystävälle löytämässäni tuttuun numeroon.",
    result: "Ystävä vastaa puheluun. Voit nyt kysyä häneltä pyyntöä suoraan.",
    requires: "contact",
    hint: "Etsi ensin ystävän ennestään tuttu numero omista yhteystiedoistasi.",
  },
  {
    id: "verify",
    text: "Kysyn puhelussa, lähettikö ystävä rahapyynnön.",
    result:
      "Yst?v? kertoo: En lähettänyt sinulle laskua enkä pyytänyt rahaa. Pyyntö ei siis tullut häneltä.",
    requires: "call",
    hint: "Soita ensin ystävälle, jotta voit varmistaa pyynn?n puhelussa.",
  },
  {
    id: "report",
    text: "Kun ystävä on vahvistanut, ettei lähettänyt pyyntöä, ilmoitan viestin huijaukseksi.",
    result:
      "Ilmoitat viestin viestipalvelun ilmoitustoiminnolla. Rahaa tai tietoja ei pääty huijarille.",
    requires: "verify",
    hint: "Tässä suunnitelmassa ilmoitus tehdään ystävän vastauksen jälkeen. Varmista pyyntö ensin puhelussa.",
  },
] as const;

export function createSafeActionOrder(random = Math.random): string[] {
  const order: string[] = safeActionSteps.map((step) => step.id);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Start with a puzzle to solve, even if the shuffle returns the solved order.
  if (order.every((id, index) => id === safeActionSteps[index].id)) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}

export function checkSafeActionOrder(order: string[]) {
  if (
    order.length !== safeActionSteps.length ||
    new Set(order).size !== safeActionSteps.length ||
    order.some((id) => !safeActionSteps.some((step) => step.id === id))
  ) {
    return {
      correct: false,
      index: 0,
      feedback: "K?yt? jokaista toimintoa kerran.",
    };
  }
  const done = new Set<string>();
  for (const [index, id] of order.entries()) {
    const step = safeActionSteps.find((step) => step.id === id)!;
    if (step.requires && !done.has(step.requires)) {
      return { correct: false, index, feedback: step.hint };
    }
    done.add(id);
  }
  return {
    correct: true,
    index: order.length,
    feedback: "Turvallinen toimintaketju valmis!",
  };
}
