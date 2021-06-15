import { http } from './config'

export default {
    getGenres: () => {
        return http.get('genres')
    },
    
    getUserTypes: () => {
        return http.get('usertypes')
    },

    getReservationStatus: () => {
        return http.get('reservationstatus')
    },

    getLoanStatus: () => {
        return http.get('loanstatus')
    },
}
