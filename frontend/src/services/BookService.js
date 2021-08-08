import axios from "axios"
import AuthService from "./AuthService"

export default class BookService {
    postBook(book) {
        return axios.post(process.env.VUE_APP_API_URL + 'book', book, { headers: AuthService.authHeader })
    }

    updateBook(book) {
        return axios.put(process.env.VUE_APP_API_URL + 'book', book, { headers: AuthService.authHeader })
    }

    removeBook(isbn) {
        return axios.delete(process.env.VUE_APP_API_URL + 'book', {
            params: { isbn: isbn },
            headers: AuthService.authHeader
        })
    }

    getByIsbn(isbn) {
        return axios.get(process.env.VUE_APP_API_URL + 'book', {
            params: { isbn: isbn },
            headers: AuthService.authHeader
        })
    }

    getAll(filters) {
        let params = {}

        if (filters.title) params.title = filters.title
        else if (filters.isbn) params.isbn = filters.isbn
        else if (filters.author) params.author = filters.author

        return axios.get(process.env.VUE_APP_API_URL + 'book', {
            params: params,
            headers: AuthService.authHeader
        })
    }
}
