const formular = document.getElementById("kontaktformular");
const vornameFeld = document.getElementById("vorname");
const nachnameFeld = document.getElementById("nachname");
const emailFeld = document.getElementById("email");
const telefonFeld = document.getElementById("telefon");
const bemerkungFeld = document.getElementById("bemerkung");

const fehlerVorname = document.getElementById("fehler-vorname");
const fehlerNachname = document.getElementById("fehler-nachname");
const fehlerEmail = document.getElementById("fehler-email");
const fehlerTelefon = document.getElementById("fehler-telefon");
const fehlerBemerkung = document.getElementById("fehler-bemerkung");

function zeigeFehler(
  feld,
  fehlerTextElement,
  bedingung,
  text = "Bitte korrekt ausfüllen."
) {
  if (bedingung) {
    fehlerTextElement.textContent = text;
    fehlerTextElement.style.display = "block";
    feld.classList.add("fehlerhaft");
    return true;
  } else {
    fehlerTextElement.textContent = "";
    fehlerTextElement.style.display = "none";
    feld.classList.remove("fehlerhaft");
    return false;
  }
}

formular.addEventListener("submit", async (event) => {
  event.preventDefault();

  let fehler = false;

  fehler |= zeigeFehler(
    vornameFeld,
    fehlerVorname,
    vornameFeld.value.trim().length < 2,
    "Mindestens 2 Buchstaben."
  );
  fehler |= zeigeFehler(
    nachnameFeld,
    fehlerNachname,
    nachnameFeld.value.trim().length < 2,
    "Mindestens 2 Buchstaben."
  );
  fehler |= zeigeFehler(
    emailFeld,
    fehlerEmail,
    !emailFeld.value.includes("@"),
    "Bitte gültige E-Mail eingeben."
  );
  fehler |= zeigeFehler(
    telefonFeld,
    fehlerTelefon,
    telefonFeld.value && !/^[0-9 +().-]{6,}$/.test(telefonFeld.value),
    "Ungültige Telefonnummer."
  );
  fehler |= zeigeFehler(
    bemerkungFeld,
    fehlerBemerkung,
    bemerkungFeld.value.trim().length < 2,
    "Bitte Bemerkung eingeben."
  );

  if (fehler) return;

  const daten = {
    vorname: vornameFeld.value.trim(),
    nachname: nachnameFeld.value.trim(),
    email: emailFeld.value.trim(),
    telefon: telefonFeld.value.trim(),
    bemerkung: bemerkungFeld.value.trim(),
  };

  const bereitsVorhanden = await checkEmailExists(daten.email);
  if (bereitsVorhanden) {
    fehlerEmail.textContent = "Diese E-Mail ist bereits registriert.";
    fehlerEmail.style.display = "block";

    return;
  }

  await databaseClient.insertInto("scentandflames_user", daten);

  formular.reset();
});

async function checkEmailExists(email) {
  const result = await databaseClient.selectWhere(
    "scentandflames_user",
    "email",
    email
  );
  return result && result.length > 0;
}
