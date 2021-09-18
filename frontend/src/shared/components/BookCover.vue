<template>
  <img :src="imageUrl" alt="" class="borderPurple backgroundLightPurple">
</template>

<script>
import ImagesService from '../services/ImageService';
export default {
  name: 'BookCover',
  props: [
    'fileName',
  ],
  emits: [
    'error',
  ],
  data() {
    return {
      blobImage: null,
      imageUrl: '',
    }
  },
  methods: {
		error(message) {
      this.$emit('error', message);
		},
    getBookCover(fileName) {
      ImagesService.getImage(fileName).then(response => {
        this.blobImage = new Blob([response.data]);

        this.imageUrl = URL.createObjectURL(this.blobImage);
        console.log(this.imageUrl);

      }).catch(err => this.error('Erro ao recuperar imagem: ' + err));
    },
  },
  watch: {
    fileName(newValue) {
      if (newValue && newValue != '') this.getBookCover(newValue);
    },
  },
  mounted() {
    if (this.fileName && this.fileName != '') this.getBookCover(this.fileName);
  },
  beforeUnmount() {
    URL.revokeObjectURL(this.blobImage);
  },
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 250px;

  border-radius: 5px;
}

img[src=""] {
  border-radius: 5px;
  background-image: url('../assets/pictureIcon.svg');
  background-repeat: no-repeat;
  background-position: center;

  min-width: 170px;
  min-height: 250px;
  
  max-width: 100%;
}
</style>