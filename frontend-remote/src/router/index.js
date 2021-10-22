import { createWebHistory, createRouter } from "vue-router"
import Home from '../components/Home.vue'
import BookDetails from '../components/BookDetails.vue'
import Search from '../components/Search.vue'

const routes = [
	{
		path: '/library',
		component: Home,
		children: [
			{
				path: 'search/:searchParameter?',
				name: 'Search',
				component: Search,
				props: true,
			},
			{
				path: 'book/:isbn',
				name: 'BookDetails',
				component: BookDetails,
				props: true,
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

export default router;
