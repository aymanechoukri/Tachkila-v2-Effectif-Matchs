export function setStorage(arr) {
    localStorage.setItem("players", JSON.stringify(arr));
}


export function getStorage(key) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}