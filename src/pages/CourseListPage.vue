<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import PageContainer from '../components/common/PageContainer.vue'
import CourseCard from '../components/course/CourseCard.vue'
import {
  lastRecommendationRequest,
  lastRecommendationResponse,
} from '../state/recommendationState'
import type { AvailableTimeType, MoodType } from '../types/enums'

const router = useRouter()

const moodLabels: Record<MoodType, string> = {
  HEALING: '힐링',
  REFRESH: '리프레시',
  ACTIVE: '활동적',
  BORED: '심심함',
  EMOTIONAL: '감성',
}

const availableTimeLabels: Record<AvailableTimeType, string> = {
  SHORT: '1~2시간',
  MEDIUM: '2~4시간',
  HALF_DAY: '반나절',
}

const response = computed(() => lastRecommendationResponse.value)
const request = computed(() => lastRecommendationRequest.value)
const courses = computed(() => response.value?.data?.courses ?? [])
const hasResponse = computed(() => response.value !== null)
const hasCourses = computed(() => courses.value.length > 0)
const totalCount = computed(() => response.value?.data?.totalCount ?? 0)

const goToHome = async () => {
  await router.push('/')
}

const handleSelectCourse = async (courseId: string) => {
  await router.push(`/courses/${courseId}`)
}
</script>

<template>
  <PageContainer>
    <EmptyState
      v-if="!hasResponse"
      title="아직 추천 결과가 없어요"
      description="먼저 현재 위치와 기분을 입력해 코스를 추천받아보세요."
      action-label="추천 입력하러 가기"
      @action="goToHome"
    />

    <EmptyState
      v-else-if="!hasCourses"
      title="조건에 맞는 코스를 찾지 못했어요"
      description="위치명이나 이용 가능 시간을 조금 넓혀 다시 시도해보세요."
      action-label="조건 다시 입력하기"
      @action="goToHome"
    />

    <div v-else class="course-list-page">
      <section class="page-header">
        <div>
          <p class="eyebrow">ROUTES</p>
          <h1>추천 코스 {{ totalCount }}개를 찾았어요</h1>
          <p>입력한 조건에 맞춰 바로 움직일 수 있는 코스만 추렸습니다.</p>
        </div>

        <BaseButton variant="secondary" @click="goToHome">다시 입력하기</BaseButton>
      </section>

      <BaseCard>
        <dl class="summary-list">
          <div>
            <dt>위치</dt>
            <dd>{{ request?.location.name }}</dd>
          </div>
          <div>
            <dt>인원</dt>
            <dd>{{ request?.peopleCount }}명</dd>
          </div>
          <div>
            <dt>분위기</dt>
            <dd>{{ request ? moodLabels[request.mood] : '-' }}</dd>
          </div>
          <div>
            <dt>이용 가능 시간</dt>
            <dd>{{ request ? availableTimeLabels[request.availableTime] : '-' }}</dd>
          </div>
        </dl>
      </BaseCard>

      <section class="course-list" aria-label="추천 코스 목록">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
          @select="handleSelectCourse"
        />
      </section>
    </div>
  </PageContainer>
</template>

<style scoped>
.course-list-page {
  display: grid;
  gap: 2rem;
  padding-inline: clamp(2rem, 4vw, 4rem);
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(17 17 17 / 10%);
}

.page-header h1 {
  margin: var(--space-2) 0 0;
  color: var(--color-text-strong);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.page-header p {
  max-width: 640px;
  margin: var(--space-3) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: var(--line-height-loose);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.summary-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  border: 1px solid rgb(17 17 17 / 10%);
}

.summary-list div {
  display: grid;
  gap: var(--space-1);
  padding: 1rem;
  border-right: 1px solid rgb(17 17 17 / 10%);
}

.summary-list div:last-child {
  border-right: 0;
}

.summary-list dt {
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.summary-list dd {
  margin: 0;
  color: var(--color-text-strong);
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
}

@media (max-width: 900px) {
  .summary-list,
  .course-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
  }
}
</style>
