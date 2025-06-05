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
    text
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import PopupRect from "./popup-rect.interface";

const props = defineProps({
  popupRect: {
    type: Object as PropType<PopupRect>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const popup = ref();

onClickOutside(popup, () => {
  emit("close");
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
</style>
