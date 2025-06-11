import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/hits/:id/:type",
            name: "HitsSongs",
            component: () => import("@/views/HitsSongsView.vue"),
        },
    ],
})

export default router
