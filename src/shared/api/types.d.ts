export type ErrorCode = '404' | '400' | '500' | 'unknown'
export type ErrorType = 'UNKNOWN'

export type ErrorResponse = {
	errorCode: ErrorCode
	errorMessage: string
	errorType: ErrorType
}
