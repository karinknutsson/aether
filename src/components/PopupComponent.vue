<template>
  <div>
    <div v-if="popup" class="popup-container" style="{top: popup.y + 'px', left: popup.x + 'px'}">
      <button class="close-button" @click="emit('close')"><i class="pi pi-times icon"></i></button>
      <!-- <h2>{{ popup.title }}</h2> -->
      <!-- <img src="example-images/merzouga.jpg" width="200" height="200" /> -->
      <ImageFader :images="popup.attachments" :title="popup.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import type Popup from "./popup.interface";
import ImageFader from "./ImageFader.vue";

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
img {
  filter: grayscale(100%);
}

.close-button {
  background: transparent;
  border: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #909090;

  i {
    font-size: 24px;
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
  top: v-bind(popupTop);
  left: v-bind(popupLeft);
  //   border-radius: 50%;
  //   border-radius: 12px;
  //   backdrop-filter: blur(20px);
  padding: 26px 0 0 0;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  //   background: radial-gradient(circle, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.7) 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  //   opacity: 0.8;
}
</style>
