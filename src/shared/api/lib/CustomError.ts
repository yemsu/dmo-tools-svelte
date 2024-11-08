import type { ErrorCode, ErrorType } from '../types'

class CustomError extends Error {
	constructor(
		public errorType: ErrorType,
		public message: string
	) {
		super(message)
	}
}

export class UnknownError extends CustomError {
	constructor(
		public errorCode: ErrorCode,
		public errorType: ErrorType,
		public message: string,
		public endpoint: string
	) {
		super(errorType, message)
		this.name = 'UnknownError'
	}
}

export class BusinessError extends CustomError {
	constructor(
		public errorType: ErrorType,
		public message: string
	) {
		super(errorType, message)
		this.name = 'BusinessError'
	}
}
