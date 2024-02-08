export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    setStyleMode,
}

function makeId(length = 5) {
    var txt = ""
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function setStyleMode() {
    const currentHour = new Date().getHours()
    const root = document.documentElement
    if (currentHour > 17 || currentHour < 7) {
        root.classList.add("dark")
    } else {
        root.classList.add("light")
    }
}
