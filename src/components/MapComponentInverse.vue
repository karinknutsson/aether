<template>
  <div ref="circleContainer" class="circle-container"></div>
  <div style="background: magenta">
    <!-- <div class="circle"></div> -->
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import { features } from "./data";
// import gsap from "gsap";

const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
const circleContainer = ref<HTMLElement | null>(null);
let hoveredFeatureId: string | null = null;
// let circleIntervalId = 0;

onMounted(() => {
  const map = new mapboxgl.Map({
    container: "map",
    // blue monochrome
    // style: "mapbox://styles/karinmiriam/cm914x1qt007l01s71104agcj",
    // lavender-blue
    style: "mapbox://styles/karinmiriam/cm91fgjqb009v01qs2kekesxk",
    zoom: 12,
    center: [13.407557, 52.509237],
    accessToken: apiKey ?? "",
  });

  //   features.forEach((feature) => {
  //     new mapboxgl.Marker({ element: createCustomMarker() })
  //       .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
  //       .addTo(map);
  //   });

  //   function createCustomMarker() {
  //     const markerElement = document.createElement("div");
  //     markerElement.style.backgroundImage = "url(/blue-pin.png)";
  //     markerElement.style.backgroundSize = "contain";
  //     markerElement.style.width = "24px";
  //     markerElement.style.height = "48px";
  //     return markerElement;
  //   }

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
        // "circle-color": "transparent",
        "circle-color": "white",
        "circle-radius": 32,
        "circle-stroke-width": 8,
        "circle-stroke-color": "rgba(255, 255, 255, 0)",
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
    } else if (hoveredFeatureId !== null) {
      hoveredFeatureId = null;
      map.getCanvas().style.cursor = "";
      popup.remove();
    }
  });
});
</script>

<style scoped lang="scss">
.circle-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(180, 80, 200, 0.5);
}

// .circle {
//   background: magenta;
//   border-radius: 50%;
//   position: absolute;
//   z-index: 10000;
// }
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
  height: 80vh;
}
</style>
