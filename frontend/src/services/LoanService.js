import { http } from './config'

export default {
    postLoan: (loan) => {
        return http.post('loan', loan)
    },

    updateLoan: (loan) => {
        return http.put('loan', loan)
    },

    getAll: ({ isbn, cpf }) => {
        let params = {}

        if (isbn) params.isbn = isbn
        else if (cpf) params.cpf = cpf

        return http.get('loans', { params: params })
    },
}
