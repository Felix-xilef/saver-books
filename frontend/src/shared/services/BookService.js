import axios from "axios"
import AuthService from "./AuthService"

class BookService {
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

    searchByAny(parameter) {
        return this.getAll({ any: parameter });
    }

    getAll(filters) {
        let params = {}

        if (filters.any) {
            params.any = filters.any;

        } else {
            if (filters.title) params.title = filters.title;
            
            if (filters.author) params.author = filters.author;
            
            if (filters.category) params.category = filters.category;

            if (filters.year) params.year = filters.year;
        }

        return axios.get(process.env.VUE_APP_API_URL + 'books', {
            params: params,
            headers: AuthService.authHeader
        })
    }
}

export default new BookService();
