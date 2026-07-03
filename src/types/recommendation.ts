import type {
  AvailableTimeType,
  MbtiType,
  MoodType,
  MoveMethodType,
  PlaceCategoryType,
  RecommendationSortType,
} from './enums'

export interface RecommendationRequest {
  location: RecommendationLocation
  mood: MoodType
  mbti: MbtiType
  peopleCount: number
  availableTime: AvailableTimeType
  startTime: string
  radius?: number
  sort?: RecommendationSortType
}

export interface RecommendationLocation {
  lat: number
  lng: number
  name: string
}

export interface RecommendationResponseData {
  totalCount: number
  // Protocol rule: courses is never null and contains at most 3 items.
  courses: Course[]
}

export interface Course {
  id: string
  title: string
  totalDurationMinutes: number
  // Server-generated display label. The frontend must not compose it.
  totalDurationLabel: string
  reason: string
  places: Place[]
  // Protocol rule: routeSegments.length === places.length - 1.
  routeSegments: RouteSegment[]
}

export interface Place {
  id: string
  order: number
  name: string
  category: PlaceCategoryType
  lat: number
  lng: number
  address: string
  thumbnailUrl: string | null
  businessHours: string | null
}

export interface RouteSegment {
  fromOrder: number
  toOrder: number
  moveMethod: MoveMethodType
  durationMinutes: number
  distanceMeters: number
  polyline: string | null
}
