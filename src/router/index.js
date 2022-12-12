import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import APost from "../views/APost.vue";
import AddPost from "../views/AddPost.vue";





const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
        
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (authResult) {
                next('/')
            } else {
                next();
            }
        }
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (authResult) {
                next('/')
            } else {
                next();
            }
        }
    },
    {
        path: "/api/apost/:id",
        name: "APost",
        component: APost,
        
    },
    {
        path: "/api/addpost",
        name: "AddPost",
        component: AddPost,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;