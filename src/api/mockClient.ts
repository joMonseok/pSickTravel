import {
  mockRecommendationEmptyResponse,
  mockRecommendationErrorResponse,
  mockRecommendationSuccessResponse,
} from '../data/mockData'
import type { ApiEnvelope } from '../types/api'
import type {
  RecommendationRequest,
  RecommendationResponseData,
} from '../types/recommendation'

export const mockClient = {
  createRecommendations: async (
    request: RecommendationRequest,
  ): Promise<ApiEnvelope<RecommendationResponseData>> => {
    const locationName = request.location.name.trim().toLowerCase()

    if (locationName.includes('error')) {
      return mockRecommendationErrorResponse
    }

    if (locationName.includes('empty')) {
      return mockRecommendationEmptyResponse
    }

    return mockRecommendationSuccessResponse
  },
}
