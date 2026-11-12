import type { TheoryContent } from "./theoryData";

export const helpStories: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    content: TheoryContent;
  }
> = {
  passwords: {
    id: "help-sanna",
    title: "Auta Sannaa",
    description: "Sanna tarvitsee apuasi salasanojen vaihtamisessa ja salasanojen hallintaohjelman kanssa.",
    content: {
      characterName: "Sanna",
      sections: [
        {
          heading: "Sanna kertoo",
          paragraphs: [
            "”Olen käyttänyt salasanaa mustikka3 melkein kaikkialla: sähköpostissa, verkkokaupoissa ja muissa palveluissa. Se on helppo muistaa, mutta nyt mietin, onko se tarpeeksi vahva.”",
            "”Riittäisikö, jos vaihtaisin ensimmäisen kirjaimen isoksi tai lisäisin loppuun huutomerkin, taikkapa korvaisin s:n 5:lla? Voisinko sitten käyttää uutta salasanaa edelleen joka paikassa?”",
          ],
        },
        {
          heading: "Miten auttaisit Sannaa?",
          paragraphs: [
            "Palauta mieleesi salasanaharjoituksen esimerkit. Mitä kertoisit Sannalle salasanan pituudesta ja arvattavuudesta? Millaisen keksityn esimerkin avulla näyttäisit, miten salasanaa voisi vahvistaa?",
            "Pohdi myös salasanan käyttämistä monessa palvelussa. Mitä muille tileille voisi tapahtua, jos yhden palvelun salasana paljastuisi?",
            "Miten Sanna voisi käyttää eri salasanaa jokaisessa palvelussa ja silti pitää ne tallessa? Mieti, miten selittäisit oman ehdotuksesi hänelle.",
          ],
        },
      ],
    },
  },
  phishing: {
    id: "help-kaarlo",
    title: "Auta Kaarloa",
    description:
      "Arvioi Kaarlon saamia outoja sähköposteja ja selvitä, mikä johti näiden viestien saapumiseen.",
    content: {
      characterName: "Kaarlo",
      sections: [
        {
          heading: "Kaarlo kertoo",
          paragraphs: [
            "”Sähköpostiini tuli tänään monta viestiä, joista en oikein tiedä mitä ajatella. Yksi näyttää olevan pankilta, toinen pakettipalvelulta ja kolmas tutulta ihmiseltä. Auttaisitko minua päättämään, mitä teen kunkin viestin kanssa?”",
            "Alla olevat viestit ovat kuvitteellisia. Lue ne yksi kerrallaan ja pohdi, mitä neuvoisit Kaarloa tekemään ennen kuin hän vastaa tai avaa mitään.",
          ],
        },
        {
          heading: "Viesti 1: Pankkitili suljetaan",
          paragraphs: [
            "Lähettäjän nimenä näkyy ”Pankin asiakaspalvelu”. Viestissä lukee: ”Tililläsi on havaittu poikkeavaa toimintaa. Vahvista pankkitunnuksesi tämän viestin linkistä kahden tunnin sisällä tai suljemme tilisi.”",
            "Mikä viestissä herättää epäilyksiä? Miten Kaarlo voisi selvittää tilinsä tilanteen käyttämättä viestissä olevaa linkkiä?",
          ],
        },
        {
          heading: "Viesti 2: Paketin pieni lisämaksu",
          paragraphs: [
            "Viestin otsikko on ”Pakettisi odottaa toimitusta”. Siinä pyydetään maksamaan 2,90 euroa linkin kautta ja antamaan maksukortin tiedot. Kaarlo ei muista tilanneensa mitään, eikä viestissä kerrota, mistä kaupasta paketti on tulossa.",
            "Tekisikö pieni summa pyynnöstä luotettavan? Mitä Kaarlon kannattaisi tarkistaa ennen maksamista?",
          ],
        },
        {
          heading: "Viesti 3: Tutun lähettämä lasku",
          paragraphs: [
            "Lähettäjän nimenä näkyy Kaarlon tuttava. Viesti kuuluu: ”Hei! Maksa tämä lasku puolestani heti, selitän myöhemmin. En pääse nyt puhelimeen.” Mukana on liite, jota Kaarlo ei odottanut.",
            "Riittääkö tuttu lähettäjän nimi varmistamaan viestin aitouden? Miten Kaarlo voisi tarkistaa pyynnön tutultaan avaamatta liitettä tai vastaamatta tähän viestiin?",
          ],
        },
        {
          heading: "Mitä neuvoisit Kaarlolle?",
          paragraphs: [
            "Valitse mielessäsi jokaiselle viestille seuraava toimenpide ja perustele se. Mitä tarkistaisit, minkä jättäisit avaamatta ja miten selvittäisit asian muuta kautta?",
          ],
        },
      ],
    },
  },
  "financial-fraud": {
    id: "help-raija",
    title: "Auta Raijaa",
    description:
      "Auta ensin Raijaa tukemaan Simoa sijoitushuijauksen jälkeen. Auttakaa sitten yhdessä Raijaa ottamaan seuraavat askeleet.",
    content: {
      characterName: "Raija",
      sections: [
        {
          heading: "Raija kertoo",
          paragraphs: [
            "”Simo kertoi siirtäneensä rahat lomakyläsijoitukseen jo ennen kuin katsoimme tarjousta yhdessä. Auttaisitko minua auttamaan häntä?”",
            "”Minä lähetin Hermannille ensin 200 euroa matkaan ja sitten 300 euroa hänen veljensä sairaalakuluihin. Sen jälkeen hänestä ei ole kuulunut mitään. Tarvitsen itsekin apua.”",
          ],
        },
        {
          heading: "Miten auttaisit Raijaa?",
          paragraphs: [
            "Kuuntele huoli, auta ottamaan yhteyttä pankkiin ja säilytä tapahtumien tiedot. Valmistelkaa ilmoitus yhdessä ja sopikaa jatkosta.",
            "Simo ja Raija voivat tukea toisiaan. Kummankaan ei tarvitse selvittää tapahtunutta yksin tai hävetä avun pyytämistä.",
          ],
        },
      ],
    },
  },
};
