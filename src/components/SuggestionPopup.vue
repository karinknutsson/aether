<template>
  <div class="suggestion-popup-wrapper flex-center">
    <div class="suggestion-popup-container">
      <button class="close-button flex-center" @click="emit('close')">
        <i class="pi pi-times icon"></i>
      </button>

      <form class="form-container">
        <div class="input-container">
          <label for="description">Description</label>
          <input name="description" id="description" v-model="description" type="text" />
        </div>
        <div class="input-container">
          <label for="coordinates">Coordinates</label>
          <input name="coordinates" id="coordinates" v-model="coordinates" type="text" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close"]);

const description = ref("");
const coordinates = ref("");
</script>

<style scoped lang="scss">
label {
  font-weight: 700;
  font-size: 16px;
}

.suggestion-popup-wrapper {
  position: absolute;
  left: 0;
  top: 20vh;
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-container {
  display: flex;
  flex-direction: column;
}
</style>
