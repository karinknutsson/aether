<template>
  <div class="search-bar">
    <form class="search-form">
      <div class="flex-center">
        <div class="search-icon"><i class="pi pi-search icon"></i></div>
        <input
          class="search-input"
          name="searchTerm"
          id="searchTerm"
          v-model="searchTerm"
          type="text"
          placeholder="Search"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        />
      </div>
      <button v-if="searchTerm" class="search-close-button flex-center" @click="clearSearchTerm">
        <i class="pi pi-times icon"></i>
      </button>
    </form>
  </div>

  <div v-if="searchStore.suggestions.length" class="search-suggestions">
    <ul>
      <li v-for="suggestion in searchStore.suggestions">
        <button class="suggestion-list-button" @click="searchStore.selectSuggestion(suggestion)">
          <div class="suggestion-header">
            <h3>{{ suggestion.name }}</h3>
          </div>
          <div v-if="suggestion.address">{{ suggestion.address }}</div>
          <div v-else>{{ suggestion.place_formatted }}</div>
          <div v-if="suggestion.distance">{{ (suggestion.distance / 1000).toFixed(2) }} km</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useSearchStore } from "src/stores/search-store";
import { areCoordinates } from "./is-coordinate";

const searchStore = useSearchStore();
const searchTerm = ref("");
const isSearchFocused = ref(false);

const searchBarBackground = computed(() => {
  return isSearchFocused.value ? "#ffffff" : "rgba(255, 255, 255, 0.7)";
});

const searchBarWidth = computed(() => {
  return isSearchFocused.value || searchTerm.value || searchStore.suggestions.length
    ? "360px"
    : "140px";
});

function clearSearchTerm() {
  searchTerm.value = "";
  searchStore.suggestions = [];
}

watch(searchTerm, async (value) => {
  if (!value) return;

  if (areCoordinates(value)) {
    const coordinates = value.split(",");
    const lat = coordinates[0]?.trim();
    const lng = coordinates[1]?.trim();
    if (lat && lng) searchStore.selectedCoordinates = { lng: +lng, lat: +lat };
  } else {
    await searchStore.fetchSuggestions(value);
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 8px 0;
  width: 360px;
}

li {
  padding: 0 8px;
}

.suggestion-list-button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 0;
  background: transparent;
  font-size: 14px;
  padding: 8px;
}

.suggestion-list-button:hover {
  background: #ffffff;
}

.search-bar {
  pointer-events: auto;
  background: v-bind(searchBarBackground);
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
  width: v-bind(searchBarWidth);
  height: 56px;
  padding: 0 16px;
}

.search-form {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-suggestions {
  pointer-events: auto;
  position: absolute;
  z-index: 5002;
  top: 96px;
  left: 4vw;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
}

.search-input {
  background: transparent;
  border: 0;
  padding: 6px 8px;
  font-size: 16px;
  font-weight: 600;
  width: 260px;
  margin-left: 8px;
}

.search-icon {
  color: #909090;

  i {
    font-size: 16px;
  }
}

.search-close-button {
  background: transparent;
  border: 0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: #909090;
  padding: 0;

  i {
    font-size: 16px;
  }
}

.suggestion-header {
  h3 {
    font-weight: 700;
    font-size: 14px;
    margin: 0;
    line-height: 120%;
  }
}
</style>
