import type { ApiEnvelope } from '../types/api'
import type {
  RecommendationRequest,
  RecommendationResponseData,
} from '../types/recommendation'

export const realClient = {
  createRecommendations: async (
    _request: RecommendationRequest,
  ): Promise<ApiEnvelope<RecommendationResponseData>> => {
    throw new Error('realClient.createRecommendations is not implemented yet')
  },
}
