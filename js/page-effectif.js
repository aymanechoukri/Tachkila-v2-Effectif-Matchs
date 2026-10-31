import {poppas, addPlayer, renderPlayers2, deletedPlayer, updatePlayer, captan, sercherPlayer} from "./joueurs.js";

export const tickts2 = document.querySelector("#tickts2");
const popap = document.getElementById("popap");
const updatePopop = document.getElementById("popap-update");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");
const openClose = document.querySelectorAll(".open-close");
const name = document.querySelector("#name");
const positions = document.querySelectorAll(".position");
const number = document.querySelector("#number");
const ajouter = document.querySelector("#ajouter");
const age = document.getElementById("age");
const etat =  document.querySelectorAll(".etat");
const serch = document.getElementById("search");


const updateName = document.getElementById("updateName");
const updateAge = document.getElementById("updateAge");
const updatePosition = document.querySelectorAll(".updatePosition");
const updateEtat = document.querySelectorAll(".updateEtat");
const updateNumber = document.getElementById("updateNumber")
const modifier = document.getElementById("modifier");

poppas(openOrClosePopap, popap);
addPlayer(name, positions, number, ajouter, etat, age);
renderPlayers2(tickts2);
deletedPlayer();
updatePlayer(updatePopop, openClose, updateName, updateNumber, updatePosition, updateAge, updateEtat, modifier);
captan();
sercherPlayer(serch);