export type MoodType =
  | 'HEALING'
  | 'REFRESH'
  | 'ACTIVE'
  | 'BORED'
  | 'EMOTIONAL'

export type AvailableTimeType =
  | 'SHORT'
  | 'MEDIUM'
  | 'HALF_DAY'

export type PlaceCategoryType =
  | 'CAFE'
  | 'PARK'
  | 'RESTAURANT'
  | 'EXHIBITION'
  | 'WALKING_SPOT'
  | 'VIEWPOINT'
  | 'SHOPPING'
  | 'ETC'

export type MoveMethodType =
  | 'WALK'
  | 'TRANSIT'
  | 'CAR'
  | 'MIXED'

export type MbtiType =
  | 'ISTJ'
  | 'ISFJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISTP'
  | 'ISFP'
  | 'INFP'
  | 'INTP'
  | 'ESTP'
  | 'ESFP'
  | 'ENFP'
  | 'ENTP'
  | 'ESTJ'
  | 'ESFJ'
  | 'ENFJ'
  | 'ENTJ'

export type RecommendationSortType =
  | 'DISTANCE'
  | 'RATING'

export type ApiErrorCode =
  | 'E4001_INVALID_REQUEST'
  | 'E4011_EXPIRED_TOKEN'
  | 'E4041_SERVICE_AREA_NOT_FOUND'
  | 'E4221_INVALID_ENUM_VALUE'
  | 'E4222_INVALID_COORDINATE'
  | 'E4223_INVALID_PEOPLE_COUNT'
  | 'E5000_INTERNAL_SERVER_ERROR'
