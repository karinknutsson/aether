<template>
  <q-page class="row items-center justify-center">
    <div>
      <div class="blue-div"></div>
      <h1 class="logo">ÆTHER</h1>
      <div class="red-div"></div>
    </div>

    <div><MapComponent /></div>
  </q-page>
</template>

<script setup lang="ts">
import MapComponent from 'src/components/MapComponent.vue'
</script>

<style scoped lang="scss">
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
