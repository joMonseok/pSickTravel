<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiClient } from '../api/client'
import BaseButton from '../components/common/BaseButton.vue'
import BaseChip from '../components/common/BaseChip.vue'
import BaseInput from '../components/common/BaseInput.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import LoadingState from '../components/common/LoadingState.vue'
import PageContainer from '../components/common/PageContainer.vue'
import {
  clearRecommendationResult,
  setRecommendationResult,
} from '../state/recommendationState'
import type {
  AvailableTimeType,
  MbtiType,
  MoodType,
  RecommendationSortType,
} from '../types/enums'
import type { RecommendationRequest } from '../types/recommendation'

const router = useRouter()

const moodOptions: Array<{ label: string; value: MoodType }> = [
  { label: '힐링', value: 'HEALING' },
  { label: '리프레시', value: 'REFRESH' },
  { label: '활동적', value: 'ACTIVE' },
  { label: '심심함', value: 'BORED' },
  { label: '감성', value: 'EMOTIONAL' },
]

const availableTimeOptions: Array<{ label: string; value: AvailableTimeType }> = [
  { label: '1~2시간', value: 'SHORT' },
  { label: '2~4시간', value: 'MEDIUM' },
  { label: '반나절', value: 'HALF_DAY' },
]

const mbtiOptions: Array<{ label: string; value: MbtiType }> = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
].map((value) => ({ label: value, value: value as MbtiType }))

const sortOptions: Array<{ label: string; value: RecommendationSortType }> = [
  { label: '가까운 순', value: 'DISTANCE' },
  { label: '평점 순', value: 'RATING' },
]

const toDateTimeLocalValue = () => {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)

  return local.toISOString().slice(0, 16)
}

const toKstIsoString = (value: string) => {
  if (!value) {
    return ''
  }

  return `${value}:00+09:00`
}

const locationName = ref('성수')
const mood = ref<MoodType>('HEALING')
const mbti = ref<MbtiType>('ENFP')
const peopleCount = ref('2')
const availableTime = ref<AvailableTimeType>('MEDIUM')
const startTime = ref(toDateTimeLocalValue())
const radius = ref('3000')
const sort = ref<RecommendationSortType>('DISTANCE')
const isSubmitting = ref(false)
const submitError = ref('')

const selectedMoodLabel = computed(() => {
  return moodOptions.find((option) => option.value === mood.value)?.label ?? ''
})

const validateForm = () => {
  const trimmedLocationName = locationName.value.trim()
  const parsedPeopleCount = Number(peopleCount.value)
  const parsedRadius = radius.value ? Number(radius.value) : undefined

  if (!trimmedLocationName) {
    return '위치명을 입력해주세요.'
  }

  if (!Number.isInteger(parsedPeopleCount) || parsedPeopleCount < 1 || parsedPeopleCount > 10) {
    return '인원 수는 1~10 사이의 정수로 입력해주세요.'
  }

  if (!startTime.value) {
    return '여행 시작 시각을 선택해주세요.'
  }

  if (parsedRadius !== undefined && (!Number.isFinite(parsedRadius) || parsedRadius < 1)) {
    return '탐색 반경은 1 이상의 숫자로 입력해주세요.'
  }

  return ''
}

const createRequest = (): RecommendationRequest => {
  const request: RecommendationRequest = {
    location: {
      lat: 37.5441,
      lng: 127.0557,
      name: locationName.value.trim(),
    },
    mood: mood.value,
    mbti: mbti.value,
    peopleCount: Number(peopleCount.value),
    availableTime: availableTime.value,
    startTime: toKstIsoString(startTime.value),
    sort: sort.value,
  }

  if (radius.value) {
    request.radius = Number(radius.value)
  }

  return request
}

const handleSubmit = async () => {
  submitError.value = ''
  const validationError = validateForm()

  if (validationError) {
    submitError.value = validationError
    return
  }

  const request = createRequest()
  isSubmitting.value = true
  clearRecommendationResult()

  try {
    const response = await apiClient.createRecommendations(request)

    if (!response.success) {
      submitError.value = response.error?.message ?? '추천 요청에 실패했습니다.'
      return
    }

    setRecommendationResult(request, response)
    await router.push('/courses')
  } catch (error) {
    submitError.value =
      error instanceof Error ? error.message : '추천 요청 중 알 수 없는 오류가 발생했습니다.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <PageContainer>
    <div class="input-page">
      <section class="input-hero">
        <p class="hero-kicker">INPUT / RECOMMENDATION</p>
        <h1>BUILD YOUR<br />TRAVEL ROUTE.</h1>
      </section>

      <form class="recommendation-form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          <BaseInput
            v-model="locationName"
            label="현재 위치"
            placeholder="ex. 성수, 홍대, 강남"
            helper-text="목업 테스트: empty는 빈 결과, error는 에러 응답을 반환합니다."
          />

          <BaseInput
            v-model="peopleCount"
            label="인원 수"
            type="text"
            placeholder="2"
            inputmode="numeric"
            pattern="[0-9]*"
          />

          <BaseSelect
            v-model="availableTime"
            label="이용 가능 시간"
            :options="availableTimeOptions"
          />

          <BaseSelect v-model="mbti" label="MBTI" :options="mbtiOptions" />

          <BaseInput
            v-model="startTime"
            label="여행 시작 시각"
            type="datetime-local"
          />

          <BaseInput
            v-model="radius"
            label="탐색 반경"
            type="number"
            placeholder="3000"
            helper-text="단위: 미터"
          />

          <BaseSelect v-model="sort" label="정렬 기준" :options="sortOptions" />
        </div>

        <fieldset class="mood-field">
          <legend>원하는 분위기</legend>
          <div class="chip-group" :aria-label="`선택된 분위기: ${selectedMoodLabel}`">
            <BaseChip
              v-for="option in moodOptions"
              :key="option.value"
              :selected="mood === option.value"
              @click="mood = option.value"
            >
              {{ option.label }}
            </BaseChip>
          </div>
        </fieldset>

        <p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p>

        <div class="form-actions">
          <LoadingState v-if="isSubmitting" message="지금 상황에 맞는 코스를 찾고 있어요." />
          <BaseButton type="submit" size="lg" :disabled="isSubmitting">
            추천 받기
          </BaseButton>
        </div>
      </form>
    </div>
  </PageContainer>
</template>

<style scoped>
.input-page {
  display: grid;
  gap: 2rem;
}

.input-hero {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgb(17 17 17 / 10%);
}

.hero-kicker {
  margin: 0 0 1rem;
  color: rgb(17 17 17 / 55%);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.input-hero h1 {
  margin: 0;
  color: #111111;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: clamp(4rem, 8vw, 7.4rem);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.recommendation-form {
  display: grid;
  gap: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 4rem;
  margin-bottom: 2rem;
}

.mood-field {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.mood-field legend {
  padding: 0;
  color: rgb(17 17 17 / 60%);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-top: 1px solid rgb(17 17 17 / 12%);
  border-bottom: 1px solid rgb(17 17 17 / 12%);
}

.form-error {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  border: 1px solid color-mix(in srgb, var(--color-danger) 28%, var(--color-border));
  border-radius: 0;
  color: var(--color-danger);
  background: transparent;
  font-size: var(--font-size-sm);
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .input-hero h1 {
    font-size: clamp(3rem, 15vw, 5.2rem);
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>