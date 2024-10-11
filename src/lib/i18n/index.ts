import { getLocaleFromNavigator, init, register } from 'svelte-i18n'

register('en', () => import('../../locales/en.json'))
register('kr', () => import('../../locales/kr.json'))

init({
	fallbackLocale: 'kr',
	initialLocale: getLocaleFromNavigator() || 'kr'
})
