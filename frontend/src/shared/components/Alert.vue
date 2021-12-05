<template>
  <div
    id="toast"
    class="toast align-items-center text-white position-absolute top-0 start-50 translate-middle-x mt-3"
    :class="{ 'bg-danger': error, 'bg-success': success, 'bg-warning': warning }"
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
  emits: {
    closed: null,
  },
  props: {
    logMessage: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toast() {
      return document.getElementById('toast');
    },
    bootstrapToast() {
      return new Toast(this.toast);
    },
  },
  methods: {
    setToastState(show) {
      if (show == true) this.bootstrapToast.show();
      else this.bootstrapToast.hide();
    },
  },
  watch: {
    error(newValue) {
      this.setToastState(newValue);
    },
    success(newValue) {
      this.setToastState(newValue);
    },
    warning(newValue) {
      this.setToastState(newValue);
    },
  },
  mounted() {
    this.bootstrapToast.hide();

    this.toast.addEventListener('hidden.bs.toast', () => this.$emit('closed'));
  },
}
</script>

<style scoped>
div#toast {
  z-index: 1090;
}
</style>
