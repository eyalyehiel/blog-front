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
    root.classList.add("light")
    
    // const { theme } = userService.getLoggedinUser()
    // if(!theme)
    // console.log(theme)
    // if (theme === "light") {
    //     root.classList.remove("dark")
    // } else {
    //     root.classList.add("dark")
    //     root.classList.remove("light")
    // }
    // // root.classList.add("light")
    // let currrent = loadFromStorage("theme")
    // console.log(currrent);
    // if (!currrent) {
    // saveToStorage("theme", "light")
    // return
    // }
    // console.log(theme);
    // if (theme) {
    //     root.classList.add("light")
    //     root.classList.remove('dark')
    //     saveToStorage("theme", "light")
    // } else {
    //     root.classList.add("dark")
    //     root.classList.remove("light")
    //     saveToStorage("theme", "dark")
    // }
    // if (!themeC) {
    //     root.classList.add("dark")
    //     saveToStorage("theme", "dark")
    // } else if (themeC === "dark") {
    //     root.classList.remove("dark")
    //     root.classList.add("light")
    //     saveToStorage("theme", "light")
    // } else {
    //     root.classList.add("dark")
    //     root.classList.remove("light")
    //     saveToStorage("theme", "dark")
    // }
}
