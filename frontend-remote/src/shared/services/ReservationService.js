import axios from "axios"

class ReservationService {
    postReservation(reservation) {
        return axios.post(process.env.VUE_APP_API_URL + 'reservation', reservation)
    }

    updateReservation(reservation) {
        return axios.put(process.env.VUE_APP_API_URL + 'reservation', reservation)
    }

    getAll({ isbn, isActive, cpf }) {
        let params = {}

        if (isbn) {
            params.isbn = isbn
            if (isActive == true || isActive == false) params.isActive = isActive
        } else if (cpf) params.cpf = cpf

        return axios.get(process.env.VUE_APP_API_URL + 'reservations', {
            params: params,
        })
    }
}

export default new ReservationService();
