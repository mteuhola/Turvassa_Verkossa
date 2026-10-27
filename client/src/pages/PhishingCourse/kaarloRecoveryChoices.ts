export const kaarloRecoveryChoices = [
  {
    id: "close",
    text: "Suljetaan epäilyttävä sivu eikä anneta sille enää tietoja.",
    correct: true,
    explanation:
      "Sivulla asiointi kannattaa lopettaa. Sivun sulkeminen ei kuitenkaan peruuta jo annettujen tietojen päätymistä huijarille.",
  },
  {
    id: "delete",
    text: "Poistetaan huijausviesti. Sen jälkeen annettua salasanaa voi käyttää turvallisesti.",
    correct: false,
    explanation:
      "Viestin poistaminen ei poista huijarin jo saamia tietoja. Annettu salasana täytyy vaihtaa.",
  },
  {
    id: "passwords",
    text: "Vaihdetaan heti sähköpostin ja kaupan salasanat eri salasanoiksi palvelujen itse avatuilla, tutuilla sivuilla.",
    correct: true,
    explanation:
      "Sama paljastunut salasana vaarantaa molemmat tilit. Salasanat vaihdetaan aidoissa palveluissa, ei viestin linkistä.",
  },
  {
    id: "wait",
    text: "Odotetaan ensin, käyttääkö joku tiliä. Vaihdetaan salasana vasta sitten.",
    correct: false,
    explanation:
      "Salasana on jo annettu epäilyttävälle sivulle. Sen vaihtamista ei kannata lykätä siihen asti, että väärinkäyttö näkyy.",
  },
  {
    id: "monitor",
    text: "Tarkistetaan tilien tapahtumat ja seurataan uusia kirjautumisilmoituksia. Oudosta toiminnasta otetaan yhteyttä palvelun viralliseen tukeen.",
    correct: true,
    explanation:
      "Tilien tapahtumat auttavat huomaamaan väärinkäytön. Tuen yhteystiedot etsitään palvelun tutulta sivustolta.",
  },
] as const;

export function isKaarloRecoveryCorrect(selected: readonly string[]) {
  return (
    selected.every((id) =>
      kaarloRecoveryChoices.some((item) => item.id === id),
    ) &&
    kaarloRecoveryChoices.every(
      (item) => selected.includes(item.id) === item.correct,
    )
  );
}
