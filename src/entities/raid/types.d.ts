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
}

export type RaidData = {
	id: number
	name: string
	location: string
	times: RaidTimeData[]
}
