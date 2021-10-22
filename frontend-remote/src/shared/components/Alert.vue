<template>
  <div
    id="toast"
    class="toast align-items-center text-white position-absolute top-0 start-50 translate-middle-x mt-3"
    :class="{ 'bg-danger show': error, 'bg-success show': success, 'bg-warning show': warning, 'hide': (!error && !success && !warning) }"
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
export default {
  name: 'Alert',
  props: [
    'logMessage',
    'error',
    'success',
    'warning',
  ],
}
</script>

<style scoped>
div#toast {
  z-index: 1090;
}
</style>
