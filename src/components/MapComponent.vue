<template>
  <div>
    <div ref="mapContainer" id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

const apiKey = process.env.MAPBOX_API_KEY
const mapContainer = ref(null)
const dataMarkers = [{ lng: 13.407557, lat: 52.509237 }]

onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map',
    // frank
    // style: 'mapbox://styles/karinmiriam/cko88xcgl4vju18pgby8zpan6',
    // aetheric
    // style: 'mapbox://styles/karinmiriam/cm915r01k009b01s457lv403i',
    // blue
    style: 'mapbox://styles/karinmiriam/cm914x1qt007l01s71104agcj',
    zoom: 12,
    center: [13.407557, 52.509237],
    accessToken: apiKey ?? '',
  })

  dataMarkers.forEach((marker) => {
    new mapboxgl.Marker({ element: createCustomMarker() })
      .setLngLat([marker.lng, marker.lat])
      .addTo(map)
  })

  function createCustomMarker() {
    const markerElement = document.createElement('div')
    markerElement.style.backgroundImage = 'url(/red-pin.png)'
    markerElement.style.backgroundSize = 'contain'
    markerElement.style.width = '24px'
    markerElement.style.height = '48px'
    return markerElement
  }
  // map.addControl(new mapboxgl.NavigationControl())
})
</script>

<style scoped lang="scss">
:deep(a) {
  color: $font-color;
  text-decoration: none;
  font-size: 8px;
}

.map-container {
  width: 1000px;
  height: 600px;
}
</style>
