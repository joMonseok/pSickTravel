<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import PageContainer from '../components/common/PageContainer.vue'
import CourseMapMock from '../components/course/CourseMapMock.vue'
import CourseStopList from '../components/course/CourseStopList.vue'
import RouteSegmentList from '../components/course/RouteSegmentList.vue'
import { lastRecommendationResponse } from '../state/recommendationState'

const route = useRoute()
const router = useRouter()

const courseId = computed(() => String(route.params.courseId ?? ''))
const response = computed(() => lastRecommendationResponse.value)
const courses = computed(() => response.value?.data?.courses ?? [])
const course = computed(() => {
  return courses.value.find((item) => item.id === courseId.value) ?? null
})

const hasResponse = computed(() => response.value !== null)

const goToList = async () => {
  await router.push('/courses')
}

const goToHome = async () => {
  await router.push('/')
}
</script>

<template>
  <PageContainer>
    <EmptyState
      v-if="!hasResponse"
      title="추천 결과가 사라졌어요"
      description="추천 결과는 현재 세션에서만 유지됩니다. 다시 조건을 입력해 코스를 추천받아보세요."
      action-label="추천 다시 받기"
      @action="goToHome"
    />

    <EmptyState
      v-else-if="!course"
      title="코스를 찾을 수 없어요"
      description="추천 목록에서 다시 코스를 선택해주세요."
      action-label="추천 목록으로 돌아가기"
      @action="goToList"
    />

    <div v-else class="detail-page">
      <div class="action-row">
        <BaseButton variant="secondary" @click="goToList">목록으로 돌아가기</BaseButton>
        <BaseButton variant="ghost" @click="goToHome">조건 다시 입력하기</BaseButton>
      </div>

      <BaseCard>
        <section class="detail-header">
          <p class="eyebrow">Course Detail</p>
          <h1>{{ course.title }}</h1>
          <p>{{ course.reason }}</p>

          <dl class="summary-stats">
            <div>
              <dt>총 소요 시간</dt>
              <dd>{{ course.totalDurationLabel }}</dd>
            </div>
            <div>
              <dt>장소</dt>
              <dd>{{ course.places.length }}곳</dd>
            </div>
            <div>
              <dt>이동 구간</dt>
              <dd>{{ course.routeSegments.length }}구간</dd>
            </div>
            <div>
              <dt>상세 시간</dt>
              <dd>{{ course.totalDurationMinutes }}분</dd>
            </div>
          </dl>
        </section>
      </BaseCard>

      <CourseMapMock :course="course" />

      <div class="detail-grid">
        <CourseStopList :places="course.places" />
        <RouteSegmentList :route-segments="course.routeSegments" />
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.detail-page {
  display: grid;
  gap: var(--space-6);
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: space-between;
}

.detail-header {
  display: grid;
  gap: var(--space-4);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.detail-header h1 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
}

.detail-header p {
  max-width: 760px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: var(--line-height-loose);
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0;
}

.summary-stats div {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.summary-stats dt {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.summary-stats dd {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: var(--space-5);
  align-items: start;
}

@media (max-width: 900px) {
  .summary-stats,
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
