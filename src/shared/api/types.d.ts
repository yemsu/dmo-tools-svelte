export type ErrorCode = number | 'unknown'

export type CustomErrorResponse = {
	errorCode: ErrorCode
	errorMessage: string
	errorType: string
}
export type ErrorResponse = { error: string; path: string; status: number }
