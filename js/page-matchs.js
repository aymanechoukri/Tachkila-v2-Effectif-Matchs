import { addMatch, deletedMatch, filterMatchS, poppas, renderMatch, resultMatch, updateMatch, updateScore } from "./matchs.js";

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

const scorePopap = document.querySelector("#popap-score");
const closeOpne = document.querySelectorAll(".open-close-score");
const scoreAtlas = document.querySelector("#score-atlas");
const scoreVs = document.querySelector("#score-vs");
const ajouterScore = document.querySelector("#ajouter-score");

const scorePopapUpdate = document.querySelector("#popap-score-update");
const closeOpneUpdate = document.querySelectorAll(".open-close-score-update");
const scoreAtlasUpdate = document.querySelector("#score-atlas-update");
const scoreVsUpdate = document.querySelector("#score-vs-update");
const modifiaScore = document.querySelector("#modifia-score");

const serch = document.querySelector("#search");
const filterMatch = document.querySelectorAll(".filter-match");


const error1 = document.querySelector(".checked-adversaire");
const error2 = document.querySelector(".checked-date");
const error3 = document.querySelector(".checked-heure");
const error4 = document.querySelector(".checked-lieu");
const error5 = document.querySelector(".checked-type");
const error6 = document.querySelector(".checked-adversaire");

poppas(openOrClosePopap, popap);
addMatch(adversaire, dateMatch, heureMatch, lieuMatch, typeMatch, ajouterMAtch, error1, error2, error3, error4, error5);
renderMatch(tickts)
deletedMatch();
updateMatch(updatePopaap, opneClose, updateAdversaire, updateDateMatch, updateHeureMatch, updateLieu, updateTypeMatch, modifia);
resultMatch(scoreAtlas, scoreVs, scorePopap, closeOpne, ajouterScore);
updateScore(scorePopapUpdate, closeOpneUpdate, scoreAtlasUpdate, scoreVsUpdate, modifiaScore)
filterMatchS(serch, filterMatch)