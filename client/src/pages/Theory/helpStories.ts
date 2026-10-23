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
    description:
      "Auta Sannaa vaihtamaan kolmen tilin salasanat, tallentamaan ne ja kirjautumaan salasanojen hallintaohjelman avulla.",
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
      "Lue Kaarlon saamat viestit ja pohdi, miten hänen kannattaisi toimia.",
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
      "Pohdi Raijan verkkotuttavan rahapyyntöä ja sitä, miten ottaisit asian puheeksi.",
    content: {
      characterName: "Raija",
      sections: [
        {
          heading: "Raija kertoo",
          paragraphs: [
            "”Olen jutellut jo jonkin aikaa erään ihmisen kanssa netissä. Hän kyselee kuulumisiani ja tuntuu ymmärtävän minua. Emme ole vielä tavanneet kasvotusten, mutta olemme puhuneet tapaamisesta.”",
            "”Nyt hän sanoo, että voisi lentää luokseni. Hän pyytää minulta 850 euroa lentolippuun. Hänen mielestään se tasaisi kustannuksia, koska jos haluamme tavata, jommankumman täytyy matkustaa. Hän sanoo käyttävänsä matkaan omaa aikaansa ja toivoo minun maksavan osan kuluista.”",
            "”Summa tuntuu minusta suurelta, mutta haluaisin nähdä hänet. En myöskään haluaisi loukata häntä vaikuttamalla epäluuloiselta. Mitä minun kannattaisi ajatella tästä?”",
          ],
        },
        {
          heading: "Miten auttaisit Raijaa?",
          paragraphs: [
            "Mitä tiedämme Raijan uudesta tuttavasta ja mitä jää vielä epäselväksi? Mitä ajatuksia suuri rahapyyntö ennen ensimmäistä tapaamista herättää?",
            "Pohdi perustelua kustannusten tasaamisesta. Voiko reilulta kuulostava selitys saada rahapyynnön tuntumaan turvallisemmalta kuin se on?",
            "Miten ottaisit huolesi puheeksi Raijan kanssa niin, että hän kokisi tulevansa kuulluksi? Mitä hänen kannattaisi selvittää ja kenen kanssa jutella ennen päätöstä?",
          ],
        },
      ],
    },
  },
};
