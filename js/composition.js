import {COLOR_PL, joueur, COLOR_MAP, POSITIONS_AUTORISEES} from "./data.js";
import {getStorage, setStorage} from "./stockage.js";
import { showToast } from "./interface.js";



const players = getStorage("players");

export function renderPlayers(tickts) {
    function getColor(player) {
        return COLOR_MAP[player.poste]    
    }
    function getColorText(player) {
        return COLOR_PL[player.poste]
    }
    tickts.innerHTML = "";

    players.forEach(player => {
        const color = getColor(player);
        const colorText = getColorText(player)

        const html = `
            <article value=${player.id} class="flex flex-col gap-6 p-2 border-l-5 rounded-xl ${color} article">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <p class="border-1 ${color} px-4 py-2 ${colorText} rounded-full">
                            ${player.numero}
                        </p>

                        <div>
                            <h3 class="text-2xl font-bold ${colorText}">
                                ${player.nom}
                            </h3>

                            <p class="${color} font-bold ${colorText}">
                                ${player.poste}
                            </p>
                        </div>
                    </div>
                </div>

                <select  data-player=${player.id} name="position"  class="w-full h-[6vh] border border-slate-700 outline-none text-lg text-gray-300 bg-slate-800 font-bold px-4 rounded-lg cursor-pointer transition-all duration-300 focus:${color} hover:${color}" >
                    <option value="" disabled ${player.assignedPosition ? "" : "selected"}>
                        Choisir un poste
                    </option>
                    ${(POSITIONS_AUTORISEES[player.poste] || []).map(u => `
                    <option
                            value="${u.value}"
                            ${player.assignedPosition === u.value ? "selected" : ""}
                        >
                            ${u.label}
                        </option>
                        `).join("")}
                </select>
                    <button data-toch=${player.id} class="cursor-pointer touch bg-red-300 rounded-md py-2 font-bold hover:scale-102 duration-100" type="button">Bon toch</button>
            </article>
        `;

        tickts.insertAdjacentHTML("beforeend", html);
    });
}

export function countPlayer(count) {
    count.textContent = players.length;
}


export function addPlayerInTiran(tickts) {

    tickts.addEventListener("change", (e) => {

        if (!e.target.matches("select[data-player]")) return;

        const select = e.target;

        const id = Number(select.dataset.player);
        const valueSelect = select.value;

        const player = players.find(p => p.id === id);
        if (!player) return;

        const postesAutorises =
            POSITIONS_AUTORISEES[player.poste] || [];

        if (!postesAutorises.some(p => p.value === valueSelect)) {
            showToast("Ce joueur ne peut pas jouer à ce poste !");
            select.value = "";
            return;
        }

        if (player.etat !== "forme") {
            showToast("Ce joueur En Blessé!");
            return;
        }

        const namePl = document.querySelector(
            `.name-pl[value="${valueSelect}"]`
        );

        const numPl = document.querySelector(
            `.num-pl[value="${valueSelect}"]`
        );

        if (!namePl || !numPl) return;

        if (
            namePl.textContent !== "?" &&
            namePl.textContent !== player.nom
        ) {
            showToast("Cette position est déjà occupée !");
            select.value = "";
            return;
        }

        if (player.assignedPosition) {

            const oldName = document.querySelector(
                `.name-pl[value="${player.assignedPosition}"]`
            );

            const oldNum = document.querySelector(
                `.num-pl[value="${player.assignedPosition}"]`
            );

            if (oldName && oldNum) {
                oldName.textContent = "?";
                oldNum.textContent = "?";
            }
        }

        namePl.textContent = player.nom;
        numPl.textContent = player.numero;

        player.assignedPosition = valueSelect;

        setStorage(players);

    });
}


export function renderPitch() {
    players.forEach(player => {

        if (!player.assignedPosition) return;

        const namePl = document.querySelector(
            `.name-pl[value="${player.assignedPosition}"]`
        );

        const numPl = document.querySelector(
            `.num-pl[value="${player.assignedPosition}"]`
        );

        if (namePl && numPl) {
            namePl.textContent = player.nom;
            numPl.textContent = player.numero;
        }
    });
}

export function removePlayerFromPitch(tickts) {

    tickts.addEventListener("click", (e) => {

        const btn = e.target.closest("[data-toch]");
        if (!btn) return;

        const id = Number(btn.dataset.toch);

        const player = players.find(p => p.id === id);

        if (!player || !player.assignedPosition) {
            showToast("Ce joueur n'est pas sur le terrain !", "error");
            return;
        }

        const poste = player.assignedPosition;

        const namePl = document.querySelector(
            `.name-pl[value="${poste}"]`
        );

        const numPl = document.querySelector(
            `.num-pl[value="${poste}"]`
        );

        if (namePl && numPl) {
            namePl.textContent = "?";
            numPl.textContent = "?";
        }

        player.assignedPosition = "";

        setStorage(players);

        const select = tickts.querySelector(
            `select[data-player="${id}"]`
        );

        if (select) select.value = "";

        showToast("Joueur retiré du terrain !");
    });
}