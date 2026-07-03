<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BaseCard from '../common/BaseCard.vue'
import type { Course } from '../../types/recommendation'

const props = defineProps<{
  course: Course
}>()

const mapElement = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null
let markerLayer: L.LayerGroup | null = null

const createMarkerIcon = (order: number) => {
  return L.divIcon({
    className: 'course-marker',
    html: `<span>${order}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

const renderMarkers = () => {
  if (!map || !markerLayer) {
    return
  }

  markerLayer.clearLayers()

  if (props.course.places.length === 0) {
    map.setView([37.5665, 126.978], 12)
    return
  }

  props.course.places.forEach((place) => {
    L.marker([place.lat, place.lng], {
      icon: createMarkerIcon(place.order),
    })
      .addTo(markerLayer as L.LayerGroup)
      .bindPopup(`<strong>${place.order}. ${place.name}</strong><br />${place.address}`)
  })

  const bounds = L.latLngBounds(props.course.places.map((place) => [place.lat, place.lng]))

  if (bounds.isValid()) {
    map.fitBounds(bounds, {
      padding: [32, 32],
      maxZoom: 15,
    })
  }
}

onMounted(async () => {
  await nextTick()

  if (!mapElement.value) {
    return
  }

  map = L.map(mapElement.value, {
    zoomControl: true,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    subdomains: 'abcd',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  }).addTo(map)

  markerLayer = L.layerGroup().addTo(map)
  renderMarkers()
})

watch(
  () => props.course,
  () => {
    renderMarkers()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  map?.remove()
  map = null
  markerLayer = null
})
</script>

<template>
  <BaseCard>
    <section class="map-section" aria-label="지도">
      <div class="map-header">
        <div>
          <p class="eyebrow">Map Preview</p>
          <h2>코스 지도</h2>
        </div>
        <p>Leaflet + CARTO Positron 기반의 시연용 지도입니다.</p>
      </div>

      <div ref="mapElement" class="leaflet-map" />

      <p class="map-note">
        실제 운영 서비스에서는 지도 타일 제공자 정책을 검토해야 합니다.
      </p>
    </section>
  </BaseCard>
</template>

<style scoped>
.map-section {
  display: grid;
  gap: var(--space-5);
}

.map-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.map-header h2 {
  margin: var(--space-1) 0 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
}

.map-header p,
.map-note {
  max-width: 360px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-loose);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.leaflet-map {
  width: 100%;
  min-height: 320px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

:deep(.course-marker) {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--color-primary-text);
  background: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

:deep(.course-marker span) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

@media (max-width: 768px) {
  .map-header {
    flex-direction: column;
  }

  .leaflet-map {
    min-height: 260px;
  }
}
</style>
