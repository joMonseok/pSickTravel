import type { ApiErrorCode } from './enums'

export interface ApiEnvelope<T> {
  success: boolean
  data: T | null
  error: ApiError | null
  timestamp: string
}

export interface ApiError {
  code: ApiErrorCode
  message: string
  details: ApiErrorDetail[]
}

export interface ApiErrorDetail {
  field: string
  reason: string
}
