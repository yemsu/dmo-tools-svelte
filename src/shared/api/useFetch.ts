import { TOKEN_NAME } from '$entities/user'
import { error } from '@sveltejs/kit'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export type FetchState<ResponseData> = [
	data: ResponseData | undefined,
	loading: boolean,
	error: string | null
]

type ErrorResponse = {
	errorCode: string
	errorMessage: string
	errorType: string
}

export const apiFetch = async <ResponseData>(
	endpoint: string,
	options?: RequestInit
): Promise<ResponseData> => {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
		const data: { result: ResponseData | ErrorResponse } = await response.json()
		if (
			data.result &&
			typeof data.result === 'object' &&
			'errorMessage' in data.result
		) {
			throw new Error(
				`GET ERROR RESPONSE - [${data.result.errorCode}]${data.result.errorType}: ${data.result.errorMessage} (${endpoint})`
			)
		}
		return data.result
	} catch (e) {
		const err = e as { body: { message: string; status?: number } }
		error(err.body.status || 0, {
			message: `${err.body.message}! endpoint: ${endpoint}`
		})
	}
}

export const apiFetchCustomError = async <ResponseData>(
	endpoint: string,
	option?: RequestInit
): Promise<ResponseData | ErrorResponse> => {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, option)
		const data: { result: ResponseData | ErrorResponse } = await response.json()
		return data.result
	} catch (e) {
		const err = e as { body: { message: string; status: number } }
		error(err.body.status, {
			message: `${err.body.message}! endpoint: ${endpoint}`
		})
	}
}
