<template>
  <div
    ref="popup"
    v-if="popupRect"
    class="suggestion-popup-container"
    :style="{ top: popupRect.y + 'px', left: popupRect.x + 'px' }"
  >
    <button class="close-button flex-center" @click="emit('close')">
      <i class="pi pi-times icon"></i>
    </button>

    <form v-if="!isFormSubmitted" @submit.prevent="submitSuggestion" class="form-container">
      <div class="input-container">
        <label for="description">Description</label>
        <input
          class="suggestion"
          name="description"
          id="description"
          v-model="description"
          type="text"
        />
      </div>

      <div class="lat-lng-container">
        <div class="input-container lat-lng">
          <label for="latitude">Latitude</label>
          <input class="suggestion" name="latitude" id="latitude" v-model="latitude" type="text" />
        </div>
        <div class="input-container lat-lng">
          <label for="longitude">Longitude</label>
          <input
            class="suggestion"
            name="longitude"
            id="longitude"
            v-model="longitude"
            type="text"
          />
        </div>
      </div>

      <button class="submit" type="submit">Send</button>
    </form>

    <div v-else>Thank you for your contribution!</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import PopupRect from "./popup-rect.interface";

const props = defineProps({
  popupRect: {
    type: Object as PropType<PopupRect>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const latitude = ref(props.popupRect.lat.toFixed(5));
const longitude = ref(props.popupRect.lng.toFixed(5));
const description = ref("");
const popup = ref();
const isFormSubmitted = ref(false);

onClickOutside(popup, () => {
  emit("close");
});

function isFormValid() {
  return description.value && latitude.value && longitude.value;
}

function setFormErrors() {
  // if (description.value)
}

function submitSuggestion() {
  if (!isFormValid) {
    setFormErrors();
    return;
  }
  console.log("submit");

  isFormSubmitted.value = true;

  setTimeout(() => {
    isFormSubmitted.value = false;
    emit("close");
  }, 3000);
}
</script>

<style scoped lang="scss">
button.submit {
  background: $deep-blue;
  border: 0;
  color: white;
  text-transform: uppercase;
  padding: 8px;
  font-size: 18px;
  font-weight: 800;
  margin-top: 16px;
}

button.submit:focus {
  outline: none;
}

.suggestion-popup-container {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  z-index: 50001;
  padding: 8px 16px 32px 16px;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
  width: v-bind("props.popupRect.w + 'px'");
  height: v-bind("props.popupRect.h + 'px'");
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}

.lat-lng-container {
  display: flex;
  gap: 16px;

  input {
    width: 100%;
  }
}

.lat-lng {
  flex: 1 1 40%;
}
</style>
