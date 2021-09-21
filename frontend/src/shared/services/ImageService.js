import axios from "axios"
import AuthService from "./AuthService"

class ImageService {
  imagesDirectory = process.env.VUE_APP_API_URL + 'public/images/';

  postImage(file, fileName) {
    console.log(file);
    let formData = new FormData();
    formData.append('bookCover', file);
    formData.append('bookCoverName', fileName);

    let header = AuthService.authHeader;
    header["Content-Type"] = "multipart/form-data";

    return axios.post(process.env.VUE_APP_API_URL + 'image', formData, { headers: header });
  }

  getImage(fileName) {
    return axios.get(process.env.VUE_APP_API_URL + 'image', {
      params: { fileName },
      headers: AuthService.authHeader,
    });
  }
}

export default new ImageService();
