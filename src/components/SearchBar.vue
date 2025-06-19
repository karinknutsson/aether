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
import { ref, watch } from "vue";
import { useSearchStore } from "src/stores/search-store";

const searchStore = useSearchStore();
const searchTerm = ref("");

function clearSearchTerm() {
  searchTerm.value = "";
}

// function selectSuggestion(suggestion: any) {
//   console.log(suggestion.geometry);
//   const [lng, lat] = suggestion.center;
//   console.log(lng);
//   console.log(lat);

//   // map.flyTo({
//   //   center: [lng, lat],
//   //   zoom: 14,
//   //   essential: true,
//   // });
// }

function isCoordinate(input: string) {
  const coordRegex = /^\s*(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)\s*$/;
  const match = input.match(coordRegex);
  if (!match || !match[1] || !match[3]) return null;

  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[3]);

  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    return { lat, lng };
  }
  return null;
}

watch(searchTerm, async (value) => {
  if (!value) return;

  if (isCoordinate(value)) {
    console.log("coordinate");
  } else {
    await searchStore.fetchSuggestions(value);
    console.log(searchStore.suggestions);
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 360px;
}

li {
  padding: 8px;
}

.suggestion-list-button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 0;
  background: transparent;
  font-size: 14px;
}

.search-bar {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
  width: 360px;
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
