import axios from "axios"
import AuthService from "./AuthService"

class ReportService {
    getReport(startDate, endDate) {
        return axios.get(process.env.VUE_APP_API_URL + 'report', {
            params: { startDate, endDate },
            headers: AuthService.authHeader
        })
    }
}

export default new ReportService();
