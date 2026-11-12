export const concernLabels = {
  secrecy: "Raijaa pyydetään salaamaan asioita.",
  money: "Raijalta pyydetään rahaa.",
  guilt: "Raijalle aiheutetaan syyllinen olo.",
  delay: "Tapaaminen siirtyy tai selitys muuttuu.",
  love: "Raijaan vedotaan osoittamalla rakkautta.",
  none: "Tässä kohdassa ei ole selvää varoitusmerkkiä.",
};

export type Concern = keyof typeof concernLabels;
export type Evidence = { message: number; part: number; concern: Concern };

// Each entry corresponds to one passage, in the same order as romanceMessages.
// Alternatives are accepted interpretations, not a checklist to uncover.
export const passageConcerns: ReadonlyArray<ReadonlyArray<readonly Concern[]>> =
  [
    [["none"], ["none"], ["none"]],
    [["secrecy"], ["secrecy", "none"], ["secrecy", "love", "none"]],
    [["none"], ["guilt"], ["money", "guilt"]],
    [["guilt"], ["guilt", "money"], ["guilt"]],
    [
      ["delay", "guilt", "love"],
      ["guilt", "none"],
      ["money", "guilt"],
    ],
  ];

export const reflections: Record<Concern, string> = {
  secrecy:
    "Ajattelin, että suojelimme suhdettamme muiden mielipiteiltä. Nyt huomaan, että samalla minun oli vaikeampi puhua Simolle siitä, mitä välillämme tapahtuu.",
  money:
    "Ajattelin auttavani, jotta voisimme tavata. Nyt huomaan, että minulta pyydetään rahaa, vaikka emme ole vielä edes tavanneet.",
  guilt:
    "Ajattelin ensin, että minun pitäisi todistaa luottamukseni. Nyt huomaan, että minulle tuli syyllinen olo, kun en halunnut maksaa.",
  delay:
    "Odotin tapaamista, mutta maksamisen jälkeen tulikin uusi este. Kun katson viestejä yhdessä, huomaan, ettei tapaaminen ole edennyt lupauksista huolimatta.",
  love: "Ajattelin, että sovimme yhteen nopeasti, kun aloimme jo puhua rakkaudesta. Nyt kun ajattelen asiaa, Hermanni on puhunut rakkaudesta jo todella aikaisessa vaiheessa jutteluamme...",
  none: "Tämä kohta ei yksin kerro huijauksesta. Ystävällisyys tai vaikeuksista kertominen voi kuulua tavalliseen keskusteluun. Minun pitää katsoa myös, mitä muissa viesteissä pyydetään.",
};

export const guidance: Record<Concern, string> = {
  secrecy: "Etsi yhteys siihen, saako Raija kertoa suhteesta läheisilleen.",
  money:
    "Rahapyynnössä Raijaa pyydetään maksamaan tai lainaamaan rahaa. Pelkkä rahahuolista kertominen ei vielä ole suora pyyntö.",
  guilt:
    "Syyllistämisessä Raijan epäröinti käännetään esimerkiksi luottamuksen tai välittämisen puutteeksi.",
  delay:
    "Tapaamisen siirtymisessä aiempi suunnitelma muuttuu tai matkalle tulee uusi este.",
  love: "Rakkauden osoittaminen voi joko olla aitoa, tai yritys vedota huijauksen kohteen tunteisiin.",
  none: "Pohdi vielä, mitä Raijaa tässä pyydetään tekemään tai miltä hänen halutaan tuntevan.",
};
