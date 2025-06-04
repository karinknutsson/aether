<template>
  <q-page class="row">
    <NavBar @open-popup="isPopupOpen = true" @close-popup="isPopupOpen = false" />

    <div class="col-xs-12">
      <MapComponent @open-popup="isPopupOpen = true" @close-popup="isPopupOpen = false" />
    </div>

    <CursorComponent v-if="!isPopupOpen" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapComponent from "src/components/MapComponent.vue";
import CursorComponent from "src/components/CursorComponent.vue";
import NavBar from "src/components/NavBar.vue";

const isPopupOpen = ref(false);
</script>

<style scoped lang="scss"></style>
