import axios from "axios"
import AuthService from "./AuthService"

class ClientService {
    postClient(client) {
        return axios.post(process.env.VUE_APP_API_URL + 'client', client, { headers: AuthService.authHeader })
    }

    updateClient(client) {
        return axios.put(process.env.VUE_APP_API_URL + 'client', client, { headers: AuthService.authHeader })
    }

    removeClient(cpf) {
        return axios.delete(process.env.VUE_APP_API_URL + 'client', {
            params: { cpf },
            headers: AuthService.authHeader
        })
    }

    getByCpf(cpf) {
        return axios.get(process.env.VUE_APP_API_URL + 'client', {
            params: { cpf },
            headers: AuthService.authHeader
        })
    }
}

export default new ClientService();
