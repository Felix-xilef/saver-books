import { http } from './config'

export default {
    postBook: (book) => {
        return http.post('book', book)
    },

    updateBook: (book) => {
        return http.put('book', book)
    },

    removeBook: (isbn) => {
        return http.delete('book', { params: { isbn: isbn } })
    },

    getByIsbn: (isbn) => {
        return http.get('book', { params: { isbn: isbn } })
    },

    getAll: (filters) => {
        let params = {}
        if (filters.title) params.title = filters.title
        else if (filters.isbn) params.isbn = filters.isbn
        else if (filters.author) params.author = filters.author

        return http.get('books', { params: params })
    },
}
