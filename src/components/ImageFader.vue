<template>
  <div>
    <div v-if="images.length" class="img-container">
      <div v-for="(image, index) in images" :key="image" class="img-wrapper">
        <img :src="image" :class="`image-${index}`" />
        <h2>{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

let previousIndex = 0;
let currentIndex = 1;
let isAnimating = false;

onMounted(() => {
  for (let i = 1; i < props.images.length; i++) gsap.set(`.image-${i}`, { opacity: 0 });

  if (props.images.length > 1) {
    isAnimating = true;
    animate();
  }
});

onUnmounted(() => {
  isAnimating = false;
});

function animate() {
  if (!isAnimating) return;

  gsap.to(`.image-${currentIndex}`, {
    opacity: 1,
    duration: 3,
    delay: 2,
  });

  gsap.to(`.image-${previousIndex}`, {
    opacity: 0,
    duration: 3,
    delay: 2,
    onComplete: () => {
      previousIndex = currentIndex;

      if (currentIndex === props.images.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      animate();
    },
  });
}
</script>

<style scoped lang="scss">
img {
  //   filter: grayscale(100%) sepia(100%) hue-rotate(200deg) saturate(160%);
  //   filter: grayscale(60%) sepia(20%) hue-rotate(190deg) saturate(130%) brightness(1.1);
  filter: contrast(0.9) brightness(1.05) sepia(0.3) saturate(1.2) hue-rotate(-10deg);
}

.img-container {
  position: relative;
  width: 310px;
  height: 310px;
}

.img-wrapper {
  position: absolute;
  width: 310px;
  height: 310px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
