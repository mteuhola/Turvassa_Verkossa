from pathlib import Path
from zxcvbn import zxcvbn

MAX_PASSWORD_LENGTH = 128
FINNISH_PASSWORDS = list(dict.fromkeys(
    word.strip().lower()
    for word in Path(__file__).with_name("common_finnish_passwords.txt").read_text(encoding="utf-8").splitlines()
    if word.strip()
))
STRENGTH_LABELS = ['Erittäin heikko', 'Heikko', 'Kohtalainen', 'Vahva', 'Erittäin vahva']

def assess_password(password: str) -> dict:
    result = zxcvbn(password, user_inputs=FINNISH_PASSWORDS, max_length=MAX_PASSWORD_LENGTH)
    patterns = {match["pattern"] for match in result["sequence"]}
    tips = []
    tips.append(f"Todennäköinen murtamisaika: {format_crack_time(result['crack_times_seconds']['offline_fast_hashing_1e10_per_second'])}.")
    if len(password) < 15:
        tips.append('Pidennä salasanaa. Tavoittele ainakin 15 merkkiä, esimerkiksi useita toisiinsa liittymättömiä sanoja.')
    if "repeat" in patterns and result["score"] < 3:
        tips.append('Saman merkin tai sanan toistaminen on helppo arvata. Kokeile erilaisia sanoja.')
    if bool(patterns & {"sequence", "spatial"}):
        tips.append('Vältä numero- ja kirjainsarjoja sekä näppäimistön vierekkäisiä kirjaimia, kuten 123456 tai qwerty.')
    if "date" in patterns:
        tips.append('Päivämäärät ovat arvattavia. Älä käytä syntymäpäivääsi tai muita henkilökohtaisia tietoja.')
    if result["score"] < 3 and "dictionary" in patterns:
        tips.append('Arviossa löytyi tuttu sana tai yleinen salasana. Pelkkä iso alkukirjain, numeron lisääminen tai kirjaimen korvaaminen merkillä ei yleensä riitä.')
    if not tips:
        tips.append('Mainiota! Käytä oikeissakin palveluissa jokaiseen tiliin omaa salasanaa.' if result["score"] >= 3 else 'Kokeile useita toisiinsa liittymättömiä sanoja tai sisältöä, joka ei koostu oikeista sanoista. Vältä tuttuja sanontoja ja henkilötietoja.')
    return {"score": result["score"], "label": STRENGTH_LABELS[result["score"]], "tips": tips}


def format_crack_time(crack_time_in_seconds: int):
    if crack_time_in_seconds < 1:
        return "Alle sekunti"

    seconds_in_minute = 60
    seconds_in_hour = seconds_in_minute * 60
    seconds_in_day = seconds_in_hour * 24
    seconds_in_month = seconds_in_day * 30
    seconds_in_year = seconds_in_day * 365

    time_units = [
        ("vuotta", seconds_in_year),
        ("kuukautta", seconds_in_month),
        ("päivää", seconds_in_day),
        ("tuntia", seconds_in_hour),
        ("minuuttia", seconds_in_minute),
        ("sekuntia", 1),
    ]

    parts = []
    time_left = crack_time_in_seconds

    for unit_name, unit_seconds in time_units:
        amount, time_left = divmod(time_left, unit_seconds)

        if amount > 0:
            parts.append(f"{amount} {unit_name}")

    return ", ".join(parts)