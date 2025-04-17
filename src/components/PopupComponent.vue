<template>
  <div>
    <div v-if="popup" class="popup-container" style="{top: popup.y + 'px', left: popup.x + 'px'}">
      {{ popup.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import type Popup from "./popup.interface";

const props = defineProps({
  popup: {
    type: Object as PropType<Popup>,
    required: true,
  },
});

const popupTop = computed(() => {
  return props.popup?.y + "px";
});

const popupLeft = computed(() => {
  return props.popup?.x + "px";
});
</script>

<style scoped lang="scss">
.popup-container {
  position: absolute;
  background: white;
  width: 30vw;
  height: 60vh;
  z-index: 50000;
  top: v-bind(popupTop);
  left: v-bind(popupLeft);
}
</style>
