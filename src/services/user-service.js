import { postService } from "./post-service.js"
import { httpService } from "./http-service.js"
import { showErrorMsg } from "./event-bus.service.js"
// import { orderService } from "./order-service.js"
// import { socketService } from "./socket-service"
// import { showSuccessMsg, showErrorMsg } from "./event-bus-service"

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    // setWishlist,
    // getTripsByUserId,
    saveToUserPosts,
    // getPostsByUserId,
    // removeFromUserPosts,
    // getOrdersByUserId,
}
window.userService = userService
function getUsers() {
    return httpService.get(`user`)
}
// async function getOrdersByUserId(hostId) {
//     return await orderService.query({ hostId })
// }
// async function getTripsByUserId(buyerId) {
//     return await orderService.query({ buyerId })
// }
// async function getPostsByUserId(userId) {
//     const user = await userService.getById(userId)
//     return user.posts
// }
async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}
async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}
async function login(userCred) {
    const user = await httpService.post("auth/login", userCred)
    if (user) {
        // showSuccessMsg(`Welcome ${user.username}`)
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl)
        userCred.imgUrl =
            "https://res.cloudinary.com/dirvusyaz/image/upload/v1670419729/77_eaxuqe.png"
    const user = await httpService.post("auth/signup", userCred)
    // socketService.login(user._id)
    // showSuccessMsg(`Welcome ${user.fullname}!`)
    return saveLocalUser(user)
}
async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // showErrorMsg(`You are logged out`)
    return await httpService.post("auth/logout")
}
function saveLocalUser(user) {
    delete user.password
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    localStorage.setItem("loggedinUser", JSON.stringify(user))
    return user
}
function getLoggedinUser() {
    const user =
        JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) ||
        JSON.parse(localStorage.getItem("loggedinUser"))
    return user
}
// async function setWishlist(postId) {
//     const { _id } = getLoggedinUser()
//     const user = await getById(_id)
//     const idx = user.wishlist.findIndex((post) => post._id === postId)
//     if (idx > -1) {
//         user.wishlist.splice(idx, 1)
//         return await update(user)
//     }
//     const { name, imgUrls, loc } = await postService.getById(postId)
//     const miniPost = {
//         _id: postId,
//         name,
//         imgUrls,
//         address: loc.address,
//     }
//     user.wishlist.push(miniPost)
//     return await update(user)
// }
async function saveToUserPosts(miniPost) {
    const user = await getById(miniPost.author._id)
    const postToSave = user.posts.find((post) => post._id === miniPost._id)
    if (!postToSave) {
        user.posts.push(miniPost)
    } else {
        user.posts = user.posts.map((post) => {
            if (post._id === miniPost._id) return miniPost
            else return post
        })
    }
    return await update(user)
}
// async function removeFromUserPosts(postId) {
//     const { _id } = getLoggedinUser()
//     const user = await getById(_id)
//     const idx = user.posts.findIndex((post) => post._id === postId)
//     user.posts.splice(idx, 1)
//     return await update(user)
// }
