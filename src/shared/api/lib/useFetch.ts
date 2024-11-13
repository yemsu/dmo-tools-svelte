import { getTokenCookie, TOKEN_NAME } from '$entities/user'
import { PUBLIC_API_BASE_URL } from '$env/static/public'
import { BusinessError, RequestError } from '../lib/CustomError'
import type { CustomErrorResponse, ErrorResponse } from '../types'
import { goToErrorPage, showErrorToast } from './handleError'

export const apiFetch = async <ResponseData>(
	endpoint: string,
	options: RequestInit = {}
): Promise<ResponseData> => {
	const token = getTokenCookie(TOKEN_NAME)
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Authorization: token ? `Bearer ${token}` : ''
	}
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}${endpoint}`, {
			...options,
			headers: { ...options.headers, ...headers }
		})
		const data:
			| {
					result: ResponseData | CustomErrorResponse
			  }
			| ErrorResponse = await response.json()
		if (typeof data === 'object' && 'error' in data) {
			throw new RequestError(data.status, response.type, data.error, endpoint)
		}
		if (
			data.result &&
			typeof data.result === 'object' &&
			'errorMessage' in data.result
		) {
			const { errorType, errorMessage } = data.result
			throw new BusinessError(errorType, errorMessage)
		}
		return data.result
	} catch (e) {
		if (e instanceof BusinessError) {
			console.error('Business Error', { error: e })
			showErrorToast(e)
		} else if (e instanceof RequestError) {
			goToErrorPage(`[${e.errorCode}] ${e.message} "${endpoint}"`)
		} else {
			const error = e as Error
			console.error('Unknown Error', { error })
			goToErrorPage(`[Unknown] ${error.message} "${endpoint}"`)
			console.warn('Request Headers', headers)
		}
		const error = e as Error
		throw new RequestError('unknown', 'UNKNOWN', error.message, endpoint)
	}
}
