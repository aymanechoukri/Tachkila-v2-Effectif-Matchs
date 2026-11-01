import { renderPlayers, countPlayer, addPlayerInTiran, renderPitch, removePlayerFromPitch } from "./composition.js";

const tickts = document.getElementById("tickts");
const countJoueur = document.querySelector(".count-joueur");

renderPlayers(tickts);
countPlayer(countJoueur);
addPlayerInTiran(tickts);
renderPitch();
removePlayerFromPitch(tickts)