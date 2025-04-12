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
import gsap from "gsap";

let isEmittingCircles = false;
const apiKey = process.env.MAPBOX_API_KEY;
const mapContainer = ref(null);
const circleContainer = ref<HTMLElement | null>(null);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let circleIntervalId = 0;

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
        "circle-radius": 32,
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

function createCircle(x: number, y: number) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.width = "10px";
  circle.style.height = "10px";
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.border = "1px solid white";
  circle.style.backgroundColor = "transparent";
  circle.style.borderRadius = "50%";
  circle.style.opacity = "1";
  circle.style.zIndex = "50000";
  circle.style.position = "absolute";
  return circle;
}

function growCircle(circle: HTMLElement) {
  const maxSize = 600;

  gsap.to(circle, {
    width: `${maxSize}px`,
    height: `${maxSize}px`,
    x: `-=${maxSize / 2}px`,
    y: `-=${maxSize / 2}px`,
    duration: 4,
    ease: "none",
    opacity: 0,
  });
}

function startEmitCircles(x: number, y: number) {
  if (isEmittingCircles) return;

  isEmittingCircles = true;
  emitCircles(x, y);
}

function emitCircles(x: number, y: number) {
  circleIntervalId = window.setInterval(() => {
    const circle = createCircle(x, y);

    if (circleContainer.value) {
      circleContainer.value.appendChild(circle);
      growCircle(circle);
    }
  }, 200);
}

function stopEmitCircles() {
  console.log("leave"); // window.clearInterval(circleIntervalId);
  // if (!isEmittingCirlces) return;
  // isEmittingCirlces = false;
}

// watch(isEmittingCircles. (value) => {
//   if (value) {
//     circleIntervalId = setInterval(() => {
//       const circle = createCircle
//     })
//   }
// })
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
