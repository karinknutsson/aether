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
          maxlength="240"
        />
        <div class="error-message">
          <i v-if="errorMessage.description" class="pi pi-exclamation-circle icon"></i
          >{{ errorMessage.description }}
        </div>
      </div>

      <div class="lat-lng-container">
        <div class="input-container lat-lng">
          <label for="longitude">Longitude</label>
          <input
            class="suggestion"
            name="longitude"
            id="longitude"
            v-model="longitude"
            type="text"
          />
          <div class="error-message">
            <i v-if="errorMessage.longitude" class="pi pi-exclamation-circle icon"></i
            >{{ errorMessage.longitude }}
          </div>
        </div>
        <div class="input-container lat-lng">
          <label for="latitude">Latitude</label>
          <input class="suggestion" name="latitude" id="latitude" v-model="latitude" type="text" />
          <div class="error-message">
            <i v-if="errorMessage.latitude" class="pi pi-exclamation-circle icon"></i
            >{{ errorMessage.latitude }}
          </div>
        </div>
      </div>

      <button class="submit" type="submit">Send</button>
    </form>

    <div v-else>Thank you for your contribution!</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
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
const errorMessage = ref({ description: "", longitude: "", latitude: "" });

onClickOutside(popup, () => {
  emit("close");
});

function isFormValid() {
  return description.value.length > 2 && latitude.value && longitude.value;
}

function setFormErrors() {
  if (!(description.value.length > 2))
    errorMessage.value.description = "Please enter a short description.";
  if (!longitude.value) errorMessage.value.longitude = "The longitude is missing.";
  if (!latitude.value) errorMessage.value.latitude = "The latitude is missing.";
}

function submitSuggestion() {
  if (!isFormValid()) {
    setFormErrors();
    return;
  }

  isFormSubmitted.value = true;

  setTimeout(() => {
    isFormSubmitted.value = false;
    emit("close");
  }, 3000);
}

watch(description, (value) => {
  if (errorMessage.value.description && value.length > 2) {
    errorMessage.value.description = "";
  }
});
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
