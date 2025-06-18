<template>
  <div class="button-wrapper" :style="{ top: y + 'px', left: x + 'px' }">
    <button>Suggest location</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.button-wrapper {
  position: absolute;
}
</style>
