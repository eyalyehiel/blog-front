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
    toggleLike,
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
    let bodyArray = []
    const originalCharts = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ"
    let loops = bodyToEdit.length
    let originalLength = bodyToEdit.length
    while (bodyToEdit.length > 0) {
        let str = null
        for (let i = 0; i < loops; i++) {
            let char = bodyToEdit[i]
            if (originalCharts.includes(char)) continue
            switch (char) {
                case "*":
                    bodyArray.push(
                        bodyToEdit.substring(0, bodyToEdit.indexOf("**"))
                    )
                    bodyToEdit = bodyToEdit.substring(bodyToEdit.indexOf("**"))
                    bodyToEdit = bodyToEdit.replace("**", "")
                    str = bodyToEdit.substring(0, bodyToEdit.indexOf("**"))
                    bodyArray.push("<strong>" + str + "</strong>")
                    bodyToEdit = bodyToEdit.replace(str + "**", "")
                    i = 0
                    break
                case "_":
                    bodyArray.push(bodyToEdit.substring(0, i))
                    bodyToEdit = bodyToEdit.substring(i)
                    bodyToEdit = bodyToEdit.replace("_", "")
                    i = bodyToEdit.indexOf("_")
                    str = bodyToEdit.substring(0, i)
                    bodyArray.push("<em>" + str + "</em>")
                    bodyToEdit = bodyToEdit.replace(str + "_", "")
                    i = 0
                    break
                case "\n":
                    bodyArray.push(
                        bodyToEdit.substring(0, bodyToEdit.indexOf("\n"))
                    )
                    bodyToEdit = bodyToEdit.substring(bodyToEdit.indexOf("\n"))
                    bodyArray.push("<br/>")
                    bodyToEdit = bodyToEdit.replace("\n", "")
                    i = 0
                    break
                case "`":
                    bodyArray.push(bodyToEdit.substring(0, i))
                    bodyToEdit = bodyToEdit.substring(i)
                    bodyToEdit = bodyToEdit.replace("`", "")
                    i = bodyToEdit.indexOf("`")
                    str = bodyToEdit.substring(0, i)
                    bodyArray.push("<code>" + str + "</code>")
                    bodyToEdit = bodyToEdit.replace(str + "`", "")
                    i = 0
                    break
                case "[":
                    bodyArray.push(bodyToEdit.substring(0, i))
                    bodyToEdit = bodyToEdit.substring(i)
                    bodyToEdit = bodyToEdit.replace("[", "")
                    i = bodyToEdit.indexOf("]")
                    str = bodyToEdit.substring(0, i)
                    bodyToEdit = bodyToEdit.replace(str + "]", "")
                    bodyToEdit = bodyToEdit.replace("(", "")
                    i = bodyToEdit.indexOf(")")
                    let link = bodyToEdit.substring(0, i)
                    bodyArray.push(
                        `<a href="${link}" target="_blank">` + str + "</a>"
                    )
                    bodyToEdit = bodyToEdit.replace(link + ")", "")
                    i = 0
                    break
                case "#":
                    bodyArray.push(bodyToEdit.substring(0, i))
                    bodyToEdit = bodyToEdit.substring(i)
                    bodyToEdit = bodyToEdit.replace("##", "")
                    i = bodyToEdit.indexOf("\n")
                    str = bodyToEdit.substring(0, i)
                    bodyArray.push("<h2>" + str + "</h2>")
                    bodyToEdit = bodyToEdit.replace(str + "\n", "")
                    i = 0
                    break
                case ">":
                    bodyArray.push(bodyToEdit.substring(0, i))
                    bodyToEdit = bodyToEdit.substring(i)
                    bodyToEdit = bodyToEdit.replace(">", "")
                    i = bodyToEdit.indexOf("\n")
                    str = bodyToEdit.substring(0, i)
                    bodyArray.push("<blockquote>" + str + "</blockquote>")
                    bodyToEdit = bodyToEdit.replace(str + "\n", "")
                    i = 0
                    break
            }
            loops = bodyToEdit.length
            // console.log(i);
            if (originalLength - 1 === i) {
                // bodyArray.push(bodyToEdit)
                loops = 0
            }
        }
        bodyArray.push(bodyToEdit)
        bodyToEdit = ""
    }
    return bodyArray.join("")
}

async function toggleLike(post) {
    try {
        const { username, _id } = userService.getLoggedinUser()
        const isUserLiked = post.userLiked.find(
            (user) => user.username === username && user._id === _id
        )
        if (isUserLiked) {
            post.userLiked = post.userLiked.filter(
                (user) =>
                    user.username !== isUserLiked.username &&
                    user._id !== isUserLiked._id
            )
        } else {
            post.userLiked.push({ username, _id })
        }
        return await save(post)
    } catch (err) {
        console.log("failed to like post in post service front end")
    }
}
