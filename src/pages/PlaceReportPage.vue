<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseInput from '../components/common/BaseInput.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import EmptyState from '../components/common/EmptyState.vue'
import PageContainer from '../components/common/PageContainer.vue'
import type { PlaceCategoryType } from '../types/enums'

const categoryOptions: Array<{ label: string; value: PlaceCategoryType }> = [
  { label: '카페', value: 'CAFE' },
  { label: '공원', value: 'PARK' },
  { label: '맛집', value: 'RESTAURANT' },
  { label: '전시', value: 'EXHIBITION' },
  { label: '산책', value: 'WALKING_SPOT' },
  { label: '전망', value: 'VIEWPOINT' },
  { label: '쇼핑', value: 'SHOPPING' },
  { label: '기타', value: 'ETC' },
]

const placeName = ref('')
const category = ref<PlaceCategoryType | ''>('')
const address = ref('')
const reason = ref('')
const memo = ref('')
const submitError = ref('')
const submitted = ref(false)

const resetForm = () => {
  placeName.value = ''
  category.value = ''
  address.value = ''
  reason.value = ''
  memo.value = ''
  submitError.value = ''
  submitted.value = false
}

const validateForm = () => {
  if (!placeName.value.trim()) {
    return '제보할 장소명을 입력해주세요.'
  }

  if (!category.value) {
    return '장소 카테고리를 선택해주세요.'
  }

  if (!address.value.trim()) {
    return '주소 또는 위치 설명을 입력해주세요.'
  }

  if (!reason.value.trim()) {
    return '추천 코스에 넣고 싶은 이유를 입력해주세요.'
  }

  if (reason.value.length > 300) {
    return '추천 이유는 300자 이하로 입력해주세요.'
  }

  if (memo.value.length > 500) {
    return '추가 메모는 500자 이하로 입력해주세요.'
  }

  return ''
}

const handleSubmit = () => {
  submitError.value = ''
  const validationError = validateForm()

  if (validationError) {
    submitError.value = validationError
    return
  }

  submitted.value = true
}
</script>

<template>
  <PageContainer>
    <section class="report-hero">
      <p class="eyebrow">Place Report</p>
      <h1>좋은 장소를 알고 있나요?</h1>
      <p>
        추천 코스에 넣고 싶은 장소를 제보해주세요. 이후 관리자 검토 후 추천 데이터에
        반영될 수 있습니다.
      </p>
    </section>

    <EmptyState
      v-if="submitted"
      title="장소 제보가 접수되었어요"
      description="실제 저장은 아직 연결되지 않았지만, 이후 제보 API와 연결될 예정입니다."
      action-label="새 장소 제보하기"
      @action="resetForm"
    />

    <BaseCard v-else>
      <form class="report-form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          <BaseInput
            v-model="placeName"
            label="장소명"
            placeholder="예: 조용한 골목 카페"
          />

          <BaseSelect
            v-model="category"
            label="장소 카테고리"
            placeholder="카테고리를 선택하세요"
            :options="categoryOptions"
          />
        </div>

        <BaseInput
          v-model="address"
          label="주소 또는 위치 설명"
          placeholder="예: 서울 성동구 성수동, 큰길 뒤 골목"
        />

        <label class="field">
          <span class="field-label">추천 이유</span>
          <textarea
            v-model="reason"
            class="textarea"
            rows="5"
            maxlength="300"
            placeholder="이 장소를 추천 코스에 넣고 싶은 이유를 적어주세요."
          />
          <span class="field-message">{{ reason.length }}/300자</span>
        </label>

        <label class="field">
          <span class="field-label">추가 메모</span>
          <textarea
            v-model="memo"
            class="textarea"
            rows="4"
            maxlength="500"
            placeholder="방문 팁이나 참고할 내용을 선택적으로 적어주세요."
          />
          <span class="field-message">{{ memo.length }}/500자</span>
        </label>

        <p class="mock-note">현재는 목업 단계라 실제 저장은 되지 않습니다.</p>
        <p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p>

        <div class="form-actions">
          <BaseButton type="submit" size="lg">장소 제보하기</BaseButton>
        </div>
      </form>
    </BaseCard>
  </PageContainer>
</template>

<style scoped>
.report-hero {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.eyebrow {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.report-hero h1 {
  max-width: 720px;
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
}

.report-hero p {
  max-width: 680px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: var(--line-height-loose);
}

.report-form {
  display: grid;
  gap: var(--space-5);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.field {
  display: grid;
  gap: var(--space-2);
}

.field-label {
  color: var(--color-text-strong);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  background: var(--color-surface);
  font: inherit;
  line-height: var(--line-height-base);
  resize: vertical;
}

.textarea::placeholder {
  color: var(--color-text-tertiary);
}

.textarea:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.field-message,
.mock-note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-base);
}

.form-error {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  border: 1px solid color-mix(in srgb, var(--color-danger) 28%, var(--color-border));
  border-radius: var(--radius-md);
  color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 8%, var(--color-surface));
  font-size: var(--font-size-sm);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .report-hero h1 {
    font-size: var(--font-size-xl);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: stretch;
  }
}
</style>
