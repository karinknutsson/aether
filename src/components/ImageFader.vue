<template>
  <div>
    <div v-if="images.length" class="img-container">
      <div v-for="image in images">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import gsap from "gsap";

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
img {
  filter: grayscale(100%);
}

.img-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.img-wrapper {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;

  img {
    object-fit: contain;
  }
}
</style>
