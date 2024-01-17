// import { storageService } from './async-storage.service.js'
import { httpService } from "./http-service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user-service.js"
// import { userService } from './user.service.js'

const STORAGE_KEY = "post"

export const postService = {
    query,
    getById,
    save,
    remove,
    manageBody,
    // getEmptyPost,
    // addPostMsg
}
window.cs = postService

async function query(filterBy = { tag: "", order: 'likes' }) {
    return httpService.get(STORAGE_KEY,filterBy)

    // var posts = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    // }
    // if (filterBy.price) {
    //     posts = posts.filter(post => post.price <= filterBy.price)
    // }
    // return posts
}
function getById(postId) {
    // return storageService.get(STORAGE_KEY, postId)
    return httpService.get(`post/${postId}`)
}

async function remove(postId) {
    // await storageService.remove(STORAGE_KEY, postId)
    return httpService.delete(`post/${postId}`)
}
async function save(post) {
    var savedPost
    if (post.id) {
        // savedPost = await storageService.put(STORAGE_KEY, post)
        savedPost = await httpService.put(`post/${post.id}`, post)
    } else {
        // Later, owner is set by the backend
        // post.owner = userService.getLoggedinUser()
        // savedPost = await storageService.post(STORAGE_KEY, post)
        savedPost = await httpService.post("post", post)
    }
    return savedPost
}

function manageBody(body) {
    let bodyToEdit = body
    if (!RegExp.escape) {
        RegExp.escape = function (s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }
    }
    const subEsc = RegExp.escape("**")
    const regex = new RegExp(subEsc, "g")
    const matches = body.match(regex)?  Object.keys(body.match(regex)) : []
    for (var i = 0; i < matches.length; i++) {
        bodyToEdit = bodyToEdit.replace(
            "**",
            i % 2 === 0 ? "<strong>" : "</strong>"
        )
    }

    return bodyToEdit
}

// async function addPostMsg(postId, txt) {
//     const savedMsg = await httpService.post(`posts/${postId}/msg`, {txt})
//     return savedMsg
// }

// function getEmptyPost() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }
