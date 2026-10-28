import {joueur} from "./data.js";
import {COLOR_MAP} from "./data.js";
import {POSITIONS_AUTORISEES} from "./data.js";

const tickts = document.querySelector("#tickts");
const name = document.querySelector("#name");
const positions = document.querySelectorAll(".position");
const number = document.querySelector("#number");
const ajouter = document.querySelector("#ajouter");
const popap = document.getElementById("popap");
const openOrClosePopap = document.querySelectorAll(".open-or-popap");



console.log(joueur)



export function renderPlayers() {
    function getColor(player) {
        return COLOR_MAP[player.position]    
    }
    tickts.innerHTML = "";

    joueur.forEach(player => {
        const color = getColor(player);

        const html = `
            <article value=${player.id} class="flex flex-col gap-6 p-2 border-l-5 rounded-xl ${color} article">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <p class="border-1 ${color} px-4 py-2 rounded-full">
                            ${player.numero}
                        </p>

                        <div>
                            <h3 class="text-2xl font-bold">
                                ${player.nom}
                            </h3>

                            <p class="${color} font-bold">
                                ${player.poste}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <i
                            data-edit="${player.id}"
                            class="btn-edit fa-solid fa-pen-to-square text-slate-400 text-2xl cursor-pointer hover:text-slate-500"
                        ></i>

                        <i
                            data-delete="${player.id}"
                            class="fa-solid fa-trash text-red-400 text-2xl cursor-pointer hover:text-red-500"
                        ></i>
                    </div>
                </div>

                <select  data-player=${player.id} name="position"  class="w-full h-[6vh] border border-slate-700 outline-none text-lg text-gray-300 bg-slate-800 font-bold px-4 rounded-lg cursor-pointer transition-all duration-300 focus:${color} hover:${color}" >
                    <option value="" disabled ${player.assignedPosition ? "" : "selected"}>
                        Choisir un poste
                    </option>
                    ${(POSITIONS_AUTORISEES[player.position] || []).map(u => `
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


export function addPlayer() {
    let namePlayer = "";
    let numberPlayer = "";
    let positionValue = "";

    name.addEventListener("input", (e) => {
    namePlayer = e.target.value;

    console.log(namePlayer)
});

    positions.forEach(position => {
    position.addEventListener("click", () => {
        positionValue = position.dataset.position;
        console.log(positionValue)
        positions.forEach(btn => {
            btn.classList.remove("background-active");
        });
        position.classList.add("background-active");
    })
    
})

    number.addEventListener("input", (e) => {
    numberPlayer = e.target.value;
})

    ajouter.addEventListener("click", () => {
    
    const player = {
        id: Date.now(),
        nom: namePlayer,
        poste: positionValue,
        numero: numberPlayer,
        selection: POSITIONS_AUTORISEES[positionValue],
        assignedPosition: ""
    }
    
    
    joueur.push(player);

    name.value = "";
    number.value = "";

    positions.forEach(position => {
        position.classList.remove("background-active");
    });


    renderPlayers();
    popap.hidden = true;
    showToast("Joueur ajouté avec succès !");
})
    
}


export function poppas() {
    openOrClosePopap.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})
}
