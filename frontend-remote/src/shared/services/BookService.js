import axios from "axios"

class BookService {
    postBook(book) {
        return axios.post(process.env.VUE_APP_API_URL + 'book', book)
    }

    updateBook(book) {
        return axios.put(process.env.VUE_APP_API_URL + 'book', book)
    }

    removeBook(isbn) {
        return axios.delete(process.env.VUE_APP_API_URL + 'book', {
            params: { isbn: isbn },
        })
    }

    getByIsbn(isbn) {
        return axios.get(process.env.VUE_APP_API_URL + 'book', {
            params: { isbn: isbn },
        })
    }

    searchByTitle(title) {
        return this.getAll({ title });
    }

    getAll(filters) {
        let params = {}

        if (filters.title) params.title = filters.title
        else if (filters.isbn) params.isbn = filters.isbn
        else if (filters.author) params.author = filters.author

        return axios.get(process.env.VUE_APP_API_URL + 'books', {
            params: params,
        })
    }
}

export default new BookService();
