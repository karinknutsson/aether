<template>
  <div class="overlay" v-if="showOverlay" :style="overlayStyle"></div>

  <div ref="mapContainer" id="map" class="map-container"></div>

  <PopupComponent v-if="showPopup" :popup="popup" @close="hidePopup" />
  <SuggestButton
    v-if="showSuggestButton"
    :x="suggestButtonCoordinates.x"
    :y="suggestButtonCoordinates.y"
    @click="openSuggestionPopup"
    @close="hideSuggestButton"
  />
  <SuggestionPopup
    v-if="showSuggestionPopup"
    :popupRect="suggestionPopupRect"
    @close="hideSuggestionPopup"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import { features } from "./data";
import PopupComponent from "./PopupComponent.vue";
import type Popup from "./popup.interface";
import { useQuasar } from "quasar";
import SuggestionPopup from "./SuggestionPopup.vue";
import PopupRect from "./popup-rect.interface";
import { useSearchStore } from "src/stores/search-store";
import SuggestButton from "./SuggestButton.vue";
import gsap from "gsap";

const $q = useQuasar();
const searchStore = useSearchStore();

const emit = defineEmits(["hideCursor", "showCursor"]);

let map: any;
let marker: any;
const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
let hoveredFeatureId: string | null = null;
const x = ref(0);
const y = ref(0);
const showOverlay = ref(false);
const showPopup = ref(false);
const showSuggestionPopup = ref(false);
const showSuggestButton = ref(false);
const suggestButtonCoordinates = ref({ x: 0, y: 0 });
const suggestionPopupRect = ref({ w: 400, h: 300, x: 0, y: 0, lat: 0, lng: 0 } as PopupRect);
const popup = ref<Popup>({ title: "", attachments: [], folderName: "" });

const overlayStyle = computed(() => {
  const radius = Math.max(window.innerWidth, window.innerHeight) * 0.5;
  return {
    maskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 30%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 30%, black 100%)`,
  };
});

onMounted(() => {
  window.addEventListener("mousemove", onMouseDown);

  map = new mapboxgl.Map({
    container: "map",
    // purple-cyan-raleway
    style: "mapbox://styles/karinmiriam/cmaqslh9g00r501s90mydcred",
    zoom: 12,
    center: [13.407557, 52.509237],
    accessToken: apiKey ?? "",
  });

  features.forEach((feature) => {
    new mapboxgl.Marker({
      element: createCustomMarker(
        createLocationId(
          `${feature.geometry.coordinates[0]}`,
          `${feature.geometry.coordinates[1]}`,
        ),
        "Open",
        "#0a1657",
      ),
    })
      .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
      .addTo(map);
  });

  map.on("style.load", () => {
    map.addSource("places", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    });

    map.addLayer({
      id: "places",
      type: "circle",
      source: "places",
      paint: {
        "circle-color": "transparent",
        "circle-radius": 18,
      },
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.on("mousedown", (e: any) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["places"],
    });

    if (features.length > 0) {
      showOverlay.value = true;
      const feature = features[0];

      if (hoveredFeatureId !== feature.id) {
        hoveredFeatureId = feature.id;
        map.getCanvas().style.cursor = "pointer";

        showPopup.value = true;

        const attachments = JSON.parse(feature.properties.attachments);

        popup.value = {
          title: feature.properties.description,
          attachments: attachments,
          folderName: feature.properties.folderName,
        };
      }

      emit("hideCursor");
    } else if (hoveredFeatureId !== null) {
      hidePopup();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.on("contextmenu", (e: any) => {
    showSuggestionPopup.value = false;
    if (marker) marker.remove();

    marker = new mapboxgl.Marker({
      element: createCustomMarker(
        createLocationId(e.lngLat.lng, e.lngLat.lat),
        "Suggest",
        "#ffffff",
      ),
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);

    suggestButtonCoordinates.value.x = e.point.x + 24;
    suggestButtonCoordinates.value.y = e.point.y - 18;

    suggestionPopupRect.value.lng = e.lngLat.lng;
    suggestionPopupRect.value.lat = e.lngLat.lat;

    openSuggestButton();
  });
});

function createLocationId(lng: string, lat: string) {
  return `lng${lng.replace(".", "-")}lat${lat.replace(".", "-")}`;
}

function createCustomMarker(id: string, buttonText: string, color: string) {
  const markerElement = document.createElement("div");

  markerElement.addEventListener("mouseenter", () => {
    showButton(id, buttonText);
    emit("hideCursor");
    console.log(id);
  });
  markerElement.addEventListener("mouseleave", () => {
    emit("showCursor");
  });

  markerElement.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2px; align-items: center; transform: translateY(-2px)">
        <div id="${id}-top" style="width: 10px; height: 10px; border-radius: 50%; background: ${color}"></div>
        <div style="display: flex; gap: 4px">
          <div id="${id}-bottom-left" style="width: 10px; height: 10px; border-radius: 50%; background: ${color}"></div>
          <div id="${id}-bottom-right" style="width: 10px; height: 10px; border-radius: 50%; background: ${color}"></div>
        </div>
      </div>
      `;
  return markerElement;
}

function showButton(id: string, buttonText: string) {
  gsap.to(`#${id}-top`, {
    scale: 2,
  });
}

function openSuggestionPopup() {
  showSuggestButton.value = false;
  let popupX = 0;
  let popupY = 0;

  if ($q.screen.gt.sm) {
    // popup coordinates for md & larger screens
    popupX = Math.min(
      window.innerWidth - suggestionPopupRect.value.w,
      suggestButtonCoordinates.value.x,
    );
    popupY = Math.min(
      window.innerHeight - suggestionPopupRect.value.h,
      suggestButtonCoordinates.value.y,
    );
  } else {
    // popup coordinates for xs & sm screens
    popupX = 0;
    popupY = window.innerHeight * 0.3;
  }
  suggestionPopupRect.value.x = popupX;
  suggestionPopupRect.value.y = popupY;
  showSuggestionPopup.value = true;
  emit("hideCursor");
}

function hideSuggestionPopup() {
  showSuggestionPopup.value = false;
  emit("showCursor");
}

function openSuggestButton() {
  showSuggestButton.value = true;
}

function hideSuggestButton() {
  showSuggestButton.value = false;
}

function hidePopup() {
  showOverlay.value = false;
  showPopup.value = false;
  hoveredFeatureId = null;
  map.getCanvas().style.cursor = "";
  emit("showCursor");
}

onUnmounted(() => {
  window.removeEventListener("mousedown", onMouseDown);
});

function onMouseDown(e: MouseEvent) {
  if (!showOverlay.value) return;

  x.value = e.clientX;
  y.value = e.clientY;
}

watch(
  () => searchStore.selectedSuggestion,
  (value) => {
    if (value[0] && value[1]) {
      showSuggestButton.value = false;
      if (marker) marker.remove();

      map.flyTo({
        center: [value[0], value[1]],
        zoom: 14,
        essential: true,
      });

      marker = new mapboxgl.Marker({
        element: createCustomMarker(createLocationId(value[0], value[1]), "Suggest", "#ffffff"),
      })
        .setLngLat([value[0], value[1]])
        .addTo(map);
    }
  },
);
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.67);
  pointer-events: none;
  z-index: 2000;
}

:deep(a) {
  color: $font-color;
  text-decoration: none;
  font-size: 8px;
}

:deep(.mapboxgl-marker) {
  pointer-events: none;
}

.map-container {
  width: 100%;
  height: 100vh;
}
</style>
