import { goto } from '$app/navigation'
import { PATH } from '$shared/config'
import { toast } from '$shared/toast'
import type { BusinessError } from './CustomError'

export const goToErrorPage = (errorMessage: string) => {
	if (import.meta.env.SSR) return
	const lang = window.location.href.includes('/en/') ? 'en' : 'kr'
	goto(`/${lang}${PATH.ERROR}`, { state: { message: errorMessage } })
	console.error(errorMessage)
}

export const showErrorToast = (businessError: BusinessError) => {
	let message = businessError.message
	switch (businessError.message) {
		case '이미 투표했습니다.':
			message = '이미 좋아요를 눌렀어요.'
			break
		case '권한이 없습니다.':
			message = '내가 등록한 제보에는 좋아요를 할 수 없어요.'
			break
	}
	toast.on(message)
}
