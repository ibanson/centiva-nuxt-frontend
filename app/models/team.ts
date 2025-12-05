import type { Broker } from './broker'

export interface TeamAPIResponse {
  data: Team
  success: boolean
}

export interface TeamsAPIResponse {
  data: Team[]
  success: boolean
}

export interface Team {
  id: number
  name: string
  brokers?: Broker[]
}

