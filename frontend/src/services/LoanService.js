import axios from "axios"
import AuthService from './AuthService';

export default class LoanService {
    postLoan(loan) {
        return axios.post(process.env.VUE_APP_API_URL + 'loan', loan, { headers: AuthService.authHeader })
    }

    updateLoan(loan) {
        return axios.put(process.env.VUE_APP_API_URL + 'loan', loan, { headers: AuthService.authHeader })
    }

    getAll({ isbn, cpf }) {
        let params = {}

        if (isbn) params.isbn = isbn
        else if (cpf) params.cpf = cpf

        return axios.get(process.env.VUE_APP_API_URL + 'loans', {
            params: params,
            headers: AuthService.authHeader
        })
    }
}
