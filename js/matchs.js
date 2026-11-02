import { tickts } from "./page-matchs.js";
import { getStorage, setStorageMatch } from "./stockage.js";


const matchs = getStorage("matchs")



export function poppas(btns, popap) {
    btns.forEach(btn => {
    btn.addEventListener("click", () => {
        popap.hidden = !popap.hidden;
    })
})

}

export function addMatch(adversaire, date, heure, lieu, typeMatch, ajouter) {
    let adversaireValue = "";
    let dateValue = "";
    let heureVAlue = "";
    let lieuValue = "";
    let typeValue = "";

    adversaire.addEventListener("input", (e) => {
        adversaireValue = e.target.value;
    });

    date.addEventListener("input", (e) => {
        dateValue = e.target.value;
    });

    heure.addEventListener("input", (e) => {
        heureVAlue = e.target.value;
    });

    lieu.addEventListener("input", (e) => {
        lieuValue = e.target.value;
    });

    typeMatch.forEach(type => {
        type.addEventListener("input", (e) => {
            typeValue = e.target.value;
            console.log(typeValue)
        })
    })

    
    ajouter.addEventListener("click", () => {

        const match = {
            id: Date.now(),     
            adversaire: adversaireValue,
            date: dateValue, 
            heure: heureVAlue,  
            lieu: lieuValue,
            type: typeValue
        }

        matchs.push(match);
        setStorageMatch(matchs);
        renderMatch(tickts)

        adversaire.value = "";
        date.value = "";
        heure.value = "";
        lieu.value = "";
        popap.hidden = true;
    })
}

export function renderMatch(tickts) {
    tickts.innerHTML = "";

    matchs.forEach(match => {
        const [annee, mois, jour] = match.date.split("-");

        const dateObject = new Date(match.date);

        const dayName = dateObject.toLocaleDateString("en-US", {
            weekday: "long"
        });
        const anneName = dateObject.toLocaleDateString("en-US", {
            month: "long"
        })
        const html = `
        <article class="flex justify-between backdrop-blur-lg bg-black/50 p-5 rounded-xl items-center">
                    <div class="flex items-center gap-7">
                        <div class="flex flex-col items-center bg-green-900/30 py-2 rounded-lg px-4">
                            <h3 class="font-bold">${dayName}</h3>
                            <p class="font-bold text-3xl">${jour}</p>
                            <p class="font-bold">${anneName}</p>
                            <p class="font-bold">${match.heure}</p>
                        </div>

                        <div class="flex flex-col gap-3">
                            <p class="bg-green-600/50 p-1 rounded-lg text-center w-20 font-semibold">${match.type}</p>
                            <h3 class="text-xl font-bold">Atlas FC vs ${match.adversaire}</h3>
                            <p class="font-bold text-green-400 flex items-center gap-2"><i class="fa-solid fa-location-dot"></i>${match.lieu}</p>
                        </div>
                    </div>
                    
                    <div>
                        <ul class="flex items-center gap-5">
                            <li><button type="button" class="bg-blue-500 p-2 rounded-lg font-bold cursor-pointer active:bg-blue-300">Siasir le score</button></li>
                            <li data-edite=${match.id}  class="bg-linear-to-r from-green-700 to-slate-200 px-4 py-2 rounded-lg open-close"><i class="fa-solid fa-pen-to-square"></i></li>
                            <li data-deleted=${match.id}  class="bg-linear-to-r from-red-700 to-slate-200 px-4 py-2 rounded-lg"><i class="fa-solid fa-trash cursor-pointer"></i></li>
                        </ul>

                    </div>
                </article>
    `;
    tickts.insertAdjacentHTML("beforeend", html);
    })

}