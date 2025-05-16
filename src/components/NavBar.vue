<template>
  <div class="navbar-container">
    <button class="nav">About</button>
    <div class="logo-wrapper">
      <div class="meddon-capital">æ</div>
      <div class="meddon-lowercase">ther</div>
    </div>
    <button
      class="nav"
      @click="
        () => {
          emit('openPopup');
          showSuggestionPopup = true;
        }
      "
    >
      Suggest a place
    </button>
  </div>

  <SuggestionPopup
    v-if="showSuggestionPopup"
    @click="
      () => {
        emit('closePopup');
        showSuggestionPopup = false;
      }
    "
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SuggestionPopup from "./SuggestionPopup.vue";

const emit = defineEmits(["openPopup", "closePopup"]);

const showSuggestionPopup = ref(false);
</script>

<style scoped lang="scss">
button.nav {
  border: 0;
  font-size: 18px;
  font-weight: 600;
  // text-transform: uppercase;
  color: $deep-blue;
  // font-style: italic;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  padding: 12px 32px;
  border-radius: 2px;
}

.navbar-container {
  z-index: 200000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  padding: 0 4vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.logo-wrapper {
  transform: translateY(16px);
  display: flex;
}

.meddon-capital {
  text-transform: uppercase;
  font-family: "Meddon", cursive;
  font-size: 56px;
  transform: translate(8px, 8px);
  margin: 0;
}

.meddon-lowercase {
  font-family: "Meddon", cursive;
  font-size: 56px;
  transform: translateX(-9px);
  margin: 0;
}
</style>
