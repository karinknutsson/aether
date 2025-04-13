<template>
  <q-page class="row">
    <!-- <div class="overlay"></div> -->
    <!-- <div class="flex items-center">
      <div class="blue-div"></div>
      <span class="logo">ÆtHER</span>
      <div class="red-div"></div>
    </div> -->

    <!-- <div class="col-xs-1 col-sm-2"></div> -->
    <div class="col-xs-12">
      <!-- <div class="map-wrapper"> -->
      <MapComponentInverse @hover="isFeatureHovered = true" @blur="isFeatureHovered = false" />
      <!-- </div> -->
    </div>
    <!-- <div class="col-xs-1 col-sm-2"></div> -->

    <CursorComponent v-if="!isFeatureHovered" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapComponentInverse from "src/components/MapComponentInverse.vue";
import CursorComponent from "src/components/CursorComponent.vue";

const isFeatureHovered = ref(false);

// const overlayStyle = computed(() => ({
//   maskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 50%, black 51%, black 100%)`,
//   WebkitMaskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 50%, black 51%, black 100%)`,
// }));
</script>

<style scoped lang="scss">
// .overlay {
//   position: absolute;

// }

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 0, 0, 0.5);
  pointer-events: none;
  z-index: 2;

  /* We'll update this via JS */
  mask-image: radial-gradient(
    circle calc(max(100vw, 100vw) * 0.5) at center,
    transparent 0%,
    transparent 30%,
    black 100%
  );
  -webkit-mask-image: radial-gradient(
    circle calc(max(100vw, 100vw) * 0.5) at center,
    transparent 0%,
    transparent 30%,
    black 100%
  );
}

// .map-wrapper {
//   margin-top: 80px;
// }

.blue-div {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: $primary;
  // transform: translateY(-40px);
}

.red-div {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: $secondary;
  // transform: translateY(-40px);
}
</style>
