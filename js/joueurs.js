import {tickts2} from "./page-effectif.js";
import {COLOR_PL, joueur, COLOR_MAP, POSITIONS_AUTORISEES} from "./data.js";
import {setStorage, getStorage} from "./stockage.js";

const players = getStorage("players");
let stockId = null;

let currentPage = 1;
const maxPage = 4;
let playersToShow   = null;


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

export function addPlayer(name, positions, number, ajouter, etat, age) {
    let namePlayer = "";
    let numberPlayer = "";
    let positionValue = "";
    let agePlayer = "";
    let etatPlayer = "";


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


    age.addEventListener("input", (e) => {
        agePlayer = e.target.value;
    });

    etat.forEach(btn => {

        btn.addEventListener("click", () => {
            etatPlayer = btn.dataset.etat;
            etat.forEach(btn => {
                btn.classList.remove("background-active")
            })

            btn.classList.add("background-active")
        })
    })

    ajouter.addEventListener("click", () => {
    
    const player = {
        id: Date.now(),
        nom: namePlayer,
        poste: positionValue,
        numero: numberPlayer,
        age: agePlayer,
        etat: etatPlayer,
        selection: POSITIONS_AUTORISEES[positionValue],
        assignedPosition: "",
        capitan: false
    }
    
    
    players.push(player);

    setStorage(players);


    name.value = "";
    number.value = "";

    positions.forEach(position => {
        position.classList.remove("background-active");
    });


    renderPlayers2(tickts2);
    popap.hidden = true;
    showToast("Joueur ajouté avec succès !");
})
    
}

export function poppas(btns, popap) {
    btns.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})

}

export function renderPlayers2(tickts, playerShow = players) {
    function getColor(player) {
        return COLOR_MAP[player.poste]    
    }

    function getTextColor(playe) {
        return COLOR_PL[playe.poste]
    }
    if (playerShow.length == 0) {
        tickts.innerHTML = ` <p class="text-xl font-extrabold bg-linear-to-r from-red-500 to-white bg-clip-text text-transparent ping">Players Not Found...</p>`;
        return;
    }
    playersToShow = playerShow.slice(0, 4)
    tickts.innerHTML = "";
    playersToShow.forEach(player => {
        const color = getColor(player);
        const collorText = getTextColor(player);

        const html = `
            <article data-id=${player.id} class="backdrop-blur-md bg-black/50 p-5 rounded-lg flex flex-col gap-5 shadow-sm ${player.capitan ? "shadow-purple-700" : "shadow-white/20"} border-l-2 ${color}">
                     <div class="flex items-center gap-6">
                        <span class="border-1 p-3 rounded-full ${color} ${collorText}">${player.numero}</span>
                        <div class="flex flex-col gap-1">
                            <h3 class="text-xl font-extrabold">${player.nom}</h3>
                            <p class="${collorText} font-extrabold">${player.poste}</p>
                        </div>
                     </div>

                     <p class="font-extrabold">Age: ${player.age} ans</p>

                     <div class="flex justify-between items-center">
                        <p class="bg-green-300 p-3 rounded-xl text-black font-bold shadow-sm shadow-white">${player.etat}</p>
                         <ul class="flex gap-5">
                            <li><button data-capitan=${player.id} class="bg-linear-to-r from-slate-700 to-slate-200 px-4 py-2 rounded-lg cursor-pointer">C</button></li>
                            <li data-edite=${player.id}  class="bg-linear-to-r from-green-700 to-slate-200 px-4 py-2 rounded-lg open-close"><i class="fa-solid fa-user-pen cursor-pointer"></i></li>
                            <li data-deleted=${player.id}  class="bg-linear-to-r from-red-700 to-slate-200 px-4 py-2 rounded-lg"><i class="fa-solid fa-trash cursor-pointer"></i></li>
                         </ul>
                     </div>
                </article>
        `;

        tickts.insertAdjacentHTML("beforeend", html);
    });
}

export function deletedPlayer() {
    function find(id) {
       const findPlayer = players.findIndex(u => u.id === id);

       players.splice(findPlayer, 1);
       setStorage(players)
    }

    tickts2.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-deleted]");
        if (!btn) return;

        const id = Number(btn.dataset.deleted);
        find(id);
        renderPlayers2(tickts2)
    })
}

export function updatePlayer(popapUpdate, btns, name, number, positions, age, etat, modifier) {
    let updateNom = "";
    let updateNumber = "";
    let updatePoste = "";
    let updateAge = "";
    let updateEtat = "";

     tickts2.addEventListener("click", (e) => {
        const  btn = e.target.closest(".open-close");
        const btn2 = e.target.closest("[data-edite]");
        if(!btn) return;
        if(!btn2) return;

        popapUpdate.hidden = !popapUpdate.hidden;

        stockId = Number(btn2.dataset.edite);
        
        const findPlayer = players.find(u => u.id === stockId);

        console.log(findPlayer);

        name.value = findPlayer.nom;
        number.value = Number(findPlayer.numero);
        age.value = findPlayer.age;

        positions.forEach(position => {
            position.classList.remove("background-active");
        })

        positions.forEach(position => {
            if (position.dataset.position === findPlayer.poste) {
                position.classList.add("background-active");
            }
        });

        etat.forEach(eta => {
            eta.classList.remove("background-active");
        })

        etat.forEach(eta => {
            if (eta.dataset.etat === findPlayer.etat) {
                eta.classList.add("background-active");
            }
        })

        name.addEventListener("input", (e) => {
        updateNom = e.target.value;
        });

        positions.forEach(position => {
        position.addEventListener("click", () => {
        updatePoste = position.dataset.position;
        positions.forEach(btn => {
            btn.classList.remove("background-active");
        });
        position.classList.add("background-active");
    })
    })

    number.addEventListener("input", (e) => {
    updateNumber = e.target.value;
    })

    age.addEventListener("input", (e) => {
        updateAge = e.target.value;
    });


    etat.forEach(btn => {

        btn.addEventListener("click", () => {
            updateEtat = btn.dataset.etat;
            etat.forEach(btn => {
                btn.classList.remove("background-active")
            })

            btn.classList.add("background-active")
        })
    });


    modifier.addEventListener("click", () => {

        findPlayer.nom = updateNom.trim();
        findPlayer.numero = Number(updateNumber);
        findPlayer.poste = updatePoste;
        findPlayer.etat = updateEtat;
        findPlayer.age = Number(updateAge);
    

        setStorage(players);


    name.value = "";
    number.value = "";

    positions.forEach(position => {
        position.classList.remove("background-active");
    });


    renderPlayers2(tickts2);
    popapUpdate.hidden = true;
    showToast("Joueur ajouté avec succès !");
})


    });

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            popapUpdate.hidden = true;
        });
    });

}

export function captan() {
    tickts2.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-capitan]");
        const btn2 = e.target.closest("[data-id]");

        if(!btn) return;

        stockId = Number(btn.dataset.capitan);
        
        const findPlayer = players.find(u => u.id === stockId);

        findPlayer.capitan = !findPlayer.capitan;

        if (findPlayer.capitan) {
            btn2.classList.add("shadow-purple-700");
            btn2.classList.remove("shadow-white/20");
        } else {
            btn2.classList.remove("shadow-purple-700");
            btn2.classList.add("shadow-white/20");
        }

        setStorage(players)
        console.log(findPlayer);
    })
}

export function sercherPlayer(search) {

    let serchValue = "";
    search.addEventListener("input", (e) => {
        serchValue = e.target.value;
        
        const filterPlayer = players.filter(player => player.nom.toLowerCase().includes(serchValue.toLocaleLowerCase()));

        if (!filterPlayer) {
            
        }

        renderPlayers2(tickts2, filterPlayer)
    })
}

export function filterPositionPlayer(poste) {
    let postValue = "";

    poste.forEach(post => {
        post.addEventListener("click", (e) => {
            postValue = e.target.dataset.post;

            const filterPost = players.filter(post => postValue == "All" ? post.poste : post.poste == postValue);

            
            renderPlayers2(tickts2, filterPost);
        })
    })
}

export function nextPage(left, right, page) {
    let totalPlayer = Math.ceil(players.length / maxPage);
    right.addEventListener("click", () => {
         if (currentPage >= totalPlayer) {
            return;
        }
        currentPage += 1;
        let start = (currentPage - 1) * maxPage;
        let end = start + maxPage;
        playersToShow = players.slice(start, end)
        page.textContent = `${currentPage}/${totalPlayer}`
        renderPlayers2(tickts2, playersToShow)
    });

    left.addEventListener("click", () => {
        if (currentPage <= 1) {
            return;
        }
        currentPage -= 1;
        let start = (currentPage - 1) * maxPage;
        let end = start + maxPage;
        playersToShow = players.slice(start, end)
        page.textContent = `${currentPage}/${totalPlayer}`
        renderPlayers2(tickts2, playersToShow);
    })

        page.textContent = `${currentPage}/${totalPlayer}`
    
}