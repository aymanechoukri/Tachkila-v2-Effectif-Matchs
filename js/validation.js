import { getStorage } from "./stockage.js";

const players = getStorage("players");

export function validationAjouter(name, positions, number, etat, age, errorName, errorAge, errorPost, errorNumber, errorEtat, errorRepNumber) {
    const regexName = /^[a-zA-Z\s'-]+$/;

    if (!regexName.test(name.trim())) {
        errorName.textContent = "Le nom est incorrect.";
        return false
    }

    if (Number(age) < 18 || Number(age) > 40) {
        errorAge.textContent = "L'âge doit être compris entre 18 et 40 ans.";
        return false;
    }

    if (positions == "") {
        errorPost.textContent = "Choisissez le poste du joueur.";
        return false;
    }

    if (Number(number) <= 0 || Number(number) >= 100) {
        errorNumber.textContent = "être number entre 1 et 99."
        return false;
    }

    if (etat == "") {
        errorEtat.textContent = "Sélectionnez le statut du joueur."
        return false;
    }

    for (let i = 0 ; i < players.length ; i++) {
        if (Number(players[i].numero) == Number(number)) {
            errorRepNumber.textContent = "Ce numéro existe déjà.";
            return false;
        }
    }

    return true;
}