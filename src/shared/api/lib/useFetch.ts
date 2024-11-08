import { goto } from '$app/navigation'
import { getTokenCookie, TOKEN_NAME } from '$entities/user'
import { PATH } from '$shared/config'
import { CustomError } from '../lib/CustomError'
import type { ErrorResponse } from '../types'
import { error } from '@sveltejs/kit'

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
			const { errorCode, errorType, errorMessage } = data.result
			throw new CustomError(errorCode, errorType, errorMessage, endpoint)
		}
		return data.result
	} catch (e) {
		if (e instanceof CustomError) {
			showError(`[${e.errorType}] ${e.message} "${endpoint}"`)
		} else {
			const error = e as Error
			showError(`[Unknown] ${error.message} "${endpoint}"`)
			console.warn('Request Headers', headers)
		}
		const err = e as { message: string }
		throw new Error(err.message)
	}
}

const showError = (errorMessage: string) => {
	if (import.meta.env.SSR) return
	const lang = window.location.href.includes('/en/') ? 'en' : 'kr'
	goto(`/${lang}${PATH.ERROR}`, { state: { message: errorMessage } })
	console.error(errorMessage)
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
