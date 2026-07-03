import { shallowRef } from 'vue'
import type { ApiEnvelope } from '../types/api'
import type {
  RecommendationRequest,
  RecommendationResponseData,
} from '../types/recommendation'

export const lastRecommendationRequest = shallowRef<RecommendationRequest | null>(null)

export const lastRecommendationResponse =
  shallowRef<ApiEnvelope<RecommendationResponseData> | null>(null)

export const setRecommendationResult = (
  request: RecommendationRequest,
  response: ApiEnvelope<RecommendationResponseData>,
) => {
  lastRecommendationRequest.value = request
  lastRecommendationResponse.value = response
}

export const clearRecommendationResult = () => {
  lastRecommendationRequest.value = null
  lastRecommendationResponse.value = null
}
