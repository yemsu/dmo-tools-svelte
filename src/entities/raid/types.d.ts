import type { UserData } from '$entities/user'
import { GAME_CHANNELS, GAME_SERVERS } from './config'

export type GameChannel = (typeof GAME_CHANNELS)[number]

export type ServerType = keyof typeof GAME_SERVERS
export type ServerName = (typeof GAME_SERVERS)[ServerType]

export type RaidTimeData = {
	id: number
	startAt: string
	channel: GameChannel
	voteCount: number
	server: ServerType
	raidId: RaidData['id']
	clientId: number
	user: UserData
}

export type RaidData = {
	id: number
	name: string
	location: string
	channels: string
	times: RaidTimeData[]
}

export type NextRaidData = Omit<RaidData, 'times'> & {
	id: number
	name: string
	location: string
	channels: string
	time: RaidTimeData
}
