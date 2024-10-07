import { getLocaleFromNavigator, init, register } from 'svelte-i18n'

register('en', () => import('../../locales/en.json'))
register('ko', () => import('../../locales/ko.json'))

init({
	fallbackLocale: 'ko',
	initialLocale: getLocaleFromNavigator() || 'ko'
})
