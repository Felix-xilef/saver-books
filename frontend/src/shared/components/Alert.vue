<template>
  <div
    id="toast"
    class="toast align-items-center text-white position-absolute top-0 start-50 translate-middle-x mt-3"
    :class="{ 'bg-danger': error, 'bg-success': success }"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-animation="true"
    data-bs-autohide="true"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ logMessage }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';
export default {
  name: 'Alert',
  props: [
    'logMessage',
    'error',
    'success',
  ],
  computed: {
    toast() {
      return new Toast(document.getElementById('toast'));
    },
  },
  watch: {
    error(newValue) {
      if (newValue == true) this.toast.show();
      else this.toast.hide();
    },
    success(newValue) {
      if (newValue == true) this.toast.show();
      else this.toast.hide();
    },
  },
}
</script>

<style scoped>
  
</style>