import { addMatch, poppas, renderMatch } from "./matchs.js";

const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");
const adversaire = document.getElementById("adversaire");
const dateMatch = document.getElementById("date-match");
const heureMatch = document.getElementById("heure-match");
const lieuMatch = document.getElementById("lieu");
const typeMatch = document.querySelectorAll(".type-match");
const ajouterMAtch = document.getElementById("ajouter");
export const tickts = document.getElementById("tickts");


poppas(openOrClosePopap, popap);
addMatch(adversaire, dateMatch, heureMatch, lieuMatch, typeMatch, ajouterMAtch);
renderMatch(tickts)
console.log("aymanr", tickts)
