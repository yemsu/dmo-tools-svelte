export type UserResponse = {
	id: number
	email: string
	nickname: string
	token: string
}

export type UserToken = {
	sub: string
	nickname: string
	exp: number
	iat: number
	auth: 'ROLE_USER'
}

export type UserData = {
	email: string
	nickname: string
}
