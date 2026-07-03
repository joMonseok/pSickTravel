<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import BaseCard from '../common/BaseCard.vue'
import type { PlaceCategoryType } from '../../types/enums'
import type { Course } from '../../types/recommendation'

const props = defineProps<{
  course: Course
}>()

const emit = defineEmits<{
  select: [courseId: string]
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

const firstPlace = computed(() => props.course.places[0])
const lastPlace = computed(() => props.course.places[props.course.places.length - 1])
const categories = computed(() => [
  ...new Set(props.course.places.map((place) => place.category)),
])
const coverPlace = computed(() => props.course.places.find((place) => place.thumbnailUrl) ?? null)

const handleSelect = () => {
  emit('select', props.course.id)
}
</script>

<template>
  <BaseCard variant="interactive">
    <div class="course-card">
      <div class="card-media">
        <img
          v-if="coverPlace?.thumbnailUrl"
          class="card-image"
          :src="coverPlace.thumbnailUrl"
          :alt="`${course.title} 대표 이미지`"
        />
        <div v-else class="card-image card-image--empty" aria-label="사진 없음">
          <span>Null</span>
        </div>

        <span class="card-badge">{{ course.totalDurationLabel }}</span>
      </div>

      <button class="card-main" type="button" @click="handleSelect">
        <span class="card-heading">
          <span class="title">{{ course.title }}</span>
          <span class="duration">{{ course.totalDurationLabel }}</span>
        </span>

        <span class="reason">{{ course.reason }}</span>

        <span class="meta">
          <span>장소 {{ course.places.length }}곳</span>
          <span>이동 {{ course.routeSegments.length }}구간</span>
        </span>

        <span v-if="firstPlace && lastPlace" class="route-summary">
          {{ firstPlace.name }} → {{ lastPlace.name }}
        </span>
      </button>

      <div class="category-row" aria-label="장소 카테고리">
        <span v-for="category in categories" :key="category" class="category-chip">
          {{ categoryLabels[category] }}
        </span>
      </div>

      <div class="card-actions">
        <BaseButton variant="secondary" size="sm" @click="handleSelect">상세 보기</BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.course-card {
  display: grid;
  gap: var(--space-4);
  border: 1px solid rgb(17 17 17 / 10%);
  background: #ffffff;
}

.card-media {
  position: relative;
  min-height: 180px;
  overflow: hidden;
  border-bottom: 1px solid rgb(17 17 17 / 10%);
  background: #e8e4db;
}

.card-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
}

.card-image--empty {
  display: grid;
  place-items: center;
  color: rgb(17 17 17 / 28%);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.2rem 0.45rem;
  background: rgba(255, 255, 255, 0.88);
  color: #111111;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.card-main {
  display: grid;
  gap: var(--space-3);
  width: 100%;
  padding: 0 1rem;
  border: 0;
  color: inherit;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.card-main:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: var(--radius-md);
}

.card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: 0.25rem;
}

.title {
  color: var(--color-text-strong);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(1.6rem, 2.2vw, 2.35rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.duration {
  flex: 0 0 auto;
  color: var(--color-text-muted);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  line-height: var(--line-height-tight);
}

.reason,
.route-summary {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: var(--line-height-loose);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 700;
}

.meta span {
  padding: var(--space-1) var(--space-2);
  border-radius: 999px;
  background: rgb(17 17 17 / 6%);
}

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  padding: 0 1rem;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 var(--space-2);
  border: 1px solid rgb(17 17 17 / 12%);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: 700;
  line-height: 1;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 1rem;
}

@media (max-width: 640px) {
  .card-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-2);
  }

  .card-media {
    min-height: 140px;
  }

  .card-image {
    min-height: 140px;
  }
}
</style>
