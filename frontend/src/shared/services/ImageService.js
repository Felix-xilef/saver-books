import axios from "axios"
import AuthService from "./AuthService"

class ImageService {
  async postImage(file, fileName) {
    return axios.get(process.env.VUE_APP_API_URL + 's3Url', {
      params: { fileName },
      headers: AuthService.authHeader,
    }).then(response => {
      const url = String(response.data.url);

      return axios.put(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    });
  }

  getImageURL(fileName) {
    return process.env.VUE_APP_AWS_BUCKET_URL + fileName;
  }
}

export default new ImageService();
