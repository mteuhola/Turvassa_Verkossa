import { ZxcvbnFactory } from "@zxcvbn-ts/core";
import * as common from "@zxcvbn-ts/language-common";
import * as english from "@zxcvbn-ts/language-en";
import finnishPasswordText from "../../../common_finnish_passwords.txt?raw";

const finnishPasswords = [
  ...new Set(
    finnishPasswordText
      .split(/\r?\n/)
      .map((word) => word.trim().toLowerCase())
      .filter(Boolean),
  ),
];

// A small supplement, not a comprehensive Finnish dictionary. See the activity notes.
const estimator = new ZxcvbnFactory({
  translations: english.translations,
  graphs: common.adjacencyGraphs,
  dictionary: {
    ...common.dictionary,
    ...english.dictionary,
    finnish: finnishPasswords,
  },
});

export const MAX_PASSWORD_LENGTH = 128;
export const strengthLabels = [
  "Erittäin heikko",
  "Heikko",
  "Kohtalainen",
  "Vahva",
  "Erittäin vahva",
];

export function assessPassword(password: string) {
  if (!password || password.length > MAX_PASSWORD_LENGTH) return null;
  const result = estimator.check(password);
  const patterns = new Set(result.sequence.map((match) => match.pattern));
  const tips: string[] = [];
  if (Array.from(password).length < 15)
    tips.push(
      "Pidennä salasanaa. Tavoittele ainakin 15 merkkiä, esimerkiksi useita toisiinsa liittymättömiä sanoja.",
    );
  if (patterns.has("repeat"))
    tips.push(
      "Saman merkin tai sanan toistaminen on helppo arvata. Kokeile erilaisia sanoja.",
    );
  if (patterns.has("sequence") || patterns.has("spatial"))
    tips.push(
      "Vältä numero- ja kirjainsarjoja sekä näppäimistön vierekkäisiä kirjaimia, kuten 123456 tai qwerty.",
    );
  if (patterns.has("date"))
    tips.push(
      "Päivämäärät ovat arvattavia. Älä käytä syntymäpäivääsi tai muita henkilökohtaisia tietoja.",
    );
  if (result.score < 3 && patterns.has("dictionary"))
    tips.push(
      "Arviossa löytyi tuttu sana tai yleinen salasana. Pelkkä iso alkukirjain, numeron lisääminen tai kirjaimen korvaaminen merkillä ei yleensä riitä.",
    );
  if (!tips.length)
    tips.push(
      result.score >= 3
        ? "Mainiota! Käytä oikeissakin palveluissa jokaiseen tiliin omaa salasanaa."
        : "Kokeile useita toisiinsa liittymättömiä sanoja tai sisältöä, joka ei koostu oikeista sanoista. Vältä tuttuja sanontoja ja henkilötietoja.",
    );
  return { score: result.score, label: strengthLabels[result.score], tips };
}
