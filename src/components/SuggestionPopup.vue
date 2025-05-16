<template>
  <div class="suggestion-popup-wrapper flex-center">
    <div class="suggestion-popup-container">
      <button class="close-button flex-center" @click="emit('close')">
        <i class="pi pi-times icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<style scoped lang="scss">
.suggestion-popup-wrapper {
  position: absolute;
  left: 0;
  top: 50vh;
  width: 100vw;
}

.suggestion-popup-container {
  background: rgba(255, 255, 255, 0.3);
  z-index: 50001;
  padding: 8px 16px 32px 16px;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
  width: 100vw;
  max-width: 500px;
  height: 50vh;
  max-height: 400px;
  position: absolute;
}
</style>
