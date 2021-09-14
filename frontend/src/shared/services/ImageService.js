import axios from "axios"
import AuthService from "./AuthService"

class ImageService {
  postImage(file) {
    let formData = new FormData();
    formData.append('file', file);

    let header = AuthService.authHeader;
    header["Content-Type"] = "multipart/form-data";

    return axios.post(process.env.VUE_APP_API_URL + 'image', formData, { header });
  }

  getImage(fileName) {
    return axios.put(process.env.VUE_APP_API_URL + 'image', {
      params: { fileName },
      headers: AuthService.authHeader,
    });
  }
}

export default new ImageService();
