import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue"
import Home from "./views/Home.vue"
import Info from "./views/Info.vue"

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            component: Index,
            children: [{
                path: '',
                component: Home
            }, {
                path: '/home',
                component: Home
            }, {
                path: '/info',
                component: Info
            }, {
                path: '/fundlist',
                component: () => import('./views/fundlist.vue')
            }]
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/Register.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login.vue")
        },
        {
            path: "*",
            name: "404",
            component: () => import("./views/404.vue")
        }
    ]
});

//  守卫
router.beforeEach((to, from, next) => {
    let isLogin = localStorage.mixiuToken ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router