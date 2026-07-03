<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { PlaceCategoryType } from '../../types/enums'
import type { Place } from '../../types/recommendation'

defineProps<{
  places: Place[]
}>()

const categoryLabels: Record<PlaceCategoryType, string> = {
  CAFE: '카페',
  PARK: '공원',
  RESTAURANT: '맛집',
  EXHIBITION: '전시',
  WALKING_SPOT: '산책',
  VIEWPOINT: '전망',
  SHOPPING: '쇼핑',
  ETC: '기타',
}
</script>

<template>
  <BaseCard>
    <section class="stop-list" aria-label="장소 순서">
      <div class="section-heading">
        <p class="eyebrow">Stops</p>
        <h2>장소 순서</h2>
      </div>

      <ol>
        <li v-for="place in places" :key="place.id">
          <span class="order">{{ place.order }}</span>
          <div class="stop-content">
            <div class="title-row">
              <h3>{{ place.name }}</h3>
              <span>{{ categoryLabels[place.category] }}</span>
            </div>
            <p>{{ place.address }}</p>
            <p v-if="place.businessHours">영업 시간: {{ place.businessHours }}</p>
            <p class="thumbnail-state">
              사진 상태: {{ place.thumbnailUrl ? 'PHOTO' : 'Null' }}
            </p>
          </div>
        </li>
      </ol>
    </section>
  </BaseCard>
</template>

<style scoped>
.stop-list {
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
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: var(--space-3);
}

.order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  color: var(--color-primary-text);
  background: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.stop-content {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.title-row h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
  line-height: var(--line-height-tight);
}

.title-row span {
  flex: 0 0 auto;
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

.thumbnail-state {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
