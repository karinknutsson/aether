<template>
  <div class="overlay" v-if="showOverlay" :style="overlayStyle"></div>
  <div>
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import { features } from "./data";
// import gsap from "gsap";

const emit = defineEmits(["hover", "blur"]);

const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
let hoveredFeatureId: string | null = null;
const x = ref(0);
const y = ref(0);
const showOverlay = ref(false);

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
    // blue monochrome
    // style: "mapbox://styles/karinmiriam/cm914x1qt007l01s71104agcj",
    // lavender-blue
    // style: "mapbox://styles/karinmiriam/cm91fgjqb009v01qs2kekesxk",
    // purple-cyan
    style: "mapbox://styles/karinmiriam/cm9fidicg00jb01sb44f3fewt",
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
    markerElement.innerHTML = `<div style="transform: rotate(-90deg) translate(-2px, 2px);"><i class="pi pi-sparkles" style="font-size: 36px; color: white;"></i></div>`;
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
        "circle-radius": 22,
      },
    });
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

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

        const coordinates = feature.geometry.coordinates.slice();
        const description = feature.properties.description;

        if (["mercator", "equirectangular"].includes(map.getProjection().name)) {
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      }

      emit("hover");
    } else if (hoveredFeatureId !== null) {
      showOverlay.value = false;
      hoveredFeatureId = null;
      map.getCanvas().style.cursor = "";
      popup.remove();
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
.marker-wrapper {
  transform: rotate(-45deg);
  background: magenta;
}
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
