import { createWebHistory, createRouter } from "vue-router"
import store from "../store"
// import AuthService from "../shared/services/AuthService";
import Login from '../components/Login.vue'
import BookDetails from '../components/BookDetails.vue'
import ManageBooks from '../components/ManageBooks.vue'
import ManageOperations from '../components/ManageOperations.vue'
import ManageUsers from '../components/ManageUsers.vue'
import Search from '../components/Search.vue'

const searchRedirection = { name: 'Search', replace: true };
const loginRedirection = { name: 'Login', replace: true };

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

router.beforeEach(to => {
	if (to.name == 'Login') {
		if (store.state.isLogged) return searchRedirection;

	} else {
		if (!store.state.isLogged) return loginRedirection;
		else if (to.name == 'ManageUsers' && store.state.user.type != '1') return searchRedirection;
	}
})

export default router
