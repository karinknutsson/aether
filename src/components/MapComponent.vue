<template>
  <div class="overlay" v-if="showOverlay" :style="overlayStyle"></div>
  <div>
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>

  <PopupComponent v-if="showPopup" :popup="popup" @close="hidePopup" />
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

const $q = useQuasar();
const searchStore = useSearchStore();

const emit = defineEmits(["openPopup", "closePopup"]);

let map: any;
const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
let hoveredFeatureId: string | null = null;
const x = ref(0);
const y = ref(0);
const showOverlay = ref(false);
const showPopup = ref(false);
const showSuggestionPopup = ref(false);
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
    // purple-cyan
    // style: "mapbox://styles/karinmiriam/cm9fipg9v00ks01s4dhw089bb",
    // purple-cyan-raleway
    style: "mapbox://styles/karinmiriam/cmaqslh9g00r501s90mydcred",
    zoom: 12,
    center: [13.407557, 52.509237],
    accessToken: apiKey ?? "",
  });

  features.forEach((feature) => {
    new mapboxgl.Marker({ element: createCustomMarker() })
      .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
      .addTo(map);
  });

  function createCustomMarker() {
    const markerElement = document.createElement("div");
    markerElement.className = "prime-icon-marker";
    markerElement.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2px; align-items: center; transform: translateY(-2px)">
        <div style="width: 10px; height: 10px; border-radius: 50%; background: #0a1657"></div>
        <div style="display: flex; gap: 4px">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #0a1657"></div>
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #0a1657"></div>
        </div>
      </div>
      `;
    return markerElement;
  }

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

      emit("openPopup");
    } else if (hoveredFeatureId !== null) {
      console.log("click map component ");
      hidePopup();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.on("contextmenu", (e: any) => {
    let popupX = 0;
    let popupY = 0;

    if ($q.screen.gt.sm) {
      // popup coordinates for md & larger screens
      popupX = Math.min(window.innerWidth - suggestionPopupRect.value.w, e.point.x);
      popupY = Math.min(window.innerHeight - suggestionPopupRect.value.h, e.point.y);
    } else {
      popupX = 0;
      popupY = window.innerHeight * 0.3;
      // popup coordinates for xs & sm screens
    }

    suggestionPopupRect.value.x = popupX;
    suggestionPopupRect.value.y = popupY;
    suggestionPopupRect.value.lat = e.lngLat.lat;
    suggestionPopupRect.value.lng = e.lngLat.lng;

    openSuggestionPopup();
    console.log(e);
  });
});

function openSuggestionPopup() {
  showSuggestionPopup.value = true;
  emit("openPopup");
}

function hideSuggestionPopup() {
  showSuggestionPopup.value = false;
  emit("closePopup");
}

function hidePopup() {
  showOverlay.value = false;
  showPopup.value = false;
  hoveredFeatureId = null;
  map.getCanvas().style.cursor = "";
  emit("closePopup");
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
      map.flyTo({
        center: [value[0], value[1]],
        zoom: 14,
        essential: true,
      });
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
