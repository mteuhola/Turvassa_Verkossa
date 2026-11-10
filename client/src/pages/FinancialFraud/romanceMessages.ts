export const romanceMessages = [
  {
    title: "Tutustuminen",
    raija:
      "Kävin tänään pitkällä metsäkävelyllä. Oli niin kaunis ilma, että aika kului ihan huomaamatta. Miten sinun päiväsi on sujunut?",
    parts: [
      "Mukava kuulla, että sinulla oli hyvä päivä!",
      "Minäkin viihdyn luonnossa, varsinkin kun saan ajatella omia asioitani kaikessa rauhassa.",
      "Olen muuten miettinyt eilistä keskusteluamme. Tuntuu, että meillä on yllättävän paljon yhteistä. Sinun kanssasi on jotenkin erityisen helppo jutella.",
    ],
    concern: null,
    explanation:
      "Tässä viestissä ei ole selvää varoitusmerkkiä. Ystävällisyys ja yhteiset kiinnostuksen kohteet eivät yksin kerro huijauksesta. Ne eivät toisaalta vielä todista tuttavaa luotettavaksi.",
    hint: "Mieti, pyydetäänkö Raijaa tässä tekemään jotain huolestuttavaa. Pelkkä ystävällinen keskustelu ei ole varoitusmerkki.",
  },
  {
    title: "Salaisuus ja rakkauden tunnustaminen",
    raija:
      "Hei, Hermanni! Ystäväni Simo kävi tänään kylässä ja kyseli kuulumisiani. Ajattelin kertoa hänelle sinusta, kun olemme jo jonkin aikaa jutelleet.",
    parts: [
      "On ihanaa, että haluaisit kertoa minusta ystävillesi. Mutta voisimmeko vielä pitää tämän meidän välisenämme?",
      "Minulle on käynyt ennenkin niin, että muut ovat alkaneet arvostella suhdettani ennen kuin ovat edes tutustuneet toiseen ihmiseen.",
      "Haluaisin, että saamme rauhassa katsoa, mihin tämä meidän juttumme johtaa. Eihän sinua haittaa, rakas?",
    ],
    concern: 0,
    explanation:
      "Tuttava pyytää Raijaa salaamaan suhteen läheisiltään. Näin Raija voi jäädä yksin pohtimaan tuttavan pyyntöjä, eikä saa muiden näkökulmaa tilanteeseen.",
    hint: "Etsi lause, jossa tuttava yrittää estää Raijaa puhumasta läheistensä kanssa.",
  },
  {
    title: "Tapaamisen suunnittelu",
    raija:
      "Olemme jutelleet jo niin pitkään, että olisi mukava viimein nähdä kasvotusten. Täällä satamassa on viihtyisä kahvila, jossa voisimme käydä. Mitä ajattelet?",
    parts: [
      "Se kuulostaa aivan ihanalta! Olen odottanut, että pääsisin viimein näkemään sinut.",
      "Olen katsellut jo lentojakin, mutta täällä on ollut nyt vähän yllättäviä menoja ja rahat ovat nyt tiukilla.",
      "Olisiko sinun mahdollista lainata minulle 200 euroa matkaa varten? Maksaisin ne takaisin heti, kun saan raha-asiani järjestykseen. En malttaisi enää odottaa tapaamistamme.",
    ],
    concern: 2,
    explanation:
      "Tuttava pyytää Raijalta rahaa ennen ensimmäistä tapaamista. Tapaamistoive ja väite rahatilanteesta voi saada rahapyynnön tuntumaan luontevalta, mutta se ei takaa pyynnön luotettavuutta.",
    hint: "Raija ei ole vielä tavannut tuttavaa kasvotusten. Etsi lause, jossa tuttava pyytää häneltä rahaa.",
  },
  {
    title: "Raija epäröi",
    raija:
      "200 euroa on minulle aika iso summa. Pidän kyllä sinusta, mutta tuntuu vähän oudolta lähettää rahaa ihmiselle, jota en ole vielä tavannut. Voisimmeko siirtää tapaamista siihen asti, että saat matkarahat kasaan?",
    parts: [
      "Ymmärrän kyllä, ettei summa ole pieni. Toivottavasti tämä ei tarkoita, ettet luotakaan minuun.",
      "Minusta tuntuisi pahalta, jos epäilisit minua kaiken sen jälkeen, mitä olemme toisillemme kertoneet. Etkö nyt voisi maksaa?",
      "Olen ajatellut, että meidän välillämme on jotain erityistä. Jos minä olisin sinun tilanteessasi, auttaisin sinua epäröimättä.",
    ],
    concern: 1,
    explanation:
      "Tuttava tekee rahan lähettämisestä välittämisen ja luottamisen ehdon. Tämä on tunteisiin vetoavaa painostusta: Raijalle yritetään saada syyllinen olo, jotta hän maksaisi.",
    hint: "Etsi lause, jossa Raijan pitäisi todistaa välittämisensä lähettämällä rahaa.",
  },
  {
    title: "Uusi este tapaamiselle",
    raija:
      "Lähetin sinulle lopulta ne 200 euroa, kun lupasit maksaa ne takaisin. Oletko nyt saanut lentoliput ostettua? Olisi mukava tietää, milloin olet tulossa.",
    parts: [
      "Kiitos vielä, rakas, olet minulle todella tärkeä. Minun piti lähteä huomenna, mutta veljeni joutui eilen pahaan onnettomuuteen ja on nyt sairaalassa.",
      "Sairaalasta tuli vielä yllättäviä kuluja, eikä minulla ole enää rahaa niiden maksamiseen.",
      "Voisitko auttaa minua vielä 300 eurolla? Lupaan maksaa sinulle kaiken takaisin, kun tämä tilanne selviää. En tiedä, keneltä muultakaan voisin pyytää apua, koska olen yksin tämän asian kanssa.",
    ],
    concern: 2,
    explanation:
      "Tuttava pyytää lisää rahaa vedoten läheisen avun tarpeeseen, mikä on myös tunteisiin vetoavaa painostusta.",
    hint: "Missä viestissä tuttava pyytää Raijalta uudelleen rahaa?",
  },
] as const;
