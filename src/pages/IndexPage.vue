<template>
  <q-page class="row">
    <div class="flex items-center">
      <div class="blue-div"></div>
      <h1 class="logo">ÆTHER</h1>
      <div class="red-div"></div>
    </div>

    <div class="col-xs-1 col-sm-2"></div>
    <div class="col-xs-10 col-sm-8">
      <div class="map-wrapper"><MapComponent /></div>
    </div>
    <div class="col-xs-1 col-sm-2"></div>

    <CursorComponent />
  </q-page>
</template>

<script setup lang="ts">
import MapComponent from 'src/components/MapComponent.vue'
import CursorComponent from 'src/components/CursorComponent.vue'
</script>

<style scoped lang="scss">
.map-wrapper {
  margin-top: 80px;
}

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
