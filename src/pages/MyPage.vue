<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import PageContainer from '../components/common/PageContainer.vue'
import StatCard from '../components/mypage/StatCard.vue'
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

const request = computed(() => lastRecommendationRequest.value)
const response = computed(() => lastRecommendationResponse.value)
const courses = computed(() => response.value?.data?.courses ?? [])
const hasRecommendation = computed(() => response.value?.success === true)
const totalPlaces = computed(() => {
  return courses.value.reduce((sum, course) => sum + course.places.length, 0)
})

const formatDateTime = (value: string) => {
  return value.replace('T', ' ').replace(':00+09:00', '')
}

const goToHome = async () => {
  await router.push('/')
}

const goToCourses = async () => {
  await router.push('/courses')
}

const goToPlaceReport = async () => {
  await router.push('/places/report')
}
</script>

<template>
  <PageContainer>
    <div class="mypage">
      <section class="page-header">
        <p class="eyebrow">My Page</p>
        <h1>내 여행 상태</h1>
        <p>현재 세션의 추천 상태와 활동 요약을 확인하세요.</p>
      </section>

      <section class="stats-grid" aria-label="활동 통계">
        <StatCard
          label="추천 결과 수"
          :value="courses.length"
          description="현재 세션의 최근 추천 결과입니다."
        />
        <StatCard
          label="최근 추천 장소 수"
          :value="totalPlaces"
          description="최근 추천 코스에 포함된 장소 합계입니다."
        />
        <StatCard
          label="장소 제보 상태"
          value="목업"
          description="실제 제보 이력은 API 연결 후 표시됩니다."
        />
        <StatCard
          label="저장된 코스"
          value="준비중"
          description="저장 기능은 MVP 이후 단계에서 연결합니다."
        />
      </section>

      <section class="content-grid">
        <div class="section-stack">
          <h2>최근 추천</h2>

          <EmptyState
            v-if="!hasRecommendation"
            title="아직 추천 기록이 없어요"
            description="현재 세션에서 추천을 받으면 이곳에 최근 추천 상태가 표시됩니다."
            action-label="추천 받으러 가기"
            @action="goToHome"
          />

          <BaseCard v-else>
            <div class="recent-card">
              <div class="recent-heading">
                <div>
                  <p class="eyebrow">Recent Recommendation</p>
                  <h3>{{ request?.location.name ?? '최근 위치' }} 추천 요약</h3>
                </div>
                <strong>{{ courses.length }}개</strong>
              </div>

              <dl class="summary-list">
                <div>
                  <dt>위치</dt>
                  <dd>{{ request?.location.name ?? '-' }}</dd>
                </div>
                <div>
                  <dt>인원</dt>
                  <dd>{{ request ? `${request.peopleCount}명` : '-' }}</dd>
                </div>
                <div>
                  <dt>분위기</dt>
                  <dd>{{ request ? moodLabels[request.mood] : '-' }}</dd>
                </div>
                <div>
                  <dt>이용 가능 시간</dt>
                  <dd>{{ request ? availableTimeLabels[request.availableTime] : '-' }}</dd>
                </div>
                <div>
                  <dt>시작 시각</dt>
                  <dd>{{ request ? formatDateTime(request.startTime) : '-' }}</dd>
                </div>
              </dl>

              <div class="action-row">
                <BaseButton @click="goToCourses">추천 결과 보기</BaseButton>
                <BaseButton variant="secondary" @click="goToHome">다시 추천 받기</BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="section-stack">
          <h2>장소 제보 상태</h2>
          <BaseCard>
            <div class="report-status">
              <p>장소 제보 기능은 현재 목업 단계입니다.</p>
              <p>실제 제보 이력과 처리 상태는 API 연결 후 표시됩니다.</p>
              <BaseButton variant="secondary" @click="goToPlaceReport">
                장소 제보하러 가기
              </BaseButton>
            </div>
          </BaseCard>

          <BaseCard>
            <div class="report-status">
              <h3>저장된 코스</h3>
              <p>코스 저장 기능은 MVP 이후 단계에서 연결할 예정입니다.</p>
            </div>
          </BaseCard>
        </div>
      </section>
    </div>
  </PageContainer>
</template>

<style scoped>
.mypage {
  display: grid;
  gap: var(--space-8);
}

.page-header {
  display: grid;
  gap: var(--space-3);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
}

.page-header p {
  max-width: 680px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: var(--line-height-loose);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-5);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
  gap: var(--space-5);
  align-items: start;
}

.section-stack {
  display: grid;
  gap: var(--space-4);
}

.section-stack h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
}

.recent-card {
  display: grid;
  gap: var(--space-5);
}

.recent-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.recent-heading h3 {
  margin: var(--space-1) 0 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
}

.recent-heading strong {
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
}

.summary-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0;
}

.summary-list div {
  display: grid;
  gap: var(--space-1);
}

.summary-list dt {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.summary-list dd {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.report-status {
  display: grid;
  gap: var(--space-3);
}

.report-status h3,
.report-status p {
  margin: 0;
}

.report-status h3 {
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
}

.report-status p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-loose);
}

@media (max-width: 980px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-header h1 {
    font-size: var(--font-size-xl);
  }

  .stats-grid,
  .summary-list {
    grid-template-columns: 1fr;
  }
}
</style>
