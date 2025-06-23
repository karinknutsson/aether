<template>
  <q-page class="row">
    <NavBar @open-popup="showCursor = false" @close-popup="showCursor = true" />

    <div class="col-xs-12">
      <MapComponent @hide-cursor="showCursor = false" @show-cursor="showCursor = true" />
    </div>

    <CursorComponent v-if="showCursor" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapComponent from "src/components/MapComponent.vue";
import CursorComponent from "src/components/CursorComponent.vue";
import NavBar from "src/components/NavBar.vue";

const showCursor = ref(true);
</script>

<style scoped lang="scss"></style>
