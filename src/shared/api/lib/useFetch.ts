import {
	getTokenCookie,
	setTokenCookie,
	TOKEN_NAME,
	REFRESH_TOKEN_NAME
} from '$entities/user'
import { PUBLIC_API_BASE_URL } from '$env/static/public'
import { BusinessError, RequestError } from '../lib/CustomError'
import type { CustomErrorResponse, ErrorResponse } from '../types'
import { goToErrorPage, showErrorToast } from './handleError'

export const apiFetch = async <ResponseData>(
	endpoint: string,
	options: RequestInit = {},
	hideError: boolean = false
): Promise<ResponseData> => {
	const accessToken = getTokenCookie(TOKEN_NAME)
	const refreshToken = getTokenCookie(REFRESH_TOKEN_NAME)

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Authorization: accessToken ? `Bearer ${accessToken}` : '',
		...(refreshToken ? { Refresh: refreshToken } : {})
	}
	try {
		const response = await fetch(`${PUBLIC_API_BASE_URL}${endpoint}`, {
			...options,
			headers: { ...options.headers, ...headers }
		})

		// 새로운 액세스 토큰이 헤더에 있다면 저장
		const newAccessToken = response.headers.get('authorization')
		if (newAccessToken) {
			setTokenCookie(newAccessToken, TOKEN_NAME)
		}

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
		if (hideError) {
			console.error('Passed Error', { error: e })
		} else if (e instanceof BusinessError) {
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
