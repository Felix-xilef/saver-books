<template>
  <img
    :src="imageUrl"
    alt=""
    class="borderPurple backgroundLightPurple"
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
      return (this.fileName && this.fileName != '') ? ImagesService.imagesDirectory + this.fileName : '';
    },
  },
}
</script>

<style scoped>
img {
  border-radius: 5px;
}

img.small {
  max-width: 100px;
  max-height: 150px;

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
}

img[src=""].small {
  min-width: 100px;
  min-height: 150px;
}

img[src=""].large {
  min-width: 170px;
  min-height: 250px;
  
  max-width: 100%;
}
</style>