<template>
  <img
    :src="imageUrl"
    alt=""
    class="borderGreen backgroundLightGreen"
    :class="size"
  >
</template>

<script>
import ImagesService from '../services/ImageService';
export default {
  name: 'BookCover',
  props: [
    'fileName',
    'size',
  ],
  computed: {
    imageUrl() {
      return (this.fileName && this.fileName != '') ? ImagesService.getImageURL(this.fileName) : '';
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 5px;
}

img.extra-small {
  max-width: 80px;
  max-height: 120px;

  border-width: 1px;
}

img.small {
  /* max-width: 100px; */
  max-height: 150px;
  min-height: 150px;

  border-width: 2px;
}

img.large {
  max-width: 100%;
  max-height: 250px;
}

img[src=""] {
  /* border-radius: 5px; */
  background-image: url('../assets/pictureIcon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 26%;
}

img[src=""].extra-small {
  min-width: 80px;
  min-height: 120px;
}

img[src=""].small {
  min-width: 100px;
}

img[src=""].large {
  min-width: 170px;
  min-height: 250px;
  
  max-width: 100%;
}
</style>