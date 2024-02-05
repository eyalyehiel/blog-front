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
    likePost,
    // getEmptyPost,
    // addPostMsg
}
window.cs = postService

async function query(filterBy = { tag: "", order: "new" }) {
    return httpService.get(STORAGE_KEY, filterBy)

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
    const user = userService.getLoggedinUser()
    // var post = {
    //     title,
    //     body,
    //     tags,
    //     author: {
    //         _id: user._id,
    //         username: user.username,
    //         imgUrl: user.imgUrl,
    //     },
    //     // userLiked: [],
    //     // comments: [],
    //     // createdAt: Date.now(),
    //     isDraft: toDraft,
    // }
    var savedPost
    if (post._id) {
        // savedPost = await storageService.put(STORAGE_KEY, post)
        savedPost = await httpService.put(`post/${post._id}`, post)
    } else {
        // Later, owner is set by the backend
        // post.owner = userService.getLoggedinUser()
        // savedPost = await storageService.post(STORAGE_KEY, post)
        savedPost = await httpService.post("post", post)
    }
    // const miniPost = {
    //     _id: savedPost._id,
    //     title: savedPost.title,
    //     comments: savedPost.comments || [],
    //     userLiked: savedPost.userLiked || [],
    //     isDraft: savedPost.isDraft,
    // }
    // await userService.addToUserPosts(miniPost)
    return savedPost
}

function manageBody(body) {
    let bodyToEdit = body
    var bodyArray = []
    bodyToEdit = _addBold(bodyToEdit)
    // bodyToEdit = _addItalic(bodyToEdit)
    // bodyToEdit = _addUrl(bodyToEdit)
    // bodyToEdit = _addHeading(bodyToEdit)
    // bodyToEdit = _addQoute(bodyToEdit)
    // bodyToEdit = _addCode(bodyToEdit)
    return bodyToEdit
}
function _addBold(body) {
    const regex = /\*\*(.*?)\*\*/g;
    const matches = [];
    let match;

    while ((match = regex.exec(body)) !== null) {
        matches.push(match[1]);
        // bodyArray.push(match[1])
    }
    console.log(matches);
    return matches;
    // let bodyToEdit = body
    // if (!RegExp.escape) {
    //     RegExp.escape = function (s) {
    //         return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    //     }
    // }
    // const subEsc = RegExp.escape("**")
    // const regex = new RegExp(subEsc, "g")
    // const matches = body.match(regex) ? Object.keys(body.match(regex)) : []
    // console.log(matches);
    // for (var i = 0; i < matches.length; i++) {
    //     bodyToEdit = bodyToEdit.replace(
    //         "**",
    //         i % 2 === 0 ? "<strong>" : "</strong>"
    //     )
    // }

    // return bodyToEdit
}
// function _addItalic(body) {
//     let bodyToEdit = body
//     if (!RegExp.escape) {
//         RegExp.escape = function (s) {
//             return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
//         }
//     }
//     const subEsc = RegExp.escape("_")
//     const regex = new RegExp(subEsc, "g")
//     const matches = body.match(regex) ? Object.keys(body.match(regex)) : []
//     for (var i = 0; i < matches.length; i++) {
//         bodyToEdit = bodyToEdit.replace("_", i % 2 === 0 ? "<em>" : "</em>")
//     }
//     return bodyToEdit
// }
// function _addCode(body) {
//     let bodyToEdit = body
//     if (!RegExp.escape) {
//         RegExp.escape = function (s) {
//             return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
//         }
//     }
//     const subEsc = RegExp.escape("`")
//     const regex = new RegExp(subEsc, "g")
//     const matches = body.match(regex) ? Object.keys(body.match(regex)) : []
//     for (var i = 0; i < matches.length; i++) {
//         bodyToEdit = bodyToEdit.replace("`", i % 2 === 0 ? "<code>" : "</code>")
//     }
//     return bodyToEdit
// }
// function _addUrl(body) {
//     let bodyToEdit = body
//     const myString =
//         "This is a [sample link](https://example.com) and another [link](https://example2.com)."

//     const pattern = /\[([^\]]+)\]\(([^)]+)\)/g

//     bodyToEdit = body.replace(pattern, (match, linkText, url) => {
//         return `<a href="${url}" target="_blank">${linkText}</a>`
//     })

//     return bodyToEdit
// }
// function _addHeading(body) {
//     let bodyToEdit = body

//     bodyToEdit = bodyToEdit.replace(
//         /##\s*([^\n]+)(\n.*)*/,
//         function (match, heading, rest) {
//             const formattedContent = heading.trim().replace(/\n/g, "<br/>\n")
//             return `<h3>${formattedContent}</h3><br/><br/>${rest}`
//         }
//     )

//     return bodyToEdit
// }
// function _addQoute(body) {
//     let bodyToEdit = body
//     bodyToEdit = bodyToEdit.replace(
//         /-\s*([^\n]+)(\n.*)*/,
//         function (match, heading, rest) {
//             const formattedContent = heading.trim().replace(/\n/g, "<br/>\n")
//             return `<blockquote>${formattedContent}</blockquote><br/><br/>${rest}`
//         }
//     )
//     return bodyToEdit
// }
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
async function likePost(post) {
    try {
        const { username, _id } = userService.getLoggedinUser()
        post.userLiked.push({ username, _id })
        return await save(post)
    } catch (err) {
        console.log("failed to like post in post service front end")
    }
}
