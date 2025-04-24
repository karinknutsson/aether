<template>
  <div class="overlay" v-if="showOverlay" :style="overlayStyle"></div>
  <div>
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>

  <!-- <PopupComponent :popup="popup" /> -->
  <PopupComponent v-if="showPopup" :popup="popup" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import { features } from "./data";
// import gsap from "gsap";
import PopupComponent from "./PopupComponent.vue";
import type Popup from "./popup.interface";

const emit = defineEmits(["hover", "blur"]);

const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
let hoveredFeatureId: string | null = null;
const x = ref(0);
const y = ref(0);
const showOverlay = ref(false);
const showPopup = ref(false);
const popup = ref<Popup>({ title: "", attachments: [], x: 0, y: 0 });

const overlayStyle = computed(() => {
  const radius = Math.max(window.innerWidth, window.innerHeight) * 0.5;
  return {
    maskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 30%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${x.value}px ${y.value}px, transparent 0%, transparent 30%, black 100%)`,
  };
});

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);

  const map = new mapboxgl.Map({
    container: "map",
    // purple-cyan
    style: "mapbox://styles/karinmiriam/cm9fipg9v00ks01s4dhw089bb",
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
        // "circle-color": "rgba(255, 255, 255, 0.5)",
        "circle-radius": 18,
      },
    });
  });

  // const popup = new mapboxgl.Popup({
  //   closeButton: false,
  //   closeOnClick: false,
  //   className: "no-tip",
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.on("mousemove", (e: any) => {
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

        let xPopup;

        if (e.point.x > window.innerWidth / 2) {
          xPopup = window.innerWidth / 4 - 240;
        } else {
          xPopup = 3 * (window.innerWidth / 4) - 240;
        }

        const yPopup = window.innerHeight * 0.25;

        const attachments = JSON.parse(feature.properties.attachments);

        console.log(attachments);
        console.log(typeof attachments);

        popup.value = {
          title: feature.properties.description,
          attachments: attachments,
          x: xPopup,
          y: yPopup,
        };
      }

      emit("hover");
    } else if (hoveredFeatureId !== null) {
      showOverlay.value = false;
      showPopup.value = false;
      hoveredFeatureId = null;
      map.getCanvas().style.cursor = "";
      // popup.remove();
      emit("blur");
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
});

function onMouseMove(e: MouseEvent) {
  if (!showOverlay.value) return;

  x.value = e.clientX;
  y.value = e.clientY;
}
</script>

<style scoped lang="scss">
// :deep(h2) {
//   font-size: 24px;
//   font-weight: 600;
//   margin: 0;
//   line-height: 100%;
// }

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

// :deep(.mapboxgl-popup.no-tip) {
//   z-index: 3000;
// }

// :deep(.mapboxgl-popup.no-tip) {
//   max-width: none !important;
//   max-height: none !important;
//   width: 500px !important;
//   height: 500px !important;
// }

// :deep(.mapboxgl-popup.no-tip .mapboxgl-popup-tip) {
//   display: none;
// }
</style>
