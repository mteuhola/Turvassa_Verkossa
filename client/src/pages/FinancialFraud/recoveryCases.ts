import { investmentMessages } from "./investmentOffers";
import { romanceMessages } from "./romanceMessages";

export type RecoveryCase = {
  id: "simo" | "raija";
  name: string;
  title: string;
  concern: string;
  replies: { text: string; response: string }[];
  documents: { id: string; title: string; text: string[] }[];
  summary: string;
};

export const recoveryCases: Record<RecoveryCase["id"], RecoveryCase> = {
  simo: {
    id: "simo",
    name: "Simo",
    title: "Autetaan Simoa",
    concern:
      "Minua nolottaa kertoa tästä. Olin jo siirtänyt rahat ennen kuin katsoitte tarjousta Raijan kanssa. En tiedä, mitä pankille sanoisin.",
    replies: [
      {
        text: "Kiitos, että kerroit. Selvitetään seuraavat askeleet yhdessä.",
        response:
          "Helpottaa, että kuuntelette. Voitteko olla vieressä, kun soitan pankkiin?",
      },
      {
        text: "Huijari on vastuussa huijauksesta. Voimme auttaa sinua ottamaan yhteyttä pankkiin.",
        response:
          "Pelkäsin, että minua syytetään. Soitetaan yhdessä, niin minun ei tarvitse selvittää tätä yksin.",
      },
    ],
    documents: [
      {
        id: "offer",
        title: "Lomakylän sijoitustarjous",
        text: investmentMessages.map((message) => message.message),
      },
      {
        id: "payment",
        title: "Maksukuitti: 2 500 €",
        text: [
          "Maksaja: Simo. Summa: 2 500 €. Viesti: lomakyläsijoitus. Maksu on jo lähetetty.",
          "Saajan nimi on yksityishenkilön nimi, joka ei vastaa tarjouksessa mainittua yritystä. Harjoituskuittiin on liitetty saajan tilitiedot ja maksupäivä.",
        ],
      },
      {
        id: "sender",
        title: "Tarjoajan yhteystiedot",
        text: [
          "Simo on säilyttänyt soittajan puhelinnumeron ja esitteen lähettäjän sähköpostiosoitteen. Ne liitetään mukaan alkuperäisinä tietoina.",
          "Yrityksen tietojen löytyminen verkosta ei varmista, että yhteydenottaja edustaa yritystä.",
        ],
      },
    ],
    summary:
      "Simo siirsi 2 500 euroa lomakyläsijoitukseen. Tarjouksessa luvattiin rahojen kaksinkertaistuvan vuodessa, kiirehdittiin päätöstä ja kiellettiin kertomasta pankille tai läheisille. Maksun saaja ei vastannut yrityksen nimeä.",
  },
  raija: {
    id: "raija",
    name: "Raija",
    title: "Nyt autetaan sinua",
    concern:
      "Entä jos Hermannille on oikeasti sattunut jotain? Minulla on silti ikävä häntä. En tiedä, miten kertoisin tästä pankille.",
    replies: [
      {
        text: "Ymmärrän, että sinulla on ikävä. Voimme silti huolehtia nyt rahojesi turvallisuudesta yhdessä.",
        response:
          "Tuntuu hyvältä, ettei minun tarvitse lakata välittämästä, jotta saan apua. Voisitko auttaa minua kertomaan maksuista?",
      },
      {
        text: "Sinun ei tarvitse selvitä tästä yksin. Kuuntelen, ja Simo voi jäädä tueksesi.",
        response:
          "Haluaisin, että Simo jää. Voimme katsoa maksut yhdessä ja ottaa yhteyttä pankkiin.",
      },
    ],
    documents: [
      {
        id: "conversation",
        title: "Keskustelu Hermannin kanssa",
        text: romanceMessages.flatMap((message) => [
          message.title,
          `Raija: ${message.raija}`,
          `Hermanni: ${message.parts.join(" ")}`,
        ]),
      },
      {
        id: "flight",
        title: "Maksukuitti: 200 € matkaan",
        text: [
          "Raija lähetti Hermannille 200 euroa matkaa varten. Hermanni lupasi maksaa rahat takaisin, mutta tapaaminen ei toteutunut.",
          "Harjoituskuittiin on liitetty maksupäivä ja saajan tilitiedot.",
        ],
      },
      {
        id: "hospital",
        title: "Maksukuitti: 300 € sairaalakuluihin",
        text: [
          "Raija lähetti vielä 300 euroa Hermannin kertomiin veljen sairaalakuluihin. Tämän jälkeen Hermannista ei ole kuulunut mitään.",
          "Harjoituskuittiin on liitetty maksupäivä ja saajan tilitiedot. Raija on lähettänyt yhteensä 500 euroa.",
        ],
      },
    ],
    summary:
      "Raija lähetti Hermannille ensin 200 euroa matkaan ja sitten 300 euroa tämän kertomiin sairaalakuluihin, yhteensä 500 euroa. He eivät ole tavanneet. Hermanni pyysi salaamaan suhteen ja painosti Raijaa maksamaan. Jälkimmäisen maksun jälkeen yhteys katkesi.",
  },
};
