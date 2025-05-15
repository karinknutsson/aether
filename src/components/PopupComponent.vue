<template>
  <!-- <div v-if="$q.screen.gt.sm">
    <div
      v-if="popup"
      class="popup-container"
      :style="{ top: popup.y + 'px', left: popup.x + 'px' }"
    >
      <button class="close-button flex-center" @click="emit('close')">
        <i class="pi pi-times icon"></i>
      </button>
      <ImageFader :images="popup.attachments" :title="popup.title" />
    </div>
  </div> -->
  <div>
    <div v-if="popup" class="mobile-popup-wrapper flex-center">
      <div class="mobile-popup-container">
        <button class="close-button flex-center" @click="emit('close')">
          <i class="pi pi-times icon"></i></button
        ><ImageFader :images="popup.attachments" :title="popup.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import type Popup from "./popup.interface";
import ImageFader from "./ImageFader.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  popup: {
    type: Object as PropType<Popup>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const popupTop = computed(() => {
  return props.popup?.y + "px";
});

const popupLeft = computed(() => {
  return props.popup?.x + "px";
});
</script>

<style scoped lang="scss">
.close-button {
  background: transparent;
  border: 0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #909090;
  padding: 0;
  transform: translateX(8px);
  margin-bottom: 4px;

  i {
    font-size: 20px;
  }
}

.popup-container {
  position: absolute;
  //   background: rgba(255, 255, 255, 0.01);
  //   background: transparent;
  //   border: 1px solid rgba(255, 255, 255, 0.2);
  background: white;
  width: 350px;
  height: 420px;
  z-index: 50000;
  //top: v-bind(popupTop);
  //left: v-bind(popupLeft);
  //   border-radius: 50%;
  //   border-radius: 12px;
  //   backdrop-filter: blur(20px);
  padding: 8px 16px;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  //   background: radial-gradient(circle, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.7) 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  //   opacity: 0.8;
}

.mobile-popup-wrapper {
  position: absolute;
  left: 0;
  top: 20vh;
  width: 100vw;
}

.mobile-popup-container {
  background: white;
  z-index: 50000;
  padding: 8px 16px 32px 16px;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100vw;
  max-width: 900px;
  aspect-ratio: 16 / 9;
}
</style>
