<template>
  <div
    class="cursor-follower"
    :style="{
      left: `${x - size * 0.5 + offsetX}px`,
      top: `${y - size * 0.5 + offsetY}px`,
      width: `${size}px`,
      height: `${size}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// const props = defineProps({
//   featureHover: {
//     type: Boolean,
//     default: false,
//   },
// });

const x = ref(0);
const y = ref(0);
const size = ref(160);
const offsetX = ref(0);
const offsetY = ref(0);

const baseSize = ref(260);
const isMoving = ref(false);
let lastMoveTime = performance.now();

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
});

function onMouseMove(e: MouseEvent) {
  x.value = e.clientX;
  y.value = e.clientY;
  isMoving.value = true;
  lastMoveTime = performance.now();
  size.value = 180;
}

function animate() {
  const now = performance.now();
  const timeSinceMove = now - lastMoveTime;

  if (timeSinceMove > 300) {
    isMoving.value = false;
  }

  // if (props.featureHover) {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   const windowSize = Math.max(width, height);
  //   size.value += (windowSize * 1.4 - size.value) * 0.1;
  //   // size.value = windowSize * 1.4;
  //   // offsetX.value = size.value * 0.2;
  //   // offsetY.value = size.value * 0.2;
  // } else

  if (!isMoving.value) {
    const t = now / 500;
    baseSize.value = 270 + Math.sin(t) * 10;
    size.value += (baseSize.value - size.value) * 0.05;

    offsetX.value += (Math.random() * 2 - 1) * 0.1;
    offsetY.value += (Math.random() * 2 - 1) * 0.1;
    offsetX.value = Math.max(-5, Math.min(5, offsetX.value));
    offsetY.value = Math.max(-5, Math.min(5, offsetY.value));
  } else {
    size.value += (180 - size.value) * 0.1;
    offsetX.value = 0;
    offsetY.value = 0;
  }

  requestAnimationFrame(animate);
}

// watch(() => props.featureHover, () => {

// })
</script>

<style scoped lang="scss">
.cursor-follower {
  border-radius: 50%;
  //   border: 2px solid rgba(255, 255, 255, 0.5);
  //   transition:
  //     width 0.2s ease,
  //     height 0.2s ease;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition:
    width 0.1s linear,
    height 0.1s linear;

  background: radial-gradient(circle, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 1) 100%);
}
</style>
