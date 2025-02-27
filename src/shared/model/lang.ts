import { page } from '$app/stores'
import { derived } from 'svelte/store'

export const lang = derived(page, ($page) => $page.data.lang || 'kr')
export const langPath = derived(lang, ($lang) => ($lang === 'kr' ? '' : '/en'))
