export type PracticeScreen =
  "message" | "home" | "app" | "contacts" | "contact" | "result";

export const safeResponseScenarios = [
  {
    title: "Tarkista kirjastolainasi",
    goal: "Sinulla on kirja lainassa. Tarkista lainan tilanne avaamalla itse ennestään käyttämäsi Oma kirjasto -sovellus.",
    sender: "Oma kirjasto",
    message:
      "Kirjastolainasi on myöhässä. Maksa myöhästymismaksu heti alla olevasta linkistä, jotta voit jatkaa kirjaston käyttöä.",
    messageAction: "Maksa myöhästymismaksu",
    feedback:
      "Viestin linkki ei ole riippumaton tapa tarkistaa pyyntöä. Palaa puhelimen aloitusnäyttöön ja avaa tuttu sovellus itse.",
    hint: "Valitse puhelimen alareunasta Aloitusnäyttö. Avaa sitten Oma kirjasto ja oman lainasi tiedot.",
    result:
      "Sovelluksen mukaan kirjasi eräpäivään on vielä viikko. Sinulla ei ole maksettavia maksuja.",
    explanation:
      "Tarkistit asian itse avaamastasi tutusta sovelluksesta. Sinun ei tarvinnut avata viestin linkkiä tai päätellä viestin ulkoasusta, oliko se aito.",
  },
  {
    title: "Varmista ystävän pyyntö",
    goal: "Ystäväsi Leenan nimellä tulee odottamaton pyyntö. Selvitä, lähettikö hän sen, käyttämällä aiemmin tallentamaasi yhteystietoa.",
    sender: "Leena",
    message:
      "Hei! Voisitko maksaa yhden laskun puolestani tänään? Minulla on uusi numero. Soita tähän, niin kerron lisää.",
    messageAction: "Soita viestin numeroon",
    feedback:
      "Viestissä annettu uusi numero voi kuulua jollekin muulle. Avaa omat yhteystietosi ja käytä Leenan ennestään tuttua numeroa.",
    hint: "Palaa Aloitusnäyttöön. Avaa Yhteystiedot, valitse Leena ja soita tallennettuun numeroon.",
    result:
      "Leena vastaa: En lähettänyt sinulle rahapyyntöä. Hyvä, että soitit tuttuun numerooni ja tarkistit asian.",
    explanation:
      "Varmistit pyynnön ennestään tutun yhteystiedon kautta. Viestin lähettäjä ei päässyt valitsemaan, keneltä kysyt varmistusta. Jos ystävä ei vastaa, voit odottaa varmistusta ja jättää pyynnön toteuttamatta.",
  },
] as const;
