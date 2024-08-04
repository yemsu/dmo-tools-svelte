const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export type FetchState<ResponseData> = [
	data: ResponseData | undefined,
	loading: boolean,
	error: string | null
]

export const apiFetch = async <ResponseData>(
	endpoint: string,
	option?: RequestInit
): Promise<ResponseData> => {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, option)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data: { result: ResponseData } = await response.json()
		return data.result
	} catch (err) {
		throw Error((err as Error).message)
	}
}
