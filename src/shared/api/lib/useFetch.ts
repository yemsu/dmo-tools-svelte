import { getTokenCookie, TOKEN_NAME } from '$entities/user'
import { BusinessError, UnknownError } from '../lib/CustomError'
import type { ErrorResponse } from '../types'
import { goToErrorPage, showErrorToast } from './handleError'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers: { ...options.headers, ...headers }
		})
		const data: { result: ResponseData | ErrorResponse } = await response.json()
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
			showErrorToast(e)
		} else {
			const error = e as Error
			goToErrorPage(`[Unknown] ${error.message} "${endpoint}"`)
			console.warn('Request Headers', headers)
		}
		const err = e as { message: string }
		throw new UnknownError('unknown', 'UNKNOWN', err.message, endpoint)
	}
}
