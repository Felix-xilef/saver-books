import axios from "axios"

class ClientService {
    postClient(client) {
        return axios.post(process.env.VUE_APP_API_URL + 'client', client)
    }

    updateClient(client) {
        return axios.put(process.env.VUE_APP_API_URL + 'client', client)
    }

    removeClient(cpf) {
        return axios.delete(process.env.VUE_APP_API_URL + 'client', {
            params: { cpf },
        })
    }

    getByCpf(cpf) {
        return axios.get(process.env.VUE_APP_API_URL + 'client', {
            params: { cpf },
        })
    }
}

export default new ClientService();
