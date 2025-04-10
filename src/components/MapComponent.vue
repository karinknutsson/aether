<template>
  <div>
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import { features } from "./data";

const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);

onMounted(() => {
  const map = new mapboxgl.Map({
    container: "map",
    // frank
    // style: 'mapbox://styles/karinmiriam/cko88xcgl4vju18pgby8zpan6',
    // aetheric
    style: "mapbox://styles/karinmiriam/cm915r01k009b01s457lv403i",
    // blue monochrome
    // style: 'mapbox://styles/karinmiriam/cm914x1qt007l01s71104agcj',
    // lavender-blue
    // style: 'mapbox://styles/karinmiriam/cm91fgjqb009v01qs2kekesxk',
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
    markerElement.style.backgroundImage = "url(/blue-pin.png)";
    markerElement.style.backgroundSize = "contain";
    markerElement.style.width = "24px";
    markerElement.style.height = "48px";
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
        "circle-radius": 24,
      },
    });
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.on("mouseenter", "places", (e: any) => {
    // console.log(e);
    map.getCanvas().style.cursor = "pointer";

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    if (["mercator", "equirectangular"].includes(map.getProjection().name)) {
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
    }

    popup.setLngLat(coordinates).setHTML(description).addTo(map);

    startEmitCircles(e.originalEvent.pageX, e.originalEvent.pageY);
  });

  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
    stopEmitCircles();
  });
});

function startEmitCircles(x: number, y: number) {
  console.log(x);
  console.log(y);
}

function stopEmitCircles() {}
</script>

<style scoped lang="scss">
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
