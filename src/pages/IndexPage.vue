<template>
  <q-page class="row">
    <div class="col-xs-12">
      <MapComponent @hover="isFeatureHovered = true" @blur="isFeatureHovered = false" />
    </div>

    <CursorComponent v-if="!isFeatureHovered" />

    <NavBar />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapComponent from "src/components/MapComponent.vue";
import CursorComponent from "src/components/CursorComponent.vue";
import NavBar from "src/components/NavBar.vue";

const isFeatureHovered = ref(false);
</script>

<style scoped lang="scss"></style>
