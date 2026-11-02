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

        console.log("djdj")
        const match = {
            id: Date.now(),     
            adversaire: adversaireValue,
            date: dateValue, 
            heure: heureVAlue,  
            lieu: lieuValue,
            typeMatch: typeValue
        }

        matchs.push(match);
        setStorageMatch(matchs);
        console.log(matchs)

        adversaire.value = "";
        date.value = "";
        heure.value = "";
        lieu.value = "";
        popap.hidden = true;
    })
}