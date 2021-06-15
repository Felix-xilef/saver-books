import { http } from './config'

export default {
    postUser: (user) => {
        return http.post('user', user)
    },

    updateUser: (user) => {
        return http.put('user', user)
    },

    removeUser: (cpf) => {
        return http.delete('user', { params: { cpf: cpf } })
    },

    getByCpf: (cpf) => {
        return http.get('user', { params: { cpf: cpf } })
    },
}
