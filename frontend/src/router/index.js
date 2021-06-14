import { createWebHistory, createRouter } from "vue-router"

import Login from '../components/Login.vue'
import BookDetails from '../components/BookDetails.vue'
import ManageBooks from '../components/ManageBooks.vue'
import ManageOperations from '../components/ManageOperations.vue'
import ManageUsers from '../components/ManageUsers.vue'
import Search from '../components/Search.vue'

var isLogged = true

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: () => {
            if (isLogged) {
                return { name: 'Search', replace: true }
            }
        }
    },
    {
        path: '/book/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/',
        redirect: { name: 'Search' },
    },
    {
        path: '/book/:isbn',
        name: 'BookDetails',
        component: BookDetails,
        props: true,
    },
    {
        path: '/book/manage',
        name: 'ManageBooks',
        component: ManageBooks,
    },
    {
        path: '/operation/:operationName(reservation|loan)',
        name: 'ManageOperations',
        component: ManageOperations,
    },
    {
        path: '/user',
        name: 'ManageUsers',
        component: ManageUsers,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    if (to.name != 'Login' && !isLogged) {
        return { name: 'Login', replace: true }
    }
})

export default router
