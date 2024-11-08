export class CustomError extends Error {
	constructor(
		public errorCode: string,
		public errorType: string,
		public message: string,
		public endpoint: string
	) {
		super(message)
		this.name = 'CustomError'
	}
}
