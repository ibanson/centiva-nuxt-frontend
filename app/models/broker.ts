import type { Team } from './team'

export interface BrokersAPIResponse {
  data: Broker[]
  success: boolean
}

export interface Broker {
  id: number
  name: string
  team?: Team | null
}
