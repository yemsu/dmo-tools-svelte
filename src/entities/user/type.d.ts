import { UserResponse } from './type.d'

export type UserResponse = {
	id: number
	email: string
	nickname: string
	token: string
	timerCompleteCount: number
}

export type UserToken = {
	sub: string
	nickname: string
	exp: number
	iat: number
	auth: 'ROLE_USER'
}

export type UserData = Omit<UserResponse, 'token'>
