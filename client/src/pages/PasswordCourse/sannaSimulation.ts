export const sannaAccounts = [
  { id: "email", name: "Sähköposti" },
  { id: "shop", name: "Verkkokauppa" },
  { id: "club", name: "Harrastuskerho" },
] as const;

export type SannaAccountId = (typeof sannaAccounts)[number]["id"];
export type SannaPasswords = Partial<Record<SannaAccountId, string>>;
export const sannaOldPassword = "mustikka3";

export const sannaBestPractices = [
  {
    id: "unique",
    text: "Tehdään jokaiselle palvelulle eri salasana.",
    correct: true,
  },
  {
    id: "reuse",
    text: "Käytetään samaa vahvaa salasanaa kaikissa palveluissa.",
    correct: false,
  },
  {
    id: "long",
    text: "Valitaan pitkät ja vaikeasti arvattavat salasanat.",
    correct: true,
  },
  {
    id: "punctuation",
    text: "Lisätään mustikka3-salasanan loppuun huutomerkki. Se yksin riittää.",
    correct: false,
  },
  {
    id: "manager",
    text: "Tallennetaan eri salasanat salasananhallintaan, jotta niitä ei tarvitse muistaa ulkoa.",
    correct: true,
  },
  {
    id: "personal",
    text: "Käytetään Sannan nimeä ja syntymäaikaa, jotta salasana on helppo muistaa.",
    correct: false,
  },
  {
    id: "names",
    text: "Annetaan tallennetuille salasanoille nimet, joista palvelun tunnistaa.",
    correct: true,
  },
  {
    id: "similar",
    text: "Vaihdetaan vain samaan salasanaan lisättyä numeroa eri palveluissa.",
    correct: false,
  },
  {
    id: "retrieve",
    text: "Harjoitellaan oikean salasanan löytämistä ja käyttämistä kirjautumisessa.",
    correct: true,
  },
  {
    id: "title",
    text: "Kirjoitetaan itse salasana merkinnän nimeksi.",
    correct: false,
  },
];

export function isSannaPlanCorrect(selected: string[]) {
  const expected = sannaBestPractices.filter((item) => item.correct);
  return (
    selected.length === expected.length &&
    new Set(selected).size === selected.length &&
    expected.every((item) => selected.includes(item.id))
  );
}

export function entryNameProblem(
  account: SannaAccountId,
  name: string,
  names: Partial<Record<SannaAccountId, string>>,
) {
  const normalized = name.trim().normalize("NFKC").toLocaleLowerCase("fi");
  if (!normalized || name.trim().length > 60) return "empty";
  if (
    sannaAccounts.some(
      ({ id }) =>
        id !== account &&
        names[id]?.trim().normalize("NFKC").toLocaleLowerCase("fi") ===
          normalized,
    )
  )
    return "duplicate";
  return null;
}

export function passwordProblem(
  account: SannaAccountId,
  password: string,
  score: number | undefined,
  saved: SannaPasswords,
) {
  if (password === sannaOldPassword || score !== 4) return "weak";
  if (sannaAccounts.some(({ id }) => id !== account && saved[id] === password))
    return "reused";
  return null;
}

export function canSignInAsSanna(saved: SannaPasswords, password: string) {
  const values = sannaAccounts.map(({ id }) => saved[id]);
  return (
    values.every(
      (value) =>
        typeof value === "string" &&
        value.length > 0 &&
        value !== sannaOldPassword,
    ) &&
    new Set(values).size === sannaAccounts.length &&
    password === saved.club
  );
}

/** Fictional exercise generator. No user credentials are read or stored. */
export function generateSannaPassword() {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?";
  return Array.from(
    crypto.getRandomValues(new Uint8Array(20)),
    (value) => alphabet[value % alphabet.length],
  ).join("");
}
