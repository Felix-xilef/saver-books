class ImageService {
  getImageURL(fileName) {
    return process.env.VUE_APP_AWS_BUCKET_URL + fileName;
  }
}

export default new ImageService();
