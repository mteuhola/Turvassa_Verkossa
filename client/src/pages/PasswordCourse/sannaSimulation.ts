export const sannaAccounts = [
  { id: "email", name: "Sähköposti" },
  { id: "shop", name: "Vaatekauppa" },
  { id: "club", name: "Kirjakerho" },
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
    id: "personal",
    text: "Käytetään salasanoissa ja niiden tunnuksissa Sannan nimeä ja syntymäaikaa, jotta ne on helppo muistaa ja arvata.",
    correct: false,
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
    id: "mainwordreuse",
    text: "Marjoja on paljon erilaisia, joten käytetään eri marjaa eri palveluissa!",
    correct: false,
  },
  {
    id: "title",
    text: "Kirjoitetaan salasanojen hallintaohjelmaan tallennettujen salasanojen nimiksi itse salasana.",
    correct: false,
  },
  {
    id: "names",
    text: "Annetaan salasanojen hallintaohjelmaan tallennetuille salasanoille nimet, joista palvelun tunnistaa helposti.",
    correct: true,
  },
  {
    id: "manager",
    text: "Tallennetaan eri salasanat salasanojen hallintaohjelmaan, jotta niitä ei tarvitse muistaa ulkoa.",
    correct: true,
  },
  {
    id: "similar",
    text: "Vaihdetaan vain samaan salasanaan lisättyä numeroa eri palveluissa.",
    correct: false,
  },
  {
    id: "advice",
    text: "Neuvo Sannaa olemaan kertomatta salasanojaan muille.",
    correct: true,
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

export function createSannaLoginTask(random = Math.random) {
  const target = sannaAccounts[Math.floor(random() * sannaAccounts.length)];
  const entries = [...sannaAccounts];
  for (let index = entries.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [entries[index], entries[other]] = [entries[other], entries[index]];
  }
  return { target, entries };
}

export function canSignInAsSanna(
  saved: SannaPasswords,
  password: string,
  target: SannaAccountId,
  getScore: (password: string) => number | undefined,
) {
  const values = sannaAccounts.map(({ id }) => saved[id]);
  return (
    values.every(
      (value) =>
        typeof value === "string" &&
        value.length > 0 &&
        value !== sannaOldPassword &&
        getScore(value) === 4,
    ) &&
    new Set(values).size === sannaAccounts.length &&
    password === saved[target]
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
