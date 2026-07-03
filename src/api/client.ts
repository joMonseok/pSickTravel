import { mockClient } from './mockClient'
import { realClient } from './realClient'

const apiMode = import.meta.env.VITE_API_MODE ?? 'mock'

export const apiClient = apiMode === 'real' ? realClient : mockClient
