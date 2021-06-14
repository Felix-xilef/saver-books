import { http } from './config'

export default {
    getByIsbn: (isbn) => {
        return http.get('book', { params: { isbn: isbn } })
    },

    getAll: (filter) => {
        return http.get('books', { params: { filter: filter } })
    },
}
