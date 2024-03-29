import { userService } from "./user-service.js"
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    toggleTheme,
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

function toggleTheme() {
    const root = document.documentElement
    const { theme } = userService.getLoggedinUser() || { theme: null }
    if (!theme) {
        root.classList.add("light")
        return
    }
    theme && root.classList.add(theme)
    if (theme === "light") {
        root.classList.remove("dark")
    } else root.classList.remove("light")
}
