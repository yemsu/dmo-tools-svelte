import type { ErrorCode } from '../types'

class CustomError extends Error {
	constructor(
		public errorType: string,
		public message: string
	) {
		super(message)
	}
}

export class RequestError extends CustomError {
	constructor(
		public errorCode: ErrorCode,
		public errorType: string,
		public message: string,
		public endpoint: string
	) {
		super(errorType, message)
		this.name = 'RequestError'
	}
}

export class BusinessError extends CustomError {
	constructor(
		public errorType: string,
		public message: string
	) {
		super(errorType, message)
		this.name = 'BusinessError'
	}
}
