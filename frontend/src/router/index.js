import { createWebHistory, createRouter } from "vue-router"
import store from "../store"
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import BookDetails from '../components/BookDetails.vue'
import ManageBooks from '../components/ManageBooks.vue'
import ManageOperations from '../components/ManageOperations.vue'
import ManageUsers from '../components/ManageUsers.vue'
import Search from '../components/Search.vue'
import Reports from '../components/Reports.vue'

const homeRedirection = { name: 'Home', replace: true };
const loginRedirection = { name: 'Login', replace: true };

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/library',
		component: Home,
		children: [
			{
				path: 'search',
				name: 'Search',
				component: Search,
			},
			{
				path: 'book/:isbn',
				name: 'BookDetails',
				component: BookDetails,
				props: true,
			},
			{
				path: 'book/manage/:isbn?',
				name: 'ManageBooks',
				component: ManageBooks,
				props: true,
			},
			{
				path: 'operation/:operationName(reservation|loan)',
				name: 'ManageOperations',
				component: ManageOperations,
				props: true,
			},
			{
				path: 'user',
				name: 'ManageUsers',
				component: ManageUsers,
			},
			{
				path: 'reports',
				name: 'Reports',
				component: Reports,
			},
		],
	},
	{
		path: '',
		redirect: { name: 'Search' },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(to => {
	if (to.name == 'Login') {
		if (store.state.isLogged) return homeRedirection;

	} else {
		if (!store.state.isLogged) return loginRedirection;
		else if (to.name == 'ManageUsers' && store.state.user.type != '1') return homeRedirection;
	}
})

export default router
