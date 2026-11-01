import { stockId } from "./joueurs.js";
import { getStorage } from "./stockage.js";

const players = getStorage("players");

export function validationAjouter(name, positions, number, etat, age, errorName, errorAge, errorPost, errorNumber, errorEtat, errorRepNumber) {
    const regexName = /^[a-zA-Z\s'-]+$/;

    if (!regexName.test(name.trim())) {
        errorName.forEach(error => {
            error.textContent = "Le nom est incorrect.";
        });
        return false
    }

    if (Number(age) < 18 || Number(age) > 40) {
        errorAge.forEach(error => {
            error.textContent = "L'âge doit être compris entre 18 et 40 ans.";
        });
        return false;
    }

    if (positions == "") {
        errorPost.forEach(error => {
            error.textContent = "Choisissez le poste du joueur.";
        });
        return false;
    }

    if (Number(number) <= 0 || Number(number) >= 100) {
        errorNumber.forEach(error => {
            error.textContent = "être number entre 1 et 99."
        });
        return false;
    }

    if (etat == "") {
        errorEtat.forEach(error => {
            error.textContent = "Sélectionnez le statut du joueur."
        });
        return false;
    }

    for (let i = 0 ; i < players.length ; i++) {
        if (Number(players[i].numero) == Number(number) && players[i].id !== stockId) {
            errorRepNumber.forEach(error => {
            error.textContent = "Ce numéro existe déjà.";
        });
            return false;
        }
    }

    return true;
}