<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { MoveMethodType } from '../../types/enums'
import type { RouteSegment } from '../../types/recommendation'

defineProps<{
  routeSegments: RouteSegment[]
}>()

const moveMethodLabels: Record<MoveMethodType, string> = {
  WALK: '도보',
  TRANSIT: '대중교통',
  CAR: '차량',
  MIXED: '복합 이동',
}

const formatDistance = (meters: number) => {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)}km`
  }

  return `${meters}m`
}
</script>

<template>
  <BaseCard>
    <section class="segment-list" aria-label="이동 구간">
      <div class="section-heading">
        <p class="eyebrow">Routes</p>
        <h2>이동 구간</h2>
      </div>

      <ol>
        <li v-for="segment in routeSegments" :key="`${segment.fromOrder}-${segment.toOrder}`">
          <div class="route-title">
            <strong>{{ segment.fromOrder }} → {{ segment.toOrder }}</strong>
            <span>{{ moveMethodLabels[segment.moveMethod] }}</span>
          </div>
          <p>{{ segment.durationMinutes }}분 · {{ formatDistance(segment.distanceMeters) }}</p>
        </li>
      </ol>
    </section>
  </BaseCard>
</template>

<style scoped>
.segment-list {
  display: grid;
  gap: var(--space-4);
}

.section-heading h2 {
  margin: var(--space-1) 0 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

ol {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.route-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.route-title strong {
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
}

.route-title span {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  background: var(--color-surface-muted);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
}
</style>
