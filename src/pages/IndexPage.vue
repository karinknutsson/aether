<template>
  <q-page class="row">
    <div class="col-xs-12">
      <MapComponentInverse @hover="isFeatureHovered = true" @blur="isFeatureHovered = false" />
    </div>

    <CursorComponent v-if="!isFeatureHovered" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapComponentInverse from "src/components/MapComponentInverse.vue";
import CursorComponent from "src/components/CursorComponent.vue";

const isFeatureHovered = ref(false);
</script>

<style scoped lang="scss"></style>
