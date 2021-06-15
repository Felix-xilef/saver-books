import { http } from './config'

export default {
    postReservation: (reservation) => {
        return http.post('reservation', reservation)
    },

    updateReservation: (reservation) => {
        return http.put('reservation', reservation)
    },

    getAll: ({ isbn, isActive, cpf }) => {
        let params = {}

        if (isbn) {
            params.isbn = isbn
            if (isActive == true || isActive == false) params.isActive = isActive
        } else if (cpf) params.cpf = cpf

        return http.get('reservations', { params: params })
    },
}
