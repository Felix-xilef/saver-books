import axios from "axios"
import AuthService from "./AuthService"

class ReservationService {
    postReservation(reservation) {
        return axios.post(process.env.VUE_APP_API_URL + 'reservation', reservation, { headers: AuthService.authHeader })
    }

    updateReservation(reservation) {
        return axios.put(process.env.VUE_APP_API_URL + 'reservation', reservation, { headers: AuthService.authHeader })
    }

    getAll({ isbn, isActive, cpf }) {
        let params = {};

        if (isbn) {
            params.isbn = isbn;
            if (isActive === true) params.isActive = isActive;

        } else if (cpf) params.cpf = cpf;

        return axios.get(process.env.VUE_APP_API_URL + 'reservations', {
            params: params,
            headers: AuthService.authHeader
        })
    }
}

export default new ReservationService();
