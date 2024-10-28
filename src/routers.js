import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";

import { createRouter, createWebHistory } from "vue-router";
import Addrest from "./components/Addrest.vue";
import Updaterest from './components/Updaterest.vue'



const routes = [
    {
        name: "Home",
        component: Home,
        path: '/'

    },
    {
        name: "Signup",
        component: SignUp,
        path: '/sign-up'

    },
    {
        name: "Login",
        component: Login,
        path: '/login'

    },
    {
        name: "Addrest",
        component: Addrest,
        path: '/add'

    },
    {
        name: "Updaterest",
        component: Updaterest,
        path: '/update/:id'

    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;