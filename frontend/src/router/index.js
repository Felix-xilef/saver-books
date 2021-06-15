import { createWebHistory, createRouter } from "vue-router"

import Login from '../components/Login.vue'
import BookDetails from '../components/BookDetails.vue'
import ManageBooks from '../components/ManageBooks.vue'
import ManageOperations from '../components/ManageOperations.vue'
import ManageUsers from '../components/ManageUsers.vue'
import Search from '../components/Search.vue'

import LoginService from '../services/LoginService'

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
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
		path: '/book/manage/:isbn?',
		name: 'ManageBooks',
		component: ManageBooks,
		props: true,
	},
	{
		path: '/operation/:operationName(reservation|loan)',
		name: 'ManageOperations',
		component: ManageOperations,
		props: true,
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

router.beforeEach(async (to) => {
	let isLogged = await LoginService.isLogged()
	if (to.name == 'Login') {
		if (isLogged) {
			return { name: 'Search', replace: true }
		}
	} else {
		if (!isLogged) {
			return { name: 'Login', replace: true }
		}
	}
})

export default router
