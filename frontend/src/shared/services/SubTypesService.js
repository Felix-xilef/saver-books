import axios from "axios"
import AuthService from "./AuthService"

class SubTypesService {
    getGenres() {
        return axios.get(process.env.VUE_APP_API_URL + 'genres', { headers: AuthService.authHeader })
    }
    
    getUserTypes() {
        return axios.get(process.env.VUE_APP_API_URL + 'usertypes', { headers: AuthService.authHeader })
    }

    getReservationStatus() {
        return axios.get(process.env.VUE_APP_API_URL + 'reservationstatus', { headers: AuthService.authHeader })
    }

    getLoanStatus() {
        return axios.get(process.env.VUE_APP_API_URL + 'loanstatus', { headers: AuthService.authHeader })
    }
}

export default new SubTypesService();
