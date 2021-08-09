import axios from "axios"
import AuthService from "./AuthService"

class UserService {
    postUser(user) {
        return axios.post(process.env.VUE_APP_API_URL + 'user', user, { headers: AuthService.authHeader })
    }

    updateUser(user) {
        return axios.put(process.env.VUE_APP_API_URL + 'user', user, { headers: AuthService.authHeader })
    }

    removeUser(cpf) {
        return axios.delete(process.env.VUE_APP_API_URL + 'user', {
            params: { cpf: cpf },
            headers: AuthService.authHeader
        })
    }

    getByCpf(cpf) {
        return axios.get(process.env.VUE_APP_API_URL + 'user', {
            params: { cpf: cpf },
            headers: AuthService.authHeader
        })
    }
}

export default new UserService();
