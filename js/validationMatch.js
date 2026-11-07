export function validationMatchs(adversaire, date, heure, lieu, type, error1, error2, error3, error4, error5) {
  const regexName = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  const regexDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  const regexHeure = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;


  let isValid = true;

  if (!regexName.test(adversaire.value.trim())) {
    error1.textContent = "Le nom est incorrect.";
    isValid = false;
  }

  if (!regexDate.test(date.value.trim())) {
    error2.textContent = "La date est incorrecte.";
    isValid = false;
  }

  if (!regexHeure.test(heure.value.trim())) {
    error3.textContent = "L'heure est incorrecte.";
    isValid = false;
  }

  if (!regexName.test(lieu.value.trim())) {
    error4.textContent = "Le lieu est incorrect.";
    isValid = false;
  }

  if (![...type].some((radio) => radio.checked)) {
    error5.textContent = "Choisissez le type du match.";
    isValid = false;
  }

  return isValid;
}