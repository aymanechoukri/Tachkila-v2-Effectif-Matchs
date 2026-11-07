import { tickts } from "./page-matchs.js";
import { getStorage, setStorageMatch } from "./stockage.js";

const matchs = getStorage("matchs");

export function poppas(btns, popap) {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      popap.hidden = !popap.hidden;
    });
  });
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

  typeMatch.forEach((type) => {
    type.addEventListener("input", (e) => {
      typeValue = e.target.value;
      console.log(typeValue);
    });
  });

  ajouter.addEventListener("click", () => {
    const match = {
      id: Date.now(),
      adversaire: adversaireValue,
      date: dateValue,
      heure: heureVAlue,
      lieu: lieuValue,
      type: typeValue,
      scorA: "",
      scorV: "",
      time: "",
    };

    matchs.push(match);
    setStorageMatch(matchs);
    renderMatch(tickts);

    adversaire.value = "";
    date.value = "";
    heure.value = "";
    lieu.value = "";
    popap.hidden = true;
  });
}

export function renderMatch(tickts, showMatchs = matchs) {
  tickts.innerHTML = "";

  showMatchs.forEach((match) => {
    const date = new Date(match.date + "T12:00:00");

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const anneName = date.toLocaleDateString("en-US", {
      month: "long",
    });

    const days = date.getDay();

    if (date <= new Date()) {
      match.time = "Joues";
    } else {
      match.time = "Venir";
    }

    const html = `
        <article class="flex justify-between backdrop-blur-lg bg-black/50 p-5 rounded-xl items-center">
                    <div class="flex items-center gap-7">
                        <div class="flex flex-col items-center bg-green-900/30 py-2 rounded-lg px-4">
                            <h3 class="font-bold">${dayName}</h3>
                            <p class="font-bold text-3xl">${days}</p>
                            <p class="font-bold">${anneName}</p>
                            <p class="font-bold">${match.heure}</p>
                        </div>

                        <div class="flex flex-col gap-3">
                            <p class="bg-green-600/50 p-1 rounded-lg text-center w-20 font-semibold">${match.type}</p>
                            <h3 class="text-xl font-bold">Atlas FC vs ${match.adversaire}</h3>
                            <p class="font-bold text-green-400 flex items-center gap-2"><i class="fa-solid fa-location-dot"></i>${match.lieu}</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 items-center">
                        <div class="flex items-center justify-center gap-4 ${!match.scorA && match.scorA !== 0 ? "hidden" : ""} bg-green-900/80 border border-slate-700 rounded-xl px-5 py-3 shadow-lg">

                                <p class="${match.scorA > match.scorV ? "text-green-400" : match.scorA < match.scorV ? "text-red-400" : "text-slate-300"} text-2xl font-black bg-green-800/60 px-4 py-2 rounded-lg min-w-14 text-center shadow-inner">
                                  ${match.scorA}
                                </p>

                                <span class="text-xs font-black text-slate-400 tracking-[0.3em] uppercase">
                                  VS
                                </span>

                                <p class="${match.scorA > match.scorV ? "text-green-400" : match.scorA < match.scorV ? "text-red-400" : "text-slate-300"} text-2xl font-black bg-green-800/60 px-4 py-2 rounded-lg min-w-14 text-center shadow-inner">
                                  ${match.scorV}
                                </p>

                                <p class="${
                                  match.scorA > match.scorV
                                    ? "text-green-400 bg-green-500/10 border-green-500/30"
                                    : match.scorA < match.scorV
                                      ? "text-red-400 bg-red-500/10 border-red-500/30"
                                      : "text-slate-300 bg-slate-500/10 border-slate-500/30"
                                } inline-flex items-center gap-2 border px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">

                                ${
                                  match.scorA > match.scorV
                                    ? '<i class="fa-solid fa-trophy"></i> VICTOIRE'
                                    : match.scorA < match.scorV
                                      ? '<i class="fa-solid fa-circle-xmark"></i> DÉFAITE'
                                      : '<i class="fa-solid fa-handshake"></i> MATCH NUL'
                                }

                               </p>
                        </div>
                        <ul class="flex items-center gap-5">
                            <li>
                                  <button
                                    data-modifia=${match.id}
                                    class="${!match.scorA && match.scorA !== 0 ? "hidden" : "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white px-4 py-2 cursor-pointer rounded-xl text-sm font-bold shadow-md transition-all duration-300 active:scale-95"}"
                                  >
                                    Modifier score
                                  </button>
                            </li>
                            <li class=${match.scorA ? "hidden" : ""}><button data-score=${match.id} type="button" class=" ${date <= new Date() ? "bg-blue-500 p-2 rounded-lg font-bold cursor-pointer active:bg-blue-300" : "hidden"}">Siasir le score</button></li>
                            <li data-edite=${match.id}  class="bg-linear-to-r from-green-700 to-slate-200 px-4 py-2 rounded-lg open-close"><i class="fa-solid fa-pen-to-square"></i></li>
                            <li data-deleted=${match.id}  class="bg-linear-to-r from-red-700 to-slate-200 px-4 py-2 rounded-lg"><i class="fa-solid fa-trash cursor-pointer"></i></li>
                        </ul>

                    </div>
                </article>
    `;
    tickts.insertAdjacentHTML("beforeend", html);
  });
}

export function deletedMatch() {
  function findMatch(id) {
    const findMatch = matchs.findIndex((match) => match.id === id);
    matchs.splice(findMatch, 1);
    setStorageMatch(matchs);
  }

  tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-deleted]");

    if (!btn) return;

    const id = Number(btn.dataset.deleted);

    findMatch(id);
    renderMatch(tickts);
  });
}

export function updateMatch(
  updatePopaap,
  opneClose,
  updateAdversaire,
  updateDate,
  updateHeure,
  updateLieu,
  updateTypeMatch,
  modifia,
) {
  let valueAdversaire = "";
  let valueDate = "";
  let valueHeure = "";
  let valueLieu = "";
  let valueTypeMatch = "";

  updateAdversaire.addEventListener("input", (e) => {
    valueAdversaire = e.target.value;
  });

  updateDate.addEventListener("input", (e) => {
    valueDate = e.target.value;
  });

  updateHeure.addEventListener("input", (e) => {
    valueHeure = e.target.value;
  });

  updateLieu.addEventListener("input", (e) => {
    valueLieu = e.target.value;
  });

  updateTypeMatch.forEach((type) => {
    type.addEventListener("input", (e) => {
      valueTypeMatch = e.target.value;
    });
  });

  opneClose.forEach((btn) => {
    btn.addEventListener("click", () => {
      updatePopaap.hidden = true;
    });
  });

  tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-edite]");
    if (!btn) return;
    updatePopaap.hidden = false;

    const id = Number(btn.dataset.edite);

    const findMatch = matchs.find((u) => u.id === id);
    console.log(findMatch);

    valueAdversaire = findMatch.adversaire;
    valueDate = findMatch.date;
    valueHeure = findMatch.heure;
    valueLieu = findMatch.lieu;
    valueTypeMatch = findMatch.type;

    updateAdversaire.value = valueAdversaire;
    updateDate.value = valueDate;
    updateHeure.value = valueHeure;
    updateLieu.value = valueLieu;

    updateTypeMatch.forEach((type) => {
      type.checked = type.value === findMatch.type;
    });

    modifia.addEventListener("click", () => {
      findMatch.adversaire = valueAdversaire;
      findMatch.date = valueDate;
      findMatch.heure = valueHeure;
      findMatch.lieu = valueLieu;
      findMatch.type = valueTypeMatch;

      setStorageMatch(matchs);
      renderMatch(tickts);
      updatePopaap.hidden = true;

      updateAdversaire.value = "";
      updateDate.value = "";
      updateHeure.value = "";
      updateLieu.value = "";
      updateTypeMatch.value = "";
    });
  });
}

export function resultMatch(scoreAtlas, ScoreVs, popap, closeOpne, ajouter) {
  let valueScoreAtlas = "";
  let valueScoreVs = "";
  let matchId = null;

  closeOpne.forEach((btn) => {
    btn.addEventListener("click", () => {
      popap.hidden = true;
    });
  });

  scoreAtlas.addEventListener("input", (e) => {
    valueScoreAtlas = e.target.value;
  });

  ScoreVs.addEventListener("input", (e) => {
    valueScoreVs = e.target.value;
  });

  tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-score]");
    if (!btn) return;

    matchId = Number(btn.dataset.score);
    console.log(matchId);
    popap.hidden = false;
  });

  ajouter.addEventListener("click", () => {
    const findMatch = matchs.find((u) => u.id === matchId);

    findMatch.scorA = valueScoreAtlas;
    findMatch.scorV = valueScoreVs;
    setStorageMatch(matchs);

    popap.hidden = true;
    renderMatch(tickts);

    scoreAtlas.value = "";
    ScoreVs.value = "";
  });
}

export function updateScore(
  scorePopapUpdate,
  closeOpneUpdate,
  scoreAtlasUpdate,
  scoreVsUpdate,
  modifiaScore,
) {
  let matchId = null;

  closeOpneUpdate.forEach((btn) => {
    btn.addEventListener("click", () => {
      scorePopapUpdate.hidden = true;
    });
  });

  tickts.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-modifia]");
    if (!btn) return;
    matchId = Number(btn.dataset.modifia);

    const findMatch = matchs.find((u) => u.id === matchId);

    scoreAtlasUpdate.value = findMatch.scorA;
    scoreVsUpdate.value = findMatch.scorV;

    scorePopapUpdate.hidden = false;
  });

  modifiaScore.addEventListener("click", () => {
    const findMatch = matchs.find((u) => u.id === matchId);

    findMatch.scorA = scoreAtlasUpdate.value;
    findMatch.scorV = scoreVsUpdate.value;

    setStorageMatch(matchs);
    renderMatch(tickts);
    scorePopapUpdate.hidden = true;
  });
}

export function filterMatchS(serch, filterMatch) {
  let valueSerch = "";
  let valueFilter = "All";

  function apllySerch() {
    const filterMatch = matchs.filter((match) => {
      const resultSerch = match.adversaire
        .toLowerCase()
        .includes(valueSerch.toLowerCase());

      const resultFilter =
        valueFilter === "All" ? match.time : match.time === valueFilter;
      return resultSerch && resultFilter;
    });

    renderMatch(tickts, filterMatch);
  }

  serch.addEventListener("input", (e) => {
    valueSerch = e.target.value;
    apllySerch();
  });

  filterMatch.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      valueFilter = e.target.dataset.post;
      apllySerch();
    });
  });
}
