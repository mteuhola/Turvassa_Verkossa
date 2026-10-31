import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { assessPassword, MAX_PASSWORD_LENGTH } from "./passwordStrength";
import {
  canSignInAsSanna,
  createSannaLoginTask,
  createSannaPlanChoices,
  entryNameProblem,
  isSannaPlanCorrect,
  generateSannaPassword,
  passwordProblem,
  sannaAccounts,
  sannaOldPassword,
  type SannaPasswords,
  type SannaAccountId,
} from "./sannaSimulation";
import styles from "./PasswordCourse.module.css";
import own from "./SannaActivity.module.css";

function getSannaLoginLine(service: SannaAccountId): string {
  const commonLine = "Mistä löydän uuden salasanani?”";
  switch (service) {
    case "email":
      return (
        "”Haluaisin päästä SÄHKÖPOSTIIN, sillä konserttilippuni ovat siellä. " +
        commonLine
      );
    case "shop":
      return (
        "”Haluaisin kirjautua VAATEKAUPAN sivuille, sillä siellä alkoivat alennusmyynnit! " +
        commonLine
      );
    case "club":
      return (
        "”Haluaisin päästä kirjautumaan KIRJAKERHOON, sillä haluan ilmoittautua tapaamiseen. " +
        commonLine
      );
  }
}

export default function SannaActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [stage, setStage] = useState<
    "intro" | "plan" | "edit" | "saved" | "login" | "complete"
  >("intro");
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<SannaPasswords>({});
  const [entryNames, setEntryNames] = useState<SannaPasswords>({});
  const [entryName, setEntryName] = useState("");
  const [planChoices, setPlanChoices] = useState<string[]>([]);
  const [planOptions, setPlanOptions] = useState(() =>
    createSannaPlanChoices(),
  );
  const [planCorrect, setPlanCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [managerOpen, setManagerOpen] = useState(false);
  const [login, setLogin] = useState("");
  const [loginTask, setLoginTask] = useState(() => createSannaLoginTask());
  const heading = useRef<HTMLHeadingElement>(null);
  const loginInput = useRef<HTMLInputElement>(null);
  const previous = useRef(`${stage}:${index}`);
  const account = sannaAccounts[index];
  const assessment = useMemo(() => assessPassword(password), [password]);
  const count = Object.keys(saved).length;
  useEffect(() => {
    if (previous.current !== `${stage}:${index}`) {
      heading.current?.focus();
      previous.current = `${stage}:${index}`;
    }
  }, [stage, index]);

  function edit(nextIndex: number) {
    if (!planCorrect) return;
    setIndex(nextIndex);
    setPassword(saved[sannaAccounts[nextIndex].id] ?? "");
    setEntryName(entryNames[sannaAccounts[nextIndex].id] ?? "");
    setVisible(false);
    setFeedback("");
    setStage("edit");
  }

  function save() {
    if (!planCorrect) return;
    const nameProblem = entryNameProblem(account.id, entryName, entryNames);
    if (nameProblem) {
      setFeedback(
        nameProblem === "duplicate"
          ? "Sanna: Tämä nimi on jo toisella merkinnällä. Anna tälle oma nimi, jotta erotan palvelut."
          : "Sanna: Anna merkinnälle nimi, josta tunnistan palvelun, esimerkiksi palvelun nimi.",
      );
      return;
    }
    if (
      entryName.trim() === password ||
      Object.values(saved).includes(entryName.trim())
    ) {
      setFeedback(
        "Sanna: Laitetaan nimeksi palvelua kuvaava teksti, ei itse salasanaa.",
      );
      return;
    }
    const problem = passwordProblem(
      account.id,
      password,
      assessPassword(password)?.score,
      saved,
    );
    if (problem) {
      setFeedback(
        problem === "reused"
          ? "Sanna: Tämä on jo toisella tililläni. Tehdään tähän oma salasana, jotta yhden tilin salasana ei avaa muitakin."
          : "Sanna: Voisimmeko tehdä tästä vaikeammin arvattavan? Kokeile pitkää salasanaa tai paina Luo salasana. Tavoitellaan arviota 4/4.",
      );
      return;
    }
    setSaved((current) => ({ ...current, [account.id]: password }));
    setEntryNames((current) => ({
      ...current,
      [account.id]: entryName.trim(),
    }));
    setVisible(false);
    setFeedback("");
    setStage("saved");
  }

  return (
    <div className={styles.root} data-course="passwords">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/passwords">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <h1>Auta Sannaa</h1>
        </header>
        <div className={own.companion}>
          <div className={own.portrait}>
            <CharacterPortrait courseId="passwords" />
          </div>
          <p>
            Sanna on kuvitteellinen harjoituskaverisi. Tehtäväsi on auttaa häntä
            salasanoihin liittyvissä huolissa.
          </p>
        </div>
        {stage !== "intro" && stage !== "plan" && stage !== "complete" && (
          <p className={styles.small}>
            Salasanat vaihdettu ja tallennettu: {count}/{sannaAccounts.length}.
            Lopuksi autat Sannaa kirjautumaan.
          </p>
        )}
        <div className={styles.activity}>
          {stage === "intro" && (
            <section aria-labelledby="sanna-start">
              <h2 id="sanna-start" ref={heading} tabIndex={-1}>
                Sama salasana kolmessa palvelussa
              </h2>
              <p>
                ”Olen käyttänyt salasanaa <strong>mustikka3</strong> melkein
                kaikkialla, koska se on helppo muistaa. Alan kuitenkin epäillä,
                että se on liian helppo arvata. Haluaisin vaihtaa jokaiselle
                palvelulle oman salasanan, mutta en oikein tiedä miten se
                kannattaa tehdä. Auttaisitko minua?”
              </p>
              <ul className={own.accounts}>
                {sannaAccounts.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong>
                    <span>{sannaOldPassword}</span>
                  </li>
                ))}
              </ul>
              <p>
                Vaihda Sannan salasanat yksi kerrallaan ja säilytä ne
                salasanojen hallintaohjelmaan. Auta lopuksi Sannaa kirjautumaan
                yhteen palveluista.
              </p>
              <p className={styles.small}>
                Käytä vain keksittyjä salasanoja, joita et käytä muualla. Sannan
                tiedot säilyvät vain tämän harjoituskerran ajan. Oma aiemmin
                tallentamasi harjoitussalasana pysyy erillään.
              </p>
              {isComplete && (
                <p>
                  Olet jo suorittanut tämän aiheen. Voit harjoitella uudelleen,
                  ja ansaittu merkki säilyy.
                </p>
              )}
              <button
                type="button"
                className={styles.primary}
                onClick={() => {
                  setFeedback("");
                  setStage("plan");
                }}
              >
                Suunnittele Sannan auttaminen
              </button>
            </section>
          )}

          {stage === "plan" && (
            <section aria-labelledby="sanna-plan">
              <h2 id="sanna-plan" ref={heading} tabIndex={-1}>
                Miten Sannaa kannattaa auttaa?
              </h2>
              <p>
                ”Mitä meidän olisi hyvä tehdä, jotta osaisin käyttää
                salasanojani turvallisemmin?”
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const correct = isSannaPlanCorrect(planChoices);
                  setPlanCorrect(correct);
                  setFeedback(
                    correct
                      ? "Sanna: Hyvä suunnitelma! Tehdään eri salasanat, tallennetaan ne tunnistettavilla nimillä ja harjoitellaan niiden käyttöä."
                      : "Sanna: Mietitään vielä. Tarvitsen pitkät, erilaiset salasanat sekä tavan tallentaa ja löytää ne. Pieni muutos tuttuun salasanaan ei riitä, eikä itse salasana kuulu merkinnän nimeen. Voit muuttaa valintojasi ja yrittää uudelleen.",
                  );
                }}
              >
                <fieldset
                  className={styles.question}
                  disabled={planCorrect}
                  aria-describedby="sanna-plan-help"
                >
                  <legend>Mitkä ovat hyviä toimintatapoja?</legend>
                  <p id="sanna-plan-help">
                    Valitse kaikki oikeat vaihtoehdot ja tarkista vastauksesi,{" "}
                    {planOptions.filter((item) => item.correct).length}{" "}
                    vaihtoehtoa on oikein.
                  </p>
                  {planOptions.map((item) => (
                    <label key={item.id} className={styles.choice}>
                      <input
                        type="checkbox"
                        checked={planChoices.includes(item.id)}
                        onChange={() => {
                          setPlanChoices((current) =>
                            current.includes(item.id)
                              ? current.filter((id) => id !== item.id)
                              : [...current, item.id],
                          );
                          setFeedback("");
                        }}
                      />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </fieldset>
                <p role="status">{feedback}</p>
                <div className={styles.actions}>
                  {planCorrect ? (
                    <button
                      className={styles.primary}
                      type="button"
                      onClick={() => edit(0)}
                    >
                      Auta vaihtamaan salasanat
                    </button>
                  ) : (
                    <button className={styles.primary} type="submit">
                      Tarkista suunnitelma
                    </button>
                  )}
                </div>
              </form>
            </section>
          )}

          {stage === "edit" && (
            <section aria-labelledby="sanna-edit">
              <h2 id="sanna-edit" ref={heading} tabIndex={-1}>
                {account.name}: uusi salasana
              </h2>
              <p>
                {index === 0
                  ? "Sanna: Aloitetaan sähköpostista. Voisitko keksiä minulle uuden salasanan tai luoda sen salasanojen hallintaohjelmalla? Voisitko myös auttaa minua keksimään nimen, josta tunnistan palvelun salasanojen hallintaohjelmassa?"
                  : index === 1
                    ? "Sanna: Tehdään vaatekauppaan eri salasana kuin sähköpostiin. Saisiko tämänkin sanan salasanojen hallintaohjelmaan?"
                    : "Sanna: Tehdään kirjakerhoonkin eri salasana kuin muihin. Nyt uskon jo, että salasanojen hallintaohjelma pitää sen tallessa."}
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  save();
                }}
              >
                <label className={styles.label} htmlFor="sanna-password">
                  Uusi harjoitussalasana
                </label>
                <div className={own.generator}>
                  <p id="sanna-generator-help">
                    Kirjoita salasana itse tai anna salasanojen hallintaohjelman
                    luoda se tyhjään kenttään.
                  </p>
                  <button
                    type="button"
                    className={styles.secondary}
                    disabled={password.length > 0}
                    aria-describedby="sanna-generator-help"
                    onClick={() => {
                      if (password.length > 0) return;
                      setPassword(generateSannaPassword());
                    }}
                  >
                    Luo salasana automaattisesti
                  </button>
                </div>
                <input
                  id="sanna-password"
                  type={visible ? "text" : "password"}
                  value={password}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-describedby="sanna-strength"
                  aria-invalid={password.length > MAX_PASSWORD_LENGTH}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFeedback("");
                  }}
                />
                <div className={styles.controls}>
                  <button
                    type="button"
                    aria-pressed={visible}
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? "Piilota salasana" : "Näytä salasana"}
                  </button>
                </div>
                <div
                  id="sanna-strength"
                  className={styles.result}
                  role="status"
                  aria-atomic="true"
                >
                  {assessment ? (
                    <>
                      <p className={styles.score}>
                        Arvio: <strong>{assessment.label}</strong> (
                        {assessment.score}/4)
                      </p>
                      <ul>
                        {assessment.tips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>
                      {password
                        ? "Teksti on liian pitkä. Lyhennä salasanaa."
                        : "Kirjoita salasana tai valitse Luo salasana automaattisesti."}
                    </p>
                  )}
                </div>
                <label
                  className={`${styles.label} ${own.entryNameLabel}`}
                  htmlFor="sanna-entry-name"
                >
                  Merkinnän nimi salasanojen hallintaohjelmassa
                </label>
                <p id="sanna-name-help">
                  Keksi salasanalle nimi, josta Sanna tunnistaa palvelun
                  myöhemmin salasanojen hallintaohjelmassa. Voit käyttää
                  palvelun nimeä tai muuta kuvaavaa nimeä.{" "}
                  <strong>Älä kirjoita tähän salasanaa.</strong>
                </p>
                <input
                  id="sanna-entry-name"
                  type="text"
                  value={entryName}
                  maxLength={60}
                  autoComplete="off"
                  aria-describedby="sanna-name-help"
                  onChange={(event) => {
                    setEntryName(event.target.value);
                    setFeedback("");
                  }}
                />
                <p id="sanna-save-requirement" className={styles.small}>
                  Voit tallentaa salasanan, kun sen arvio on 4/4.
                </p>
                <div className={styles.actions}>
                  <button
                    type="submit"
                    className={styles.primary}
                    disabled={assessment?.score !== 4}
                    aria-describedby="sanna-save-requirement"
                  >
                    Vaihda ja tallenna salasana
                  </button>
                  {index > 0 && (
                    <button type="button" onClick={() => edit(index - 1)}>
                      Palaa edelliseen tiliin
                    </button>
                  )}
                </div>
              </form>
            </section>
          )}

          {stage === "saved" && (
            <section aria-labelledby="sanna-saved">
              <h2 id="sanna-saved" ref={heading} tabIndex={-1}>
                {account.name}: salasana tallennettu
              </h2>
              <p>
                {index === 0
                  ? "Sanna: En kyllä muistaisi tätä ulkoa. Hyvä, että annoimme merkinnälle nimen. Sen avulla löydän salasanan myöhemmin."
                  : "Sanna: Kiitos! Tämänkin palvelun oma salasana on nyt tallessa."}
              </p>
              <h3>Sannan salasanojen hallintaohjelma</h3>
              <p>
                <strong>{entryNames[account.id]}</strong>
              </p>
              <p className={own.secret}>
                {visible ? saved[account.id] : "••••••••••••"}
              </p>
              <button
                type="button"
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Piilota salasana" : "Näytä salasana"}
              </button>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => {
                    if (index < sannaAccounts.length - 1) edit(index + 1);
                    else {
                      setVisible(false);
                      setFeedback("");
                      setStage("login");
                    }
                  }}
                >
                  {index < sannaAccounts.length - 1
                    ? `Jatka: ${sannaAccounts[index + 1].name}`
                    : "Auta Sannaa kirjautumaan"}
                </button>
                <button type="button" onClick={() => edit(index)}>
                  Muokkaa tätä salasanaa
                </button>
              </div>
            </section>
          )}

          {stage === "login" && (
            <section aria-labelledby="sanna-login">
              <h2 id="sanna-login" ref={heading} tabIndex={-1}>
                Auta Sannaa kirjautumaan: {loginTask.target.name}
              </h2>
              <p>{getSannaLoginLine(loginTask.target.id)}</p>
              <button
                type="button"
                aria-expanded={managerOpen}
                aria-controls="sanna-manager"
                onClick={() => setManagerOpen(!managerOpen)}
              >
                {managerOpen
                  ? "Sulje salasanojen hallintaohjelma"
                  : "Avaa Sannan salasanojen hallintaohjelma"}
              </button>
              <div
                id="sanna-manager"
                hidden={!managerOpen}
                className={own.manager}
              >
                <h3>Sannan tallennetut tilit</h3>
                <p>
                  Etsi palvelulle {loginTask.target.name} antamasi nimi ja täytä
                  sen salasana.
                </p>
                <ul className={own.accounts}>
                  {loginTask.entries.map((item) => (
                    <li key={item.id}>
                      <strong>{entryNames[item.id]}</strong>
                      <button
                        type="button"
                        onClick={() => {
                          setLogin(saved[item.id] ?? "");
                          setVisible(false);
                          setManagerOpen(false);
                          setFeedback(
                            `${entryNames[item.id]}: salasana täytetty. Voit nyt kokeilla kirjautumista.`,
                          );
                          loginInput.current?.focus();
                        }}
                        aria-label={`Täytä salasana: ${entryNames[item.id]}`}
                      >
                        Täytä salasana
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                className={own.login}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (
                    !planCorrect ||
                    !canSignInAsSanna(
                      saved,
                      login,
                      loginTask.target.id,
                      (value) => assessPassword(value)?.score,
                    )
                  ) {
                    setFeedback(
                      `Sanna: Tämä ei avannut oikeaa tiliä. Avaa salasanojen hallintaohjelma ja etsi palvelulle ${loginTask.target.name} antamasi nimi.`,
                    );
                    return;
                  }
                  onComplete();
                  setVisible(false);
                  setLogin("");
                  setPassword("");
                  setSaved({});
                  setEntryNames({});
                  setEntryName("");
                  setStage("complete");
                }}
              >
                <h3>{loginTask.target.name}: harjoituskirjautuminen</h3>
                <p>Käyttäjä: Sanna</p>
                <label className={styles.label} htmlFor="sanna-login-password">
                  Palvelun {loginTask.target.name} salasana
                </label>
                <input
                  ref={loginInput}
                  id="sanna-login-password"
                  type={visible ? "text" : "password"}
                  value={login}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  onChange={(event) => {
                    setLogin(event.target.value);
                    setFeedback("");
                  }}
                />
                <div className={styles.controls}>
                  <button
                    type="button"
                    aria-pressed={visible}
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? "Piilota salasana" : "Näytä salasana"}
                  </button>
                </div>
                <p role="status">{feedback}</p>
                <div className={styles.actions}>
                  <button
                    className={styles.primary}
                    type="submit"
                    disabled={!login}
                  >
                    Kirjaudu palveluun {loginTask.target.name}
                  </button>
                  <button type="button" onClick={() => edit(2)}>
                    Palaa vaihtamaan salasanoja
                  </button>
                </div>
              </form>
            </section>
          )}

          {stage === "complete" && (
            <section aria-labelledby="sanna-complete">
              <h2 id="sanna-complete" ref={heading} tabIndex={-1}>
                Kirjautuminen onnistui: {loginTask.target.name}
              </h2>
              <CompletionBadge label="Auta Sannaa suoritettu" />
              <p>
                ”Nyt jokaisella palvelulla on oma salasana, ja osaan löytää ne.
                Kiitos avusta!”
              </p>
              <p>
                Kolme eri salasanaa vaihdettu ja tallennettu, ja kirjautuminen
                onnistui!
              </p>
              <div className={styles.actions}>
                <Link
                  className={styles.primaryLink}
                  to="/course/passwords/quiz"
                >
                  Jatka eteenpäin
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(0);
                    setLoginTask(createSannaLoginTask());
                    setPlanChoices([]);
                    setPlanOptions(createSannaPlanChoices());
                    setPlanCorrect(false);
                    setFeedback("");
                    setManagerOpen(false);
                    setStage("intro");
                  }}
                >
                  Auta Sannaa uudelleen
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
