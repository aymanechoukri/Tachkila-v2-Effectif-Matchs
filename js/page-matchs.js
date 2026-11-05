import { addMatch, deletedMatch, poppas, renderMatch, updateMatch } from "./matchs.js";

const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");
const adversaire = document.getElementById("adversaire");
const dateMatch = document.getElementById("date-match");
const heureMatch = document.getElementById("heure-match");
const lieuMatch = document.getElementById("lieu");
const typeMatch = document.querySelectorAll(".type-match");
const ajouterMAtch = document.getElementById("ajouter");
export const tickts = document.getElementById("tickts");

const updatePopaap = document.getElementById("popap-update");
const opneClose = document.querySelectorAll(".open-close");
const updateAdversaire = document.getElementById("updateAdversaire");
const updateDateMatch = document.getElementById("update-date-match");
const updateHeureMatch = document.getElementById("update-heure-match");
const updateLieu = document.getElementById("update-lieu");
const updateTypeMatch = document.querySelectorAll(".update-type-match");
const modifia = document.getElementById("modifia");


poppas(openOrClosePopap, popap);
addMatch(adversaire, dateMatch, heureMatch, lieuMatch, typeMatch, ajouterMAtch);
renderMatch(tickts)
deletedMatch();
updateMatch(updatePopaap, opneClose, updateAdversaire, updateDateMatch, updateHeureMatch, updateLieu, updateTypeMatch, modifia)

