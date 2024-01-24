import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import EditPost from "@/views/EditPost.vue"
import PostDetails from "@/views/PostDetails.vue"
import Connect from "../views/Connect.vue"
import Profile from "../views/Profile.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/edit/:id?",
            name: "Edit",
            component: EditPost,
        },
        {
            path: "/post/:id",
            name: "PostDetails",
            component: PostDetails,
        },
        {
            path: "/connect",
            name: "Connect",
            component: Connect,
        },
        {
            path:"/profile",
            name: "Profile",
            component: Profile
        }
    ],
})

export default router
